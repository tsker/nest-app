import { bootstrap } from './index';
import renderReactPage from './utils/render-react-page';

async function ssr (app, nest) {
    app.use('/render', (req, res) => {
        let loginInfo = { auth: { user: { name: 'haoba' }, logined: true, logining: false }, counter:1 };
        res.end(renderReactPage(req, loginInfo));
    });
}

bootstrap(ssr);
