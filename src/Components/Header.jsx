import React from "react";
import styles from "../Styles/header.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { RxCross2 } from "react-icons/rx";

function Header({ sidebarRender, setsidebarRender, renderIcon }) {
  const handleClick = () => {
    setsidebarRender(!sidebarRender);
    console.log("clicked");
  };
  return (
    <>
      <div className={styles.header}>
        <div className={styles.header_wrapper}>
          <div className={styles.menu}>
            {sidebarRender ? (
              <RxCross2
                style={{ width: "25px", height: "25px", color: "#58c9ec" }}
                onClick={handleClick}
              />
            ) : (
              renderIcon && (
                <GiHamburgerMenu
                  onClick={handleClick}
                  style={{ width: "25px", height: "25px", color: "#58c9ec" }}
                />
              )
            )}
          </div>

          <h1 className={styles.header_h1}>Food Management</h1>
        </div>
      </div>
    </>
  );
}

export default Header;
