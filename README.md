
# GlobalShopper

GlobalShopper is an innovative e-commerce platform that showcases products from around the world. The platform offers country-specific pricing, allowing users to browse and purchase items with prices tailored to their location.

## Features:
- Explore a diverse range of international products
- View prices based on the user's country
- Discover related products for personalized shopping experiences
- Seamless currency conversion and localization

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

