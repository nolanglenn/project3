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
  geocodeLat:Float!,
  geocodeLng:Float!,
  jobType: String!
  compensation: Float!
  date: String!
  creator: User!
  
}

type User {
  _id: ID!

  name: String!
  title:String
  imageURL:String
  broker:String
  email: String!
  password: String
  comments:[String]
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
  geocodeLat:Float!,
  geocodeLng:Float!,
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
  userProfile(userId:ID):User
    selectedJob(jobId:ID): Job
    userJobs(userId:ID): [Job]
    jobs: [Job!]!
    bookings: [Booking!]!
    login(email: String!, password: String!): AuthData!
}

type RootMutation {
    createJob(jobInput: JobInput): Job
    createUser(userInput: UserInput): User
    bookJob(jobId: ID!): Booking!
    cancelBooking(bookingId: ID!): Job!
    updateUser(userInfo:String):User
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
