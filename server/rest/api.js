import express from 'express'
import initializeDatabase from '../db-conn'
const app = express()

// We need this one if we send data inside the body as JSON
app.use(express.json())


async function init() {
  // Call the init function that returns the Database
  const db = await initializeDatabase()

  // Let's extract all the Database tables we need to perform queries inside the endpoints
  //const { News, Employee, Product, Area, Develop } = db._tables

  // APIs to make query on the DBs
  // ...
  //
}

init()

export default app
