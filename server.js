const express = require("express");
const cors = require("cors");
const BodyParser = require('body-parser');

const app = express();

app.use(BodyParser.json());

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./src/models");

db.mongoose
  .connect(db.url, {
    dbName: 'Hotel4U',
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

require("./src/routes/approutes")(app);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});