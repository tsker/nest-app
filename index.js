if (process.env.NODE_ENV === 'development') {
	const compilerOptions = {
		target: 'esnext',
		experimentalDecorators: true,
		emitDecoratorMetadata: true
	};
	require('ts-node').register({ compilerOptions });
	require('./src/server/index.dev');
} else if (process.env.NODE_ENV === 'server-development') {
	require('ts-node').register({ project: 'src/server' });
	require('./src/server/index').bootstrap();
} else {
	require('./dist/server/index').bootstrap();
}
