import axios from "axios"
import { useEffect, useState } from "react"
import { ReimbursementInterface } from "../../interfaces/ReimbursementInterface"
import { Reimbursement } from "../Reimbursement/Reimbursement"
import { NavPanel } from "./NavPanel"

//view all pending reimbursements
//managers can see all pening
//employees can only see their own

export const Pending:React.FC = ()=>{

    //const[reimbursements, setReimbursements] = useState<ReimbursementInterface[]>([])
    //State variable to store an array of employee data (whihc will be sent in as props)
    const[reimbursements, setReimbursements] = useState<ReimbursementInterface[]>([])
    
    //useEffect that populates the employees array with incoming employee data
    //(This emulates a get all that happens on the component render... view all reimbs for instance)

    useEffect(()=>{getReimbursements()},[])

    const getReimbursements = async () => {

        //our GET request (remember to send withCredentials to confirm the user is logged in)
        await axios.get("http://localhost:8080/reimbursements/pending", {withCredentials:true}).then((response)=>{
            console.log(response.data)
            setReimbursements(response.data)

        }).catch((error)=>{console.log(error);
        })

        //populate the reimbursement state  
        
    }

    return(
       <div>
        <h2>Reimbursement Portal</h2>
        <NavPanel/>
        <div>
            
            <div>
                <h2>Pending Reimbursements:</h2>

                {/*using the .map() function to rener a Character Component for every element in the characters array*/}
                <div>
                    {reimbursements.map((reimbursement:any) => {
                        return <Reimbursement {...reimbursement}  key={reimbursement.reimId}/>
                    })}
                </div>
            </div>
        </div>
        </div>
    )
}