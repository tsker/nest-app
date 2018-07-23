if (process.env.NODE_ENV === 'development') {
    const compilerOptions = {
        target                 : 'esnext',
        experimentalDecorators : true,
        emitDecoratorMetadata  : true
    };
    require('ts-node').register({ compilerOptions });
    require('./src/server/index.dev');
} else if (process.env.NODE_ENV === 'ssr-development') {
    process.env.TS_NODE_PROJECT = 'src/tsconfig.json';
    require('ts-node').register();
    require('tsconfig-paths').register();
    require('./src/server/index.ssr');
} else if (process.env.NODE_ENV === 'server-development') {
    process.env.TS_NODE_PROJECT = 'src/tsconfig.json';
    require('ts-node').register();
    require('./src/server/index').bootstrap();
} else {
    require('./dist/server/index').bootstrap();
}
