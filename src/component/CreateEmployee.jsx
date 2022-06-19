import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import swal from 'sweetalert';

function CreateEmployee() {
    const[ firstName, setFirstName ] = useState('');
    const[ lastName, setLastName ] = useState('');
    const[ email, setEmail ] = useState('');
    const navigate = useNavigate();



        function postApi(e) {
           
            let data = {firstName, lastName, email}
            fetch("http://localhost:3000/posts", {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) 
            }).then((result) => {
                result.json().then((resp) => {
                    console.log(resp)
                   if(resp != undefined) {
                    swal({
                        title: "Success!",
                        text: "Data Added Sucessfully!",
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

       
    return (
        <div>
            <br></br>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3">

                        <div className="card-body">
                            <form>
                                <div className="form-group">
                                    <label> First Name: </label>
                                    <input placeholder="First Name" name="firstName" 
                                    className="form-control" value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label> Last Name: </label>
                                    <input placeholder="Last Name" 
                                    name="lastName" className="form-control" value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label> Email Id: </label>
                                    <input placeholder="Email Address" 
                                    name="emailId" className="form-control"  value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>

                                <button type="button" onClick={postApi} className="btn btn-success  mt-3" >Save</button>
                                <button className="btn btn-danger  mt-3" style={{ marginLeft: "10px" }}>Cancel</button>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CreateEmployee