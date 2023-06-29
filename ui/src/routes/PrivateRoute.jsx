import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { clearStorage, fromStorage } from "../lib"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import http from "../http"
import { addUser } from "../state"

const PrivateRoute = ({element}) => {
    const user = useSelector(state => state.user.value)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if(Object.keys(user).length == 0) {
            const token = fromStorage('user_token')

            if(token) {
                http.get('/cms/user/detail')
                    .then(({data}) => {
                        dispatch(addUser(data))
                    })
                    .catch(err => {
                        toast.error('Please login to continue.')
                        clearStorage('user_token')
                        navigate('/cms/login')
                    })
            } else {
                toast.error('Please login to continue.')
                navigate('/cms/login')
            }
        }
    }, [user])

    return element
}

export default PrivateRoute