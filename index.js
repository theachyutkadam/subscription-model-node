const express = require("express");
const cors = require("cors");

// import swagger ui module and swagger json file
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');

var corsOptions = {origin: "http://localhost:8081"};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const roles = require('./routes/role.routes');
const users = require('./routes/user.routes');
const plans = require('./routes/plan.routes');
const subscriptions = require('./routes/subscription.routes');
const user_informations = require('./routes/user_information.routes');

app.use('/api/users', users);
app.use('/api/roles', roles);
app.use('/api/plans', plans);
app.use('/api/subscriptions', subscriptions);
app.use('/api/user_informations', user_informations);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to My first Subscription model application."
  });
});

// add route for swagger document API
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
