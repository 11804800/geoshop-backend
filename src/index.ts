import bodyParser from 'body-parser';
import { configDotenv } from 'dotenv';
configDotenv();

import express, { Request, Response } from 'express'
import path from 'path';


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

app.listen(PORT, () => {
    console.log("App is running at ", PORT);
});