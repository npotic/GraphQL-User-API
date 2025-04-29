const { ApolloServer, gql } = require('apollo-server');

let users = [];

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users(name: String, email: String): [User!]!
  }

  type Mutation {
    addUser(name: String!, email: String!): User!
    deleteUser(id: ID!): User!
  }
`;

const resolvers = {
    Query: {
        users: (_, { name, email }) => {
            let filtered = users;

            if (name) {
                filtered = filtered.filter(user =>
                    user.name.toLowerCase().includes(name.toLowerCase())
                );
            }

            if (email) {
                filtered = filtered.filter(user =>
                    user.email.toLowerCase().includes(email.toLowerCase())
                );
            }

            return filtered;
        },
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

        deleteUser: (_, { id }) => {
            const userIndex = users.findIndex(user => user.id === parseInt(id));

            if (userIndex === -1) {
                throw new Error('Korisnik nije pronađen.');
            }

            const deleted = users[userIndex];
            users.splice(userIndex, 1);
            return deleted;
        },
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

server.listen({ port: 4000 }).then(({ url }) => {
    console.log(`Server je pokrenut na: ${url}`);
});
