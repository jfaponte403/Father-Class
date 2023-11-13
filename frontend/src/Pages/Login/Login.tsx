import {Link, useNavigate} from "react-router-dom";

const Login = () => {

    const navigate = useNavigate()

    const handleLogin = () => {
        navigate('/home-admin')
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center vh-100 ">
            <h1 className="mb-4 text-center">Father Class</h1>

            <form className="border p-4 d-flex flex-column align-items-center bg-light" style={{ width: '23rem' }}>

                <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: '1px' }}>Log in</h3>

                <div className="form-outline mb-4">
                    <input type="email" id="form2Example18" className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="form2Example18">Email address</label>
                </div>

                <div className="form-outline mb-4">
                    <input type="password" id="form2Example28" className="form-control form-control-lg" />
                    <label className="form-label" htmlFor="form2Example28">Password</label>
                </div>

                <div className="pt-1 mb-4">
                    <button className="btn btn-info btn-lg btn-block" type="button" onClick={handleLogin}>Login</button>
                </div>

                <p className="small mb-5 pb-lg-2"><Link to='/' className="text-muted">Forgot password?</Link></p>
                <p>Don't have an account? <Link to='/' className="link-info">Register here</Link></p>

            </form>
        </div>
    )
}

export default Login