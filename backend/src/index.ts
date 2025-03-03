import express, { Express } from "express"
import { PORT } from "./config/server.config";
import apiRouter from "./routes";
import cors from 'cors';
import path from "path";

const app: Express = express();

app.use(cors());

app.use('/api', apiRouter);

console.log(path.join(__dirname, '../output'));


app.use('/output', express.static(path.join(__dirname, '../output')));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});