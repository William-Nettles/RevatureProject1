import { useNavigate } from "react-router-dom"
import { UserInterface } from "../../interfaces/UserInterface"
import { useState } from "react"
import axios from "axios"

export const Register:React.FC = () => {

    const navigate = useNavigate()

    const[user,setUser] = useState<UserInterface>({
        role:"USER",
        firstName:"",
        lastName:"",
        username:"",
        password:""
    })

    const storeValues = (input:any) => {

        if(input.target.name === "username") {
            setUser((user) => ({...user, username:input.target.value}))
        } else if (input.target.name === "password") {
            setUser((user) => ({...user, password:input.target.value}))
        } else if (input.target.name === "firstname") {
            setUser((user) => ({...user, firstName:input.target.value}))
        } else {
            setUser((user) => ({...user, lastName:input.target.value}))
        }
        
    }

     const register = async ()=> {
        //TODO we still need to implement the backend... this request goes nowhere
        const response = await axios.post("http://localhost:8080/users", user)

        

        //after registration, send user back to login page
        navigate("/")
    }

    return(
        <div>
            <div>
                <p>First Name:</p>
                <input type="text" placeholder="First Name" name="firstname" onChange={storeValues}/>
            </div>
             <div>
                <p>Last Name:</p>
                <input type="text" placeholder="Last Name" name="lastname" onChange={storeValues}/>
            </div>
             <div>
                <p>Userame:</p>
                <input type="text" placeholder="username" name="username" onChange={storeValues}/>
            </div>
             <div>
                <p>Password:</p>
                <input type="password"  placeholder="password" name="password" onChange={storeValues}/>
            </div>

            <div>
                <button className="register-button" onClick={register}>Submit</button>
                <button className="register-button" onClick={()=> {navigate("/")}}>Back</button>
            </div>
        </div>
    )
}