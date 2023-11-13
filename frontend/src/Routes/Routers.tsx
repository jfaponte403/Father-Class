import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomeAdmin from "../Pages/Admin/HomeAdmin/HomeAdmin.tsx";
import Login from "../Pages/Login/Login.tsx";
import HomeTeachers from "../Pages/Teachers/HomeTeachers/HomeTeachers.tsx";
import HomeParents from "../Pages/Parents/HomeParents/HomeParents.tsx";
import HomeStudents from "../Pages/Students/HomeStudents/HomeStudents.tsx";
import StudentsAdmin from "../Pages/Admin/StudentsAdmin/StudentsAdmin.tsx";

const Routers = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Login />} />
                <Route path='/home-teachers' element={<HomeTeachers />} />
                <Route path='/home-admin' element={<HomeAdmin />} />
                <Route path='/home-parents' element={<HomeParents />} />
                <Route path='/home-students' element={<HomeStudents />} />
                <Route path='/students-admin' element={<StudentsAdmin />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Routers;