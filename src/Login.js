import React, { useState } from "react"
import AuthService from "./services/auth.service";
import { useGlobalState } from "./GlobalState";
import jwtDecode from "jwt-decode";

const Login = ({handleClose}) => {

  const [ state, dispatch ] = useGlobalState();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    AuthService
      .login(username, password)
      .then(async (resp) => {
        let data = jwtDecode(resp.access)
        await dispatch({
          currentUserToken: resp.access,
          currentUser: data
        })
      });
  }

  //there's probably a way to stack these two together in the onsubmit, but I broke it out into 2.  I handed e down from the submit to the handlelogin to preserve the previous data flow
  function handleSubmit(e){
    handleLogin(e);
    handleClose();
  }

  return (
    <div className="c-form">
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <label htmlFor="pass">Password</label>
          <input
            type="password"
            id="pass"
            name="password"
            minLength="2"
            required
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input className="btn btn-info"
          type="submit"
          value="Sign in"
        />
      </form>
    </div>
  )

}

export default Login