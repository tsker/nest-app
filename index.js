require('ts-node').register({
	project: 'src/server'
});

if (process.env.NODE_ENV === 'development') {
	require('./src/server/index.dev');
} else {
	require('./src/server/index')();
}
