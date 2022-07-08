
import UserContext from "../../context/user/userContext.js";
import { fetchData } from "../../main.js";
import { useContext, Fragment } from 'react';
import axios from "axios";
import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Profile() {
    const { user, updateUser } = useContext(UserContext);

    const authenticated = (
        <Fragment>
            <i>{user.username}</i>
        </Fragment>
    );

    const [poster, setPost] = useState({
        user_id: user.username,
        content: ""
    });

    const [dataPosted, setPostedData] = useState([]);

    const { content } = poster;

    const onChange = (e) => setPost({ ...poster, [e.target.name]: e.target.value });

    useEffect(() => {
        getPosts();
    }, []);

    const getPosts = async () => {

        const allposts = await axios.post("https://my-social-proapp.herokuapp.com/post/view", {

            user_id: user.username
        });
        console.log(allposts.data);
        setPostedData(allposts.data.post);

    };

    const onSubmit = async e => {
        e.preventDefault();


        await axios.post("https://my-social-proapp.herokuapp.com/post/create", poster);
        setPost({
            userid: user.username,
            content: ""

        });
        getPosts();
    }

    const deletePost = async postid => {
        var post_id = postid;
        await axios.delete("https://my-social-proapp.herokuapp.com/post/delete", {
            data: {
                post_id: post_id
            }
        });
        getPosts();

    };

    return (

        <div className=" container">
            <div className="mt-4 p-5 card rounded">
                <center><h2>My Profile</h2></center>
                <center style={{ fontSize: "100px" }}><i className="fa fa-user-circle"></i></center>
                <center><h3 className="mb-5">{authenticated}</h3></center>
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">
                                My Posts
                            </div>
                            <div className="card px-4 py-4">
                            {
                                Object.values(dataPosted).map((postData, index) => (
                                  

                                        <div className="card my-2">
                                            <div className="card-body">
                                            <h5 className="text-dark">{postData.content}</h5>
                                            <button className="btn btn-danger btn-sm" onClick={() => deletePost(postData._id)}>Delete</button>
                                            </div>
                                            
                                        </div>
                                        
                                 
                                ))
                            }
                      </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="card px-5 py-2">
                        <center><h4>Create New Post</h4></center>
                        <form onSubmit={onSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Post</label>

                                <textarea className="form-control" onChange={onChange} name="content" value={content} required></textarea>
                            </div>
                            <button type="submit" className="btn btn-sm btn-primary"><strong>Post</strong></button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        </div >

    );
}

export default Profile;