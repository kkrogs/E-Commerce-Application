// requiring things used in this file
const express = require('express');
const routes = require('./routes');
const sequelize = require('./config/connection');

// creating the exrpess and port variables
const app = express();
const PORT = process.env.PORT || 3001;

// using middlewear
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// syncing the data using sequilize and conecting to the port
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening on port ${PORT}`));
});


// fix category  and tag put
// fix include issue
