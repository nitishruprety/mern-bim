import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import * as Pages from "../pages"
import { Layout } from "../components"

const AllRoutes = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/cms" element={<Layout />}>
                <Route path="dashboard" element={<Pages.Cms.Dashboard.List />} />

                <Route path="login" element={<Pages.Cms.Login.List />} />
            </Route>

            <Route path="/" element={<Navigate to="/cms/dashboard" />} />
        </Routes>
    </BrowserRouter>
}

export default AllRoutes