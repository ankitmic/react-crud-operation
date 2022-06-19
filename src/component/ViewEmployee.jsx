import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';

function ViewEmployee() {
    const [data, setData] = useState([]);

    const {id} = useParams();

    useEffect(() => {
        loadUser();
    }, [])

    function loadUser() {
        fetch(`http://localhost:3000/posts/${id}`).then((result) => {
            result.json().then((resp) => {
                console.log(resp);
                setData(resp)
            })
        })
    }
    return(
        <div className='container mt-5'>
            <ul className='list-group w-50'>
                <li className='list-group-item'>FirstName: {data.firstName}</li>
                <li className='list-group-item'>LastName: {data.lastName}</li>
                <li className='list-group-item'>Email: {data.email}</li>

            </ul>
           
        </div>
    )
}

export default ViewEmployee;