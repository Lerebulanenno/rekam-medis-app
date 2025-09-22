import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [patients, setPatients] = useState([]);
    const [newPatient, setNewPatient] = useState({ name: '', dob: '', gender: '' });

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        try {
            const res = await axios.get('http://localhost:5000/patients');
            setPatients(res.data);
        } catch (err) {
            console.error("Gagal mengambil data pasien:", err);
        }
    };

    const handleInputChange = (e) => {
        setNewPatient({ ...newPatient, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/patients/add', newPatient);
            setNewPatient({ name: '', dob: '', gender: '' });
            fetchPatients();
        } catch (err) {
            console.error("Gagal menambahkan pasien:", err);
        }
    };

    return (
        <div className="container">
            <h1>Rekam Medis Sederhana</h1>

            <div className="form-section">
                <h2>Tambah Pasien Baru</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" name="name" placeholder="Nama Pasien" value={newPatient.name} onChange={handleInputChange} required />
                    <input type="date" name="dob" value={newPatient.dob} onChange={handleInputChange} required />
                    <select name="gender" value={newPatient.gender} onChange={handleInputChange} required>
                        <option value="">Pilih Jenis Kelamin</option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                    </select>
                    <button type="submit">Tambah Pasien</button>
                </form>
            </div>

            <div className="patient-list-section">
                <h2>Daftar Pasien</h2>
                <ul>
                    {patients.map(patient => (
                        <li key={patient._id}>
                            <strong>{patient.name}</strong> - {new Date(patient.dob).toLocaleDateString()} ({patient.gender})
                            <div className="visit-count">
                                Total Kunjungan: {patient.visits.length}
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default App;