import logo from './logo.svg';
import './App.css';


import {BrowserRouter} from 'react-router-dom'


import {Switch,Route} from 'react-router-dom'

import Sukras from './SuskrasMain/index'

function App() {
  return (
    <BrowserRouter>
       <Switch>
          <Route path="/" component={Sukras}/>
       </Switch>
    </BrowserRouter>
  );
}

export default App;
