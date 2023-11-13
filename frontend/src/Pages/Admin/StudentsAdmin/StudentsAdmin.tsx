import { useState } from 'react';
import AdminNavbar from '../../../Components/AdminNavbar/AdminNavbar.tsx';

const data = [
    {
        cod: 1,
        email: 'john.doe@example.com',
        name: 'John Doe',
    },
    {
        cod: 2,
        email: 'jane.smith@example.com',
        name: 'Jane Smith',
    },
    {
        cod: 3,
        email: 'bob.jones@example.com',
        name: 'Bob Jones',
    },
];

const StudentsAdmin = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleCreate = () => {
        alert('Crear nuevo estudiante');
        // Implementa la lógica de creación aquí
    };

    const handleModify = (cod: any) => {
        alert(`Modificar estudiante con código ${cod}`);
        // Implementa la lógica de modificación aquí
    };

    const handleDelete = (cod: any) => {
        alert(`Eliminar estudiante con código ${cod}`);
        // Implementa la lógica de eliminación aquí
    };

    const filteredData = data.filter((student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <AdminNavbar />
            <div className="container mt-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h2 className="text-primary">Students</h2>
                    <button className="btn btn-success" onClick={handleCreate}>
                        Create
                    </button>
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <table className="table table-bordered table-striped">
                    <thead className="table-primary">
                    <tr>
                        <th scope="col">Cod</th>
                        <th scope="col">Email</th>
                        <th scope="col">Name</th>
                        <th scope="col">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredData.map((student) => (
                        <tr key={student.cod}>
                            <td>{student.cod}</td>
                            <td>{student.email}</td>
                            <td>{student.name}</td>
                            <td>
                                <button
                                    className="btn btn-warning me-2"
                                    onClick={() => handleModify(student.cod)}
                                >
                                    Modify
                                </button>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(student.cod)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default StudentsAdmin;
