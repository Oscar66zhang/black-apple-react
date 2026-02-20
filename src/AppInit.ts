import { useEffect } from "react"
import { useDispatch, UseDispatch } from "react-redux"
import { setToken } from "./redux/userSlice"

const AppInit = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            dispatch(setToken(token));
        }
    }, []);
    return null;
}

export default AppInit