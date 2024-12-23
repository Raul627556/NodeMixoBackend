const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, password } = req.body;

    try {
        let existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Usuario ya existe' });

        let newUser = new User({ email, password });
        await newUser.save();
        res.status(201).json({ message: 'Usuario registrado' });
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor', error });
    }
});

router.post('/login', async (req, res) => {
    let { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

        let isMatch = await user.comparePassword(password);
        if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });

        let token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ message: 'Login exitoso', token });
    } catch (error) {
        res.status(500).json({
            message: 'Error del servidor',
            error: error.stack
        });
    }
});

module.exports = router;
