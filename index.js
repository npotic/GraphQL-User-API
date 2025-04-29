const { ApolloServer, gql } = require('apollo-server');

let users = [];
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    addUser(name: String!, email: String!): User!
  }
`;

const resolvers = {
    Query: {
        users: () => users,
    },
    Mutation: {
        addUser: (_, { name, email }) => {
            if (!email.includes('@')) {
                throw new Error('Email nije validan.');
            }

            const newUser = {
                id: users.length + 1, 
                name,
                email,
            };

            users.push(newUser);

            return newUser;
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen().then(({ url }) => {
    console.log(`Server je pokrenut na: ${url}`);
});