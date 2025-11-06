
# GlobalShopper

GlobalShopper is an innovative e-commerce platform that showcases products from around the world. The platform offers country-specific pricing, allowing users to browse and purchase items with prices tailored to their location.

## Features:
- Explore a diverse range of international products
- View prices based on the user's country
- Discover related products for personalized shopping experiences
- Seamless currency conversion and localization
- Stripe Payment Gateway

## Technologies Used
- Nodejs
- Zod for request body validation
- Typescript
- stripe for payment gateway
- expressjs
- mongodb


## API Endpoints
### 1. GET Health
- **Endpoint:** `GET /health`

- **Response:**

``` json
{
  "health": "ok"
}
```
## Product Schema

A `Product` object typically includes the following fields:

- **id** (string): Unique identifier for the product.
- **title** (string): The name or title of the product.
- **description** (string): A detailed description of the product.
- **price** (number): The current selling price of the product.
- **discountPrice** (number, optional): The discounted price if applicable.
- **quantity** (number): The available quantity of the product.
- **inStock** (boolean): Indicates whether the product is in stock.
- **category** (string): The category to which the product belongs.
- **images** (array of strings): URLs or paths to product images.

### Example Schema

```json
{
  "id": "123",
  "title": "Wireless Headphones",
  "description": "High-quality wireless headphones with noise cancellation.",
  "price": 99.99,
  "discountPrice": 79.99,
  "quantity": 50,
  "inStock": true,
  "category": "Electronics",
  "images": [
    "https://example.com/images/headphones1.jpg",
    "https://example.com/images/headphones2.jpg"
  ]
}

### 2. GET Products
- **Endpoint:** `GET /api/products`

- **Response:**

``` json
  {
    "products":[
      {
    "id": "123",
    "title": "Wireless Headphones",
    "description": "High-quality wireless headphones with noise cancellation.",
    "price": 99.99,
    "discountPrice": 79.99,
    "quantity": 50,
    "inStock": true,
    "category": "Electronics",
    "images": [
      "https://example.com/images/headphones1.jpg",
      "https://example.com/images/headphones2.jpg"
    ]
  },
  {
    "id": "124",
    "title": "Wireless Earhone",
    "description": "High-quality wireless headphones with noise cancellation.",
    "price": 99.99,
    "discountPrice": 79.99,
    "quantity": 50,
    "inStock": true,
    "category": "Electronics",
    "images": [
      "https://example.com/images/earphone.jpg",
      "https://example.com/images/earphone2.jpg"
    ]
  }
  ]
}
```

### 3. POST `/api/create-checkout-session`

Creates a new checkout session for a product.

#### Request Body
```json
{
  "name": "Product Name",
  "price": 100,       // Price in local currency
  "currency": "usa"   // Currency code: "usa", "uk", or other for INR
}



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_URL`
`PORT`
`STRIPE_SECRET_KEY`

## Run Locally

Clone the project

```bash
  https://github.com/11804800/geoshop-backend.git
```

Go to the project directory

```bash
  cd geoshop-backend
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

## Demo

```bash 
 https://geoshop-backend.vercel.app/health 
```
