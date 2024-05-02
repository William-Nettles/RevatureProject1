import { useNavigate } from "react-router-dom"

//view all pending reimbursements
//managers can see all pening
//employees can only see their own

export const Pending:React.FC = ()=>{

    const navigate = useNavigate()

    return(
       <div>
        <h2>Reimbursement Portal</h2>
        <div>
            <button className="button" onClick={()=> {navigate("/reimbursements")}}>Back</button>
        </div>
        </div>
    )
}