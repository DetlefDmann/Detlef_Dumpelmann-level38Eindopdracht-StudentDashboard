import React, { useEffect, useState } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { selectData , getDataFromGist, setStudentNames, setAssignments, selectStudents, setAverageArray, selectLoadingStatus, setIsChecked } from "./features/studentData/studentDataSlice";
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
  const [isCheckedState , setIsCheckedState ] = useState({});
  
  useEffect(() => {
    //deze data hoeft maar een keer opgehaald te worden
    dispatch(getDataFromGist());
  },[]);
  
    

  useEffect(() => {
    if(loadingStatus==="ready"){
    const assignmentNames = retrieveUniqueElements(data , "assignment");
    const studentNamesArray = retrieveUniqueElements(data , "student");
    const allKeys = assignmentNames.concat(studentNamesArray);
    const checkedObject = allKeys.reduce((acc,current) => ({...acc,[current]:true}),{});
    //leeg object aan het eind is nodig om acc te initialiseren als object
    //wanneer je dat niet doet, dan wordt de eerste string in stukken gehakt...
    
    const totalAverages = assignmentNames.map(assignment =>{
      return calculateAverage(filterArrayByKey(data, "assignment", assignment))
      });
    dispatch(setStudentNames(studentNamesArray));
    dispatch(setAssignments(assignmentNames));
    dispatch(setAverageArray(totalAverages));
    dispatch(setIsChecked(checkedObject));
    }
  }, [data]);
 
  const studentNames = useSelector(selectStudents)

  
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
