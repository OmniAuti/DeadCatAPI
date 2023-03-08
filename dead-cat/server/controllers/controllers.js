const deadCatData = require("../models/models");

const basicConnection = async (req, res) => {
  try {
    res.status(200).json({ message: "connected" });
  } catch (e) {
    console.log(e);
  }
};

const getData = async (req,res) => {
try {

  const data = await deadCatData.find()

  res.status(200).json(data)
} catch(e) {
  console.log(e)
}
}

const postDeadCatData = async (req,res) => {
  try {
    // console.log(req.body, ' this is body shit')
    const data = await deadCatData.create({
      data: req.body
    });

    await data.save();

    res.status(201).json(data)

  } catch (e) {
    console.log(e)
  }
};

module.exports = { basicConnection,getData, postDeadCatData };
