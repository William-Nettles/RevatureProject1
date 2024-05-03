import { useNavigate } from "react-router-dom"

export const NavPanel:React.FC = ()=> {

    const navigate = useNavigate()
return (
        <div>
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


    