import { fetchData } from "../../main.js";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../../context/user/userContext.js";

function RegisterForm() {
    const navigate = useNavigate();
    const {user, updateUser} = useContext(UserContext);

    const {username, password, cpassword} = user;

    const onChange = (e) => updateUser(e.target.name, e.target.value);

    const onSubmit = (e) => {
        e.preventDefault();
        
        if(password !== cpassword){
            console.log("Passwords must match!!!");
        }
        else{
            console.log("Success!!!");
        }

        fetchData("/user/register", {username, password}, "POST")
        .then((data) => {
            if(!data.message){
                navigate("/login");
            }
            
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (

        <div className=" row">
            <div className="col-sm-12 col-md-8 col-lg-6 offset-md-2 offset-lg-3">
                <div className="card mx-5 my-5 px-5 py-5 shadow-lg p-3 mb-5 bg-white rounded">
                    <h2 className="mb-5">REGISTER</h2>
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Email address</label>
                            <input type="email" className="form-control"  aria-describedby="emailHelp" name="username" onChange={onChange} value={username} required />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" name="password" onChange={onChange} value={password} required  />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" name="cpassword" onChange={onChange} value={cpassword} required />
                        </div>
                        <button type="submit" className="btn btn-success"><strong>Register</strong></button>
                    </form>
                </div>

            </div>
        </div>

    );
}

export default RegisterForm;