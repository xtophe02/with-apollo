const express = require('express')
const next = require('next')

const { ApolloServer, gql } = require('apollo-server-express');
const port = parseInt(process.env.PORT, 10) || 4000
const dev = process.env.NODE_ENV !== 'production'
const appNext = next({ dev })
const handle = appNext.getRequestHandler()


// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    hello: (parent,args,ctx) => {
      ctx.res.cookie('token2', {email:'teste', id: 'teste'},{ httpOnly:true})
      return 'Hello world!'
    },
  },
};

const context = ({req,res}) =>{
  res.cookie('token', {email:'teste', id: 'teste'},{ httpOnly:true})
  return {req,res}
}

const server = new ApolloServer({ typeDefs, resolvers, context });

appNext.prepare().then(() => {
  const app = express()
  server.applyMiddleware({ app });
  
//   server.get('/a', (req, res) => {
//     return appNext.render(req, res, '/a', req.query)
//   })

//   server.get('/b', (req, res) => {
//     return appNext.render(req, res, '/b', req.query)
//   })

//   server.get('/posts/:id', (req, res) => {
//     return appNext.render(req, res, '/posts', { id: req.params.id })
//   })

  app.all('*', (req, res) => {
    return handle(req, res)
  })

  app.listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })

})






 

 








