import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import * as Pages from "../pages"
import { Layout } from "../components"
import PrivateRoute from "./PrivateRoute"

const AllRoutes = () => {
    return <BrowserRouter>
        <Routes>
            <Route path="/cms" element={<Layout />}>
                <Route path="dashboard" element={<PrivateRoute element={<Pages.Cms.Dashboard.List />} />} />

                <Route path="articles" element={<PrivateRoute element={<Pages.Cms.Articles.List />} />} />
                <Route path="articles/create" element={<PrivateRoute element={<Pages.Cms.Articles.Create />} />} />

                <Route path="login" element={<Pages.Cms.Login.List />} />
            </Route>

            <Route path="/" element={<Navigate to="/cms/dashboard" />} />
        </Routes>
    </BrowserRouter>
}

export default AllRoutes