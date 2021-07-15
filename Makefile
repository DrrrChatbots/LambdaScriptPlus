lambda.js: lambda.jison
	jison lambda.jison

test: lambda.js
	node lambda.js test.js

clean:
	rm lambda.js
