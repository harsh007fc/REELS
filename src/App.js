import './App.css'
import Signup from './Components/Signup';
import AuthProvider from './Context/AuthProvider';
import Main from './MaterialUi/Main';
import Ioa from './Components/Ioa';
import Login from './Components/Login';
import {BrowserRouter as Router,Switch,Route} from  'react-router-dom'
function App() {
  return (
    <Router>
      <AuthProvider>
      <Switch>
        <Route exact path='/' component={Feed}/>
        <Route  path='/login' component={Login}/>
        <Route  path='/signup' component={Signup}/>
      </Switch>
      </AuthProvider>
    </Router>
    // <AuthProvider>
    // {/* <Signup/> */}
    // <Login/>
    //  </AuthProvider>
    // //  <Main/> 
    // //  <Ioa/>
  );
}

export default App;
