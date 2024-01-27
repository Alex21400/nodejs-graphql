const { getAllProducts, getProductsByPrice, getProductById, addNewProduct, addNewReview } = require("./products.model");

const productsResolver = {
    Query: {
        products: () => getAllProducts(),
        productsByPrice: (_, args) => {
            return getProductsByPrice(args.min, args.max);
        },
        productById: (_, args) => {
            return getProductById(args.id);
        }
    },
    Mutation: {
        addNewProduct: (_, args) => {
            return addNewProduct(args.id, args.description, args.price);
        },
        addNewReview: (_, args) => {
            return addNewReview(args.id, args.rating, args.comment);
        }
    }
}

module.exports = productsResolver