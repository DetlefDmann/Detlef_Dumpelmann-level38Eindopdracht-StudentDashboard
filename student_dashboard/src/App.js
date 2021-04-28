import React, { useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { selectData , getDataFromGist, setStudentNames, setAssignments, selectStudents, setAverageArray, selectLoadingStatus } from "./features/studentData/studentDataSlice";
import { BrowserRouter as Router ,Switch, Route } from 'react-router-dom';
import './App.css';
import StudentData from './features/studentData/StudentData';
import Home from './components/Home'                 
import Header from './components/Header';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import { retrieveUniqueElements , calculateAverage , filterArrayByKey } from './utils';

function App() {
  const dispatch = useDispatch();
  const data = useSelector(selectData);
  const loadingStatus = useSelector(selectLoadingStatus);

  useEffect(() => {
    //deze data hoeft maar een keer opgehaald te worden
    dispatch(getDataFromGist());
  },[]);
  

  useEffect(() => {
    if(loadingStatus==="ready"){
    const assignmentNames = retrieveUniqueElements(data , "assignment");
    const studentNames = retrieveUniqueElements(data , "student");
    const totalAverages = assignmentNames.map(assignment =>{
      return calculateAverage(filterArrayByKey(data, "assignment", assignment))
      });
    dispatch(setStudentNames(studentNames));
    dispatch(setAssignments(assignmentNames));
    dispatch(setAverageArray(totalAverages));
    }
  }, [data]);
 
  const studentNames = useSelector(selectStudents)

  
  console.log(data[0]['assignment'])
  const studentPagesJSX = studentNames.map(student => {
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
              {studentPagesJSX}
              <Route path='/'>
                <Home />
              </Route>
          </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
