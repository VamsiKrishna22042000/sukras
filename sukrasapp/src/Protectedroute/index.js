import {
  withRouter,
  Redirect,
  Route,
} from "react-router-dom/cjs/react-router-dom.min";

import Sukras from "../SuskrasMain";

import Cookies from "js-cookie";

const ProtectedRoute = (props) => {
  const obtainedCookie = Cookies.get("jwt_token");
  const userCookie = Cookies.get("jwt_user");
  if (obtainedCookie === undefined || userCookie === undefined) {
    return <Redirect to="/" />;
  }
  return <Route {...props} />;
};

export default withRouter(ProtectedRoute);
