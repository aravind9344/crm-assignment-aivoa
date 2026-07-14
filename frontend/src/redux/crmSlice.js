import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  crmData: {
    hcp_name: "",
    hospital: "",
    specialty: "",
    interaction_type: "",
    notes: "",
    follow_up: "",
  },
};

const crmSlice = createSlice({
  name: "crm",
  initialState,

  reducers: {

    setCRMData: (state, action) => {
      state.crmData = action.payload;
    },

    updateField: (state, action) => {
      const { field, value } = action.payload;
      state.crmData[field] = value;
    },

    clearCRMData: (state) => {
      state.crmData = {
        hcp_name: "",
        hospital: "",
        specialty: "",
        interaction_type: "",
        notes: "",
        follow_up: "",
      };
    },

  },
});

export const {
  setCRMData,
  updateField,
  clearCRMData,
} = crmSlice.actions;

export default crmSlice.reducer;