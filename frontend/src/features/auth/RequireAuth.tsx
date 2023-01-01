import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useSelector } from "react-redux"
import { selectCurrentToken, selectCurrentUser } from "./authSlice"

const RequireAuth = () => {
    const token = useSelector(selectCurrentToken)
    const user = useSelector(selectCurrentUser)
    const location = useLocation()

    return (
        token
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
    //here just a basic check is being performed , we could do actually do more in here
    // check roles and permissions -> token
}
export default RequireAuth