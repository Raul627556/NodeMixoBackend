const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(400).send('Error al obtener usuarios');
  }
});

// Crear un nuevo usuario
router.post('/', async (req, res) => {
  const { name, email } = req.body;

  const newUser = new User({
    name,
    email,
  });

  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).send('Error al crear usuario');
  }
});

module.exports = router;
