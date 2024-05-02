import { useNavigate } from "react-router-dom"
import { NavPanel } from "./NavPanel"

//allows users to navigate to components for creating and viewing reimbursements

export const Reimbursements:React.FC = () => {

    const navigate = useNavigate()

    return(
        <div>

            <h2>Reimbursement Portal</h2>
            <NavPanel/>
        </div>
    )
}