const express = require("express");
const todoRoutes = require("./routes/todoRoutes");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors()); 
app.use(express.json());
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api", todoRoutes);

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
