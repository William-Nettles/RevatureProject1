import { useNavigate } from "react-router-dom"

export const Reimbursements:React.FC = () => {

    const navigate = useNavigate()

    return(
        <div>

            <h2>Reimbursement Portal</h2>
            <div>
                <button className="button" onClick={
                    ()=>{navigate("/reimbursements/new")}}>Create Reimbursement</button>
                <button className="button" onClick={()=>{navigate("/reimbursements/pending")}}>Check Pending</button>
                <button className="button" onClick={()=>{navigate("/reimbursements/all")}}>View All</button>
            </div>

            <div>
                <button className="button" onClick={()=> {navigate("/")}}>Sign Out</button>
                <button className="button" onClick={()=> {navigate("/home")}}>Back</button>
            </div>
        </div>
    )
}