import ParentsNavbar from "../../../Components/ParentsNavbar/ParentsNavbar.tsx";

const HomeParents = () => {
    return (
        <>
            <ParentsNavbar />
            <div className="container">
                <div className="row justify-content-center align-items-center">
                    <div className="col-lg-8 col-md-10">
                        <div className="jumbotron">
                            <h1 className="display-4 text-center my-5">Welcome back parents.</h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomeParents;