const express = require("express");
const ObjectId = require("mongodb").ObjectId;

const createRouter = function (collection) {
  const router = express.Router();
  router.get("/", (req, res) => {
    collection
      .find()
      .toArray()
      .then((docs) => {
        res.json(docs);
      })
      .catch((err) => {
        console.log(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });
  router.get("/:id", (req, res) => {
    collection
      .findOne({ _id: ObjectId(req.params.id) })
      .then((doc) => {
        res.json(doc);
      })
      .catch((err) => {
        console.log(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  router.post("/", (req, res) => {
    const newData = req.body;
    console.log(newData);
    newData.playingTime = Number(newData.playingTime);
    newData.players.min = Number(newData.players.min);
    newData.players.max = Number(newData.players.max);

    collection
      .insertOne(newData)
      .then((doc) => {
        //console.log(doc);
        res.json(doc.ops[0]);
      })
      .catch((err) => {
        console.log(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  router.delete("/:id", (req, res) => {
    collection
      .deleteOne({ _id: ObjectId(req.params.id) })
      .then((doc) => {
        res.json(doc);
      })
      .catch((err) => {
        console.log(err);
        res.status(500);
        res.json({ status: 500, error: err });
      });
  });

  return router;
};

module.exports = createRouter;
