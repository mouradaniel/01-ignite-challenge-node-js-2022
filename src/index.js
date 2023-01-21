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
  // Complete aqui
});

app.get('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.post('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
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