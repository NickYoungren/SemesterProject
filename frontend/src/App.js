import React from "react";
import Tabs from "./Components/TabComponent/Tabs";
<<<<<<< HEAD
import {Switch, Route, Link } from "react-router-dom"
import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
=======
import {Switch, Route, Link } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
>>>>>>> origin/master

import HomePage from "./Components/HomePageComponent/HomePage";
import ProductList from "./Components/ProductListComponent/ProductList"
import ProductCard from "./Components/CompareComponent/ProductCard";
import ProductComparison from "./Components/CompareComponent/Comparison";
import SearchBar from "./Components/SearchBarComponent/SearchBar";
import Login from "./Components/LoginComponent/Login"

function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null){
    setUser(user);
  }
  async function logout(){
    setUser(null)
  }
  return (
    <div className="App">
<<<<<<< HEAD
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
=======
      <Tabs />
      {/* <nav class="navbar navbar-expand-lg navbar-light bg-light">
>>>>>>> origin/master
        <a href="/products" className="navbar-brand">
          GreenConscious
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/products"} className="nav-link">
              Products
            </Link>
          </li>
          <li className="nav-item">
            {user ? (
              <a onClick={logout} className="nav-link" style={{cursor:'pointer'}}>
                Logout {user.name}
              </a>
            ):(
              <Link to={"/login"} className="nav-link">
                Login
              </Link>
            )}
          </li>
          
        </div>
      </nav>
      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/products"]} component={ProductList}/>
          <Route
            path="/login"
            render={(props) =>(
              <Login{...props} login={login}/>

            )}
          />
        </Switch>
<<<<<<< HEAD
      </div>
=======
      </div> */}
>>>>>>> origin/master
    </div>
  );
}
export default App;

