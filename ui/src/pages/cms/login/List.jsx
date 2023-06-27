import { useState } from "react"

const List = () => {
    const [form, setForm] = useState({})
    const [remember, setRemember] = useState(false)

    return <div className="row">
        <div className="col-3 my-5 mx-auto py-3 bg-white">
            <div className="row">
                <div className="col text-center">
                    <h1>Login</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" name="email" id="email" className="form-control" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" name="password" id="password" className="form-control" required />
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" name="remember" id="remember" className="form-check-input" />
                            <label htmlFor="remember" className="form-check-label">Remember Me</label>
                        </div>
                        <div className="mb-3 d-grid">
                            <button type="submit" className="btn btn-primary">
                                <i className="fa-solid fa-sign-in-alt me-2"></i>Log In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
}

export default List