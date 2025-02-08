const {
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
} = require("firebase/firestore");
const { checkDb, todoCollection } = require("../config/db");

const addTodo = async (req, res) => {
  const isExits = await checkDb("todos");
  if (!isExits) {
    res.status(400).send({
      message: `Something Went Wrong with Database`,
    });
  }
  try {
    const { title, description } = req.body;
    const data = {
      titile: title,
      description: description,
      status: 0,
    };
    const existingTodos = await getDocs(todoCollection);

    const isTitleUnique = existingTodos.docs.every(
      (doc) => doc.data().title !== title
    );

    if (!isTitleUnique) {
      return res.status(400).send({
        message: `Todo with title "${title}" already exists`,
      });
    }

    const newTodo = await addDoc(todoCollection, data);

    res.status(201).send(`Todo created with ID: ${newTodo.id}`);
  } catch (error) {
    res.status(400).send(`Error creating todo: ${error.message}`);
  }
};

module.exports = {
  addTodo,
};
