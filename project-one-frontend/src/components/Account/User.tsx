import { useState } from "react"
import { UserInterface } from "../../interfaces/UserInterface"
import axios from "axios";
import { useNavigate } from "react-router-dom";

//For displaying users to a Manager, will allow them to promote employees, fire employees, and view an naviagte to reimbursements

export const User: React.FC<UserInterface> = (userState:UserInterface) => {

    const navigate = useNavigate()

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

    //this will render a view for the employee coming in as props
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

                    {user.role === "USER" && <div><span> | Promote </span>
                    <input type="checkbox" id="option1" name="options" value="option1"
                        onChange={check} />

                    {checkbox && <button className="button" onClick={changeRole}>Confirm</button>}
                    <div>
                        <button className="button" onClick={()=>{navigate("/reimbursements")}}>View Reimbursements</button>
                    </div>
                    <div>
                        <button className="button" onClick={()=>{}}>Fire</button>
                    </div>

                    </div>}

                    
                </div>
                
                

            </div>
        </div>
    )
}