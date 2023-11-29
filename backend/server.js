const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./models");
const mongoose = require("mongoose");

// CORS Configuration
let corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

// middleware Configuration
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// connecting to MongoDB
mongoose.set('strictQuery', true); // หรือ false
main().catch((err)=>{console.log(err)})
async function main(){
  await mongoose.connect(db.url)
}
// routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// import Routes
require("./routes/routes")(app);

// listening Port
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});