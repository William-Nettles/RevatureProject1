//This component displays a reimbursement, child component of the reimbursement container

import axios from "axios"
import { useState } from "react"
import { state } from "../../globalData/store"
import { useNavigate } from "react-router-dom"

export const Reimbursement: React.FC<any> = (reimbursement:any) => {


    const [reimStatus, setStatus] = useState(reimbursement.status)

    let status: Map<number,string> = new Map()
    status.set(0,"Pending ")
    status.set(1,"Approved ")
    status.set(2,"Denied ")

    const approve = async () => {

        const response = await axios.put("http://localhost:8080/reimbursements/status/" + reimbursement.reimbId, 1,
            {withCredentials: true, headers: {"Content-Type": "application/json",},})
            .then((response)=>{
                console.log(response.data)
                setStatus(1)
            }).catch((error)=>{alert(error)})

    }
    const deny = async () => {

       
        const response = await axios.put("http://localhost:8080/reimbursements/status/" + reimbursement.reimbId, 2,
            {withCredentials: true, headers: {"Content-Type": "application/json",},})
            .then((response)=>{
                setStatus(2)
                console.log(response.data)
            }).catch((error)=>{alert(error)})

    }

    //this will render a view for the character coming in as props
    return (
        <div className="reimbursement-container">
            {reimStatus === 0 && <div>  
                <div className="reimbursement-id">
                    <h3>ID: {reimbursement.reimbId}</h3>
                </div>

                <div className="employee-data">
                    <p>
                        Status: {status.get(reimStatus)} 
                        {state.userSessionData.role === "MANAGER" && 
                        <>
                        <button className="button" onClick={() => { approve() } }>Approve</button>
                        <button className="button" onClick={() => { deny() } }>Deny</button>
                        </> 
                        }
                    </p>
                    <p>Amount: {reimbursement.amount}</p>
                    <p>Description: {reimbursement.description}</p>
                </div>
            </div>}
        </div>
    )
}