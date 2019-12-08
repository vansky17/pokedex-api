require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
console.log(process.env.API_TOKEN);
const app = express();

app.use(morgan('dev'));

const validTypes = [`Bug`, `Dark`, `Dragon`, `Electric`, `Fairy`, `Fighting`, `Fire`, `Flying`, `Ghost`, `Grass`, `Ground`, `Ice`, `Normal`, `Poison`, `Psychic`, `Rock`, `Steel`, `Water`];

function handleGetTypes (req, res) {
  res.json(validTypes)
}
function handleGetPokemon(req, res) {
  res.send('Hello Pokemon');
}
app.use(function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN
  const authToken = req.get('authorization')

  if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request' })
  }
  console.log(apiToken);
  console.log('yes: '+authToken);
  // move to the next middleware
  next()
})
app.get('/types', handleGetTypes)
app.get('/pokemon', handleGetPokemon)

const PORT= 8000;

app.listen(PORT, () => {
  console.log('Server is listening on port 8000');
})