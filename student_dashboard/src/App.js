import React from 'react';
import './App.css';
import StudentData from './features/studentData/StudentData';
import Header from './components/Header';
import Footer from './components/Footer';


function App() {
  
  

  return (
    <div className="App">
      <Header />
      <main>
        <StudentData />
      </main>
      <Footer />
    </div>
  );
}

export default App;
