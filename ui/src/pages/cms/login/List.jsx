import { useState } from "react"
import { inStorage, setInForm } from "../../../lib"
import http from "../../../http"
import { useDispatch } from "react-redux"
import { addUser } from "../../../state"
import { useNavigate } from "react-router-dom"

const List = () => {
    const [form, setForm] = useState({})
    const [remember, setRemember] = useState(false)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = ev => {
        ev.preventDefault()
        
        http.post('/login', form)
            .then(({data}) => {
                inStorage('user_token', data.token, remember)
                dispatch(addUser(data.user))

                navigate('/cms/dashboard')
            })
            .catch(error => {})
    }

    return <div className="row">
        <div className="col-3 my-5 mx-auto py-3 bg-white">
            <div className="row">
                <div className="col text-center">
                    <h1>Login</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" name="email" id="email" className="form-control" onChange={ev => setInForm(ev, form, setForm)} required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" name="password" id="password" className="form-control" onChange={ev => setInForm(ev, form, setForm)} required />
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" name="remember" id="remember" className="form-check-input" onClick={() => setRemember(!remember)} checked={remember} />
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