const express = require("express");
const Contact = require("../models/Contact");
const router = express.Router();

// POST contact
router.post("/", async (req, res) => {
  const contact = await Contact.create(req.body);
  res.status(201).json(contact);
});

// GET contacts
router.get("/", async (req, res) => {
  const contacts = await Contact.find().sort({ _id: -1 });
  res.json(contacts);
});
// DELETE contact
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ message: "Contact deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
