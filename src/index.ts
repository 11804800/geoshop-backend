import { configDotenv } from 'dotenv';
configDotenv();

import express from 'express'

const app: any = express();

const PORT: string | number = process.env.PORT || 3000;

app.get("/", (req: express.Request, res: express.Response) => {
    res.send("hello");
});

app.listen(PORT, () => {
    console.log("App is running at ", PORT);
});