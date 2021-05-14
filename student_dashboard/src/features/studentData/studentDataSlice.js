import { createAsyncThunk , createSlice } from '@reduxjs/toolkit';
import { fetchStudentData } from "./studentDataAPI";

const initialState = {
    data: [{
        student:"Sarah Connor",
        assignment:"SCRUM",
        difficulty:3,
        funFactor:2,
    }],
    status: "idle",
    students:[],
    assignments:["SCRUM"],
    averages:[],
    assignmentsIsChecked:{"Hallo":true},
    studentsIsChecked:{"Sarah Connor":true},
    arraysPerStudent:{"Sarah Connor":[]},
    graphOptions:{
                    show:"both",
                    graphType:"lineAndBar",
                    sort:"normal"
    }
}

//met deze thunk kan de data opgehaald worden 
export const getDataFromGist = createAsyncThunk(
    'studentData/getDataFromGist',
    async () => {
        const response = await fetchStudentData()
        //hier maak je van een string een number
        const cleanData = response.map(row => {
            return {
                ...row,
                difficulty :  +row.difficulty,
                funFactor : +row.funFactor
            }
        });
        return cleanData;
        ; 
    }
);

export const studentDataSlice = createSlice({
    name: 'studentData',
    initialState,
    reducers:{
        loadData: (state) => {
            state.data = []
        },
        setStudentNames: (state , action ) => {
            state.students = action.payload;
        },
        setAssignments: (state , action ) => {
            state.assignments = action.payload;
        },
        setAverageArray: (state , action ) => {
            state.averages = action.payload;
        },
        setAssignmentsIsChecked: (state , action ) => {
            state.assignmentsIsChecked = action.payload;
        },
        setStudentsIsChecked: (state , action ) => {
            state.studentsIsChecked = action.payload;
        },
        setArraysPerStudent: (state , action ) => {
            state.arraysPerStudent = action.payload;
        },
        setGraphOptions: (state , action ) => {
            state.graphOptions = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDataFromGist.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getDataFromGist.fulfilled, (state, action) => {
                state.status = "ready";
                state.data = action.payload;
            });
    },
});

export const { loadData , setStudentNames , setAssignments , setAverageArray , setAssignmentsIsChecked , setStudentsIsChecked , setArraysPerStudent , setGraphOptions } = studentDataSlice.actions;

// om de data beschikbaar te maken gebruik je de volgende functie (die een selector wordt genoemd) ,
//waarmee je een waarde uit de state kunt selecteren.
export const selectData = (state) => state.studentData.data;
export const selectStudents = (state) => state.studentData.students;
export const selectAssignments = (state) => state.studentData.assignments;
export const selectAverageArray = (state) => state.studentData.averages;
export const selectLoadingStatus = (state) => state.studentData.status;
export const selectAssignmentsIsChecked = (state) => state.studentData.assignmentsIsChecked;
export const selectStudentsIsChecked = (state) => state.studentData.studentsIsChecked;
export const selectArrayPerStudent = (state) => state.studentData.arraysPerStudent;
export const selectGraphOptions = (state) => state.studentData.graphOptions;

export default studentDataSlice.reducer;
