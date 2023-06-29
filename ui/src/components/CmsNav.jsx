import { useDispatch, useSelector } from "react-redux"
import { clearStorage } from "../lib"
import { clearUser } from "../state"
import { Link } from "react-router-dom"

const CmsNav = () => {

    const user = useSelector(state => state.user.value)

    const dispatch = useDispatch()

    const logout = () => {
        clearStorage('user_token')
        dispatch(clearUser())
    }

    return Object.keys(user).length ? 
    <div className="row">
        <nav className="navbar navbar-expand-lg bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/cms/dashboard">News Portal</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/cms/articles">
                                <i className="fa-solid fa-newspaper me-2"></i>Articles
                            </Link>
                        </li>
                    </ul>
                    <span class="navbar-text">
                        <i className="fa-solid fa-user-circle me-2"></i>{user.name}
                    </span>
                    <ul className="navbar-nav mb-2 mb-lg-0 ms-3">
                        <li className="nav-item">
                            <button type="button" className="btn btn-link nav-link" onClick={logout}>
                                <i className="fa-solid fa-sign-out-alt me-2"></i>Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div> : null
}

export default CmsNav