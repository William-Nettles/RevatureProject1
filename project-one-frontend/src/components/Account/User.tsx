import { useState } from "react"
import { UserInterface } from "../../interfaces/UserInterface"
import axios from "axios";
import { useNavigate } from "react-router-dom";

//For displaying users to a Manager, will allow them to promote employees, fire employees, and view an naviagte to reimbursements

export const User: React.FC<UserInterface> = (userState:UserInterface) => {

    const navigate = useNavigate()

    const [checkbox1, setCheck1] = useState(false)
    const check1 = () => {
        setCheck1(!checkbox1)
    }
    const [checkbox2, setCheck2] = useState(false)
    const check2 = () => {
        setCheck2(!checkbox2)
    }

    const [employed, setEmployed] = useState(true)

    const [user, setUser] = useState<UserInterface>(userState)

    const changeRole = async () => {
        const response = await axios.put("http://localhost:8080/users/" + user.userId, 
        "MANAGER", 
        {withCredentials: true, headers: {"Content-Type": "application/text",},})

            .then((response)=>{
                console.log(response.data)
                alert("Role updated for " + user.username)
                setUser((user) => ({...user, role:"MANAGER"}))
                setCheck1(!checkbox1)
            })
            .catch((error)=>{alert(error)})
    }

    const deleteUser = async () => {
         const response = await axios.delete("http://localhost:8080/users/" + user.userId,
        {withCredentials: true})

            .then((response)=>{
                console.log(response.data)
                alert("Fired " + user.username + ", records deleted.")
                setEmployed(false)
            })
            .catch((error)=>{alert(error)})

    }

    //this will render a view for the employee coming in as props
    return (
        <div className="user-container">

            { employed===true && <div>

                <div className="user-id">
                    <h3>{user.username}</h3>
                </div>

                <div className="employee-data">
                    <p>User Id: {user.userId}</p>
                    <p>Username: {user.username}</p>
                    <p>Name: {user.firstName} {user.lastName}</p>
                    <div>
                        <span>Role: {user.role}</span> 

                        {user.role === "USER" && <><span> | Promote </span>
                        <input type="checkbox" id="option1" name="options" value="option1"
                            onChange={check1} />

                        {checkbox1 && <button className="button" onClick={changeRole}>Confirm</button>}
                        <>
                        <span> | Fire </span>
                        <input type="checkbox" id="option2" name="options" value="option2"
                            onChange={check2} />
                        {checkbox2 && <button className="button" onClick={deleteUser}>Confirm</button>}
                        </>

                        </>}

                        
                    </div>
                    
                    

                </div>
            </div>}
        </div>
    )
}