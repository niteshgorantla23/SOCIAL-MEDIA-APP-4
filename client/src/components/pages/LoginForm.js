import { fetchData } from "../../main.js";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/user/userContext.js";

function LoginForm() {
    const navigate = useNavigate();
    // const [user, setUser] = useState({
    //     username: '',
    //     password: ''
    // });
    const {user, updateUser} = useContext(UserContext);

    const {username, password} = user;

    // const onChange = (e) => setUser({...user, [e.target.name]: e.target.value})
    const onChange = (e) => updateUser(e.target.name, e.target.value);

    const onSubmit = (e) => {
        e.preventDefault();
    

        fetchData("/user/login", {username, password}, "POST")
        .then((data) => {
            if(!data.message){
                console.log(data._id);
                updateUser("authenticated",true);
                // updateUser("user_id",data._id);
                navigate("/profile");
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
                    <h2 class="mb-5">LOGIN</h2>
                    <form onSubmit={onSubmit}>
                        <div class="mb-3">
                            <label class="form-label">Email address</label>
                            <input type="email" class="form-control"  aria-describedby="emailHelp" name="username"  onChange={onChange} value={username} required />
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Password</label>
                            <input type="password" class="form-control" name="password"  onChange={onChange} value={password} required  />
                        </div>
                        <button type="submit" class="btn btn-success"><strong>Login</strong></button>
                    </form>
                </div>

            </div>
        </div>

    );
}

export default LoginForm;