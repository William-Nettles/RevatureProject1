import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserInterface } from "../../interfaces/UserInterface"
import { User } from "./User"
import { state } from "../../globalData/store"
import axios from "axios"
import { error } from "console"


//component to display a user's account
//A manager can use this page to view employees as well

export const Account:React.FC = ()=>{

    const navigate = useNavigate()
    const [user, setUser] = useState<UserInterface>({
        username:state.userSessionData.username,
        role:state.userSessionData.role,
        userId:state.userSessionData.userId,
        firstName:state.userSessionData.firstName,
        lastName:state.userSessionData.lastName
    })

    const [userTemp, setUserTemp] = useState<UserInterface[]>([])

    useEffect(()=>{getAllUsers()},[])

    const getAllUsers = async () => {

        //our GET request (remember to send withCredentials to confirm the user is logged in)
        const response = await axios.get("http://localhost:8080/users", {withCredentials:true}).then((response)=>{
            setUser(response.data)
            console.log(response.data)
        }).catch((error)=>{console.log(error);
        })

        //populate the user state  
        

        
    }

    
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
            {userTemp.map((user, index) =>  <div>
                <User {...user}/>
            </div>
        )}
           
            
            
            
        </div>}

        </div>
    )
}