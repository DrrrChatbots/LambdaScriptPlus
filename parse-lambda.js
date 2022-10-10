#!/usr/bin/env node

// TODO: make all keyword into reserved
const TRACE = true
const DUMP = false
const fs = require("fs")
const path = require("path");
const scriptName = path.basename(__filename);
// var JisonLex = require("./src/jison-lex");
// var lexis = fs.readFileSync("src/lambda.jisonlex", "utf8");
// var lexer = new JisonLex(lexis);
const LambdaLexer = require("./dist/lambda-lexer").lexer;

if(process.argv.length < 3)
  process.exit(console.log(`Usage: ${scriptName} [source]`))

function nimpl(parser){
  console.error(parser.tokls.map(t => `[${t.type}]`).join(' '))
  console.trace();
  throw "not implement yet";
}

const event_types = [
  "me", "leave", "join", "newtab"
  , "msg", "dmto", "dm"
  , "exittab", "exitalarm", "musicbeg", "musicend"
  , "music", "kick", "ban", "unban", "roll"
  // , "new-description", "new-host", "room-profile"
  , "description", "host", "profile"
  , "lounge", "*"]

const key_tokens = ["ident", "number", "string", "true", "false"];
const arith_tokens = ["+", "-"]
// TODO, support ** in runtime
const term_tokens = ["**", "*", "/"]
const logic_tokens = [">", ">=", "==", "===", "<=", "<", "!=", "!=="]

// TODO support (...) operator
//
const assign_tokens = ["=", "+=", "-=", "**=", "*=", "/="
  , "%=", "<<=", ">>=", ">>>=", "&="
  , "^=", "|=", "&&=", "||=", "??="];

const equality_tokens = ["==", "!=", "===", "!=="];

const relational_tokens = [
  "<", "<=", ">", ">=", "in", "instanceof"];

const shift_tokens = ["<<", ">>", ">>>"];

const prefix14 = ["!", "~", "+", "-", "++", "--", "typeof", "void", "delete"];

const left_assoc = s => ({
  infix: s, assoc: { l: 1 }
});

const right_assoc = s => ({
  infix: s, assoc: { r: 1 }
});

const noIn =
  noin => cfg => ({
    noIn: noin, ...cfg
  });

const prefix = s => ({
  prefix: s
});

const postfix = s => ({
  postfix: s
});

// ( ... )
const between = s =>
  (open, close) => ({
    open, close
  });

// prefix postfix
// open   close
// right left

// ... ( ... ) or ... [ ... ]
const between_on =
  (left, right, times = 1) => ({
    left, right, times
  });

// new ... ( ... )
const prefix_between_on =
  (prefix, beg, end, optbe = false) => ({
    prefix, beg, end, optbe
  });

// ... ? ... : ...
// const ternary =
//   (pred, div) => ({
//     pred, div
//   });

const identP = (p, noIn) => {
  return p.expect("ident");
}

const lnext = lp => s => ({
  lnext: lp, ...s
});

const ops_precedences = [
  // move to expression
  // assign_tokens.map(right_assoc),
  [0,  ["||", "??"].map(left_assoc), [1, 1]],
  [1,  ["&&"].map(left_assoc), [1, 1]],
  [2,  ["|"].map(left_assoc), [1, 1]],
  [3,  ["^"].map(left_assoc), [1, 1]],
  [4,  ["&"].map(left_assoc), [1, 1]],
  [5,  equality_tokens.map(left_assoc), [1, 1]],
  [6,  relational_tokens.map(left_assoc), [1, 0]],
  [7,  shift_tokens.map(left_assoc)], // noIn(0, 0)
  [8,  ["+", "-"].map(left_assoc)],
  [9,  ["*", "/", "%"].map(left_assoc)],
  [10, ["**"].map(right_assoc)],
  [11, prefix14.map(prefix)],
  [12, ["++", "--"].map(postfix)],
  // [["new"].map(prefix)],
  // [[".", "?."].map(left_assoc)
  //             .map(lnext(identP))],
  // identifier name
  // [[lnext(identP)(left_assoc(".")),
  //   lnext(identP)(left_assoc("?.")),
  //   prefix_between_on("new", "(", ")"),
  //   between_on("[", "]"), between_on("(", ")")]],
  // [between("(", ")")]
];

