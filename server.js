const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const usersRouter = require('./routes/users');

const port = 3000 || process.env.PORT;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', usersRouter);

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server has lisned at port ${port}`);
  }
});
