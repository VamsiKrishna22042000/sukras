import logo from './logo.svg';
import './App.css';


import {BrowserRouter} from 'react-router-dom'


import {Switch,Route} from 'react-router-dom'

import Sukras from './SuskrasMain/index'

import SelectCategory from './Select-Category';

import EmailLogin from './Email login';

import Beautyzone from './BeautyZone/index';

import Protectedroute from './Protectedroute';

import SelectedService from './SelectedService/index';

import NotFound from './NotFound';
import Detailedview from './Detailedview';

function App() {
  return (
    <BrowserRouter>
       <Switch>
          <Route exact path="/email-login" component={EmailLogin} />
          <Protectedroute exact path ="/" component={Sukras}/>
          <Protectedroute exact path="/select-category" component={SelectCategory}/>
          <Protectedroute exact path="/beautyzone" component={Beautyzone}/>
          <Protectedroute exact path='/:category/:id' component={SelectedService}/>
          <Protectedroute exact path="/:category/:id/:details" component={Detailedview}/>
          <NotFound/>
       </Switch>
    </BrowserRouter>
  );
}

export default App;
