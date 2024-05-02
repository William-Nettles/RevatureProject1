import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserInterface } from "../../interfaces/UserInterface"
import { User } from "./User"


//component to display a user's account
//A manager can use this page to view employees as well

export const Account:React.FC = ()=>{

    const navigate = useNavigate()
    const [user, setUser] = useState<UserInterface>({
        username:"willnettles",
        role:"MANAGER",
        userId:2,
        firstName:"William",
        lastName:"Nettles"
    })

    const [userTemp, setUserTemp] = useState<UserInterface>({
            username:"willnettles",
            role:"USER",
            userId:2,
            firstName:"William",
            lastName:"Nettles"
    })

    
    return(
       <div>
        <h2>Account Information</h2>
        <div>
            <button className="button" onClick={()=> {navigate("/home")}}>Back</button>
        </div>

        <div>
            <h3>Username: {user.username}</h3>
            <h3>Name: {user.firstName} {user.lastName}</h3>
            <h3>Role: {user.role}</h3>
        </div>
        {user.role==="MANAGER" && <div>
            <h2>All Users:</h2>
            <User {...userTemp}/>
            
            
        </div>}

        </div>
    )
}