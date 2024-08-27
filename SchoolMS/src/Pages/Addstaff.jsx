import React, { useState } from 'react';
import { TabContext,Tablist,TabPanel } from '@mui/lab';
import { Box,Tab } from '@mui/material';

const Staff =()=>{
    const [staff,setStaff]=useState({
        id:"",
        Name:"",
        Age:"",
        DOB:"",
        Gender:"",
        City:"",
        Subject:""
    });
    const [value,setValue]=useState('1');

    return(
        <div className="px-5 mt-3">
            <div className="justify-content-center flex-column">
                <div className="d-flex justify-content-center">
                    <div className="p-1 rounded w-100 border full-width">
                        <h2></h2>
                    </div>
                </div>
            </div>
        </div>
    )
}