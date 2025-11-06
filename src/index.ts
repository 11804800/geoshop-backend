import Stripe from "stripe";
import bodyParser from 'body-parser';
import { configDotenv } from 'dotenv';
configDotenv();
import cors from "cors";
import express, { Request, Response } from 'express'
import path from 'path';
import ProductRouter from './route/ProductRouter';
import mongoose from 'mongoose';

const MongoDB_url = process.env.MONGODB_URL;

const allowedOrigins = [
    "http://localhost:3001",
    "https://geoshop-frontend.vercel.app"
];

const corsWithOptions = {
    origin: function (origin: any, callback: any) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionsSuccessStatus: 200
};

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

app.use(cors(corsWithOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.json());

app.get("/health", (req: Request, res: Response) => {
    res.status(200).json({
        "health": "ok"
    })
});

const stripe_key: any = process.env.STRIPE_SECRET_KEY;
const stripe = new Stripe(stripe_key);

app.post("/api/create-checkout-session", async (req: Request, res: Response) => {
    try {
        const product = await stripe.products.create({
            name: req.body.name
        });
        const currency = req.body.currency == "usa" ? "USD" : req.body.currency == "uk" ? "GBP" : "INR";
        let amountInPaise = req.body.price;
        if (currency == "USD") {
            amountInPaise = (amountInPaise / 88.73) * 100;
        }
        else if (currency == "GBP") {
            amountInPaise = (amountInPaise / 115.78) * 100;
        }
        else {
            amountInPaise = amountInPaise * 100;
        }
        const price = await stripe.prices.create({
            product: product.id,
            unit_amount: Math.round(amountInPaise),
            currency: currency
        });

        const session: any = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price: price.id,
                    quantity: 1,
                }
            ],
            mode: 'payment',
            success_url: `https://geoshop-frontend.vercel.app/status`,
            cancel_url: `https://geoshop-frontend.vercel.app/status/cancelled`,
            billing_address_collection: "required",
            shipping_address_collection: {
                allowed_countries: ["IN", "US", "GB"]
            }
        });
        res.redirect(303, session.url);
    }
    catch (err: any) {
        res.status(500).json({ err: err.message });
    }
})

app.use('/api/products', ProductRouter);

app.listen(PORT, () => {
    console.log("App is running at ", PORT);
});