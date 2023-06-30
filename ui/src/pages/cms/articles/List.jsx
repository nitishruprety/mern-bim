import { useEffect, useState } from "react"
import http from "../../../http"
import { Link } from "react-router-dom"

const List = () => {
    const [articles, setArticles] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    const loadData = () => http.get('/cms/articles')
        .then(({ data }) => setArticles(data))
        .catch(err => { })

    const handleDelete = id => {
        if(confirm('Are you sure you want to delete this item?')) {
            http.delete(`/cms/articles/${id}`)
                .then(() => {
                    loadData()
                })
                .catch(err => {})
        }
    }

    return <div className="row">
        <div className="col-12 my-3 bg-white py-3">
            <div className="row">
                <div className="col">
                    <h1>Articles</h1>
                </div>
                <div className="col-auto">
                    <Link to="/cms/articles/create" className="btn btn-primary">
                        <i className="fa-solid fa-plus me-2"></i>Add Article
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    {articles.length ? 
                        <table className="table table-bordered table-striped table-hover table-sm">
                            <thead className="table-primary">
                                <tr>
                                    <th>Name</th>
                                    <th>Image</th>
                                    <th>Category</th>
                                    <th>User</th>
                                    <th>Status</th>
                                    <th>Created At</th>
                                    <th>Upadted At</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {articles.map(article => <tr>
                                    <td>{article.name}</td>
                                    <td>
                                        {article.image.length ? <img src={`${import.meta.env.VITE_API_URL}/image/${article.image}`} className="img-sm" /> : null}
                                    </td>
                                    <td>{article.category[0].name}</td>
                                    <td>{article.user[0].name}</td>
                                    <td>{article.status}</td>
                                    <td>{article.createdAt}</td>
                                    <td>{article.updatedAt}</td>
                                    <td>
                                        <Link to={`/cms/articles/edit/${article._id}`} className="btn btn-success btn-sm">
                                            <i className="fa-solid fa-edit me-2"></i>Edit
                                        </Link>
                                        <button type="button" className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(article._id)}>
                                            <i className="fa-solid fa-trash me-2"></i>Delete
                                        </button>
                                    </td>
                                </tr>)}
                            </tbody>
                        </table> : 
                        <h4 className="text-muted fst-italic">No data added.</h4>}
                </div>
            </div>
        </div>
    </div>
}

export default List