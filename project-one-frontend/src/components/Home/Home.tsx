import { useNavigate } from "react-router-dom"

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
                <button className="button" onClick={()=> {navigate("/")}}>Sign Out</button>
            </div>
        </div>
    )
}