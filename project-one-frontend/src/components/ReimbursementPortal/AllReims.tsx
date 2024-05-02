//will display all reimbursements to the user
//employees can only see their own reimbursements
//managers can see all reimbursements

import { useNavigate } from "react-router-dom"
import { Reimbursement } from "../Reimbursement/Reimbursement"
import axios from "axios"
import { ReimbursementInterface } from "../../interfaces/ReimbursementInterface"
import { useEffect, useState } from "react"
import { NavPanel } from "./NavPanel"
import { ReimbursementResolved } from "../Reimbursement/ReimbursementResolved"

export const AllReims:React.FC = ()=>{

     const navigate = useNavigate()
    //const[reimbursements, setReimbursements] = useState<ReimbursementInterface[]>([])
    //State variable to store an array of employee data (whihc will be sent in as props)
    const[reimbursements, setReimbursements] = useState<ReimbursementInterface[]>([])
    

    //useEffect that populates the employees array with incoming employee data
    //(This emulates a get all that happens on the component render... view all reimbs for instance)

    useEffect(()=>{getReimbursements()},[])

    const getReimbursements = async () => {

        //our GET request (remember to send withCredentials to confirm the user is logged in)
        const response = await axios.get("http://localhost:8080/reimbursements", {withCredentials:true}).then((response)=>{
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
                 <h2>Reimbursements:</h2>

            {/*using the .map() function to rener a Character Component for every element in the characters array*/}
            <div>
                {reimbursements.map((reimbursement:any, index) => {
                    return <ReimbursementResolved {...reimbursement}  key={reimbursement.reimId}/>
                })}
            </div>
            </div>
        </div>
        </div>
    )
}