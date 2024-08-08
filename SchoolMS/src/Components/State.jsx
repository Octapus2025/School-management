import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const State = () => {

    const [state, setState] = useState([])

    useEffect(()=> {
        axios.get('http://localhost:3000/auth/state')
        .then(result => {
            if(result.data.Status) {
                setState(result.data.Result);
            } else {
                alert(result.data.Error)
            }
        }).catch(err => console.log(err))
    }, [])
  return (
    <div className='px-5 mt-3'>
        <div className='d-flex justify-content-center'>
            <h3>State List</h3>
        </div>
        <Link to="/dashboard/add_state" className='btn btn-success'>Add Cetegory</Link>
        <div className='mt-3'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.map(s => (
                            <tr>
                                <td>{s.name}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>

    </div>
  )
}

export default State