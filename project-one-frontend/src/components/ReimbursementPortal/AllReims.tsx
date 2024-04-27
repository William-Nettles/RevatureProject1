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