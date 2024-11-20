import React from 'react';
import { FaBook } from "react-icons/fa";


const Logo =()=>{
    return(
        <div className="logo" style={{display:'flex',alignItems:'center'}}>
            <div className="logo-icon" style={{marginRight:'8px'}}>
            <FaBook size={24}/>
            </div>
            <div className="logo-text">
                EDUGRID-Parents
            </div>
        </div>
    );
};

export default Logo;