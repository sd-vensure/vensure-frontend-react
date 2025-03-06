import react,{useState} from "react";
import ModalContext from "./ModalContext";

const ModalState = (props) => {

  const [loader, setloader] = useState(false);
  const [modal, setmodal] = useState(false);
  const [modalmessage,setmodalmessage]=useState({
    "text1":"",
    "text2":""
  });

  return (
    <ModalContext.Provider value={{loader, setloader,modal,setmodal,modalmessage,setmodalmessage}}>
      {props.children}
    </ModalContext.Provider>
  )
}

export default ModalState;