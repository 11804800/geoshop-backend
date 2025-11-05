import express, { NextFunction, Request, Response } from "express"
import { GetProducts, PostProduct } from "../controller/ProductController";
import z from "zod"

const ProductRouter = express.Router();


const productSchema = z.object({
    title: z.string(),
    description: z.string(),
    price: z.number(),
    brand: z.string(),
    discountPrice: z.number(),
    quantity: z.number().int().optional(),
    inStock: z.boolean().optional(),
    category: z.string(),
    images: z.array(z.string()),
});

function ValidateReqBody(Schema: any) {
    return (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log(req.body);
            req.body = Schema.parse(req.body);
            next();
        } catch (err) {
            if (err instanceof z.ZodError) {
                return res.status(400).json({
                    message: 'Invalid request body',
                    errors: err.message,
                });
            }
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}

ProductRouter.get("/", GetProducts);
ProductRouter.post("/", ValidateReqBody(productSchema), PostProduct);

export default ProductRouter;