import "./avatar.css";
import { useEffect, useState, useContext } from "react";
import { OffCanvas, OffCanvasMenu, OffCanvasBody } from "react-offcanvas";
import axios from "axios";
import { Context } from "../../../App";
import PerfilPic from "../../../images/perfilmessage.png";

import { NavLink } from "react-router-dom";

export default function Avatar() {
  const [userInfo, setUserInfo] = useState(undefined);
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const datalogged = useContext(Context);
  const { user, setUser } = useContext(Context);

  useEffect(() => {
    console.log(datalogged);
    async function FetchData() {
      try {
        const resp = await axios.get(
          `http://localhost:3001/api/users/${datalogged.id}`,
        );
        console.log(datalogged);
        let user = resp.data;
        setUserInfo(user);
        console.log(userInfo);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    }
    FetchData();
  }, [datalogged]);

  /* set the status of the profile menu*/
  const handleMenu = () => {
    setIsMenuOpened(!isMenuOpened);
  };
  const handleLogout = () => {
    window.localStorage.removeItem("userlogged");
    setUser(null);
  };
  return (
    <div>
      <OffCanvas
        width={300}
        transitionDuration={300}
        effect={"overlay"}
        isMenuOpened={isMenuOpened}
        position={"left"}
      >
        <OffCanvasBody>
          {" "}
          <div className="offCanvasBody">
            <img
              alt="Profile pic"
              className="perfilImg"
              height="40px"
              width="40px"
              src={PerfilPic}
              onClick={handleMenu}
            ></img>
          </div>
        </OffCanvasBody>

        <OffCanvasMenu className="card" style={{ height: "100vh" }}>
          <div className="container " style={{ height: "100vh" }}>
            <div className="profilePicture">
              <img
                height="40px"
                width="40px"
                src={PerfilPic}
                alt="imagen de perfil"
              ></img>
            </div>
            <div className="avatarInfo">
              {isLoading ? (
                <div className="text-center">
                  <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                </div>
              ) : (
                <>
                  <h3> userName : {userInfo.username}</h3>
                  <p> email : {userInfo.email}</p>
                  <div className="description"></div>
                  <NavLink className="logout" to={`/`} onClick={handleLogout}>
                    logout
                  </NavLink>
                  <button onClick={handleMenu}>Cerrar</button>
                </>
              )}
            </div>
          </div>
        </OffCanvasMenu>
      </OffCanvas>
    </div>
  );
}
