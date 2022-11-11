import React from "react";
import "./topbar.css";
import { NotificationsNone, Language, Settings } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Topbar() {
  const user = useSelector((state) => state.user.currentUser);

  return (
    <>
      <div className="topbar">
        <div className="topbarWrapper">
          <div className="topLeft">
            <span className="logo">IdaWafulaAdmin</span>
          </div>
          <div className="topRight">
            <div className="topbarIconContainer">
              <NotificationsNone />
              <span className="topIconBadge">2</span>
            </div>
            <div className="topbarIconContainer">
              <Language />
              <span className="topIconBadge">2</span>
            </div>
            <div className="topbarIconContainer">
              <Settings />
            </div>
            <Link to={`/user/:${user._id}`} className="link">
              <img
                src={`${user.pic}`}
                alt={`${user.name}`}
                className="topAvatar"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
