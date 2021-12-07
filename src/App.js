import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';

import './App.css';

import { connect } from 'react-redux';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './components/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

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
          this.props.setCurrentUser({
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
          <Header />
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

const mapDispathToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(null, mapDispathToProps)(App);
