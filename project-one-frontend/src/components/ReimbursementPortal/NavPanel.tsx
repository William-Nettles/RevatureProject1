import { useNavigate } from "react-router-dom"
import { state } from "../../globalData/store"
import axios from "axios"
import { useEffect } from "react"

export const NavPanel:React.FC = ()=> {

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
        if (state.userSessionData.userId === 0) {
            navigate("/")
        }
    })

return (
        <div>
            <div>
                <button className="button" onClick={()=>{navigate("/account")}}>Account</button>
                <button className="button" onClick={()=> {navigate("/logout")}}>Log Out</button>
                <button className="button" onClick={()=> {navigate("/home")}}>Home</button>
            </div>
            <div>
                <button className="button" onClick={
                    ()=>{navigate("/reimbursements/new")}}>Create Reimbursement</button>
                <button className="button" onClick={()=>{navigate("/reimbursements/pending")}}>Check Pending</button>
                <button className="button" onClick={()=>{navigate("/reimbursements/all")}}>View All</button>
            </div>
        </div>
    )
}


    
