import './App.css';
import Router from "./router";
import { useEffect, useContext } from 'react';
import UserContext from "./context/UserContext";

const App = () => {
  const { checkToken } = useContext(UserContext);
  useEffect(() => {
    checkToken();
  }, []);

  return (
    <Router />
  )
}

export default App;




