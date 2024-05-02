//This component displays a reimbursement, child component of the reimbursement container

export const Reimbursement: React.FC<any> = (reimbursement:any) => {


    let status: Map<number,string> = new Map()
    status.set(0,"Pending")
    status.set(1,"Approved")
    status.set(2,"Denied")

    //this will render a view for the character coming in as props
    return (
        <div className="reimbursement-container">
            <div className="reimbursement-id">
                <h3>{reimbursement.id}</h3>
            </div>

            <div className="employee-data">
                <p>Status: {status.get(reimbursement.status)}</p>
                <p>Amount: {reimbursement.amount}</p>
                <p>Description: {reimbursement.description}</p>

            </div>
        </div>
    )
}