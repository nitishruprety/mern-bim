import { Outlet } from "react-router-dom"
import "./Layout.css"
import CmsNav from "./CmsNav"

const Layout = () => {
    return <div className="container-fluid">
        
        <CmsNav />

        <Outlet />

    </div>
}

export default Layout