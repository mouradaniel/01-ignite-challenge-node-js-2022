const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { id } = request.params;
  const { username } = request.headers;

  const user = users.find(user => user.username === username)

  if (!user) {
    response.status(400).send({
      error: 'User does not exist'
    })
  }

  if (id) {
    const todos = user.todos;
    if (todos.length) {
      const todo = todos.find(item => item.id === id)
      if (!todo) {
        response.status(404).send({
          error: 'Item does not exist'
        })
      }
    } else {
      response.status(404).send({
        error: 'Item does not exist'
      })
    }
  }

  next()
}

app.post('/users', (request, response) => {
  const { name, username } = request.body;

  const userAlreadyExists = users.find(user => user.username === username)
  if (userAlreadyExists) {
    response.status(400).send({
      error: 'User Already Exists'
    })
  }

  const user = {
    id: uuidv4(),
    name,
    username,
    todos: []
  }

  users.push(user);

  response.json(user);
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  const { username } = request.headers;

  const user = users.find(user => user.username === username)

  return response.json(user.todos)
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  const { title, deadline } = request.body;
  const { username } = request.headers;

  const user = users.find(user => user.username === username)

  const todo = {
    id: uuidv4(),
    title,
    done: false,
    deadline,
    created_at: new Date()
  }

  user.todos.push(todo)

  return response.status(201).json(todo)
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;