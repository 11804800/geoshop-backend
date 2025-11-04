import { Document, model, Schema } from "mongoose";

interface ProductInterfce extends Document {
    title: string,
    description: string,
    price: number,
    discountPrice: number,
    quantity: number,
    inStock: boolean,
    category: string,
    images: string[]
}

const Products = new Schema<ProductInterfce>({
    title: {
        type: String,
        unique: true,
        minLength: 6,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discountPrice: {
        type: Number
    },
    quantity: {
        type: Number,
        default: 10
    },
    inStock: {
        type: Boolean,
        default: true
    },
    category: {
        type: String,
        required: true
    },
    images: []
}, {
    timestamps: true
});

export default model("products", Products);