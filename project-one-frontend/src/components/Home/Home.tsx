import { useNavigate } from "react-router-dom"
import { state } from "../../globalData/store"
import "./Home.css"

//Home page
//Users can navigate to their account, sign out, or navigate to reimbursements portal

export const Home:React.FC = () => {

    const navigate = useNavigate()

    return(
        <div className="home">
            <div className="home-container">

                <div className="welcome-container">
                    <h2 className="welcome-messgae">Welcome to the Reimbursement Center!</h2>
                    <h4>You can navigate to the Reimbursement Portal or view your account information</h4>
                </div>
                <div className="button-container">
                    <button className="button" onClick={()=>{navigate("/reimbursements")}}>Reimbursement Portal</button>
                    <button className="button" onClick={()=>{navigate("/account")}}>Account</button>

                    {state.userSessionData.userId > 0 ? 

                    <button className="button" onClick={()=> {navigate("/logout")}}>Log Out</button> 
                    : <button className="button" onClick={()=>{navigate("/login")}}>Log In</button>} 
                </div>
            </div>
        </div>
    )
}