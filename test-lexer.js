#!/usr/bin/env node

var fs = require("fs")
var path = require('path');
var scriptName = path.basename(__filename);

var JisonLex = require('./src/jison-lex');
var grammar = fs.readFileSync('src/lambda.jisonlex', 'utf8');
var lexerSource = JisonLex.generate(grammar);
var lexer = new JisonLex(grammar);

// var lexer = require('src/lambda-lex').lexer;

if(process.argv.length < 3)
  process.exit(console.log(`Usage: ${scriptName} [source]`))

var code = fs.readFileSync(process.argv[2], 'utf8');
lexer.setInput(code);
lexer.opt_t = true;
do{
  token = lexer.lex();
  if(token == 'string') console.log(lexer.yylval);
}
while(token != 'EOF')
