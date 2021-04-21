import { csv } from "d3";

//moet naar redux slice gestuurd worden
const studentdataURL = "https://gist.githubusercontent.com/DetlefDmann/c602c97a486964da1f267bb665d8479b/raw/WincStudentData.csv"


//fetch student data from the url with the d3 function for csv data
export const fetchStudentData = () => {
    return csv(studentdataURL);
}

//deze functie aanroepen in studentDataSlice