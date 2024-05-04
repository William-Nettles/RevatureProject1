//This component displays a reimbursement, child component of the reimbursement container

import axios from "axios"
import { useState } from "react"
import { state } from "../../globalData/store"
import { ReimbursementInterface } from "../../interfaces/ReimbursementInterface"

export const Reimbursement: React.FC<any> = (reimbursement:any) => {

    const[thisReim, setReim] = useState<ReimbursementInterface>(reimbursement)
    const [desc, setDesc] = useState(reimbursement.description)

    let status: Map<number,string> = new Map()
    status.set(0,"Pending ")
    status.set(1,"Approved ")
    status.set(2,"Denied ")

    const approve = async () => {

        await axios.put("http://localhost:8080/reimbursements/status/" + thisReim.reimbId, 1,
            {withCredentials: true, headers: {"Content-Type": "application/json",},})
            .then((response)=>{
                console.log(response.data)
               setReim((thisReim)=>({...thisReim, status:1}))
            }).catch((error)=>{alert(error)})

    }
    const deny = async () => {

        await axios.put("http://localhost:8080/reimbursements/status/" + thisReim.reimbId, 2,
            {withCredentials: true, headers: {"Content-Type": "application/json",},})
            .then((response)=>{
                setReim((thisReim)=>({...thisReim, status:2}))
                console.log(response.data)
            }).catch((error)=>{alert(error)})

    }

    const updateDesc = async () => {

        await axios.put("http://localhost:8080/reimbursements/description/" + thisReim.reimbId, desc,
            {withCredentials: true, headers: {"Content-Type": "text/plain",},})
            .then((response)=>{
                setReim((thisReim)=>({...thisReim, description:desc}))
                console.log(response.data)
            }).catch((response)=>{alert("Invalid Description")})

    }


    //this will render a view for the character coming in as props
    return (
        <div className="reimbursement-container">
            {thisReim.status === 0 && <div>  
                <div className="reimbursement-id">
                    <h3>ID: {thisReim.reimbId}</h3>
                </div>

                <div className="employee-data">
                    <p>User: {reimbursement.user.username}</p>
                    <p>
                        Status: {status.get(thisReim.status)} 
                        {state.userSessionData.role === "MANAGER" && <div className="reim-button-container">
                        <button className="pend-button" onClick={() => { approve() } }>Approve</button>
                        <button className="pend-button" onClick={() => { deny() } }>Deny</button>
                        </div>}
                    </p>
                    <p>Amount: {thisReim.amount}</p>
                    <p>Description: {thisReim.description}</p> 
                    {state.userSessionData.role === "USER" && 
                    <div>
                        <span>Edit Description:</span>
                        <input type="text" placeholder="description" name="desc" 
                        onChange={(input:any)=>{setDesc(input.target.value)}}/>

                        <button className="button" onClick={() => { updateDesc() } }>Submit</button>

                        {!desc && (<span className="error"> Please provide a description</span>)}
                        {desc.length > 100 && (<span className="error"> Too Long!</span>)}

                    </div>}
                </div>
            </div>}
        </div>
    )
}