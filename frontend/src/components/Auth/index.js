import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import Loader from "../UI/Loader.js";
import  axios  from "axios";
// import { useDispatch } from "react-redux"
// import { signupWithEmailAndPassword } from "../../action/auth"

export const Login = () => {
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  const params = useParams();
  console.log(params);

  const handleInput = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmission = (e) => {
    e.preventDefault();
    console.log(details);
  };

  return (
    <div className="auth-container">
      <div className="auth-container--box">
        <div className="tab-selector">
          <NavLink to={"/login"}>
            <h3>Login</h3>
          </NavLink>
        </div>
        <form autoComplete={"off"} onSubmit={handleSubmission}>
          <div className="input-wrap">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              placeholder="Enter Email"
              value={details.email}
              onChange={handleInput}
            />
          </div>
          <div className="input-wrap">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={details.password}
              onChange={handleInput}
            />
          </div>
          <div className="button-wrap">
            <button className="login-btn">
              {"Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export const Signup=()=>{
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });
  // const params = useParams();
  // console.log(params);
  const [loader, setLoader] = useState(false);
  // const dispatch = useDispatch()
  // const history = useNavigate()


  const handleSignupInput = (e) => {
    setDetails({
      ...details,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignupSubmission = (e) => {
  //   setLoader(true)
  //  console.log("hey");
  //   dispatch(signupWithEmailAndPassword(details, data => {
  //     console.log(details);
  //     console.log(data);
  //       if(data.error) {
  //           console.log(data.error)
  //           alert("Some error occurred")
  //       }
  //       else {
  //           console.log("Successfully Signed up!")
  //           history("/", {replace: true})
  //       }
  //       setLoader(false)
  //     }))
    e.preventDefault();
    // console.log(details);
    signupWithEmailAndPassword();
  };

  const signupWithEmailAndPassword=async()=>{
    setLoader(true)
    try { 
      const response =await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDk7Dyx8EHd_jy1lyDK5ND-dXKQMZ8z5N0`,{
        email:details.email,
        password:details.password,
        returnSecureToken:true
      })
     
      console.log(response);
    } catch (error) {
      console.log(error.response);
    } finally {
      setLoader(false);
    }
  
  }


  return(<>
    <div className="auth-container">
    <div className="auth-container--box">
      <div className="tab-selector">
        <NavLink to={"/signup"}>
          <h3>Signup</h3>
        </NavLink>
      </div>
      <form autoComplete={"off"} onSubmit={handleSignupSubmission}>
        <div className="input-wrap">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            placeholder="Enter Email"
            value={details.email}
            onChange={handleSignupInput}
          />
        </div>
        <div className="input-wrap">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={details.password}
            onChange={handleSignupInput}
          />
        </div>
        <div className="button-wrap">
          <button className="login-btn">
            {"Signup"}
          </button>
        </div>
      </form>
    </div>
  </div>
  {loader && <Loader/>}
  </>
  )

}

// export default Login,Signup;
