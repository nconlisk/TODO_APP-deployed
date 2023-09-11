const PORT = process.env.PORT ?? 8000 //this uses a port variable if it exists (e.g. if deployed on a service), otherwise port 8000
const express = require('express')
const app = express()
const pool = require('./db')

//Express test to check routing is working
app.get('/', (req, res) => {
    res.send("hello!")
})

// get all todos
app.get('/todos', async (req, res) => {

    const userEmail = "\ntest1@test.com"

    try {
        //const todos = await pool.query('SELECT * FROM todos') //this returns all todos
        const todos = await pool.query('SELECT * FROM todos WHERE user_email = $1', [userEmail])
        res.json(todos.rows)

    } catch (err) {
        console.error(err)
        
    }
})

app.listen(PORT, ( )=> console.log(`Server running on PORT ${PORT}`))