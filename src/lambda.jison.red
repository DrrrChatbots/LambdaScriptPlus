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

manyArgs : '(' Exprs ')'
         ;


maybeSemi : ';' { }
          | { }
          ;

Expr1 : Abstract { }
      | StmtExpr { }
      | BindingOrSimple { }
      | Object { }
      |        { }
      ;

Expr : Expr1 manyArgs maybeSemi { }
     ;

State : 'state' 'ident' Expr { $$ = 'a state' } ;

ScriptElements
  : %empty { }
  | ScriptElements ScriptElement { }
  ;

ScriptElement
  : State { }
  | Expr { }
  ;

Script : ScriptElements { console.log("done") };

Debug : Script { console.log("script"); };
