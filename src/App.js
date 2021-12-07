import './App.css';
import { Switch, Route, Link } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './components/shop/shop.component';
import Header from './components/header/header.component';

const HatsPage = props => {
  console.log(props);
  return (
   <div>
     <Link to="/">Link to home page</Link>
     <h1>HATS PAGE</h1>
   </div>
  );
};

function App() {
  return (
    <div>
        <Header/>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/hats" component={HatsPage} />
          <Route path="/shop" component={ShopPage} />  
        </Switch>
        </div>
  );
}

export default App;
