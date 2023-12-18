
const cors = require('cors')

const express = require('express')
const swagger = require('./swagger')
const todo = require('./todo')

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello, world!')
})

app.get('/todos', todo.getAll)
app.post('/todos', todo.create)
app.get('/todos/:id', todo.getById)
app.put('/todos/:id', todo.update)
app.delete('/todos/:id', todo.delete)

swagger(app)

app.listen(5000, () => {
    console.log('Server started on port 3000')
})