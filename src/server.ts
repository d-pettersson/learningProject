import 'dotenv/config';
import App from './app';
import PostControllers from './posts/posts.controller';
import { validateEnv } from './utils/validateEnv'

validateEnv();

const app = new App(
    [
        new PostControllers(),
    ],
);

app.listen();