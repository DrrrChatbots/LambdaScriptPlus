/* http://www.opensource.apple.com/source/JavaScriptCore/ */

// https://github.com/SteKoe/ocl.js/blob/main/generator/grammar.jison

// reference wiki: https://github.com/zaach/jison/wiki/ProjectsUsingJison

%lex
%options flex

%{
  Opt_S = false;
  Opt_T = false;
  Opt_D = false;
  buffer = '';
  code = [];

  helper = {
    token: function(text){
      buffer += text
      if(Opt_T) console.log(`<${text}>`);
      return text;
    },

    tokenKW: function(text){
      buffer += text
      if (Opt_T) console.log(`<keyword ${text}>`);
      return text;
    },

    tokenString: function(name, text, key){
      buffer += text;
      if(Opt_T) console.log(`<${name}: ${text}>`);
      return key;
    }
  }
%}

delimiters    ","|";"|":"|"("|")"|"["|"]"|"{"|"}"
letter        [a-zA-Z]
digit         [0-9]
posdigit      [1-9]
decimal       "0"|[1-9]+[0-9]*
octal         "0"[0-7]+
blanks        [ \t]
floating      ("0"|{posdigit}{digit}*)"."({digit}*{posdigit}|0)

%%

{delimiters}        { return helper.token(yytext); }

do                                       { return helper.tokenKW('do');        }
then                                     { return helper.tokenKW('then');      }
else                                     { return helper.tokenKW('else');      }
for                                      { return helper.tokenKW('for');       }
while                                    { return helper.tokenKW('while');     }
if                                       { return helper.tokenKW('if');        }
of                                       { return helper.tokenKW('of');        }
in                                       { return helper.tokenKW('in');        }
string                                   { return helper.tokenKW('string');    }
true                                     { return helper.tokenKW('true');      }
false                                    { return helper.tokenKW('false');     }
while                                    { return helper.tokenKW('while');     }
new                                      { return helper.tokenKW('new');       }
delete                                   { return helper.tokenKW('delete');    }
state                                    { return helper.tokenKW('state');     }
later                                    { return helper.tokenKW('later');     }
timer                                    { return helper.tokenKW('timer');     }
going                                    { return helper.tokenKW('going');     }
visit                                    { return helper.tokenKW('visit');     }

[+-]?({decimal}|{floating})[Ee][+-]?{decimal} {
  yylval = Number(yytext);
  return helper.tokenString('scientific', yytext, 'number');
}

[+-]?{octal}                            {
  yylval = parseInt(yytext, 8);
  return helper.tokenString('oct_integer', yytext, 'number');
}

[+-]?{floating}                         {
  yylval = Number(yytext);
  return helper.tokenString('float', yytext, 'number');
}

{decimal}                          {
  yylval = parseInt(yytext, 10);
  return helper.tokenString('integer', yytext, 'number');
}

"++"   { return helper.token('++');   }
"--"   { return helper.token('--');   }
"+"    { return helper.token('+');    }
"-"    { return helper.token('-');    }
"*"    { return helper.token('*');    }
"/"    { return helper.token('/');    }
"%"    { return helper.token('%');    }
"<"    { return helper.token('<');    }
"<="   { return helper.token('<=');   }
">="   { return helper.token('>=');   }
">"    { return helper.token('>');    }
"=="   { return helper.token('==');   }
"!="   { return helper.token('!=');   }
"==="  { return helper.token('===');  }
"!=="  { return helper.token('!==');  }
"||"   { return helper.token('||');   }
"&&"   { return helper.token('&&');   }
"!"    { return helper.token('!');    }
"~"    { return helper.token('~');    }
"=>"   { return helper.token('=>');   }
")"[ \t\n]"=>"   { return helper.token(')=>');   }
"="    { return helper.token('=');    }
"+="   { return helper.token('+=');   }
"-="   { return helper.token('-=');   }
"*="   { return helper.token('*=');   }
"/="   { return helper.token('/=');   }
"<<="  { return helper.token('<<=');  }
">>="  { return helper.token('>>=');  }
">>>=" { return helper.token('>>>='); }
"&="   { return helper.token('&=');   }
"^="   { return helper.token('^=');   }
"|="   { return helper.token('|=');   }
"%="   { return helper.token('%=');   }
"."    { return helper.token('.');    }

{letter}({letter}|{digit})*              {
  yylval = yytext;
  return helper.tokenString('id', yytext, 'ident');
}

\"([^\n\"]|\"\")*\" {
  let p = 0, s = 0, lit = 0;
  while(yytext[++s]){
    if(s + 1 < yytext.length){
      yytext[p] = (yytext[s] == '"' ? yytext[++s] : yytext[s]);
      p++;
    }
  }
  p = 0;
  yylval.text = lit;
  return helper.tokenString('string', yytext, 'string');
}

