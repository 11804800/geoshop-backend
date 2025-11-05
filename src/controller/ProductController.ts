import { Request, Response } from "express";
import Products from "../model/Products";


interface ProductInterfce {
    _id: string,
    title: string,
    description: string,
    price: number,
    discountPrice: number,
    quantity: number,
    inStock: boolean,
    category: string,
    brand: string,
    images: string[]
}


export const GetProducts = async (req: Request, res: Response) => {
    try {
        const data: ProductInterfce[] = await Products.find({});
        res.status(200).json({ "products": data });
    }
    catch (err: any) {
        res.status(500).json({ "error": err })
    }
}



export const PostProduct = async (req: Request, res: Response) => {
    try {
        const data = await Products.create({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            brand: req.body.brand,
            discountPrice: req.body?.discountPrice,
            quantity: req.body?.quantity,
            inStock: req.body?.inStock,
            category: req.body?.category,
            images: req.body.images
        });
        res.status(200).json({ "product": data });
    }
    catch (err: any) {
        res.status(500).json({ "error": err })
    }
}