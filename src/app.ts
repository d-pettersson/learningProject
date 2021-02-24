import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as mongoose from 'mongoose';
import Controller from './interfaces/controller.interface';
import errorMiddleware from "./middleware/error.middleware";
import * as cookieParser from 'cookie-parser';

class App {
    public app: express.Application;

    constructor(controllers: Controller[]) {
        this.app = express();

        this.connectToDatabase();
        this.initMiddlewares();
        this.initControllers(controllers);
        this.initErrorHandling();
    }

    public listen() {
        this.app.listen(process.env.PORT, () => {
            console.log(`App listening on the port ${process.env.PORT}`)
        });
    }

    private initMiddlewares() {
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
    }

    private initErrorHandling() {
        this.app.use(errorMiddleware);
    }

    private initControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router)
        })
    }

    private connectToDatabase() {
        const {
            MONGO_USER,
            MONGO_PASSWORD,
            MONGO_PATH,
        } = process.env;
        mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}${MONGO_PATH}`, {useNewUrlParser: true, useUnifiedTopology: true})
            .then((r) => {
                console.log('Connected to the DB!')
            });
    }

}

export default App;