{blanks}                     {buffer += yytext;}

\/\/&S[+-][^\n]*             {buffer += yytext;Opt_S = yytext[4] == '+';}
\/\/&T[+-][^\n]*             {buffer += yytext;Opt_T = yytext[4] == '+';}
\/\/&D[+-][^\n]*             {buffer += yytext;Opt_D = yytext[4] == '+';}

\/\*(\*[^/]|[^*])*\*\/  {
                            buffer += yytext;
                            let pre = 0, cur = 0, LineNum = yylloc.first_line;
                            pre = cur = buffer;
                            while(cur < buffer.length){
                                if(buffer[cur] == '\n'){
                                    cur = 0;
                                    if(Opt_S)
                                      console.log(`${LineNum}: ${yytext.substring(pre)}`);
                                    pre = cur + 1;
                                    LineNum++;
                                }
                                cur++;
                            }
                            if(pre != 0) buffer = yytext.substring(pre);
                        }

\/\/[^\n]*             {buffer += yytext;}

\n      {
            if (Opt_S)
                console.log(`${yylloc.first_line}: ${buffer}`);
            // code[LineNum] = strdup(buffer);
            // buffer[0] = '\0';
        }

<<EOF>>   { return 'EOF'; }

.       {
          console.log(`Error at line ${yylloc.first_line}: bad character ${yytext}`);
        }

/lex

%start Debug

%nonassoc IF_WITHOUT_ELSE
%nonassoc STMT_WITHOUT_SC
%nonassoc 'else'
%nonassoc ';'

%%

Delimiter : ';' { };

Literal
    : 'true' { }
    | 'false' { }
    | 'number' { }
    | 'string' { }
    ;

Property
    : 'ident' ':' AssignmentExpr { }
    | 'string' ':' AssignmentExpr { }
    | 'number' ':' AssignmentExpr { }
    ;

PropertyList
    : Property { }
    | PropertyList ',' Property { }
    ;

PrimaryExpr
    : PrimaryExprNoBrace { }
    /* | '{' '}' */
    /* | '{' PropertyList '}' */
    /* | '{' PropertyList ',' '}' */
    ;

PrimaryExprNoBrace
    : Literal { }
    | ArrayLiteral { }
    | 'ident' { }
    | '(' Expr ')'
    ;

ArrayLiteral
    : '[' ElisionOpt ']' { }
    | '[' ElementList ']' { }
    | '[' ElementList ',' ElisionOpt ']' { }
    ;

ElementList
    : ElisionOpt AssignmentExpr { }
    | ElementList ',' ElisionOpt AssignmentExpr { }
    ;

ElisionOpt
    : { }
    | Elision { }
    ;

Elision
    : ',' { }
    | Elision ',' { }
    ;

MemberExpr
    : PrimaryExpr { }
    | FunctionExpr { }
    | MemberExpr '[' Expr ']' { }
    | MemberExpr '.' 'ident' { }
    | 'new' MemberExpr Arguments { }
    ;

MemberExprNoBF
    : PrimaryExprNoBrace { }
    | MemberExprNoBF '[' Expr ']' { }
    | MemberExprNoBF '.' 'ident' { }
    | 'new' MemberExpr Arguments { }
    ;

NewExpr
    : 'new' NewExpr { }
    | MemberExpr { }
    ;

NewExprNoBF
    : 'new' NewExpr { }
    | MemberExprNoBF { }
    ;

CallExpr
    : MemberExpr Arguments { }
    | CallExpr Arguments { }
    | CallExpr '[' Expr ']' { }
    | CallExpr '.' 'ident' { }
    ;

CallExprNoBF
    : MemberExprNoBF Arguments { }
    | CallExprNoBF Arguments { }
    | CallExprNoBF '[' Expr ']' { }
    | CallExprNoBF '.' 'ident' { }
    ;

Arguments
    : '(' ')' { }
    | '(' ArgumentList ')' { }
    ;

ArgumentList
    : AssignmentExpr { }
    | ArgumentList ',' AssignmentExpr { }
    ;

LeftHandSideExpr
    : NewExpr { }
    | CallExpr { }
    ;

LeftHandSideExprNoBF
    : NewExprNoBF { }
    | CallExprNoBF { }
    ;

PostfixExpr
    : LeftHandSideExpr { }
    | LeftHandSideExpr '++' { }
    | LeftHandSideExpr '--' { }
    ;

PostfixExprNoBF
    : LeftHandSideExprNoBF { }
    | LeftHandSideExprNoBF '++' { }
    | LeftHandSideExprNoBF '--' { }
    ;

UnaryExprCommon
    : 'delete' UnaryExpr { }
    | '++' UnaryExpr { }
    | '--' UnaryExpr { }
    | '+' UnaryExpr { }
    | '-' UnaryExpr { }
    | '~' UnaryExpr { }
    | '!' UnaryExpr { }
    ;

