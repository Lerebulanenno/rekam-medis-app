const router = require('express').Router();
let Patient = require('../models/Patient');

router.route('/').get((req, res) => {
    Patient.find()
        .then(patients => res.json(patients))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const newPatient = new Patient(req.body);
    newPatient.save()
        .then(() => res.json('Pasien berhasil ditambahkan!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Patient.findById(req.params.id)
        .then(patient => res.json(patient))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/visit/:id').post((req, res) => {
    Patient.findById(req.params.id)
        .then(patient => {
            patient.visits.push(req.body);
            patient.save()
                .then(() => res.json('Kunjungan berhasil ditambahkan!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Patient.findByIdAndDelete(req.params.id)
        .then(() => res.json('Pasien berhasil dihapus.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

// Tambahkan rute PUT di sini untuk memperbarui data
router.route('/:id').put((req, res) => {
    Patient.findById(req.params.id)
        .then(patient => {
            patient.name = req.body.name;
            patient.dob = req.body.dob;
            patient.gender = req.body.gender;

            patient.save()
                .then(() => res.json('Pasien berhasil diubah!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;