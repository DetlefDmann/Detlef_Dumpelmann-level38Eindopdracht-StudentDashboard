import { csv } from "d3";

const studentDataURL = "https://gist.githubusercontent.com/DetlefDmann/c602c97a486964da1f267bb665d8479b/raw/WincStudentData.csv"
//const studentDataGoogleSheetURL ="https://docs.google.com/spreadsheets/d/1BHjq5MjpuSItvVbnQcEdQt_v956-Ks1lr3f_nEFkTks/edit#gid=0&output=csv"

//fetch student data from the url with the d3 function for csv data
export const fetchStudentData = () => {
    return csv(studentDataURL);
}

//deze functie wordt aangeroepen in studentDataSlice.js middels een asyncThunk