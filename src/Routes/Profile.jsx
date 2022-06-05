import { useGlobalState } from "../GlobalState";
import { axiosGet } from "../data";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { BuyIcon, CalendarIcon, ClockIcon, HistoryIcon, InventoryIcon, LogoutIcon, NewUserIcon, SettingsIcon } from "../Icons";

export default function Profile() {
  const [state, dispatch] = useGlobalState();
  const userID = state.currentUser.user_id;
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
  }, [state.currentUser]);

  console.log("User: ", userInfo);

  function logoutHandler() {
    localStorage.removeItem("user");
    dispatch((state.currentUser = null));
    dispatch({ view: 0 });
  }

  function navigate(destination) {
    dispatch({view: destination})
  }

  return (
    <>
      <h1>Profile</h1>
      <div>Hello {userInfo ? userInfo.first_name : ""}!</div>
      <div>
        You are functioning in the {userInfo ? userInfo.groups[0].name : ""}{" "}
        role.
      </div>
      <div className="button-tray">
      <button
        className="tile-button"
        style={{ backgroundColor: "green" }}
        onClick={() => navigate(1)}
      >
        <BuyIcon />
        Buy
      </button>
      <button
        className="tile-button"
        style={{ backgroundColor: "purple" }}
        onClick={() => navigate(2)}
      >
        <HistoryIcon />
        History
      </button>
      <button
        className="tile-button"
        style={{ backgroundColor: "blue" }}
        onClick={() => navigate(3)}
      >
        <SettingsIcon />
        Settings
      </button>
      {/* This should link to the django admin page for user creation. */}
      <button
        className="tile-button"
        style={{ backgroundColor: "#ffbe0b" }}
      >
        <NewUserIcon />
        New Employee
      </button>
      <button
        className="tile-button"
        style={{ backgroundColor: "#ff006e" }}
        onClick={() => navigate(6)}
      >
        <ClockIcon />
        Time Card
      </button>
      <button
        className="tile-button"
        style={{ backgroundColor: "#fb5607" }}
        onClick={() => navigate(5)}
      >
        <CalendarIcon />
        Calendar
      </button>
      <button
        className="tile-button"
        style={{ backgroundColor: "#3a86ff" }}
      >
        <InventoryIcon />
        Inventory
      </button>
      <button className="tile-button" onClick={logoutHandler}>
        <LogoutIcon />
        Logout
      </button>
      </div>
    </>
  );
}
