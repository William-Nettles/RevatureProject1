import { useNavigate } from "react-router-dom"

export const Home:React.FC = () => {

    const navigate = useNavigate()

    return(
        <div>
            <div>

            </div>

            <div>
                <button className="button" onClick={()=> {navigate("/")}}>Sign Out</button>
            </div>
        </div>
    )
}