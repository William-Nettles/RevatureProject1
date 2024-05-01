import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { ReimbursementInterface } from "../../interfaces/ReimbursementInterface"

export const NewReim:React.FC = () => {

    const navigate = useNavigate()

    const[reim,setReim] = useState<ReimbursementInterface>({
        amount:0,
        description:"",
    })

    const storeValues = (input:any) => {

        if (input.target.name === "amount") {
            setReim((reim) => ({...reim, amount:input.target.value}))
        } else {
            setReim((reim) => ({...reim, description:input.target.value}))
        }
        
    }

     const submit = async ()=> {
       
        const response = await axios.post("http://localhost:8080/reimbursements", reim)

        

        //after registration, send reim back to login page
        navigate("/reimbursements/new")
    }

    return(
        <div>
             <h2>Reimbursement Portal</h2>
             <h3>New Reimbursement</h3>
            <div>
                <p>Amount:</p>
                <input type="number" name="amount" onChange={storeValues}/>
            </div>
             <div>
                <p>Description:</p>
                <input type="text" placeholder="description" name="description" onChange={storeValues}/>
            </div>
            

            <div>
                <button className="button" onClick={submit}>Submit</button>
                <button className="button" onClick={()=> {navigate("/reimbursements")}}>Back</button>
            </div>
        </div>
    )
}