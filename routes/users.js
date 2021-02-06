const express = require('express');
const jwt = require('jsonwebtoken');

const router = express.Router();
const connexion = require('../data/mysql');

router.get('/', (req, res) => {
  res.status(200).send('<h1>Hello World</h1>');
});

router.post('/users', async (req, res) => {
  try {
    // const token = await jwt.sign({ foo: 'bar' }, 'shhhh');
    // const token = await jwt.sign({ foo: 'bar', iat: Math.floor(Date.now() / 1000) - 30 }, 'shhhhh');
    const token = await jwt.sign({
      data: 'foobar',
    }, 'secret', { expiresIn: '120' });
    const { username } = req.body;
    const { email } = req.body;
    const password = token;
    connexion.query('INSERT INTO user (username, email, password) VALUES (?, ?, ?)', [username, email, password], (err, result) => {
      if (err) {
        res.status(400).send('Error de Add user');
      } else {
        res.send({
          status: 200,
          result,
        });
      }
    });
  } catch {
    res.status(500).send();
  }
});

module.exports = router;
