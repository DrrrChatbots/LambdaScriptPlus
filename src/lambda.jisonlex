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

{delimiters}                             { this.yylval = ''; if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
do                                       { this.yylval = ''; if(this.opt_t) console.log(`<keyword ${yytext}>`); return yytext; }
then                                     { this.yylval = ''; if(this.opt_t) console.log(`<keyword ${yytext}>`); return yytext; }
else                                     { this.yylval = ''; if(this.opt_t) console.log(`<keyword ${yytext}>`); return yytext; }
for                                      { this.yylval = ''; if(this.opt_t) console.log(`<keyword ${yytext}>`); return yytext; }
while                                    { this.yylval = ''; if(this.opt_t) console.log(`<keyword ${yytext}>`); return yytext; }
if                                       { this.yylval = ''; if(this.opt_t) console.log(`<keyword ${yytext}>`); return yytext; }
of                                       { this.yylval = ''; if(this.opt_t) console.log(`<keyword ${yytext}>`); return yytext; }
in                                       { this.yylval = ''; if(this.opt_t) console.log(`<keyword ${yytext}>`); return yytext; }
true                                     { this.yylval = ''; if(this.opt_t) console.log(`<keyword ${yytext}>`); return yytext; }
false                                    { this.yylval = ''; if(this.opt_t) console.log(`<keyword ${yytext}>`); return yytext; }
while                                    { this.yylval = ''; if(this.opt_t) console.log(`<keyword ${yytext}>`); return yytext; }
new                                      { this.yylval = ''; if(this.opt_t) console.log(`<keyword ${yytext}>`); return yytext; }
delete                                   { this.yylval = ''; if(this.opt_t) console.log(`<keyword ${yytext}>`); return yytext; }

typeof                                   { this.yylval = ''; if(this.opt_t) console.log(`<keyword ${yytext}>`); return yytext; }
void                                     { this.yylval = ''; if(this.opt_t) console.log(`<keyword ${yytext}>`); return yytext; }

// state                                    { this.yylval = ''; if(this.opt_t) console.log(`<keyword ${yytext}>`); return yytext; }
// event                                    { this.yylval = ''; if(this.opt_t) console.log(`<keyword ${yytext}>`); return yytext; }
// later                                    { this.yylval = ''; if(this.opt_t) console.log(`<keyword ${yytext}>`); return yytext; }
// timer                                    { this.yylval = ''; if(this.opt_t) console.log(`<keyword ${yytext}>`); return yytext; }
// going                                    { this.yylval = ''; if(this.opt_t) console.log(`<keyword ${yytext}>`); return yytext; }
// visit                                    { this.yylval = ''; if(this.opt_t) console.log(`<keyword ${yytext}>`); return yytext; }
// instanceof
// await
// yield
// yield*

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

// ...
">>>=" { this.yylval = yytext; if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
">>>"  { this.yylval = yytext; if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
"<<="  { this.yylval = yytext; if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
">>="  { this.yylval = yytext; if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
"==="  { this.yylval = yytext; if(this.opt_t) console.log(`${yytext}`); return yytext;  }
"!=="  { this.yylval = yytext; if(this.opt_t) console.log(`${yytext}`); return yytext;  }
"&&="  { this.yylval = yytext; if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
"||="  { this.yylval = yytext; if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
"??="  { this.yylval = yytext; if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
"=="   { this.yylval = yytext; if(this.opt_t) console.log(`${yytext}`); return yytext;  }
"!="   { this.yylval = yytext; if(this.opt_t) console.log(`${yytext}`); return yytext;  }
"<="   { this.yylval = yytext; if(this.opt_t) console.log(`${yytext}`); return yytext;  }
">="   { this.yylval = yytext; if(this.opt_t) console.log(`${yytext}`); return yytext;  }
"=>"   { this.yylval = yytext; if(this.opt_t) console.log(`${yytext}`); return yytext;  }
"**"   { this.yylval = yytext; if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
"<<"   { this.yylval = yytext; if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
">>"   { this.yylval = yytext; if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
"&&"   { this.yylval = yytext; if(this.opt_t) console.log(`${yytext}`); return yytext;  }
"||"   { this.yylval = yytext; if(this.opt_t) console.log(`${yytext}`); return yytext;  }
"++"   { this.yylval = yytext; if(this.opt_t) console.log(`${yytext}`); return yytext;  }
"--"   { this.yylval = yytext; if(this.opt_t) console.log(`${yytext}`); return yytext;  }
"+="   { this.yylval = yytext; if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
"-="   { this.yylval = yytext; if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
"*="   { this.yylval = yytext; if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
"/="   { this.yylval = yytext; if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
"&="   { this.yylval = yytext; if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
"^="   { this.yylval = yytext; if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
"|="   { this.yylval = yytext; if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
"%="   { this.yylval = yytext; if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
"??"   { this.yylval = yytext; if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
"?."   { this.yylval = yytext; if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
"+"    { this.yylval = yytext; if(this.opt_t) console.log(`${yytext}`); return yytext;  }
"-"    { this.yylval = yytext; if(this.opt_t) console.log(`${yytext}`); return yytext;  }
"*"    { this.yylval = yytext; if(this.opt_t) console.log(`${yytext}`); return yytext;  }
"/"    { this.yylval = yytext; if(this.opt_t) console.log(`${yytext}`); return yytext;  }
"%"    { this.yylval = yytext; if(this.opt_t) console.log(`${yytext}`); return yytext;  }
"<"    { this.yylval = yytext; if(this.opt_t) console.log(`${yytext}`); return yytext;  }
">"    { this.yylval = yytext; if(this.opt_t) console.log(`${yytext}`); return yytext;  }
"!"    { this.yylval = yytext; if(this.opt_t) console.log(`${yytext}`); return yytext;  }
"~"    { this.yylval = yytext; if(this.opt_t) console.log(`${yytext}`); return yytext;  }
"="    { this.yylval = yytext; if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
"?"    { this.yylval = yytext; if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
"."    { this.yylval = yytext; if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
"&"    { this.yylval = yytext; if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
"^"    { this.yylval = yytext; if(this.opt_t) console.log(`<${yytext}>`); return yytext; }
"|"    { this.yylval = yytext; if(this.opt_t) console.log(`<${yytext}>`); return yytext; }


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

<<EOF>>   { this.yylval = yytext; return 'EOF'; }

.       { throw `Error at line ${yylloc.first_line}: bad character ${yytext}`; }
