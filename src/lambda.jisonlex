delimiters    ","|";"|":"|"("|")"|"["|"]"|"{"|"}"
nonDigIdent   [_$a-zA-Z]
digit         [0-9]
posdigit      [1-9]
decimal       "0"|[1-9]+[0-9]*
octal         "0"[0-7]+
blanks        [ \t]
floating      ("0"|{posdigit}{digit}*)"."({digit}*{posdigit}|0)

%%

\/\*(\*[^/]|[^*])*\*\/  { if(this.opt_t) console.log(`comment: <${yytext}>`); }
\/\/[^\n]*              { if(this.opt_t) console.log(`comment: <${yytext}>`); }

{delimiters}                             { if(this.opt_t) console.log(`<${yytext}>`); return yytext; }

do                                       { if(this.opt_t) console.log(`<keyword ${yytext}`); return yytext; }
then                                     { if(this.opt_t) console.log(`<keyword ${yytext}`); return yytext; }
else                                     { if(this.opt_t) console.log(`<keyword ${yytext}`); return yytext; }
for                                      { if(this.opt_t) console.log(`<keyword ${yytext}`); return yytext; }
while                                    { if(this.opt_t) console.log(`<keyword ${yytext}`); return yytext; }
if                                       { if(this.opt_t) console.log(`<keyword ${yytext}`); return yytext; }
of                                       { if(this.opt_t) console.log(`<keyword ${yytext}`); return yytext; }
in                                       { if(this.opt_t) console.log(`<keyword ${yytext}`); return yytext; }
true                                     { if(this.opt_t) console.log(`<keyword ${yytext}`); return yytext; }
false                                    { if(this.opt_t) console.log(`<keyword ${yytext}`); return yytext; }
while                                    { if(this.opt_t) console.log(`<keyword ${yytext}`); return yytext; }
new                                      { if(this.opt_t) console.log(`<keyword ${yytext}`); return yytext; }
delete                                   { if(this.opt_t) console.log(`<keyword ${yytext}`); return yytext; }
state                                    { if(this.opt_t) console.log(`<keyword ${yytext}`); return yytext; }
later                                    { if(this.opt_t) console.log(`<keyword ${yytext}`); return yytext; }
timer                                    { if(this.opt_t) console.log(`<keyword ${yytext}`); return yytext; }
going                                    { if(this.opt_t) console.log(`<keyword ${yytext}`); return yytext; }
visit                                    { if(this.opt_t) console.log(`<keyword ${yytext}`); return yytext; }

[+-]?({decimal}|{floating})[Ee][+-]?{decimal} {
  this.yylval = Number(yytext);
  if(this.opt_t) console.log(`<scientific:${yytext}>`);
  return 'number';
}

[+-]?{octal}                            {
  this.yylval = parseInt(yytext, 8);
  if(this.opt_t) console.log(`<octal:${yytext}>`);
  return 'number';
}

[+-]?{floating}                         {
  this.yylval = Number(yytext);
  if(this.opt_t) console.log(`<float:${yytext}>`);
  return 'number';
}

{decimal}                          {
  this.yylval = parseInt(yytext, 10);
  if(this.opt_t) console.log(`<decimal:${yytext}>`);
  return 'number';
}

"++"   { if(this.opt_t) console.log(`${yytext}`); return yytext;  }
"--"   { if(this.opt_t) console.log(`${yytext}`); return yytext;  }
"+"    { if(this.opt_t) console.log(`${yytext}`); return yytext;  }
"-"    { if(this.opt_t) console.log(`${yytext}`); return yytext;  }
"*"    { if(this.opt_t) console.log(`${yytext}`); return yytext;  }
"/"    { if(this.opt_t) console.log(`${yytext}`); return yytext;  }
"%"    { if(this.opt_t) console.log(`${yytext}`); return yytext;  }
"<"    { if(this.opt_t) console.log(`${yytext}`); return yytext;  }
"<="   { if(this.opt_t) console.log(`${yytext}`); return yytext;  }
">="   { if(this.opt_t) console.log(`${yytext}`); return yytext;  }
">"    { if(this.opt_t) console.log(`${yytext}`); return yytext;  }
"=="   { if(this.opt_t) console.log(`${yytext}`); return yytext;  }
"!="   { if(this.opt_t) console.log(`${yytext}`); return yytext;  }
"==="  { if(this.opt_t) console.log(`${yytext}`); return yytext;  }
"!=="  { if(this.opt_t) console.log(`${yytext}`); return yytext;  }
"||"   { if(this.opt_t) console.log(`${yytext}`); return yytext;  }
"&&"   { if(this.opt_t) console.log(`${yytext}`); return yytext;  }
"!"    { if(this.opt_t) console.log(`${yytext}`); return yytext;  }
"~"    { if(this.opt_t) console.log(`${yytext}`); return yytext;  }
"=>"   { if(this.opt_t) console.log(`${yytext}`); return yytext;  }
"="    { if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
"+="   { if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
"-="   { if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
"*="   { if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
"/="   { if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
"<<="  { if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
">>="  { if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
">>>=" { if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
"&="   { if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
"^="   { if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
"|="   { if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
"%="   { if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
"."    { if(this.opt_t) console.log(`<${yytext}>`); return yytext; }

{nonDigIdent}({nonDigIdent}|{digit})*              {
  this.yylval = yytext;
  if(this.opt_t) console.log(`<ident:${yytext}>`);
  return 'ident';
}

\"(\\\"|[^\n"])*\" {
  try{
    this.yylval = JSON.parse(yytext)
  }
  catch(err){
    throw `cannot parse <${yytext}>`;
  }
  if(this.opt_t) console.log(`<string:${JSON.stringify(this.yylval)}>`);
  return 'string';
}

"'"(\\\'|[^\n])*"'" {
  let i = 0, acc = '"';
  while(i < yytext.length - 1){
    if(yytext[i] == '\\' && i + 1 < yytext.length - 1){
      if(yytext[i + 1] == "'") acc += "'";
      else acc += yytext.substr(i, 2);
      i += 1;
    }
    else acc += yytext[i];
    i += 1;
  }
  acc += '"';
  this.yylval = JSON.parse(acc);
  if(this.opt_t) console.log(`<string:${JSON.stringify(this.yylval)}>`);
  return 'string';
}

{blanks}                     {}

\n      { }

<<EOF>>   { return 'EOF'; }

.       { throw `Error at line ${yylloc.first_line}: bad character ${yytext}`; }
