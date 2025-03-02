import express, { Express } from "express"
import { PORT } from "./config/server.config";
import apiRouter from "./routes";
import cors from 'cors';

const app: Express = express();

app.use(cors());

app.use('/api', apiRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});