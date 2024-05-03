import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserInterface } from "../../interfaces/UserInterface"
import { User } from "./User"
import { state } from "../../globalData/store"
import axios from "axios"
import "./Account.css"



//component to display a user's account
//A manager can use this page to view employees as well

export const Account:React.FC = ()=>{

    const navigate = useNavigate()
    

    const [userTemp, setUserTemp] = useState<UserInterface[]>([])

    useEffect(()=>{getAllUsers()},[])

    const getAllUsers = async () => {

        //our GET request (remember to send withCredentials to confirm the user is logged in)
        await axios.get("http://localhost:8080/users", {withCredentials:true}).then((response)=>{
            setUserTemp(response.data)
            console.log(response.data)
        }).catch((error)=>{console.log(error);
        })

        //populate the user state  
        
    }

    
    return(
       <div>

        {state.userSessionData.userId > 0 ?
        <div className="account-container"> 

            <div className="header-container">
                <h2>Account Information</h2>
            </div>
            
            <div button-container>
                <button className="button" onClick={()=>{navigate("/reimbursements")}}>Reimbursement Portal</button>
                <button className="button" onClick={()=> {navigate("/logout")}}>Log Out</button>
                <button className="button" onClick={()=> {navigate("/home")}}>Home</button>
            </div>

            <div className="account-container">
                <div className="account-info">
                    <h3>Username: {state.userSessionData.username}</h3>
                </div>
                <div className="account-info">
                    <h3>Name: {state.userSessionData.firstName} {state.userSessionData.lastName}</h3>
                </div>
                <div className="account-info">
                    <h3>Role: {state.userSessionData.role}</h3>
                </div>
                
            </div>
            
        </div> : <div className="account-container"> 

            <h2>Please log in to view account information</h2>
            <div className="button-container">
                <button className="button" onClick={()=> {navigate("/home")}}>Back</button>
                <button className="button" onClick={()=> {navigate("/")}}>Log In</button>
            </div>
            

        </div>}

        <div>

            <div className="user-container">

            
            {state.userSessionData.role==="MANAGER" && <div className="manager-view">
                <h2>All Users:</h2>
                {userTemp.map((user, index) =>  
                <div className="user-container">
                    <User {...user}/>
                </div>
            )}
                
            </div>}

            </div>
            </div>

        </div>
    )
}