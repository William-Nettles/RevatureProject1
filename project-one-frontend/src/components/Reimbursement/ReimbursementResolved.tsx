//This component displays a reimbursement which has been resolved
// technically any reuimbursement in the "/all" route is displayed with this component, even pending reimbursements
// its easier to have a spearate component for this route tho, since functionality is diffrent
export const ReimbursementResolved: React.FC<any> = (reimbursement:any) => {

    let status: Map<number,string> = new Map()
    status.set(0,"Pending ")
    status.set(1,"Approved ")
    status.set(2,"Denied ")

    //this will render a view for the character coming in as props
    return (
        <div className="reimbursement-container">
            
                <div className="reimbursement-id">
                    <h3>ID: {reimbursement.reimbId}</h3>
                </div>

                <div className="employee-data">
                     <p>User: {reimbursement.user.username}</p>
                    <p>
                        Status: {status.get(reimbursement.status)} 
                        
                    </p>
                    <p>Amount: {reimbursement.amount}</p>
                    <p>Description: {reimbursement.description}</p>
                </div>
            
        </div>
    )
}