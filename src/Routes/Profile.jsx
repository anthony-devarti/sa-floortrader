import { useGlobalState } from "../GlobalState";
import { axiosGet } from "../data";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";

export default function Profile() {
  const [state, dispatch] = useGlobalState();
  const userID = state.currentUser.user_id;
  //I need to get the user info, but only for the user that's logged in.  This will require its own endpoint
  const userEndpoint = `/users/?id=${userID}`;
  const [userInfo, setUserInfo] = useState();

  async function fetchData() {
    const response = await axiosGet(userEndpoint);
    setUserInfo(response.results[0]);
    localStorage.setItem("userInfo", JSON.stringify(response));
    console.log({ response });
  }

  useEffect(() => {
    fetchData();
  }, []);

  console.log("User: ", userInfo);

  function logoutHandler() {
    localStorage.removeItem("user");
    dispatch((state.currentUser = null));
    dispatch({ view: 0 });
  }

  return (
    <>
      <h1>Profile</h1>
      <div>Hello {userInfo ? userInfo.first_name : ""}!</div>
      <div>
        You are functioning in the {userInfo ? userInfo.groups[0].name : ""}{" "}
        role.
      </div>
      <div className="sok-tile-row">
        <div className="sok-tile">
          $<div className="sok-tile-name">Buy</div>
        </div>
        <div className="sok-tile">
          www<div className="sok-tile-name">History</div>
        </div>
        <div className="sok-tile">
          3<div className="sok-tile-name">Settings</div>
        </div>
        <div className="sok-tile">
          3<div className="sok-tile-name">Logout</div>
        </div>
      </div>
    </>
  );
}
