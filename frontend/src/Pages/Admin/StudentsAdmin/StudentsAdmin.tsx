import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import AdminNavbar from '../../../Components/AdminNavbar/AdminNavbar.tsx';
import {addStudent, deleteStudent, getStudents, updateStudent} from "../../../Api/Students.ts";
import {Student} from "../../../Interfaces/Student.ts";

const student_new_modify: Student = {
    code: "",
    name: " ",
    age: "",
    course: " "
}

const StudentsAdmin = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [studentList, setStudentLists] = useState<Student[]>([])
    const [showFormToCreate, setShowFormToCreate] = useState<boolean>(false)
    const [showTable, setShowTable] = useState<boolean>(true)
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        course: '',
    });
    const [showFormToModify, setShowFormToModify] = useState<boolean>(false)
    const [studentToModify, setStudentToModify] = useState<Student>(student_new_modify)

    const fetchData = () => {
        getStudents()
            .then((data) => {
                setStudentLists(data);
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
        setStudentToModify((prevStudent) => ({
            ...prevStudent,
            [name]: value
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newStudent = {
            code: crypto.randomUUID(),
            name: formData.name,
            age: formData.age,
            course: formData.course,
        };

        console.log(newStudent)

        addStudent(newStudent)
            .then((response) => {
                if (response.status === 200) {
                    setShowFormToCreate(false)
                    setShowTable(true)
                    setFormData({
                        name: '',
                        age: '',
                        course: '',
                    });
                    fetchData()
                }
            })
            .catch((error) => {
                console.error('Error adding student:', error);
            });
    };

    const handleSubmitModify = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        updateStudent(studentToModify.code, studentToModify).then(response => {
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

    const handleModify = (student: Student) => {
        console.log(student)
        setStudentToModify(student)
        console.log(studentToModify)
        setShowFormToModify(true)
        setShowTable(false)
    };

    const handleDelete = (cod: string) => {
        deleteStudent(cod).then((response) => {
            if (response.status === 200) {
                fetchData()
            }
        })
            .catch((error) => {
                console.error('Error adding student:', error);
            });

    };

    const handleCloseFormToModify = () => {
        setShowFormToModify(false)
        setShowTable(true)
    }

    const filteredData = studentList.filter((student: Student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <AdminNavbar />
            {
                showFormToCreate && (
                    <div className="container mt-4">
                        <form className="border p-4 rounded" style={{ maxWidth: '400px', margin: 'auto' }} onSubmit={handleSubmit}>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h2 className="text-primary">Create new student</h2>
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
                                <label htmlFor="age" className="form-label">
                                    Age
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="age"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="course" className="form-label">
                                    Course
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="course"
                                    name="course"
                                    value={formData.course}
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
                            <h2 className="text-primary">Students</h2>
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
                                <th scope="col">Age</th>
                                <th scope="col">Course</th>
                                <th scope="col">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredData.map((student: Student) => (
                                <tr key={student.code}>
                                    <td>{student.code}</td>
                                    <td>{student.name}</td>
                                    <td>{student.age}</td>
                                    <td>{student.course}</td>
                                    <td>
                                        <button
                                            className="btn btn-warning me-2"
                                            onClick={() => handleModify(student)}
                                        >
                                            Modify
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(student.code)}
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
                                <h2 className="text-primary">Edit student</h2>
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
                                    value={studentToModify.name}
                                    onChange={handleChangeInput}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="age" className="form-label">
                                    Age
                                </label>
                                <input
                                    type="number" // Cambiado a type="number" para la edad
                                    className="form-control"
                                    id="age"
                                    name="age"
                                    value={studentToModify.age}
                                    onChange={handleChangeInput}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="course" className="form-label">
                                    Course
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="course"
                                    name="course"
                                    value={studentToModify.course}
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

export default StudentsAdmin;
