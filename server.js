const express = require("express");
const todoRoutes = require("./routes/todoRoutes");
require("dotenv").config();
const PORT = process.env.PORT;

const cors = require("cors");

const app = express();

app.use(cors()); 
app.use(express.json());

app.use("/api", todoRoutes);

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
