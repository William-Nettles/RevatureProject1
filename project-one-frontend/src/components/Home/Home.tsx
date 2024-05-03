import { useNavigate } from "react-router-dom"
import { state } from "../../globalData/store"

//Home page
//Users can navigate to their account, sign out, or navigate to reimbursements portal

export const Home:React.FC = () => {

    const navigate = useNavigate()

    return(
        <div>
            <h2>Welcome to the Reimbursement Center!</h2>
            <h4>You can navigate to the Reimbursement Portal or view your account information</h4>
            <div>
                <button className="button" onClick={()=>{navigate("/reimbursements")}}>Reimbursement Portal</button>
                <button className="button" onClick={()=>{navigate("/account")}}>Account</button>

                {state.userSessionData.userId > 0 ? 

                <button className="button" onClick={()=> {navigate("/logout")}}>Log Out</button> 
                : <button className="button" onClick={()=>{navigate("/login")}}>Log In</button>} 
            </div>
        </div>
    )
}