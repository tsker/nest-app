let clientDevPath = `${__dirname}/../src/client`;
let clientDistPath = `${__dirname}/../dist/client`;

module.exports = {
    entry: {
        main: `${clientDevPath}/app.tsx`
    },
    output: {
        path: clientDistPath,
        filename: 'main.js',
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: `${clientDevPath}/tsconfig.json`
                        }
                    }
                ]
            }
        ]
    }
};
