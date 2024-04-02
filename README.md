# eCommerce Website Backend

This is the backend part of an eCommerce website project developed using Node.js. It provides the server-side functionality to support the eCommerce website.

## Features

- User authentication and authorization
- Product management (CRUD operations)
- Order management
- Cart management

## Technologies Used

- Node.js: JavaScript runtime for server-side development
- Express.js: Web application framework for Node.js
- MongoDB: NoSQL database for storing product, user, order, and cart data
- Mongoose: MongoDB object modeling tool for Node.js
- JSON Web Tokens (JWT): For user authentication and authorization

## Getting Started

To get started with the project, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/tejasdavra05/Ecommerce_Backend.git
   cd Ecommerce_Backend

   Install dependencies:
   npm install
Set up environment variables:

Create a .env file in the root directory and add the following environment variables:
PORT=8000
MONGODB_URI=mongodb://localhost:27017/ecom
JWT_SECRET=your_jwt_secret_key
Replace your_jwt_secret_key with your own secret keys.

Start the server:

bash
Copy code
npm start

Make sure to replace placeholders like `your-username` with your actual GitHub username a
