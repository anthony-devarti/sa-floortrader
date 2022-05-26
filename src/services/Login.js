import React, { useEffect, useState } from "react"
import AuthService from "./auth.service";
import { useGlobalState } from "../GlobalState";
import jwtDecode from "jwt-decode";

const Login = ({ handleClose }) => {

  const [state, dispatch] = useGlobalState();

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
        dispatch({view:4})
      });
  }
  useEffect(() => {
    let user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      dispatch({ view: 4 })
    }
  }, [dispatch])

  return (
    <div >
      <form onSubmit={(e) => handleLogin(e)}>
        <div className="login-form">
          <label className="center" htmlFor="username">Username:</label>
          <input
            className="m-5"
            type="text"
            id="username"
            name="username"
            autoComplete="username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <label className="center" htmlFor="pass">Password</label>
          <input
            className="m-5"
            type="password"
            id="pass"
            name="password"
            minLength="2"
            required
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-grid gap-2 mt-5">
          <input className="btn btn-primary"
            type="submit"
            value="Sign in"
            size="lg"
          />
        </div>
      </form>
    </div>
  )

}

export default Login