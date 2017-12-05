if (process.env.NODE_ENV === 'development') {
	const compilerOptions = {
		target: 'esnext',
		experimentalDecorators: true /* Enables experimental support for ES7 decorators. */,
		emitDecoratorMetadata: true
	};
	require('ts-node').register({ compilerOptions });
	require('./src/server/index.dev');
} else {
	require('./dist/server/index').bootstrap();
}
