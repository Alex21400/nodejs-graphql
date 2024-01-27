const express = require('express');
const { expressMiddleware } = require('@apollo/server/express4');
const http = require('http');
const { ApolloServer } = require('@apollo/server');
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer');
const cors = require('cors');

const { makeExecutableSchema } = require('@graphql-tools/schema');
const { loadFilesSync } = require('@graphql-tools/load-files');

async function startApolloServer() {
    const typesArray = loadFilesSync('**/*', {
        extensions: ['graphql']
    });
    const resolversArray = loadFilesSync('**/*', {
        extensions: ['resolvers.js']
    });
    
    const schema = makeExecutableSchema({
        typeDefs: typesArray,
        resolvers: resolversArray,
    });

    const app = express();
    const httpServer = http.createServer(app);
    
    const server = new ApolloServer({ 
        schema,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
    });

    await server.start();
    
    app.use(
        '/graphql',
        cors(),
        express.json(),
        expressMiddleware(server, {
          context: async ({ req }) => ({ token: req.headers.token }),
        }),
    );
      
    await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000/graphql`);
}

startApolloServer();
