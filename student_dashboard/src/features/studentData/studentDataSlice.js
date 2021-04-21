import { createAsyncThunk , createSlice } from '@reduxjs/toolkit';
import { fetchStudentData } from "./studentDataAPI";

const initialState = {
    data: [{
        studentName:"Sarah Connor",
        destination:"fucked",
    }],
    status: "idle",
}

export const getDataFromGist = createAsyncThunk(
    'studentData/getDataFromGist',
    async () => {
        return await fetchStudentData(); 
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

// om de data op te halen gebruik je de volgende functie (die een selector wordt genoemd) ,
//waarmee je een waarde uit de state kunt selecteren.
export const selectData = (state) => state.studentData.data;

export default studentDataSlice.reducer;
