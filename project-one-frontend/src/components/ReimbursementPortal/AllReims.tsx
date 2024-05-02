//will display all reimbursements to the user
//employees can only see their own reimbursements
//managers can see all reimbursements

import { useNavigate } from "react-router-dom"

export const AllReims:React.FC = ()=>{

    const navigate = useNavigate()

    return(
        <div>
        <h2>Reimbursement Portal</h2>
            <div>
                <button className="register-button" onClick={()=> {navigate("/reimbursements")}}>Back</button>
            </div>
        </div>
    )
}