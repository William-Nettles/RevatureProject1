import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import { ReimbursementInterface } from "../../interfaces/ReimbursementInterface"
import { error } from "console"
import { spawn } from "child_process"
import { NavPanel } from "./NavPanel"

//component for creating a new reimbursement

export const NewReim:React.FC = () => {

    const navigate = useNavigate()

    const[reim,setReim] = useState<ReimbursementInterface>({
        amount:0,
        description:"",
    })

    const[responseMessage, setMessage] = useState("")

    const storeValues = (input:any) => {

        if (input.target.name === "amount") {
            setReim((reim) => ({...reim, amount:input.target.value}))
            
            
        } else {
            setReim((reim) => ({...reim, description:input.target.value}))
        }
        
    }

     const submit = async ()=> {
       
        if (reim.description && reim.description?.length > 0 && reim.amount > 0) {
            //console.log('hello')
            const response = await axios.post("http://localhost:8080/reimbursements",
            reim,
            {withCredentials:true}).then((response)=>{
                console.log(response.data)
                setMessage("Reimbursement Successfully Created")
                //navigate("/reimbursements/new")
            }).catch((error)=>{alert(error)})

        } else {
            console.log("bad input")
            setMessage("Invalid Input")
        }
          
    }

    return(
        <div>
             <h2>Reimbursement Portal</h2>
             <NavPanel/>
             <h3>New Reimbursement</h3>
            <div>
                <p>Amount:</p>
                <input type="number" name="amount" onChange={storeValues}/>
                {reim.amount<=0 && (<span className="error"> Value must be greater than zero</span>)}
            </div>
             <div>
                <p>Description:</p>
                <input type="text" placeholder="description" name="description" onChange={storeValues}/>
                {!reim.description && (<span className="error"> Please provide a description</span>)}
            </div>
            

            <div>
                <button className="button" onClick={submit}>Submit</button>
                {responseMessage && <span> {responseMessage}</span>}
            </div>
        </div>
    )
}