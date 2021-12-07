import { Switch, Route, Link } from 'react-router-dom';

import './App.css';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './components/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import React from 'react';

const HatsPage = props => {
  console.log(props);
  return (
   <div>
     <Link to="/">Link to home page</Link>
     <h1>HATS PAGE</h1>
   </div>
  );
};

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  unSubscribeFromAuth = null;

  componentDidMount() {
    this.unSubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) { 
        const userRef = createUserProfileDocument(userAuth);
        
        (await userRef).onSnapshot(snapShot => {
          this.setState({
            id: snapShot.id,
            ...snapShot.data()
          });
        })
      }

      this.setState({currentUser: userAuth});
      
    })
  }

  componentWillUnmount() {
    this.unSubscribeFromAuth();
  }
    
  render() {
    return (
      <div>
          <Header currentUser={this.state.currentUser} />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/hats" component={HatsPage} />
            <Route path="/shop" component={ShopPage} />  
            <Route path="/signin" component={SignInAndSignUpPage} />  
          </Switch>
          </div>
    )
  }
}

export default App;
