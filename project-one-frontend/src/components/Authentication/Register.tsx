import { useNavigate } from "react-router-dom"
import { UserInterface } from "../../interfaces/UserInterface"
import { useState } from "react"
import axios from "axios"

//for account creation
//users can create an account or navigate back to login

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

        if(input.target.name === "firstname") {
            setUser((user) => ({...user, firstName:input.target.value}))
        } else if (input.target.name === "lastname") {
            setUser((user) => ({...user, lastName:input.target.value}))
        } else if (input.target.name === "username") {
            setUser((user) => ({...user, username:input.target.value}))
        } else {
            setUser((user) => ({...user, password:input.target.value}))
        }
        
    }

     const register = async ()=> {
        
        await axios.post("http://localhost:8080/users", user).then(()=>{
            //after registration, send user back to login page
        navigate("/")
        }).catch(()=>{
            alert("Username is already taken.")
        })

        

        
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