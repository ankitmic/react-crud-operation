import React, { useState, useEffect } from 'react';
import swal from 'sweetalert';
import { Link, useParams } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function UpdateEmployee(props) {
    const [firstName, setFirstName] = useState([]);
    const [lastName, setLastName] = useState([]);
    const [email, setEmail] = useState([]); 
    const [userId, setUserId] =useState(null);
    const [data, setData] = useState([]);
    const params = useParams();
    const { id } = params;
    const navigate = useNavigate();



    useEffect(() => {
        getData();
    }, [])

    function getData() {
        fetch("http://localhost:3000/posts/" + id).then((result) => {
            result.json().then((resp) => {
                setFirstName(resp.firstName);
                setLastName(resp.lastName)
                setEmail(resp.email);
                setUserId(resp.id)
            })
        })
    }

    // function selectUser(id) {
    //     fetch(`http://localhost:3000/posts/${id}`).then((result) => {
    //         result.json().then((resp) => {
    //             console.log(resp);
    //             setFirstName(resp.firstName);
    //             setLastName(resp.lastName)
    //             setEmail(resp.email);
    //             setUserId(resp.id)

    //         })
    //     })
    // }

    function updateData() {
        let item = {firstName, lastName, email, userId}
        // console.log(item);
        fetch(`http://localhost:3000/posts/${userId}`, {
            method: 'PUT',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(item)
        }).then((result) => {
            result.json().then((resp) => {
                // console.log(resp);
                getData();
                if(resp != undefined) {
                    swal({
                        title: "Success!",
                        text: "Data Updated Sucessfully!",
                        icon: "success",
                        button: "OK!",
                      });
                      setTimeout(() => {
                        navigate("/");
                    }, 2000)
                   
                   }
            })
        })
        setFirstName('');
        setLastName('');
        setEmail('');
    }
    return(
        <div className='container'>
            
            <form>
                    <h2 className="text-center">Update List</h2>

                    <div className="form-group">
                        <label> First Name: </label>
                        <input placeholder="First Name" name="firstName"
                            className="form-control"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label> Last Name: </label>
                        <input placeholder="Last Name"
                            name="lastName" className="form-control"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label> Email Id: </label>
                        <input placeholder="Email Address"
                            name="emailId" className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <button type="button" onClick={updateData} className="btn btn-success  mt-3" >Save</button>
                    <Link to="/"  className="btn btn-danger  mt-3" style={{ marginLeft: "10px" }}>Cancel</Link>
                </form>
        </div>
    )
}

export default UpdateEmployee;