import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter } from "react-router-dom";

import { Switch, Route } from "react-router-dom";

import Sukras from "./SuskrasMain/index";

import SelectCategory from "./Select-Category";

import Beautyzone from "./BeautyZone/index";

import Protectedroute from "./Protectedroute";

import SelectedService from "./SelectedService/index";

import SuccessfullyBooked from "./SuccessfullyBooked";

import FashionZone from "./FashionZone";

import FashionCart from "./FashionCart";

import Cart from "./Cart";

import NotFound from "./NotFound";
import Detailedview from "./Detailedview";

import FashionCategory from "./FashionCategory";

import SuccessfullyBookedFashion from "./SuccessFullyBookedFashion";

import SuccessEvent from "./SuccessEvent";

import FashionDetailedView from "./FashionDetailedView";
import EventManagement from "./EventManagement";
import MyOrders from "./MyOrders";

import AboutUs from "./aboutus/aboutus";

import Dashboard from "./AdminDashboard";

import Training from "./training/training";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={SelectCategory} />
        <Route exact path="/beautyzone" component={Beautyzone} />
        <Route exact path="/fashionzone" component={FashionZone} />
        <Route exact path="/eventManagement" component={EventManagement} />
        <Route
          exact
          path="/fashioncategory/:category"
          component={FashionCategory}
        />

        <Route
          exact
          path="/fashioncategory/detailedview/:type/:name/:id"
          component={FashionDetailedView}
        />
        <Protectedroute
          exact
          path="/fashioncart/:zone"
          component={FashionCart}
        />
        <Protectedroute
          exact
          path="/fashioncart/:fashioncategory/:type/:name/:id"
          component={FashionCart}
        />
        <Protectedroute exact path="/cart/:zone" component={Cart} />
        <Protectedroute exact path="/cart/:zone/:id" component={Cart} />
        <Protectedroute
          exact
          path="/cart/:zone/:id/:details"
          component={Cart}
        />
        <Route exact path="/:category/:id" component={SelectedService} />

        <Route exact path="/:category/:id/:details" component={Detailedview} />
        <Protectedroute
          exact
          path="/succefullyBooked"
          component={SuccessfullyBooked}
        />
        <Protectedroute
          exact
          path="/succefullyBookedFashion"
          component={SuccessfullyBookedFashion}
        />
        <Protectedroute exact path="/successEvent" component={SuccessEvent} />
        <Protectedroute
          exact
          path="/myorders/myorders/myorders/:zone"
          component={MyOrders}
        />
        <Protectedroute exact path="/admindashboard" component={Dashboard} />
        <Route exact path="/login" component={Sukras} />
        <Route exact path="/aboutus" component={AboutUs} />
        <Route exact path="/training" component={Training} />
        <NotFound />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
