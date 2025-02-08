const express = require("express");
const todoRoutes = require("./routes/todoRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
const PORT = process.env.PORT || 4005;

app.use(express.json());
app.use("/api", todoRoutes);

// Create a new todo
//  https://ebtu.onrender.com

// Get all todos
app.get("/api", async (req, res) => {
  try {
    const querySnapshot = await getDocs(todoCollection);
    const todos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).json(todos);
  } catch (error) {
    res.status(400).send(`Error fetching todos: ${error.message}`);
  }
});

// Get a single todo by ID
app.get("/todos/:id", async (req, res) => {
  try {
    const todoDoc = await getDoc(doc(todoCollection, req.params.id));
    if (todoDoc.exists()) {
      res.status(200).json({ id: todoDoc.id, ...todoDoc.data() });
    } else {
      res.status(404).send("Todo not found");
    }
  } catch (error) {
    res.status(400).send(`Error fetching todo: ${error.message}`);
  }
});

// Update a todo by ID
app.put("/todos/:id", async (req, res) => {
  try {
    const todoDoc = doc(todoCollection, req.params.id);
    await updateDoc(todoDoc, req.body);
    res.status(200).send("Todo updated successfully");
  } catch (error) {
    res.status(400).send(`Error updating todo: ${error.message}`);
  }
});

// Delete a todo by ID
app.delete("/todos/:id", async (req, res) => {
  try {
    const todoDoc = doc(todoCollection, req.params.id);
    await deleteDoc(todoDoc);
    res.status(200).send("Todo deleted successfully");
  } catch (error) {
    res.status(400).send(`Error deleting todo: ${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
