import react,{useState} from "react";
import AuthContext from "./AuthContext";

const AuthState = (props) => {
    const [auth, setauth] = useState({});
    const [token, settoken] = useState(null);
    const [adminname, setadminname] = useState("");

  return (
    <AuthContext.Provider value={{auth,setauth,adminname, setadminname,token, settoken}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthState;