import React,{useState} from "react";

const InputBox = ({ name, type, id, value, placeholder, iconName }) => {

    const [passwordVisible, setPasswordVisible] = useState(false);
    
  return (
    <div className="relative mb-4 w-[100%]">
      <input
        name={name}
        type={type == "password" ? passwordVisible ? "text" : "password" : type}
        placeholder={placeholder}
        defaultValue={value}
        id={id}
        className="input-box"
      />

      <i className={"fi " + iconName + " input-icon"}></i>

          {type == "password" ? <i className={"fi fi-rr-eye" + (!passwordVisible ? "-crossed" : "") + " input-icon left-[auto] right-4 cursor-pointer"} onClick={()=>setPasswordVisible(!passwordVisible)}></i> : ""}
    </div>
    );;
};

export default InputBox;
