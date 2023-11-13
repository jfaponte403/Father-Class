import AdminNavbar from "../../../Components/AdminNavbar/AdminNavbar.tsx";

const HomeAdmin = () => {
    return (
        <>
            <AdminNavbar />
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-lg-8 col-md-10">
                        <div className="jumbotron">
                            <h1 className="display-4 text-center my-5">Welcome back admin.</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeAdmin;