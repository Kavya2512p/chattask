import React, { createContext } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Context = createContext();

export default function Main(props) {
    
    const notify = (msg, status) => toast(msg, { type: status ? 'success' : "warning" });

    return (
        <Context.Provider value={{ notify }}>
            <ToastContainer />
            {props.children}
        </Context.Provider>
    )
}

export { Context };