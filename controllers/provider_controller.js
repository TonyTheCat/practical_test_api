const mongoose = require("mongoose");

const Provider = mongoose.model("Provider");
const Client = mongoose.model("Client");

const create_provider = async (req, res) => {
  try {
    const { name } = req.body;
    const exists = await Provider.findOne({ name });
    if (exists) {
      return res.status(208).send({
        response: "Error",
        message: "Unique name required",
      });
    }
    const provider = new Provider({
      name,
    });
    await provider.save();
    return res.status(200).send(provider);
  } catch (err) {
    return res.status(500).send({ response: "Error", message: err.message });
  }
};

const delete_provider = async (req, res) => {
  try {
    const { _id } = req.query;
    await Client.updateMany({ providers: _id }, { $pull: { providers: _id } });
    await Provider.deleteOne({ _id });
    return res
      .status(200)
      .send({ response: "The provider was successfully deleted" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).send({ response: "Error", message: err.message });
  }
};

const update_provider = async (req, res) => {
  try {
    const { _id } = req.query;
    const exists = await Provider.findOne({ name: req.body.name });
    if (exists && exists._id !== _id) {
      return res.status(208).send({
        response: "Error",
        message: "Unique name required",
      });
    }
    const result = await Provider.updateOne({ _id }, { $set: req.body });
    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send({ response: "Error", message: err.message });
  }
};

const get_providers = async (req, res) => {
  try {
    const providers = await Provider.find({});
    return res.status(200).send(providers);
  } catch (err) {
    return res.status(500).send({ response: "Error", message: err.message });
  }
};

module.exports = {
  create_provider,
  delete_provider,
  update_provider,
  get_providers,
};
