import './App.css'
import Signup from './Components/Signup';
import AuthProvider from './Context/AuthProvider';        
import Login from './Components/Login';
import Feed from './Components/Feed';
import {BrowserRouter as Router,Switch,Route} from  'react-router-dom'
import PrivateRoute from './Components/PrivateRoute';
function App() {
  return (
    <Router>
      <AuthProvider>
      <Switch>
        <PrivateRoute exact path='/' component={Feed}/>
        <Route exact path='/signup' component={Signup}/>
        <Route exact path='/login' component={Login}/>
      </Switch>
      </AuthProvider>
    </Router>
    // <AuthProvider>
    // {/* <Signup/> */}
    // <Login/>
    //  </AuthProvider>
  );
}

export default App;
