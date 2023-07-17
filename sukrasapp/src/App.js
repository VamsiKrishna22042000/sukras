import logo from "./logo.svg";
import "./App.css";

import { BrowserRouter } from "react-router-dom";

import { Switch, Route } from "react-router-dom";

import Sukras from "./SuskrasMain/index";

import SelectCategory from "./Select-Category";

import EmailLogin from "./Email login";

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

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/email-login" component={EmailLogin} />
        <Protectedroute exact path="/" component={Sukras} />
        <Protectedroute
          exact
          path="/select-category"
          component={SelectCategory}
        />
        <Protectedroute exact path="/beautyzone" component={Beautyzone} />
        <Protectedroute exact path="/fashionzone" component={FashionZone} />
        <Protectedroute
          exact
          path="/eventManagement"
          component={EventManagement}
        />
        <Protectedroute
          exact
          path="/fashioncategory/:category"
          component={FashionCategory}
        />
        <Protectedroute
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
        <Protectedroute
          exact
          path="/:category/:id"
          component={SelectedService}
        />
        <Protectedroute
          exact
          path="/:category/:id/:details"
          component={Detailedview}
        />
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
        <NotFound />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
