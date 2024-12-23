const express = require('express');
const Machine = require('../models/Machine');
const router = express.Router();

router.get('/getAllMachines', async (req, res) => {
    try {
        let machines = await Machine.find();

        res.json(machines);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener las máquinas', details: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        let machine = await Machine.findOne({ id: req.params.id });
        if (!machine) {
            return res.status(404).json({ error: 'Máquina no encontrada' });
        }
        res.json(machine);  // Devolver la máquina
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la máquina' });
    }
});

router.post('/create', async (req, res) => {
    let { name, localization, status, category, version } = req.body;

    try {
        let newMachine = new Machine({
            name,
            localization,
            status,
            category,
            version
        });

        await newMachine.save();
        res.status(201).json({ message: 'Máquina creada con éxito', machine: newMachine });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la máquina', details: error.message });
    }
});

router.put('/updateMachine/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let updatedData = req.body;

        let updatedMachine = await Machine.findOneAndUpdate({ _id: id }, updatedData, { new: true });
        if (!updatedMachine) {
            return res.status(404).json({ error: 'Máquina no encontrada' });
        }

        res.json(updatedMachine);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la máquina' });
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        let { id } = req.params;
        let deletedMachine = await Machine.findOneAndDelete({ id });

        if (!deletedMachine) {
            return res.status(404).json({ error: 'Máquina no encontrada' });
        }

        res.json({ message: 'Máquina eliminada', machine: deletedMachine });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la máquina' });
    }
});

module.exports = router;
