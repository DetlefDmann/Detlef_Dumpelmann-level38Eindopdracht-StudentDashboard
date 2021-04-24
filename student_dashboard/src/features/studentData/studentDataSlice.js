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
    students:[]
}

//met deze thunk kan de data opgehaald worden 
export const getDataFromGist = createAsyncThunk(
    'studentData/getDataFromGist',
    async () => {
        const response = await fetchStudentData()
        const cleanData = await response.map(row => {
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
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDataFromGist.pending, (state) => {
                state.status = "loading";
            })
            .addCase(getDataFromGist.fulfilled, (state, action) => {
                state.status = "idle";
                state.data = action.payload;
            });
    },
});

export const { loadData , setStudentNames } = studentDataSlice.actions;

// om de data beschikbaar te maken gebruik je de volgende functie (die een selector wordt genoemd) ,
//waarmee je een waarde uit de state kunt selecteren.
export const selectData = (state) => state.studentData.data;
export const selectStudents = (state) => state.studentData.students;

export default studentDataSlice.reducer;
