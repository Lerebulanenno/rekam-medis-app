const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const visitSchema = new Schema({
    date: { type: Date, default: Date.now },
    diagnosis: { type: String, required: true },
    prescription: { type: String, required: true }
});

const patientSchema = new Schema({
    name: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true },
    visits: [visitSchema]
}, {
    timestamps: true,
});

const Patient = mongoose.model('Patients', patientSchema);
module.exports = Patient;