import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import swal from 'sweetalert';

function ListEmployee() {
    const [data, setData] = useState([]);
    const [firstName, setFirstName] = useState([]);
    const [lastName, setLastName] = useState([]);
    const [email, setEmail] = useState([]);
    const [userId, setUserId] =useState(null)

    // const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    function getData() {
        fetch("http://localhost:3000/posts").then((result) => {
            result.json().then((resp) => {
                setData(resp)
            })
        })
    }

    function deleteData(id) {
        fetch(`http://localhost:3000/posts/${id}`, {
            method: 'DELETE',
        }).then((result) => {
            result.json(result).then((resp) => {
                console.log(resp)
                getData();
            })
        })
    }

    function selectUser(id) {
        fetch(`http://localhost:3000/posts/${id}`).then((result) => {
            result.json().then((resp) => {
                console.log(resp);
                setFirstName(resp.firstName);
                setLastName(resp.lastName)
                setEmail(resp.email);
                setUserId(resp.id)

            })
        })
    }

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
                   
                   }
            })
        })
        setFirstName('');
        setLastName('');
        setEmail('');
    }


    return (
        <div className="container">
            <h2 className="text-center">Employees List</h2>
            <div className="row">
                <Link style={{ width: '12%' }} className=" btn btn-primary" to="/createemployee">Add Employee</Link>
            </div>
            <br></br>
            <div className="row">
                <table className="table table-striped table-bordered">

                    <thead>
                        <tr>
                            <th> Employee First Name</th>
                            <th> Employee Last Name</th>
                            <th> Employee Email Id</th>
                            <th> Actions</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            data.map((item) =>
                                <tr>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <Link to={`/updateemployee/${item.id}`}  className="btn btn-success">Update</Link>
                                        <button data-toggle="modal" data-target="#myModal" className="btn btn-danger mx-3">Delete</button>
                                        <Link to={`/viewemployee/${item.id}`} className="btn btn-info">View</Link>

                                    </td>
                                    <div className="modal" id="myModal">
                                        <div className="modal-dialog modal-dialog-centered">
                                            <div className="modal-content">

                                                <div className="modal-header">
                                                    <h4 className="modal-title">Modal Heading</h4>
                                                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                                                </div>

                                                <div className="modal-body">
                                                    Are you Sure you want to delete ?
                                                </div>

                                                <div className="modal-footer">
                                                    <button type="button" className="btn btn-success" data-dismiss="modal">Close</button>
                                                    <button type="button" onClick={() => deleteData(item.id)} class="btn btn-danger" data-dismiss="modal">Delete</button>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </tr>


                            )
                        }




                    </tbody>
                </table>


            </div>



        </div>
    )
}

export default ListEmployee