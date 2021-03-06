const Joi = require("joi");
// joi .message("for custom message")
const signupValidation = (body) => {
    const schema = Joi.object({
        name:Joi.string().required().min(3),
        email: Joi.string().required().email(),
        password: Joi.string().required().pattern(/^[a-zA-Z0-9]{3,30}$/),
    })
    return schema.validate(body);
}

const signinValidation = (body) => {
    const schema = Joi.object({
        email:Joi.string().required().email(),
        password: Joi.string().required().pattern(/^[a-zA-Z0-9]{3,30}$/)
    })
    return schema.validate(body);
}

module.exports = {signupValidation, signinValidation};
