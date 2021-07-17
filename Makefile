.PHONY: test clean

all: dist
	@#jison src/lambda.jison
	src/jison-lex/cli.js -o dist/lambda-lexer.js --module-type commonjs src/lambda.jisonlex

dist:
	@mkdir -p dist

test:
	@bash test/lexer/test.sh

clean:
	rm -rf dist
