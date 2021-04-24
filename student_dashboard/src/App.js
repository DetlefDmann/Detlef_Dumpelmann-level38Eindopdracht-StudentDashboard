import React, { useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { selectData , getDataFromGist, setStudentNames, setAssignments, selectStudents } from "./features/studentData/studentDataSlice";
import { BrowserRouter as Router ,Switch, Route } from 'react-router-dom';
import './App.css';
import StudentData from './features/studentData/StudentData';
import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { retrieveUniqueElements } from './utils';

function App() {
  const dispatch = useDispatch();
  const data = useSelector(selectData);

  useEffect(() => {
    //deze data hoeft maar een keer opgehaald te worden
    dispatch(getDataFromGist());
  },[]);
  

  useEffect(() => {
    let assignmentNames = retrieveUniqueElements(data , "assignment");
    let studentNames = retrieveUniqueElements(data , "student");
    dispatch(setStudentNames(studentNames));
    dispatch(setAssignments(assignmentNames));
  }, [data]);
 
  const studentNames = useSelector(selectStudents);

  
  console.log(data[0]['assignment'])
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
