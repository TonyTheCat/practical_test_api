const Validator = require("validatorjs");

const validator = (body, rules, customMessages, callback) => {
  const validation = new Validator(body, rules, customMessages);
  validation.passes(() => callback(null, true));
  validation.fails(() => callback(validation.errors, false));
};

const test = (body, res, next, rule) => {
  validator(body, rule, {}, (err, status) => {
    if (!status) {
      res.status(400).send({
        response: "error",
        data: err.errors,
      });
    } else {
      next();
    }
  });
};

const add_new_client = (req, res, next) => {
  const validation_rule = {
    name: "required|string",
    email: "required|email",
    phone: "size:10",
  };
  test(req.body, res, next, validation_rule);
};

const edit_client = (req, res, next) => {
  const validation_rule = {
    name: "string",
    phone: "size:10",
  };
  test(req.body, res, next, validation_rule);
};

const add_new_provider = (req, res, next) => {
  const validation_rule = {
    name: "required|string",
  };
  test(req.body, res, next, validation_rule);
};

const edit_provider = (req, res, next) => {
  const validation_rule = {
    name: "string",
  };
  test(req.body, res, next, validation_rule);
};

module.exports = {
  add_new_client,
  edit_client,
  add_new_provider,
  edit_provider,
};
