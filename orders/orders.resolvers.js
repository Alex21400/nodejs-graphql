const { getAllOrders, addNewOrder, getOrderById } = require("./orders.model");

const ordersResolver = {
    Query: {
        orders: () => getAllOrders(),
        orderById: (_, args) => {
            return getOrderById(args.id);
        } 
    },
    Mutation: {
        addNewOrder: (_, args) => {
            return addNewOrder(args.input);
        }
    }
}

module.exports = ordersResolver