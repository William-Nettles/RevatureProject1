import { NavPanel } from "./NavPanel"

//allows users to navigate to components for creating and viewing reimbursements

export const Reimbursements:React.FC = () => {

    return(
        <div>

            <div className="header-container">
                {/* <h2 className="header">Reimbursement Portal</h2> */}
            </div>

            <div className="nav-container">
                <NavPanel/>
            </div>
            
            
        </div>
    )
}