import React from 'react';
import { Dialog} from '@mui/material';
import StudentForm from './StudentForm';

export default function Popup({title,children,openPopup,setOpenPopup}) {

    return (
        <Dialog open={openPopup} onClose={() => setOpenPopup(false)}>
            <StudentForm openPopup={openPopup}/>
        </Dialog>
    );
}