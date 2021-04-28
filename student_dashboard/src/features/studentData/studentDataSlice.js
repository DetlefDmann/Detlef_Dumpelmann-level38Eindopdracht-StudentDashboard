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
    isChecked:{"Hallo":true}
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
        setIsChecked: (state , action ) => {
            state.isChecked = action.payload;
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

export const { loadData , setStudentNames , setAssignments , setAverageArray , setIsChecked } = studentDataSlice.actions;

// om de data beschikbaar te maken gebruik je de volgende functie (die een selector wordt genoemd) ,
//waarmee je een waarde uit de state kunt selecteren.
export const selectData = (state) => state.studentData.data;
export const selectStudents = (state) => state.studentData.students;
export const selectAssignments = (state) => state.studentData.assignments;
export const selectAverageArray = (state) => state.studentData.averages;
export const selectLoadingStatus = (state) => state.studentData.status;
export const selectIsChecked = (state) => state.studentData.isChecked;

export default studentDataSlice.reducer;
