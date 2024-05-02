import { useState } from "react"
import { UserInterface } from "../../interfaces/UserInterface"
import axios from "axios";

export const User: React.FC<UserInterface> = (userState:UserInterface) => {

    const [checkbox, setCheck] = useState(false)
    const check = () => {
        setCheck(!checkbox)
    }

    const [user, setUser] = useState<UserInterface>(userState)

    const changeRole = async () => {
        const response = "Updated Role" //await axios()
        alert("Role updated for " + user.username)
        setUser((user) => ({...user, role:"MANAGER"}))
        setCheck(!checkbox)
    }

    //this will render a view for the character coming in as props
    return (
        <div className="user-container">
            <div className="user-id">
                <h3>{user.username}</h3>
            </div>

            <div className="employee-data">
                <p>Usaer Id: {user.userId}</p>
                <p>Username: {user.username}</p>
                <p>Name: {user.firstName} {user.lastName}</p>
                <div>
                    <span>Role: {user.role}</span> 

                    {user.role === "USER" && <><span> | Promote </span>
                    <input type="checkbox" id="option1" name="options" value="option1"
                        onChange={check} /></>}

                    {checkbox && <button className="button" onClick={changeRole}>Confirm</button>}
                    
                </div>
                
                

            </div>
        </div>
    )
}