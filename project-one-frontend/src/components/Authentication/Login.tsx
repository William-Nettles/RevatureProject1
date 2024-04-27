import axios from "axios"
import { ChangeEvent, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserInterface } from "../../interfaces/UserInterface"

export const Login:React.FC = () => {

    const[user,setUser] = useState<UserInterface>({
        role:"",
        firstName:"",
        lastName:"",
        username:"",
        password:""
    })
    
    const navigate = useNavigate()
    const login = async () => {

        //console.log(user.username + user.password)
        //const response = await axios.post("localhost:8080/users", user)
        navigate("/home")
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