function precedence_factory(
  parser, ops, next_ops, [NoInL, NoInR]){
  // may opt below because we can push
  // the correspoding op parsing function
  // instead of do if check (dispatch) in the function
  let prefixes = ops.filter(op => op.prefix);
  let infixes = ops.filter(op => op.infix);
  let postfixes = ops.filter(op => op.postfix);
  // let betweens = ops.filter(op => op.open);

  // let ternarys = ops.filter(op => op.pred);
  let btwnons = ops.filter(op => op.right);

  return function current_ops(NoIn){

    let next = parser.precedences[next_ops].bind(parser);

    for(let op of prefixes){
      if(!op.beg && parser.accept(op.prefix)){
        let op = parser.token.val;
        return {
          type: "unary", op,
          val: current_ops(NoIn),
        }
      }
    }

    // for(op of betweens){
    //   if(parser.accept(op.open)){
    //     // think
    //     let computed = parser.expr(0);
    //     parser.expect("]");
    //     return;
    //   }
    // }

    let matched_op = true;

    let lhs = null;

    for(let op of prefixes){
      if(op.beg && parser.accept(op.prefix)){
        lhs = {
          type: "ctor",
          op: parser.token.val,
          func: null,
          args: [],
        }
        lhs.func = op.cnext();
        let arglist = [];
        if(op.optbe){
          if(parser.ahead_is(op.beg)){
            // TODO parse arglist
            lhs.args = parser.list(
              () => parser.expr(0),
              op.beg, op.end, ",", -1);
          }
          // else no arglist
        }
        else {
          lhs.args = parser.list(
              () => parser.expr(0),
              op.beg, op.end, ",", -1);
        }
        break;
      }
    }

    lhs = lhs || next(NoInL);

    do {
      matched_op = false;
      for(let op of infixes){
        let p = this.peek();
        if(parser.accept(op.infix)){
          // console.log(p, `accept`, op)
          if(op.assoc.l){
            let rhs = op.lnext ?
                      op.lnext(this, NoInR) :
                      next(NoInR);
            lhs = {
              type: "binary",
              op: op.infix,
              lhs: lhs,
              rhs: rhs,
            }
            // console.log(p, '====>', op)
            // node = [node, op.sym, rv];
            matched_op = true;
            break;
          }
          else if(op.assoc.r){
            return {
              type: "binary",
              op: op.infix,
              lhs: lhs,
              rhs: current_ops(NoIn),
            }
            // return [node, op.sym, current_ops()];
          }
          else throw `no assoc on infix operator ${op.infix}`;
        }
      }

      for(let op of btwnons){
        if(parser.ahead_is(op.left)){
          matched_op = true;
          lhs = {
            type: "call",
            op: `${op.left}${op.right}`,
            func: lhs,
            args: parser.list(
              () => parser.expr(op.noIn && op.noIn[1]),
              op.left, op.right, ",", op.times),
          };
          break;
        }
      }
    } while(matched_op);

    // for(let op of ternarys){
    //   if(parser.accept(op.pred)){
    //     current_ops(0);
    //     parser.expect(op.div);
    //     current_ops(NoIn);
    //     return; // something
    //   }
    // }

    for(let op of postfixes){
      if(parser.accept(op.postfix)){
        // TODO: check lval
        return {
          type: "unary", op,
          val: lhs,
        }
      }
    }
    return lhs;
  }
}

function is_key_token(v){
  return key_tokens.includes(v);
}

function build_ops(parser){

  let newOp = prefix_between_on("new", "(", ")", true);
  let memberOps = [lnext(identP)(left_assoc(".")),
    lnext(identP)(left_assoc("?.")),
    newOp, between_on("[", "]")]

  let memberExpression = precedence_factory(
      parser, memberOps, 13 + 1, []);

  newOp.cnext = memberExpression.bind(parser);

  let LeftHandSideExpression = [...memberOps, between_on("(", ")", -1)];

  let new_precs = [...ops_precedences
    , [13, LeftHandSideExpression]];

  new_precs.forEach(([prec, ops, NoIns]) => {
    parser.precedences[prec] = precedence_factory(
      parser, ops, prec + 1, NoIns || []);
  });

  parser.precedences[
    new_precs.length] = parser.factor;
}

class Parser {

  lexer = null;
  token = null;
  tokls = [];
  precedences = {};

  constructor(lexer){
    this.lexer = lexer;
    build_ops(this);
  }

