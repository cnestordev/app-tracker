const Joi = require("joi");

// Registration validation
const registerSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(15).required().messages({
    "string.alphanum": "Username must only contain letters and numbers",
    "string.min": "Username must be at least {#limit} characters long",
    "string.max": "Username must be at most {#limit} characters long",
    "any.required": "Username is required",
  }),
  password: Joi.string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .messages({
      "string.pattern.base":
        "Password must be between 3 and 30 characters and contain only letters and numbers",
      "any.required": "Password is required",
    }),
  theme: Joi.object(),
});

// Login validation
const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

module.exports = {
  registerSchema,
  loginSchema,
};
