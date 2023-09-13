const PORT = process.env.PORT ?? 8000 //this uses a port variable if it exists (e.g. if deployed on a service), otherwise port 8000
const express = require('express')
const { v4: uuidv4} = require('uuid')  //from documentation used for giving unique id.
const cors = require('cors')
const app = express()
const pool = require('./db')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())   //to give our app the ability to post json

//Express test to check routing is working
app.get('/', (req, res) => {
    res.send("hello!")
})

// get all todos
app.get('/todos/:userEmail', async (req, res) => {

    const { userEmail } = req.params  //uses destructuring to grab the email from the url
    //console.log(userEmail)

    try {
        //const todos = await pool.query('SELECT * FROM todos') //this returns all todos
        const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail])
        res.json(todos.rows)

    } catch (err) {
        console.error(err)
        
    }
})

//create a new todo
app.post('/todos', async (req, res) => {
    const { user_email, title, progress, date} = req.body
    const id = uuidv4()
    //const user_email = "Ann@test.com"
    //console.log(req.body)
    try {
        const newToDo = await pool.query('INSERT INTO todos(id, user_email, title, progress, date) VALUES($1, $2, $3, $4, $5)',
        [id, user_email, title, progress, date])

        //console.log(newToDo)

        res.json(newToDo)
        
    } catch (err) {
        console.error(err)
        
    }
})



//edit a todo
app.put('/todos/:id', async (req, res) => {
    const { id } = req.params
    const { user_email, title, progress, date} = req.body
    try {
        const editToDo = await pool.query('UPDATE todos SET user_email = $1, title = $2, progress = $3, date =$4 WHERE id = $5;',
        [user_email, title, progress, date, id])

        res.json(editToDo)
        
    } catch (err) {
        console.error(err)
        
    }
})


//delete a todo
app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params   //destructuring used to access param as req.params is an object.
    try {
        const deleteToDo = await pool.query('DELETE FROM todos WHERE id = $1', [id])
        res.json(deleteToDo)
    } catch (err) {
        console.error(err)
        
    }
})


//sign up

app.post('/signup', async (req, res) => {
    const { email, password } = req.body
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(password, salt)
        
    try {

        const signUp = await pool.query(`INSERT INTO users (email, hashed_password) VALUES($1, $2)`, [email, hashedPassword])

        const token = jwt.sign({ email }, 'secret' , {expiresIn: '1hr'})

        res.json({email, token})
        
      
    } catch (err) {
        console.error(err)
        if(err){
            res.json({detail: err.detail})
        }
        
    }
})

//login

app.post('/login', async (req, res) => {
    const { email, password} = req.body


    
    try {

       
        
    } catch (err) {
        console.error(err)
        
    }
})

app.listen(PORT, ( )=> console.log(`Server running on PORT ${PORT}`))