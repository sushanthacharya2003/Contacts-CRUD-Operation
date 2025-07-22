const express = require("express");
const router = express.Router();
const Contact = require("../models/contact");

// Create a new contact
router.post("/", async (req, res) => {
  const newContact = new Contact(req.body);
  const saved = await newContact.save();
  res.json(saved);
});

router.get("/", async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

router.put("/:id", async (req, res) => {
  const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

router.delete("/:id", async (req, res) => {
  await Contact.findByIdAndDelete(req.params.id);
  res.json({ message: "Contact deleted" });
});

module.exports = router;
