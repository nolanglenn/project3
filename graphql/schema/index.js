const { buildSchema } = require('graphql');

module.exports = buildSchema(`
type Booking {
    _id: ID!
    job: Job!
    user: User!
    createdAt: String!
    updatedAt: String!
}

type Job {
  _id: ID!
  title: String!
  notes: String!
  address: String!
  jobType: String!
  compensation: Float!
  date: String!
  creator: User!
}

type User {
  _id: ID!
  name: String!
  email: String!
  password: String
  createdJobs: [Job!]
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Int!
}

input JobInput {
  title: String!
  notes: String!
  address: String!
  jobType: String!
  compensation: Float!
  date: String!
  creator:String!
}

input UserInput {
  name: String!
  email: String!
  password: String!
}

type RootQuery {
    jobs: [Job!]!
    bookings: [Booking!]!
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
    createJob(jobInput: JobInput): Job
    createUser(userInput: UserInput): User
    bookJob(jobId: ID!): Booking!
    cancelBooking(bookingId: ID!): Job!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
