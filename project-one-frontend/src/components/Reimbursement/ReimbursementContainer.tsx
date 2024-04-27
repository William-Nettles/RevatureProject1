import { useEffect, useState } from "react"
import { Reimbursement } from "./Reimbursement"

export const ReimbursementContainer: React.FC<any> = (incomingData:any) => {

    //State variable to store an array of employee data (whihc will be sent in as props)
    const[reimbursements, setReimbursements] = useState([])

    //useEffect that populates the employees array with incoming employee data
    //(This emulates a get all that happens on the component render... view all reimbs for instance)
    useEffect(() => {
        //we will set the employee state object to the Array found in the employeeData.ts
        setReimbursements(incomingData.incomingData)

        //yes we could have just set this as default state... useState(incomingData.data)

        //just so we can see the incoming data
        console.log(reimbursements)
    }, [reimbursements, incomingData])

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