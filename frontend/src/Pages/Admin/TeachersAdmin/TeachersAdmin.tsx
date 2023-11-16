import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import AdminNavbar from '../../../Components/AdminNavbar/AdminNavbar.tsx';
import {addTeacher, deleteTeacher, getTeachers, updateTeacher} from "../../../Api/Teachers.ts";
import {Teacher} from "../../../Interfaces/Teacher.ts";

const teacher_new_modify: Teacher = {
    code: "",
    name: "",
    email: ""
}

const TeachersAdmin = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [teacherList, setTeacherLists] = useState<Teacher[]>([])
    const [showFormToCreate, setShowFormToCreate] = useState<boolean>(false)
    const [showTable, setShowTable] = useState<boolean>(true)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
    });
    const [showFormToModify, setShowFormToModify] = useState<boolean>(false)
    const [teacherToModify, setTeacherToModify] = useState<Teacher>(teacher_new_modify)

    const fetchData = () => {
        getTeachers()
            .then((data) => {
                setTeacherLists(data);
                console.log(data)
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setTeacherToModify((prevTeacher) => ({
            ...prevTeacher,
            [name]: value
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newTeacher: Teacher = {
            code: crypto.randomUUID(),
            name: formData.name,
            email: formData.email
        };

        console.log(newTeacher)

        addTeacher(newTeacher)
            .then((response) => {
                if (response.status === 200) {
                    setShowFormToCreate(false)
                    setShowTable(true)
                    setFormData({
                        name: '',
                        email: '',
                    });
                    fetchData()
                }
            })
            .catch((error) => {
                console.error('Error adding teacher:', error);
            });
    };

    const handleSubmitModify = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        updateTeacher(teacherToModify.code, teacherToModify).then(response => {
            if(response.status === 200){
                fetchData()
                setShowFormToModify(false)
                setShowTable(true)
            }
        }).catch(error => console.error(error))
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleShowFormCreate = () => {
        setShowFormToCreate(true)
        setShowTable(false)
    };

    const handleCloseFormCreate = () => {
        setShowFormToCreate(false)
        setShowTable(true)
    };

    const handleModify = (teacher: Teacher) => {
        console.log(teacher)
        setTeacherToModify(teacher)
        console.log(teacherToModify)
        setShowFormToModify(true)
        setShowTable(false)
    };

    const handleDelete = (cod: string) => {
        deleteTeacher(cod).then((response) => {
            if (response.status === 200) {
                fetchData()
            }
        })
            .catch((error) => {
                console.error('Error adding teacher:', error);
            });

    };

    const handleCloseFormToModify = () => {
        setShowFormToModify(false)
        setShowTable(true)
    }

    const filteredData = teacherList.filter((teacher: Teacher) =>
        teacher.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <AdminNavbar />
            {
                showFormToCreate && (
                    <div className="container mt-4">
                        <form className="border p-4 rounded" style={{ maxWidth: '400px', margin: 'auto' }} onSubmit={handleSubmit}>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h2 className="text-primary">Create new teacher</h2>
                                <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseFormCreate}></button>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Create
                            </button>
                        </form>
                    </div>
                )
            }

            {
                showTable && (
                    <div className="container mt-4">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                            <h2 className="text-primary">Teachers</h2>
                            <button className="btn btn-success" onClick={handleShowFormCreate}>
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
                                <th scope="col">Code</th>
                                <th scope="col">Name</th>
                                <th scope="col">Email</th>
                                <th scope="col">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredData.map((teacher: Teacher) => (
                                <tr key={teacher.code}>
                                    <td>{teacher.code}</td>
                                    <td>{teacher.name}</td>
                                    <td>{teacher.email}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning me-2"
                                            onClick={() => handleModify(teacher)}
                                        >
                                            Modify
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(teacher.code)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )
            }

            {
                showFormToModify && (
                    <div className="container mt-4">
                        <form className="border p-4 rounded" style={{ maxWidth: '400px', margin: 'auto' }} onSubmit={handleSubmitModify}>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h2 className="text-primary">Edit teacher</h2>
                                <button type="button" className="btn-close" aria-label="Close Form" onClick={handleCloseFormToModify}></button>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    name="name"
                                    value={teacherToModify.name}
                                    onChange={handleChangeInput}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">
                                    email
                                </label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    name="email"
                                    value={teacherToModify.email}
                                    onChange={handleChangeInput}
                                />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Save Changes
                            </button>
                        </form>
                    </div>
                )
            }

        </>
    );
};

export default TeachersAdmin;
