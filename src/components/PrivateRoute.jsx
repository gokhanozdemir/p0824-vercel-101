import { Redirect, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
export default function PrivateRoute({ children, ...rest }) {
    let {isLoggedIn} = useAuth();
    return (
      <Route
        {...rest}
        render={({ location }) =>
        isLoggedIn ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }