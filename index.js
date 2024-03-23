const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 8080;

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to My first Subscription model application."
  });
});

const users = require('./routes/user.routes');
app.use('/api/users', users);
const roles = require('./routes/role.routes');
app.use('/api/roles', roles);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
