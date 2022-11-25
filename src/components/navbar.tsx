import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth"; // instelé npm i react-firebase-hooks para que actualice toda la info cuando se cambia de acc
import { signOut } from "firebase/auth";
import HomeIcon from "@material-ui/icons/Home";
import CreateIcon from "@material-ui/icons/Create";
import LogoutIcon from "@mui/icons-material/Logout";
import LoginIcon from '@mui/icons-material/Login';

export const Navbar = () => {
  const [user] = useAuthState(auth);

  const signUserOut = async () => {
    await signOut(auth);
  };

  return (
    <div className="navbar">
      <div className="user">
        {user && ( // si el usuario esta loggeado, que muestre la foto, npmbre y la opcion de log out, sino no
          <>
            <img
              src={user?.photoURL || ""}
              width="50"
              height="50"
              alt="your pic"
            />
            <p> @{user?.displayName} </p>
            <button onClick={signUserOut}>
              <LogoutIcon />
            </button>
          </>
        )}
      </div>
      <div className="links">
        <Link to="/">
          <HomeIcon />
        </Link>
        {!user ? (
          <Link to="/login"><LoginIcon/></Link>
        ) : (
          <Link to="/createpost">
            <CreateIcon />
          </Link>
        )}
      </div>
    </div>
  );
};