  next(ignore){
    if(!ignore && !this.tokls.length)
      throw "zeor length of token list on calling next()";

    if(!ignore){
      this.token = this.tokls.shift();
      // console.log(`consume ${JSON.stringify(this.token, null, 2)}`)
    }

    if(!this.tokls.length){
      let tok = this.lexer.lex()
      this.tokls.push({
        type: tok,
        text: this.lexer.yytext,
        val: this.lexer.yylval,
        loc: {...this.lexer.yylloc},
      });
    }
  }

  accept(...tokens){
    // check if empty tokls
    let p = this.peek();
    let ret = tokens.some(t => t == p);
    // console.log(p, tokens)
    // let ret = this.peek() == token;
    if(ret){
      this.next();
      // console.log(`accept: `, p, this.token.val);
    }
    return ret;
  }

  expect(token){
    // console.log(`expect ${token}`)
    if(!this.accept(token)){
      if(TRACE) console.trace();
      throw `error: expected token [${token}], get [${this.peek()}]`;
    }
    return this.token.val;
  }

  error(msg){
    throw `error: ${msg}`
  }

  ahead_is(...args){
    // check if empty tokls
    return args.includes(this.peek());
  }

  ahead_is_reserved(...args){
    return this.peek() == 'ident'
      && args.includes(this.tokls[0].val);
  }

  aheads_are(...args){
    // check if empty tokls
    return args.every((v, i) =>
      typeof v == 'function' ?
      v(this.peek(i)) : v == this.peek(i));
  }

  peek(k = 0){
    while(!this.lexer.done && k >= this.tokls.length){
      let tok = this.lexer.lex()
      this.tokls.push({
        type: tok,
        text: this.lexer.yytext,
        val: this.lexer.yylval,
        loc: {...this.lexer.yylloc},
      });
    }
    return k >= this.tokls.length ?
      null : this.tokls[k].type;
  }

  parse(code){
    this.lexer.setInput(code);
    this.lexer.opt_t = false;
    this.tokls = [];

    let sym = null;
    if(DUMP) do{
      sym = this.lexer.lex();
      // if(sym == "string")
      //   console.log(this.lexer.yylval);
      // console.log(this.lexer.done)
    } while(sym != "EOF");
    else return this.script();
  }

  list(item, beg, end, delimiter = ",", times = -1){
    let ret = [];
    this.expect(beg)
    while(!this.accept(end)){
      if(times == 0) throw "too may exprs";
      ret.push(item());
      if(times > 0) times -= 1;

      if(times == 0){
        this.expect(end);
        break;
      }
      else if(this.accept(end)) break;

      this.expect(delimiter);
      if(this.accept(end)) break;
    }
    if(times > 0) throw "insufficient exprs"
    return ret;
  }

  // start of the parsing rules

  factor(NoIn){
    // array literal, parens
    if(this.accept("ident")){
      return {
        type: "var",
        var: this.token.val,
      }
    }
    else if(this.accept(
      "number", "string",
      "true", "false")){
      return {
        type: "val",
        val: this.token.val,
      };
    }
    else if(this.accept("(")){
      let val = this.expr(0);
      this.expect(")");
      return val;
    }
    else if(this.ahead_is("[")){
      return {
        type: "array",
        cells: this.list(() => this.expr(0), "[", "]", ",", -1),
      };
    }
    else if(this.ahead_is("{")){
      // object
      if(  this.aheads_are("{", "}")
        || this.aheads_are("{", is_key_token, ":")
        || this.aheads_are("{", "ident", ",")
        || this.aheads_are("{", "ident", "}")){
        return this.object(0);
      }
      // block
      else{
        let ret = {
          type: "group",
          body: [],
        }
        this.expect("{");
        while(!this.accept("}")){
          ret.body.push(this.stmt());
        }
        return ret;
      }
    }
    else throw `factor: syntax error, unexpected token ${this.peek()}`;
  }

  object(NoIn){
    // console.log(`peek ${this.peek()}`);
    // console.log(this.tokls)
    let pairs = [];
    this.expect("{");
    while(!this.accept("}")){
      if(this.accept.apply(this, key_tokens)){
        let k = this.token.val;
        this.expect(":");
        let v = this.expr(0);
        pairs.push([k, v]);
        if(this.accept("}")) break;
        this.expect(",");
        if(this.accept("}")) break;
      }
      else this.error(`expected object key, get ${this.peek()}`)
    }
    return {
      type: "object", pairs
    }
  }

