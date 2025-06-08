const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/todos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(console.error);

// Todo Schema
const Todo = mongoose.model('Todo', {
  task: String,
  completed: Boolean,
});

// GET todos
app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// POST todo
app.post('/api/todos', async (req, res) => {
  const todo = new Todo({
    task: req.body.task,
    completed: false,
  });

  todo.save().then(todo => res.json(todo));
});

// PUT todo
app.put('/api/todos/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  todo.completed = !todo.completed;
  todo.save().then(todo => res.json(todo));
});

// DELETE todo
app.delete('/api/todos/:id', async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);
  res.json({result});
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));