const { GraphQLError } = require("graphql");

const orders = [
    {
        id: 'b23hfdg',
        date: '2018-06-06',
        subtotal: 156.98,
        items: [
            {
                product: {
                    id: '51gsab8',
                    description: 'Leather Jacket',
                    price: 89.99
                },
                quantity: 1
            }
        ]
    },
    {
         date: "25-02-2024",
        id: "bfgbn21",
        subtotal: 205,
        items: [
          {
            product: {
              description: "Blue jeans",
              id: "b231cad",
              price: 29.99
            },
            quantity: 2
          }
        ]
      }
];

function getAllOrders() {
    return orders;
}

function getOrderById(id) {
    const order = orders.find(order => order.id === id);

    if(!order) {
        throw new GraphQLError(`Order with id: ${id} not found`, {
            extensions: { code: "BAD_REQUEST" }
        });
    }

    return order;
}

function addNewOrder(input) {
    const newOrder = {
        id: input.id,
        date: input.date,
        subtotal: input.subtotal,
        items: input.items
    }

    orders.push(newOrder);
    return newOrder;
}

module.exports = {
    getAllOrders,
    addNewOrder,
    getOrderById
}