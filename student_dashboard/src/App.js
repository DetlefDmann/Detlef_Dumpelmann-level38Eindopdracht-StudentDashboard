import React, { useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux';
import { selectData , getDataFromGist, setStudentNames, setAssignments, selectStudents, setAverageArray, selectLoadingStatus, setAssignmentsIsChecked , selectStudentsIsChecked, setStudentsIsChecked, selectAssignmentsIsChecked, setArraysPerStudent, selectArrayPerStudent, } from "./features/studentData/studentDataSlice";
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
  const studentChecked = useSelector(selectStudentsIsChecked);
  const assignmentChecked = useSelector(selectAssignmentsIsChecked);
  const assignmentsPerStudent = useSelector(selectArrayPerStudent);
  
  useEffect(() => {
    //deze data hoeft maar een keer opgehaald te worden
    dispatch(getDataFromGist());
  },[dispatch]);
  
  useEffect(() => {
    if(loadingStatus==="ready"){
    const assignmentNamesArray = retrieveUniqueElements(data , "assignment");//array met alle assignments
    const studentNamesArray = retrieveUniqueElements(data , "student");//array met alle studenten
    //array van opdrachten per student maken . Ik kon geen betrouwbare manier vinden om dynamisch nieuwe variabelen aan te maken, dus het volgende is niet DRY
      dispatch(setArraysPerStudent({
        [studentNamesArray[0]] : filterArrayByKey(data , "student", studentNamesArray[0]),
        [studentNamesArray[1]] : filterArrayByKey(data , "student", studentNamesArray[1]),
        [studentNamesArray[2]] : filterArrayByKey(data , "student", studentNamesArray[2]),
        [studentNamesArray[3]] : filterArrayByKey(data , "student", studentNamesArray[3]),
        [studentNamesArray[4]] : filterArrayByKey(data , "student", studentNamesArray[4]),
        [studentNamesArray[5]] : filterArrayByKey(data , "student", studentNamesArray[5]),
        [studentNamesArray[6]] : filterArrayByKey(data , "student", studentNamesArray[6]),
        [studentNamesArray[7]] : filterArrayByKey(data , "student", studentNamesArray[7]),
        [studentNamesArray[8]] : filterArrayByKey(data , "student", studentNamesArray[8]),
        [studentNamesArray[9]] : filterArrayByKey(data , "student", studentNamesArray[9])
      }));

    const checkedStudentsObject = studentNamesArray.reduce((acc,current) => ({...acc,[current]:true}),{});
    const checkedAssignmentsObject = assignmentNamesArray.reduce((acc,current) => ({...acc,[current]:true}),{});
    //leeg object aan het eind is nodig om acc te initialiseren als object
    //wanneer je dat niet doet, dan wordt de eerste string in stukken gehakt...
    
    dispatch(setAssignmentsIsChecked(checkedAssignmentsObject));
    dispatch(setStudentsIsChecked(checkedStudentsObject))
    dispatch(setStudentNames(studentNamesArray));        

    const totalAverages = assignmentNamesArray.map(assignment =>{
      return calculateAverage(filterArrayByKey(data, "assignment", assignment))
      });
    
    dispatch(setAverageArray(totalAverages));
    dispatch(setAssignments(assignmentNamesArray));
    }
  }, [data, loadingStatus, dispatch]);

  useEffect(()=>{
    // Hier filteren welke data uitgerekend moet worden

    //filteren op student
    let filteredByStudent = [];
    for (const key in studentChecked) {
      if (studentChecked[key]) {
        filteredByStudent = filteredByStudent.concat(assignmentsPerStudent[key]);
      }
    }

    //dan filteren op assignment
    //console.log("Dit is filteredByStudent na de for loop : " + filteredByStudent)

        //maak een array met de assignments die aangevinkt zijn
        let filteredAssignmentsArray = [];
        for (const key in assignmentChecked) {
            if (assignmentChecked[key]) {
              filteredAssignmentsArray.push(key)
            }
        }

         // voor deze assignments gaan we het gemiddelde berekenen en opslaan in Redux     
        if (loadingStatus==="ready"&&filteredByStudent.length>1) {
           const totalAverages = filteredAssignmentsArray.map(assignment =>{
                return calculateAverage(filterArrayByKey(filteredByStudent, "assignment", assignment))//voor iedere assignment wordt het gemiddelde uitgerekend uit het total array
                });
              dispatch(setAverageArray(totalAverages));
        }                        
  },[assignmentChecked, studentChecked, dispatch, loadingStatus, assignmentsPerStudent])
 
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
              <Route exact path='/'>
                <Home />
              </Route>
              <Route path="*">
                <Home></Home>
              </Route>
          </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