  assignment(NoIn){

    let LogicalORExpression = this.precedences[0].bind(this);

    let mayLHS = LogicalORExpression(NoIn);

    // LHSexpr
    // { ids } op=
    // [ ids ] op=
    // Logical

    if(this.accept.apply(this, assign_tokens)){
      // TODO: check if the mayLHS is really a LHS value
      let op = this.token.val;
      return {
        type: "binary", op,
        lval: mayLHS,
        rval: this.expr(NoIn),
      }
    }
    else if(this.accept("?")){
      let tn = this.expr(0);
      this.expect(":");
      let es = this.expr(NoIn);
      return {
        type: "ifels",
        pred: mayLHS,
        then: tn,
        else: es,
      }
    }
    else return mayLHS;
  }

  expr(NoIn){ // think if support , operator
    // ( ids ) =>
    if(this.accept("if")){
      let ret = {
        type: 'ifels',
        pred: this.expr(0),
      };
      this.expect("then");
      ret.then = this.stmt();
      if(this.accept("else"))
        ret.else = this.stmt();
      return ret;
    }
    else if(this.aheads_are("ident", "=>")
      || this.aheads_are("ident", ":")
      || this.aheads_are("(", ")", "=>")
      || this.aheads_are("(", "ident", ",", "=>")
      || this.aheads_are("(", "ident", ":")
      || this.aheads_are("(", "ident", ",")
      || this.aheads_are("(", "ident", ")", "=>")
    ){
      let ret = {
        type: 'arrow',
        args: [],
      };
      // ident =>
      // ident : expr =>
      // ( ) =>
      // ( ident # , ident # =>
      // ( ident :
      // ( ident ,
      if(this.accept("(")){
        while(!this.accept(")")){
          let sym = this.expect("ident");
          let pat = this.accept(":") ?
                    this.expr(0) : null;
          ret.args.push([sym, pat]);
          if(this.accept(")")) break;
          this.expect(",");
          if(this.accept(")")) break;
        }
      }
      else{
        let sym = this.expect("ident");
        let pat = this.accept(":") ?
                  this.expr(0) : null;
        ret.args.push([sym, pat]);
      }
      this.expect("=>");
      ret.body = this.stmt();
      return ret;
    }
    else return this.assignment(noIn);
  }

  floop(){
    let parens = this.accept("(");

    let ret = { type: 'floop' };

    let init = this.accept(";") ?
               null : (this.expr(1), this.accept(";"))

    if(this.accept("in")){
      // TODO: check is lval
      ret['var'] = init;
      ret['inIter'] = this.expr(0);
    }
    else if(this.accept("of")){
      // TODO: check is lval
      ret['var'] = init;
      ret['ofIter'] = this.expr(0);
    }
    else {
      ret['init'] = init;
      ret['cond'] = this.accept(";") ?
        null : (this.expr(0), this.accept(";"));
      if(!parens){
        ret['step'] = this.expr(0);
      }
      else if(!this.accept(")")){
        ret['step'] = this.expr(0);
        this.expect(")");
      }
    }
    ret['body'] = this.stmt();
    return ret;
  }

  events(){
    let ret = [];
    let parseE = (function(){
      if(this.accept("ident")){
        if(!event_types.includes(this.token.val))
          throw `invalid event type: ${this.token.type}`;
        ret.push(this.token.val);
      }
      else if(this.accept("string")){
        if(!event_types.includes(this.token.val))
          throw `invalid event type: ${this.token.type}`;
        ret.push(this.token.val);
      }
      else if(this.accept("*")){
        ret.push(this.token.val);
      }
      else throw `invalid event type: ${this.peek()}`;
    }).bind(this);

    if(this.ahead_is("[")){
      this.list(parseE, "[", "]");
    }
    else parseE();
    return ret;
  }

  reserved(symbol){
    // state event later timer going visit
    if(this.ahead_is("ident")
      && this.tokls[0].val == symbol)
      return this.accept("ident");
    return false;
  }

