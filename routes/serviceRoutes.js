const express = require('express');
const Service = require('../models/Service');
const Machine = require('../models/Machine');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/getAllMachineServicesSum/:id', async (req, res) => {
    let { id } = req.params;

    try {
        let totalServices = await Service.countDocuments({ machine: id });
        res.json({ totalServices });
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el número de servicios', details: error.message });
    }
});

router.get('/getAllServices', async (req, res) => {
    try {
        let services = await Service.find();
        res.json(services);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los servicios', details: error.message });
    }
});

router.post('/createService', async (req, res) => {
    let { type, date, service, price, cardId, machineId } = req.body;

    try {
        let machine = await Machine.findOne({ _id: new mongoose.Types.ObjectId(machineId) })
        if (!machine) {
            return res.status(404).json({ error: 'Máquina no encontrada' });
        }

        let newService = new Service({
            type,
            date,
            service,
            price,
            cardId,
            machine: machine._id,
        });

        await newService.save();

        res.status(201).json({ message: 'Servicio creado con éxito', service: newService });
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el servicio', details: error.message });
    }
});

router.post('/seedMachines', async (req, res) => {
    try {
        let machines = await Machine.find();

        if (machines.length === 0) {
            return res.status(404).json({ error: 'No hay máquinas disponibles para seedear servicios' });
        }

        let getRandomService = (machineId) => {
            let type = 'Combinado';
            let randomDate = new Date(new Date() - Math.floor(Math.random() * 365) * 24 * 60 * 60 * 1000);
            let randomPrice = (Math.random() * 100).toFixed(2);
            let randomCardId = Math.random().toString(36).substring(2, 10).toUpperCase();
            let randomService = {
                alcohol: ['Whisky', 'Licor', 'Ron'][Math.floor(Math.random() * 3)],
                bib: `BIB${Math.floor(Math.random() * 10 + 1)}`,
            };

            return {
                type: type,
                date: randomDate,
                service: randomService,
                price: randomPrice,
                cardId: randomCardId,
                machine: machineId,
            };
        };

        for (const machine of machines) {
            let services = [];
            for (let i = 0; i < 20; i++) {
                services.push(new Service(getRandomService(machine._id)));
            }
            await Service.insertMany(services);
        }

        res.status(201).json({ message: 'Servicios creados con éxito para todas las máquinas' });
    } catch (error) {
        console.error('Error al seedear máquinas:', error);
        res.status(500).json({ error: 'Error al seedear servicios', details: error.message });
    }
});

module.exports = router;
