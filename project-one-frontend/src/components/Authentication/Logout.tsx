import { useEffect } from "react"
import { state } from "../../globalData/store"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Logout:React.FC= () => {


    const signout = async () => {

        state.userSessionData.username = ""
        state.userSessionData.role = ""
        state.userSessionData.firstName = ""
        state.userSessionData.lastName = ""
        state.userSessionData.userId = 0

        const response = await axios.get("http://localhost:8080/users/logout", {withCredentials:true})
        .then((response)=>{
            console.log(response)
            navigate("/")})
    
    }

    const navigate = useNavigate()

        useEffect(()=>{
        signout()
        navigate("/")
    },[])

    return(
        <div>

        </div>
    )
}