UnaryExpr
    : PostfixExpr { }
    | UnaryExprCommon { }
    ;

UnaryExprNoBF
    : PostfixExprNoBF { }
    | UnaryExprCommon { }
    ;

MultiplicativeExpr
    : UnaryExpr { }
    | MultiplicativeExpr '*' UnaryExpr { }
    | MultiplicativeExpr '/' UnaryExpr { }
    | MultiplicativeExpr '%' UnaryExpr { }
    ;

MultiplicativeExprNoBF
    : UnaryExprNoBF { }
    | MultiplicativeExprNoBF '*' UnaryExpr { }
    | MultiplicativeExprNoBF '/' UnaryExpr { }
    | MultiplicativeExprNoBF '%' UnaryExpr { }
    ;

AdditiveExpr
    : MultiplicativeExpr { }
    | AdditiveExpr '+' MultiplicativeExpr { }
    | AdditiveExpr '-' MultiplicativeExpr { }
    ;

AdditiveExprNoBF
    : MultiplicativeExprNoBF { }
    | AdditiveExprNoBF '+' MultiplicativeExpr { }
    | AdditiveExprNoBF '-' MultiplicativeExpr { }
    ;

RelationalExpr
    : AdditiveExpr { }
    | RelationalExpr '<' AdditiveExpr { }
    | RelationalExpr '>' AdditiveExpr { }
    | RelationalExpr '<=' AdditiveExpr { }
    | RelationalExpr '>=' AdditiveExpr { }
    | RelationalExpr 'in' AdditiveExpr { }
    ;

RelationalExprNoIn
    : AdditiveExpr { }
    | RelationalExprNoIn '<' AdditiveExpr { }
    | RelationalExprNoIn '>' AdditiveExpr { }
    | RelationalExprNoIn '<=' AdditiveExpr { }
    | RelationalExprNoIn '>=' AdditiveExpr { }
    ;

RelationalExprNoBF
    : AdditiveExprNoBF { }
    | RelationalExprNoBF '<' AdditiveExpr { }
    | RelationalExprNoBF '>' AdditiveExpr { }
    | RelationalExprNoBF '<=' AdditiveExpr { }
    | RelationalExprNoBF '>=' AdditiveExpr { }
    | RelationalExprNoBF 'in' AdditiveExpr { }
    ;

EqualityExpr
    : RelationalExpr { }
    | EqualityExpr '==' RelationalExpr { }
    | EqualityExpr '!=' RelationalExpr { }
    | EqualityExpr '===' RelationalExpr { }
    | EqualityExpr '!==' RelationalExpr { }
    ;

EqualityExprNoIn
    : RelationalExprNoIn { }
    | EqualityExprNoIn '==' RelationalExprNoIn { }
    | EqualityExprNoIn '!=' RelationalExprNoIn { }
    | EqualityExprNoIn '===' RelationalExprNoIn { }
    | EqualityExprNoIn '!==' RelationalExprNoIn { }
    ;

EqualityExprNoBF
    : RelationalExprNoBF { console.log("fuck") }
    | EqualityExprNoBF '==' RelationalExpr { }
    | EqualityExprNoBF '!=' RelationalExpr { }
    | EqualityExprNoBF '===' RelationalExpr { }
    | EqualityExprNoBF '!==' RelationalExpr { }
    ;

LogicalANDExpr
    : EqualityExpr { }
    | LogicalANDExpr '&&' EqualityExpr { }
    ;

LogicalANDExprNoIn
    : EqualityExprNoIn { }
    | LogicalANDExprNoIn '&&' EqualityExprNoIn { }
    ;

LogicalANDExprNoBF
    : EqualityExprNoBF { }
    | LogicalANDExprNoBF '&&' EqualityExpr { }
    ;

LogicalORExpr
    : LogicalANDExpr { }
    | LogicalORExpr '||' LogicalANDExpr { }
    ;

LogicalORExprNoIn
    : LogicalANDExprNoIn { }
    | LogicalORExprNoIn '||' LogicalANDExprNoIn { }
    ;

LogicalORExprNoBF
    : LogicalANDExprNoBF { }
    | LogicalORExprNoBF '||' LogicalANDExpr { }
    ;


LambdaParameterList
    : 'ident' { }
    | 'ident' ':' Expr { }
    | LambdaParameterList ',' 'ident' { }
    | LambdaParameterList ',' 'ident' ':' Expr { }
    ;

