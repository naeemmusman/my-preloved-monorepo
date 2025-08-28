import dotenv from 'dotenv';
import { Server } from './server';
import { AppRoutes } from './routes';

// const app = express();

// app.use('/assets', express.static(path.join(__dirname, 'assets')));

// app.get('/api', (req, res) => {
//   res.send({ message: 'Welcome to api!' });
// });

// const port = process.env.PORT || 3333;
// const server = app.listen(port, () => {
//   console.log(`Listening at http://localhost:${port}/api`);
// });
// server.on('error', console.error);



(() => {
    dotenv.config();
    main();
})();

function main(): void {
    const { API_PORT = 3000, API_PREFIX, API_VERSION, DB_URI } = process.env;
    const server = new Server({
        port: Number(API_PORT),
        routes: AppRoutes.routes,
        apiPrefix: API_PREFIX || '/api',
        apiVersion: API_VERSION || 'v1',
        dbUri: DB_URI || 'mongodb://localhost:27017/mydb',
    });

    void server.start();
};
