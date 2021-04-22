import React from 'react';
import { Counter } from './features/counter/Counter';
import './App.css';
import StudentData from './features/studentData/StudentData';


function App() {
  
  

  return (
    <div className="App">
      <header className="App-header">
        {/* <Counter /> */}
        <StudentData />
      </header>
    </div>
  );
}

export default App;
