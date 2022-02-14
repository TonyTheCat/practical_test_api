const mongoose = require("mongoose");

const Provider = mongoose.model("Provider");
const Client = mongoose.model("Client");

const create_client = async (req, res) => {
  try {
    const { name, email, phone, providers } = req.body;
    const exists = await Client.findOne({ $or: [{ email }, { phone }] });
    if (exists) {
      return res.status(208).send({
        response: "Error",
        message: "Unique email and phone required",
      });
    }
    const client = new Client({
      name,
      email,
      phone,
      providers,
    });
    await client.save();
    return res.status(200).send(client);
  } catch (err) {
    return res.status(500).send({ response: "Error", message: err.message });
  }
};

const delete_client = async (req, res) => {
  try {
    const { _id } = req.query;
    const exists = await Client.findOne({ _id });
    if (!exists) {
      return res
        .status(404)
        .send({ response: "Error", message: "Client was not found" });
    }
    await Client.deleteOne({ _id });
    return res
      .status(200)
      .send({ response: "The client was successfully deleted" });
  } catch (err) {
    return res.status(500).send({ response: "Error", message: err.message });
  }
};

const update_client = async (req, res) => {
  try {
    const { _id } = req.query;
    const clients = await Client.find({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    });
    if (
      (clients.length === 1 && clients[0]._id.toString() !== _id.toString()) ||
      clients.length > 1
    ) {
      return res.status(208).send({
        response: "Error",
        message: "Email or phone is already exist",
      });
    }
    await Client.updateOne({ _id }, { $set: req.body });
    const updated_client = await Client.findOne({ _id });
    return res.status(200).send(updated_client);
  } catch (err) {
    return res.status(500).send({ response: "Error", message: err.message });
  }
};

const get_clients = async (req, res) => {
  try {
    let { page, limit } = req.query;
    page = page || 1;
    limit = limit || 10;
    const clients = await Client.find({})
      .sort({ name: -1 })
      .skip((page - 1) * +limit)
      .limit(+limit);
    const total_num = await Client.find({}).countDocuments();
    for (let i = 0; i < clients.length; i += 1) {
      clients[i].providers = await Provider.find({
        _id: clients[i].providers,
      });
    }
    return res.status(200).send({ clients, total_num });
  } catch (err) {
    return res.status(500).send({ response: "Error", message: err.message });
  }
};

module.exports = {
  create_client,
  delete_client,
  update_client,
  get_clients,
};