  stmt(){
    if(this.accept(";")){
      return {
        type: 'group',
        body: [],
      };
    }

    let ret = null;
    // | parseStmtExpr
    if(this.accept("while")){
      ret = {
        type: 'while',
        pred: this.expr(0),
        body: this.stmt(),
      }
    }
    else if(this.accept("for")){
      ret = this.floop();
    }
    else if(this.reserved("timer")){
      ret = {
        type: 'timer',
        period: this.expr(0),
        body: this.stmt(),
      }
    }
    else if(this.reserved("later")){
      ret = {
        type: 'later',
        period: this.expr(0),
        body: this.stmt(),
      }
    }
    else if(this.reserved("event")){
      ret = {
        type: 'event',
        events: this.events(),
        body: this.stmt(),
      }
    }
    else if(this.reserved("going")){
      ret = {
        type: 'going',
        state: this.expect("ident"),
      }
    }
    else if(this.reserved("visit")){
      ret = {
        type: 'visit',
        state: this.expect("ident"),
      }
    }
    else{
      ret = this.expr(0);
    }
    this.accept(";");
    return ret;
  }

  state(){
    return {
      name: this.expect("ident"),
      stmt: this.stmt(),
    }
  }

  states(){
    let ss = [];
    while(this.reserved("state"))
      ss.push(this.state());
    return ss;
  }

  stmts(){
    let ss = [];
    while(!
      (this.ahead_is_reserved("state")
        || this.ahead_is("EOF")))
      ss.push(this.stmt());
    return ss;
  }

  script(){
    this.next(true);
    let states = [], stmts = [];
    do{
      states.push.apply(states, this.states())
      stmts.push.apply(stmts, this.stmts())
    } while(!this.accept("EOF"));
    return { states, stmts };
  }
}

function main(){
  parser = new Parser({...LambdaLexer});
  var code = fs.readFileSync(process.argv[2], "utf8");

  try{
    // parser.parse(code);
    console.log(
      JSON.stringify(parser.parse(code), null, 2));
  }
  catch(e){
    console.error(e);
  }
}

main();
// parser = new Parser({...LambdaLexer});

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
/*
18	Grouping	n/a	( … )
17	Member Access	left-to-right	… . …
    Computed Member Access	n/a	… [ … ]
    new (with argument list)	n/a	new … ( … )
    Function Call	n/a	… ( … )
    Optional chaining	left-to-right	… ?. …
16	new (without argument list)	n/a	new …
15	Postfix Increment	n/a	… ++
    Postfix Decrement	… --
14	Logical NOT (!)	n/a	! …
  Bitwise NOT (~)	~ …
  Unary plus (+)	+ …
  Unary negation (-)	- …
  Prefix Increment	++ …
  Prefix Decrement	-- …
  typeof	typeof …
  void	void …
  delete	delete …
  await	await …
13	Exponentiation (**)	right-to-left	… ** …
12	Multiplication (*)	left-to-right	… * …
  Division (/)	… / …
  Remainder (%)	… % …
11	Addition (+)	left-to-right	… + …
  Subtraction (-)	… - …
10	Bitwise Left Shift (<<)	left-to-right	… << …
  Bitwise Right Shift (>>)	… >> …
  Bitwise Unsigned Right Shift (>>>)	… >>> …
9	Less Than (<)	left-to-right	… < …
  Less Than Or Equal (<=)	… <= …
  Greater Than (>)	… > …
  Greater Than Or Equal (>=)	… >= …
  in	… in …
  instanceof	… instanceof …
8	Equality (==)	left-to-right	… == …
  Inequality (!=)	… != …
  Strict Equality (===)	… === …
  Strict Inequality (!==)	… !== …
7	Bitwise AND (&)	left-to-right	… & …
6	Bitwise XOR (^)	left-to-right	… ^ …
5	Bitwise OR (|)	left-to-right	… | …
4	Logical AND (&&)	left-to-right	… && …
3	Logical OR (||)	left-to-right	… || …
  Nullish coalescing operator (??)	left-to-right	… ?? …
2	Assignment	right-to-left
  … = …
  … += …
  … -= …
  … **= …
  … *= …
  … /= …
  … %= …
  … <<= …
  … >>= …
  … >>>= …
  … &= …
  … ^= …
  … |= …
  … &&= …
  … ||= …
  … ??= …
  Conditional (ternary) operator	right-to-left (Groups on expressions after ?)	… ? … : …
  Arrow (=>)	n/a	… => …
  yield	yield …
  yield*	yield* …
  Spread (...)	... …
1	Comma / Sequence	left-to-right	… , …
*/
