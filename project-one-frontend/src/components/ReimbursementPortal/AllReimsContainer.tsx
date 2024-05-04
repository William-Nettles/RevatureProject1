//will display all reimbursements to the user
//employees can only see their own reimbursements
//managers can see all reimbursements

import axios from "axios"
import { ReimbursementInterface } from "../../interfaces/ReimbursementInterface"
import { useEffect, useState } from "react"
import { NavPanel } from "./NavPanel"
import { ReimbursementResolved } from "../Reimbursement/ReimbursementResolved"
import "./AllReims.css"
export const AllReims:React.FC = ()=>{

    //const[reimbursements, setReimbursements] = useState<ReimbursementInterface[]>([])
    //State variable to store an array of employee data (whihc will be sent in as props)
    const[reimbursements, setReimbursements] = useState<ReimbursementInterface[]>([])
    

    //useEffect that populates the employees array with incoming employee data
    //(This emulates a get all that happens on the component render... view all reimbs for instance)

    useEffect(()=>{getReimbursements()},[])

    const getReimbursements = async () => {

        //our GET request (remember to send withCredentials to confirm the user is logged in)
        await axios.get("http://localhost:8080/reimbursements", {withCredentials:true}).then((response)=>{
            console.log(response.data)
            setReimbursements(response.data)

        }).catch((error)=>{console.log(error);
        })

        //populate the reimbursement state  
        
    }

    return(
       <div>
            <div className="portal">
                <NavPanel/>
            </div> 
            <div>
                <div className="pending-reims">
                    <h2>Reimbursements:</h2>
                </div>
                {/*using the .map() function to rener a Character Component for every element in the characters array*/}
                <div className="reimResolved">
                    {reimbursements.map((reimbursement:any, index) =>   {
                        return <div className="reimbursement"><ReimbursementResolved {...reimbursement}  key={reimbursement.reimId}/>
                    </div>}
                    )}
                </div>
               
            </div>
        </div>
    )
}