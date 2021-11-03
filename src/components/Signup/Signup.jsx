import { Header } from "../header";
import { useReducer } from "react";
import "../Login/Login.css";
import { signupReducer } from "../Signup/signupReducer";
import { useAuth } from "../Context/authProvider";
import { SET_NEWUSER_INFO } from "../utils/constants";
import { signUpService } from "../ServerCalls/ServerCalls";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();
  const newUserInfo = {
    firstname: "",
    lastname: "",
    email: "",
    password: ""
  };
  const [signupState, signupDispatch] = useReducer(signupReducer, newUserInfo);

  function signupDataHandler(e) {
    console.log(e.target.name);
    console.log(e.target.value);
    signupDispatch({
      type: SET_NEWUSER_INFO,
      payLoad: { field: e.target.name, value: e.target.value }
    });
  }

  async function signupHandler() {
    const { firstname, lastname, email, password } = signupState;
    const response = await signUpService(firstname, lastname, email, password);
    console.log(response);
    if (response.status === 201) {
      navigate("/login");
      toast.success(`User registered succesfully`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true
      });
    } else {
      toast.dark(`User registration fail.Please try again`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true
      });
    }
  }
  return (
    <>
      <Header />
      <div className="inputForm">
        <div className="box">
          <div className="form">
            <input
              className="form__input"
              type="text"
              name="firstname"
              value={signupState.firstname}
              onChange={signupDataHandler}
              required
            ></input>
            <label class="form__label">First Name</label>
          </div>
          <div className="form">
            <input
              className="form__input"
              type="text"
              name="lastname"
              value={signupState.lastname}
              onChange={signupDataHandler}
              required
            ></input>
            <label class="form__label">Last Name</label>
          </div>
          <div className="form">
            <input
              className="form__input email"
              type="text"
              name="email"
              value={signupState.email}
              onChange={signupDataHandler}
              required
            ></input>
            <label className="form__label">email</label>
          </div>
          <div className="form">
            <input
              className="form__input"
              type="password"
              name="password"
              value={signupState.password}
              onChange={signupDataHandler}
              required
            ></input>
            <label className="form__label">password</label>
          </div>
          <div className="btn__container">
            <button className="btn btn--primary login" onClick={signupHandler}>
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
