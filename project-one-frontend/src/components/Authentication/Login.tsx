import axios from "axios"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserInterface } from "../../interfaces/UserInterface"
import { state } from "../../globalData/store"

//component for login. Users can login or navigate to signup

export const Login:React.FC = () => {

    const[user,setUser] = useState<UserInterface>({
        userId:0,
        username:"",
        password:""
    })
    
    const navigate = useNavigate()
    const login = async () => {

        console.log(user.username + user.password)
        const response = await axios.post("http://localhost:8080/users/login", user,
            {withCredentials:true}
        ).then((response)=> {
            console.log(response.data)
            state.userSessionData = response.data
            alert("Welcome, " + state.userSessionData.username)
            navigate("/home")
        }).catch((response)=>{
            console.log(response.data)
            alert("Login failed")
            console.error();           
        })   
    }

    const storeValues = (input:any) => {

        if(input.target.name === "username") {
            setUser((user) => ({...user, username:input.target.value}))
        } else {
            setUser((user) => ({...user, password:input.target.value}))
        }
        
    }

    return(
       <div className="login">
            <div className="text-container">
                <h1>Company Reimbursement Center</h1>
                <h3>Sign in:</h3>

                <div className="input-container">
                    <input type="text" placeholder="username" name="username" onChange={storeValues}/>
                </div>

                <div className="input-container">
                    <input type="password" placeholder="password" name="password" onChange={storeValues}/>
                </div>

                <button className="login-button" onClick={login}>Login</button>
                <button className="login-button" onClick={()=> navigate("/register")}>Create Account</button>
            </div>
        </div>
    )
}