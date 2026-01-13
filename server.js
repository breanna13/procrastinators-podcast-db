const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const { schema, root } = require('./graphql');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📊 GraphQL endpoint: http://localhost:${PORT}/graphql`);
  console.log(`🔍 GraphiQL interface: http://localhost:${PORT}/graphql`);
});
