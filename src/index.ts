import bodyParser from 'body-parser';
import { configDotenv } from 'dotenv';
configDotenv();

import express, { Request, Response } from 'express'
import path from 'path';
import ProductRouter from './route/ProductRouter';
import mongoose from 'mongoose';

const MongoDB_url = process.env.MONGODB_URL;

if (!MongoDB_url) {
    throw new Error("Environment Variable Mongodb url is not defined");
}

mongoose.connect(MongoDB_url).then((db: any) => {
    console.log("connected");
}).catch((err: any) => {
    console.log(err);
});

const app: any = express();

const PORT: string | number = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(bodyParser.json());

app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
        "health": "ok"
    })
});

app.use('/api/products', ProductRouter);

app.listen(PORT, () => {
    console.log("App is running at ", PORT);
});