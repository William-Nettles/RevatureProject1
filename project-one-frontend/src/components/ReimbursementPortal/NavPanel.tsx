import { useNavigate } from "react-router-dom"
import { state } from "../../globalData/store"
import { useEffect } from "react"
import "./NavPanel.css"

//a child component of all of the reimbursement portal child componets, just has nav buttons
export const NavPanel:React.FC = ()=> {

    const navigate = useNavigate()

    //if not logged in, sends user to login
    useEffect(()=>{
        if (state.userSessionData.userId === 0) {
            navigate("/")
        }
    })

return (
        <div className="nav-panel">
            <h2>Reimbursement Portal</h2>
            <div className="button-container">

                <button className="button" onClick={()=> {navigate("/home")}}>Home</button>
                <button className="button" onClick={()=>{navigate("/account")}}>Account</button>
                
                <button className="button" onClick={
                    ()=>{navigate("/reimbursements/new")}}>Create Reimbursement</button>
                <button className="button" onClick={()=>{navigate("/reimbursements/pending")}}>Check Pending</button>
                <button className="button" onClick={()=>{navigate("/reimbursements/all")}}>View All</button>
                <button className="button" onClick={()=> {navigate("/logout")}}>Log Out</button>
            </div>
        </div>
    )
}


    
