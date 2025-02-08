const Joi = require("joi");

const todoSchema = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().max(1000).optional(),
  status: Joi.string().valid("pending", "in-progress", "completed").default(0),
  dueDate: Joi.date().greater("now").optional(),
});

const validateTodo = (req, res, next) => {
  const { error } = todoSchema.validate(req.body, { abortEarly: false });
  if (error) {
    return res
      .status(400)
      .json({ errors: error.details.map((e) => e.message) });
  }
  next();
};

module.exports = validateTodo;
