import { useEffect, useState } from "react"
import { setInForm } from "../../../lib"
import http from "../../../http"
import { useNavigate, useParams } from "react-router-dom"

const Edit = () => {
    const [form, setForm] = useState({status: 'Draft'})
    const [categories, setCategories] = useState([])
    const [image, setImage] = useState(null)
    const [upImg, setUpImg] = useState(null)

    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        http.get('/cms/categories')
            .then(({data}) => setCategories(data))
            .catch(err => {})

        http.get(`/cms/articles/${params.id}`)
            .then(({ data }) => {
                setForm({
                    name: data.name,
                    content: data.content,
                    categoryId: data.categoryId,
                    status: data.status,
                })

                if(data.image) {
                    setUpImg(`${import.meta.env.VITE_API_URL}/image/${data.image}`)
                }
            })
            .catch(err => { })
    }, [])

    const handleSubmit = ev => {
        ev.preventDefault()

        let formData = new FormData

        for(let k in form) {
            formData.append(k, form[k])
        }

        formData.append('file', image)

        http.patch(`/cms/articles/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(resp => navigate('/cms/articles'))
            .catch(err => {})
    }

    return <div className="row">
        <div className="col-12 my-3 bg-white py-3">
            <div className="row">
                <div className="col-5 mx-auto">
                    <h1>Edit Article</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-5 mx-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" name="name" id="name" className="form-control" required onChange={ev => setInForm(ev, form, setForm)} defaultValue={form.name} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="content" className="form-label">Content</label>
                            <textarea name="content" id="content" className="form-control" required onChange={ev => setInForm(ev, form, setForm)} defaultValue={form.content} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="file" className="form-label">Image</label>
                            <input type="file" name="file" id="file" className="form-control" onChange={ev => {
                                setImage(ev.target.files[0])
                            }} />
                            <div className="mt-3">{
                                image ? <img className="img-fluid" src={URL.createObjectURL(image)} /> : null
                            }</div>
                            <div className="mt-3">{
                                upImg ? <img className="img-fluid" src={upImg} /> : null
                            }</div>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="categoryId" className="form-label">Category</label>
                            <select name="categoryId" id="categoryId" className="form-select" required onChange={ev => setInForm(ev, form, setForm)}>
                                <option value="">Select a category</option>
                                {categories.map(category => <option value={category._id} selected={form.categoryId == category._id}>{category.name}</option>)}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select name="status" id="status" className="form-select" required onChange={ev => setInForm(ev, form, setForm)}>
                                <option value="Draft" selected={form.status == 'Draft'}>Draft</option>
                                <option value="Published" selected={form.status == 'Published'}>Published</option>
                                <option value="Unpublished" selected={form.status == 'Unpublished'}>Unpublished</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary">
                                <i className="fa-solid fa-save me-2"></i>Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
}

export default Edit