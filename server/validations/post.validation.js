const Joi = require("Joi");

const createPostValidate = (body) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
  });
  return schema.validate(body);
};

module.exports = { createPostValidate };
