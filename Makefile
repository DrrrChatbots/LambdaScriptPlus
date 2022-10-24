.PHONY: test clean

all:
	@#jison --module-type commonjs src/lambda.jison -o lambda-parser.js
	@jison-lex/cli.js -o llexer.js --module-type commonjs lambda.jisonlex
	@head -n -2 llexer.js > lambda-lexer.mjs
	@echo "export { llexer as lexer }" >> lambda-lexer.mjs
	@rm llexer.js
	@#jison	--module-type es -o lambda-lexer.js src/lambda.jisonlex
	@#src/jison-lex/cli.js -o lambda-lexer.js --module-type js src/lambda.jisonlex

test:
	@bash test/lexer/test.sh

clean:
	rm -rf lambda-lexer.js

ext:
	cp *-lambda.mjs $$HOME/GitHub/drrr-botext/lib/
	cp lambda-lexer.mjs $$HOME/GitHub/drrr-botext/lib/
