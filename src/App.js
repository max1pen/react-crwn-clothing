import './App.css';
import { Route, Link } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './components/shop/shop.component';

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
        <Route exact path="/" component={HomePage} />
        <Route path="/hats" component={HatsPage} />
        <Route path="/shop" component={ShopPage} />
    </div>
  );
}

export default App;