LambdaExpr
  :'ident' '=>' AssignmentExpr { console.log("curry 0") }
  | '(' ')=>' AssignmentExpr
  | '(' 'idnet' ')=>' AssignmentExpr
  | '(' 'idnet' ':' Expr ')=>' AssignmentExpr
  | '(' 'idnet' ',' ')=>' AssignmentExpr
  | '(' 'idnet' ':' Expr ',' LambdaParameterList ')=>' AssignmentExpr
  | '(' 'idnet' ',' LambdaParameterList ')=>' AssignmentExpr
  | '(' 'idnet' ':' Expr ',' LambdaParameterList ',' ')=>' AssignmentExpr
  | '(' 'idnet' ',' LambdaParameterList ',' ')=>' AssignmentExpr
  ;

AssignmentExpr
    : LogicalORExpr { console.log('fuck1'); }
    /* | StmtExpr { } */
    | LambdaExpr { console.log('fuck2'); }
    | LeftHandSideExpr AssignmentOperator Expr { console.log(" assign "); }
    ;

AssignmentExprNoIn
    : LogicalORExprNoIn { console.log('fuck3'); }
    | LeftHandSideExpr AssignmentOperator Expr { console.log(" assign "); }
    ;

AssignmentExprNoBF
    : LogicalORExprNoBF { console.log('fuck4'); }
    | LeftHandSideExprNoBF AssignmentOperator Expr { console.log(" assign "); }
    ;

AssignmentOperator
    : '=' { console.log("assignment") }
    | '+=' { }
    | '-=' { }
    | '*=' { }
    | '/=' { }
    | '<<=' { }
    | '>>=' { }
    | '>>>=' { }
    | '&=' { }
    | '^=' { }
    | '|=' { }
    | '%=' { }
    ;

ExprNoIn
    : AssignmentExprNoIn { }
    ;

IfElse
  : 'if' Expr Stmt %prec IF_WITHOUT_ELSE { }
  | 'if' Expr Stmt 'else' Stmt { }
  ;

Later : 'later' '(' Expr ')' Stmt { };

Etypes
  : 'me' { }
  | 'music' { }
  | 'leave' { }
  | 'join' { }
  | 'new-host' { }
  | 'msg' { }
  | 'dm' { }
  | 'dmto' { }
  | 'newtab' { }
  | 'exittab' { }
  | 'exitalarm' { }
  | 'musicbeg' { }
  | 'musicend' { }
  | 'kick' { }
  | 'ban' { }
  | 'unban' { }
  | 'roll' { }
  | 'room-profile' { }
  | 'new-description' { }
  | 'lounge' { }
  | '*' { }
  ;

Event : 'event' Etypes Stmt { };

Going : 'going' 'ident' { };

Visit : 'visit' 'ident' { };

/* VariableDeclarationListNoIn */
    /* : 'ident' { } */
    /* | 'ident' InitializerNoIn { } */
    /* | VariableDeclarationListNoIn ',' 'ident' { } */
    /* | VariableDeclarationListNoIn ',' 'ident' InitializerNoIn { } */
    /* ; */

/* InitializerNoIn */
    /* : '=' AssignmentExprNoIn { } */
    /* ; */

ExprNoInOpt
    : { }
    | ExprNoIn { }
    ;

Iteration :
    'do' Stmt 'while' '(' Expr ')' ';' { }
    | 'do' Stmt 'while' '(' Expr ')' error { }
    | 'while' '(' Expr ')' Stmt { }
    | 'for' '(' ExprNoInOpt ';' ExprOpt ';' ExprOpt ')' Stmt { }
    /* | 'for' '(' VAR VariableDeclarationListNoIn ';' ExprOpt ';' ExprOpt ')' Stmt */
    | 'for' '(' LeftHandSideExpr 'in' Expr ')' Stmt { }
    | 'for' '(' LeftHandSideExpr 'of' Expr ')' Stmt { }
    ;

Compound
  : '{' '}' { console.log("Object"); }
  | '{' Stmts '}' { console.log("Scope"); }
  | '{' PropertyList '}' { console.log("Object"); }
  | '{' PropertyList ',' '}' { console.log("Object"); }
  ;

State : 'state' 'ident' Stmt { $$ = 'a state' } ;

StmtExpr
  : IfElse { }
  | Visit { }
  | Going { }
  | Event { }
  | Later { }
  | Iteration { }
  | State { }
  | Compound { }
  ;

ExprOpt
  : { }
  | Expr { }
  ;

Expr
  : AssignmentExprNoBF { }
  ;

Stmts
  : Stmt { }
  | Stmts Stmt { }
  ;

Stmt
  : StmtExpr { console.log("stmt expr"); }
  | Expr Delimiter { console.log("expr;"); }
  | Expr error { console.log("patched ; on Stmt") }
  | Delimiter { console.log("delimiter"); }
  ;

/*
ScriptElements
  : %empty { }
  | ScriptElement ScriptElements { }
  ;

ScriptElement
  : Stmt { }
  ;

Script : ScriptElements { console.log("Script") };
*/

Debug : IfElse { console.log("Debug"); };
