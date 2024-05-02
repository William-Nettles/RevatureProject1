import { useEffect, useState } from "react"
import { Reimbursement } from "./Reimbursement"
import { ReimbursementInterface } from "../../interfaces/ReimbursementInterface"
import axios from "axios"

export const ReimbursementContainer: React.FC<any> = (incomingEndpoint:string) => {

    //State variable to store an array of employee data (whihc will be sent in as props)
    const[reimbursements, setReimbursements] = useState<ReimbursementInterface[]>([])
    const[endpoint, setEndpoint] = useState<string>("")

    //useEffect that populates the employees array with incoming employee data
    //(This emulates a get all that happens on the component render... view all reimbs for instance)

    useEffect(()=>{getReimbursements()},[])

    const getReimbursements = async () => {

        setEndpoint(incomingEndpoint)

        //our GET request (remember to send withCredentials to confirm the user is logged in)
        const response = await axios.get("http://localhost:8080/reimbursements" + endpoint, {withCredentials:true}).then((response)=>{
            console.log(response.data)
            setReimbursements(response.data)

        }).catch((error)=>{console.log(error);
        })

        //populate the reimbursement state  
        
    }


    return(
        <div>
            <h2>Reimbursements:</h2>

            {/*using the .map() function to rener a Character Component for every element in the characters array*/}
            <div>
                {reimbursements.map((reimbursement:any) => {
                    return <Reimbursement {...reimbursement}  key={reimbursement.reimId}/>
                })}
            </div>

        </div>

        /*
        for every element in the characters array (which holds our character data)...
        render on Character Component

        In the Character Component, we send an individual character object, and a key of the userId 

        What is ...character? This is the "spread operator", which lets us send entire objects as props.
        It lets us avoid having to send each individual character value as a separate props
        */
    )
}