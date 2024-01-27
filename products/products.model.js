const { GraphQLError } = require("graphql");

const products = [
    {
        id: 'b135asd',
        description: 'Nike TN',
        price: 89.99,
        reviews: []
    },
    {
        id: 'b112gad',
        description: 'Black hoodie',
        price: 26.99,
        reviews: []
    },
    {
        id: 'b5sa4av',
        description: 'Reebok Classic',
        price: 59.99,
        reviews: []
    },
    {
        description: "Blue jeans",
        id: "b231cad",
        price: 29.99
    }
];

function getAllProducts() {
    return products;
}

function getProductsByPrice(min, max) {
    return products.filter(product => product.price >= min && product.price <= max);
}

function getProductById(id) {
    const product = products.find(product => product.id === id);

    if(!product) {
        throw new GraphQLError(`Product with id: ${id} not found`, {
            extensions: { code: "BAD_REQUEST" }
        });
    }

    return product;
}

function addNewProduct(id, description, price) {
    const newProduct = { 
        id, 
        description, 
        price, 
        reviews: [] 
    };

    products.push(newProduct);

    return newProduct;
}

function addNewReview(id, rating, comment) {
    const newReview = {
        rating,
        comment
    }

    const product = getProductById(id);
    product.reviews.push(newReview);

    return product;
}

module.exports = {
    getAllProducts,
    getProductsByPrice,
    getProductById,
    addNewProduct,
    addNewReview
}