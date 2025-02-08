const express = require("express");
const todoRoutes = require("./routes/todoRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT;

app.use(express.json());
app.use("/api", todoRoutes);

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
