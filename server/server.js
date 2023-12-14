const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

app.use(express.json()) // allows us to use content tpe of json data format
app.use(cors()); // used to stop any cross-origin-errors

const connectionString = "mongodb+srv://root:root@bookstore.zga0rte.mongodb.net/todo-collection?retryWrites=true&w=majority"

mongoose.connect(connectionString)
.then(() => console.log('Connected to Database'))
.catch((err) => console.log('Error connecting to database: ', err))


const Todo = require("./models/Todo");

app.get('/todos', async (req, res) => {
	const todos = await Todo.find();

	res.json(todos);
});

app.post('/todo/new', (req, res) => {
	const todo = new Todo({
		text: req.body.text
	})

	todo.save();

	res.json(todo);
});

app.delete('/todo/delete/:id', async (req, res) => {
	const result = await Todo.findByIdAndDelete(req.params.id);

	res.json({result});
});


app.put('/todo/complete/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.complete = !todo.complete;
	await todo.save();
	res.json(todo);


})

app.put('/todo/update/:id', async (req, res) => {
	const todo = await Todo.findById(req.params.id);

	todo.text = req.body.text;
	todo.complete = false;
	await todo.save();

	res.json(todo);
});


