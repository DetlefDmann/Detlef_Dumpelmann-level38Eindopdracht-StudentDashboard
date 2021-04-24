import React, { useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { selectData , getDataFromGist, setStudentNames } from "./features/studentData/studentDataSlice";
import { BrowserRouter as Router ,Switch, Route } from 'react-router-dom';
import './App.css';
import StudentData from './features/studentData/StudentData';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    //deze data hoeft maar een keer opgehaald te worden
    dispatch(getDataFromGist());
  },[]);
  
  const data = useSelector(selectData);
  const studentNames = [];
  data.forEach(element => {
    if(!studentNames.includes(element.student)){
      studentNames.push(element.student)
    }
  });

  dispatch(setStudentNames(studentNames));
  console.log(studentNames)
  const routesJSX = studentNames.map(student => {
    return (
      <Route key={student} path={`/${student}`} >
        <StudentData student={`${student}`} />
      </Route>
    )
  });
  

  return (
    <div className="App">
      <Router>
        <Header />
        <NavBar />
          <Switch>
          
              {routesJSX}
              <Route path='/'>
                <StudentData />
              </Route>
            
          </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
