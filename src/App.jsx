
import { useContext, useEffect } from 'react';
import './App.css';
import Landing from './Pages/Landing/Landing';
import Router from './Router';
import { DataContext } from './Components/DataProvider/DataProvider';
import { TYPE } from './Utility/action.type';
import { auth } from './Utility/Firebase.jsx';


function App() {
  const [{user},dispatch] = useContext(DataContext)

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // console.log(authUser);
        dispatch({
          type: TYPE.SET_USER,
          user: authUser
        })
      } else {
        dispatch({
          type: TYPE.SET_USER,
          user: null,
        });
      }
    });
  
  }, []);


  return (
    <>
      <Router/>
    
      
    </>
  );
}

export default App;
