# GraphQL User Management API

GraphQL API koristi Apollo Server. API podržava registraciju novih korisnika i dohvatanje liste svih registrovanih korisnika. Podaci o korisnicima cuvaju se u memoriji servera (niz u JavaScriptu). Svi podaci se brisu kada se server restartuje.
 
## Tehnologije
- Node.js
- Apollo Server
- GraphQL

## Instalacija
`npm install`
  
`node index.js`


### Mutation: addUser
Registruje novog korisnika.

### Mutation: deleteUser
Brisanje korisnika.

### Query: users
Dohvatanje korisnika.

**Primeri zahteva:**
```graphql
mutation {
  addUser(name: "Nemanja", email: "npotic@email.com") {
    id
    name
    email
  }
}

mutation {
  deleteUser(id: 1) {
    id
    name
    email
  }
}

query {
  users(name: "Nemanja") {
    id
    name
    email
  }
}
