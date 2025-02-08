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
  try {
    if (!isExits) {
      res.status(400).send({
        message: `Something Went Wrong with Database`,
      });
    }
    const { title, description } = req.body;
    const data = {
      title: title,
      description: description,
      status: 0,
    };
    const existingTodos = await getDocs(todoCollection);
    // check for existance
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

const editTodo = async (req, res) => {
  const isExits = await checkDb("todos");
  try {
    if (!isExits) {
      res.status(400).send({
        message: `Something Went Wrong with Database`,
      });
    }
    const todoDocRef = doc(todoCollection, req.body.id);
    const todoDetails = await getDoc(todoDocRef);
    if (!todoDetails.exists()) {
      res.status(400).send({
        message: `Invalid Todo`,
      });
    }
    const { id, ...updateData } = req.body;
    const updateResponse = await updateDoc(todoDocRef, updateData);
    res.status(200).send({
      message: `Updated Successfully`,
      data: updateData,
    });
  } catch (error) {
    res.status(400).send(`Error creating todo: ${error.message}`);
  }
};

const getTodo = async (req, res) => {
  const isExits = await checkDb("todos");
  try {
    if (!isExits) {
      res.status(400).send({
        message: `Something Went Wrong with Database`,
      });
    }
    const docDetails = await getDoc(doc(todoCollection, req.body.id));
    if (!docDetails.exists()) {
      res.status(400).send({
        message: `Invalid Todo`,
      });
    }
    res.status(200).send({
      message: `Todo fetched successfully`,
      data: docDetails.data(),
    });
  } catch (error) {
    res.status(400).send(`Error creating todo: ${error.message}`);
  }
};

const getAllTodos = async (req, res) => {
  const isExits = await checkDb("todos");
  try {
    if (!isExits) {
      res.status(400).send({
        message: `Something Went Wrong with Database`,
      });
    }

    const allTodo = await getDocs(todoCollection);
    const todos = allTodo.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    res.status(200).send({
      message: `Todo fetched successfully`,
      data: todos,
    });
  } catch (error) {
    res.status(400).send(`Error creating todo: ${error.message}`);
  }
};

module.exports = {
  addTodo,
  editTodo,
  getTodo,
  getAllTodos,
};
