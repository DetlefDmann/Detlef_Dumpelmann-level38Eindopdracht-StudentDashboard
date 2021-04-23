import { createAsyncThunk , createSlice } from '@reduxjs/toolkit';
import { fetchStudentData } from "./studentDataAPI";

const initialState = {
    data: [{
        student:"Sarah Connor",
        destination:"fucked",
        assignment:"SCRUM",
        difficulty:"3",
        funFactor:"2"
    }],
    status: "idle",
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

export const { loadData } = studentDataSlice.actions;

// om de data beschikbaar te maken gebruik je de volgende functie (die een selector wordt genoemd) ,
//waarmee je een waarde uit de state kunt selecteren.
export const selectData = (state) => state.studentData.data;

export default studentDataSlice.reducer;
