const Joi = require('@hapi/joi');


const schema = Joi.object().keys({
    login: Joi.string().required(),  
    password: Joi.string().alphanum().required(), 
    age: Joi.number().integer().min(4).max(130).required(),
    isDeleted: Joi.boolean()
});

//error mapping
function errorResponse (schemaErrors) {
    const errors = schemaErrors.map((error) => {
        let { path, message } = error;
        return { path, message };
    });
    return {
        status: 'failed',
        errors
    };
}

//create validation middleware
function validateSchema () {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {
            abortEarly: false,
            allowUnknown: false
        });

        if (error && error.isJoi) {
            res.status(400).json(errorResponse(error.details));
        } else {
            next();
        }
    }
}

module.exports = validateSchema;
