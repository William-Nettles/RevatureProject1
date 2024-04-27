import { useNavigate } from "react-router-dom"

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