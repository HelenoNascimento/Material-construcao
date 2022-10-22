
import Axios from "axios";
import { api } from "../utils/config"

// Logout and user
const logout = () =>{
    localStorage.removeItem("user");
}

const login = async(email, senha) =>{
    try {
        const res = await Axios.post(api + "/user/login",{
            email: email,
            senha: senha,
        }).then((response)=> {
            return response.data
        })
        console.log(res.token)
        if(res.token){
            localStorage.setItem("user",res.token);
        }
        return res
        
    } catch (error) {
        console.log(error)
    }
}
const authService = {
   login,
   logout,
}

export default authService