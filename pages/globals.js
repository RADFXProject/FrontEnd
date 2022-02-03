import React, {useState, createContext} from "react";

export const InfoContext = createContext();

export const InfoProvider = props => {
    const [info, setInfo] = useState({
        email: '',
        role: ''
    });

    return (
        <InfoContext.Provider value={{info}}>
            {props.children}
        </InfoContext.Provider>
    );
}
