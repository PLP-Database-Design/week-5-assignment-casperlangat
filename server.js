const express = require('express')
const app = express()
const mysql = require('mysql2')
const dotenv = require('dotenv')

//configure environmet variable
dotenv.config();

//create a connection object
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
})

// cors and ejs


//test the connection 
db.connect((err) => {
  //if connection is not sucessful
  if (err) {
    return console.log("Error connecting to the database")
  }

  //connection is successful
  console.log("Successfully connected to MySQL: ", db.threadId)
})

//GET METHOD CODE GOES HERE
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');


// Question 1 goes here
// Retrieve all patients
app.get('/patients', (req, res) => {
  const getPatients = "SELECT patient_id, first_name, last_name, date_of_birth FROM patients"
  db.query(getPatients, (err, data) => {
    //if have an error
    if (err) {
      return res.status(400).send("Failed to get patients", err)
    }

    res.status(200).render('data', { data })

  })
})

// Question 2 goes here
// Retrieve all providers
app.get('/providers', (req, res) => {
  const getProviders = "SELECT first_name, last_name, provider_specialty FROM providers"
  db.query(getProviders, (err, data) => {
    if (err) {
      return res.status(400).send("Failed to get Providers", err)
    }

    res.status(200).render('data', { data })

  })

})


// Question 3 goes here
//Filter patients by First Name
app.get('/patients/filter', (req, res) => {
  const getPatients = "SELECT first_name FROM patients"
  db.query(getPatients, (err, data) => {
    if (err) {
      return res.status(400).send("Failed to get Patients First Name", err)
    }

    res.status(200).render('data', { data })

  })
})


// Question 4 goes here
// Retrieve all providers by their specialty
app.get('/providers/specialty', (req, res) => {
  const getProviders = "SELECT provider_specialty FROM providers"
  db.query(getProviders, (err, data) => {
    if (err) {
      return res.status(400).send("Failed to get Providers Specialty", err)
    }

    res.status(200).render('data', { data })

  })

})



// listen to the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
})