import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getArtikel = () => async (dispatch) => {
  dispatch(startFetching());

  const config = {
    url: "https://64852924a795d24810b6be16.mockapi.io/Artikel",
    method: "get",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios(config);
    dispatch(successGetArtikel(response.data));
  } catch (error) {
    console.error("Failed to fetch articles:", error);
  }
};

export const createArtikel = (artikelData) => async (dispatch) => {
  const config = {
    url: "https://64852924a795d24810b6be16.mockapi.io/Artikel",
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(artikelData),
  };

  try {
    const response = await axios(config);
    dispatch(addArtikel(response.data));
  } catch (error) {
    console.error("Failed to create article:", error);
  }
};

export const deleteArtikel = (artikelId) => async (dispatch) => {
  const config = {
    url: `https://64852924a795d24810b6be16.mockapi.io/Artikel/${artikelId}`,
    method: "delete",
  };

  try {
    await axios(config);
    dispatch(removeArtikel(artikelId));
  } catch (error) {
    console.error("Failed to delete article:", error);
  }
};

export const updateArtikel = (artikelId, artikelData) => async (dispatch) => {
  const config = {
    url: `https://64852924a795d24810b6be16.mockapi.io/Artikel/${artikelId}`,
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(artikelData),
  };

  try {
    await axios(config);
    dispatch(editArtikel({ id: artikelId, newData: artikelData }));
  } catch (error) {
    console.error("Failed to update article:", error);
  }
};

const initialState = {
  allArtikel: [],
  artikel: [],
  filterCategory: "all",
  isLoading: false,
};

const artikelSlice = createSlice({
  name: "artikel",
  initialState,
  reducers: {
    startFetching: (state) => {
      state.isLoading = true;
    },
    successGetArtikel: (state, action) => {
      state.allArtikel = action.payload;
      state.artikel = action.payload;
      state.isLoading = false;
    },
    addArtikel: (state, action) => {
      state.allArtikel.push(action.payload);
      state.artikel.push(action.payload);
    },
    removeArtikel: (state, action) => {
      const artikelId = action.payload;
      state.allArtikel = state.allArtikel.filter((artikel) => artikel.id !== artikelId);
      state.artikel = state.artikel.filter((artikel) => artikel.id !== artikelId);
    },
    editArtikel: (state, action) => {
      const { id, newData } = action.payload;
      const artikelToUpdate = state.allArtikel.find((artikel) => artikel.id === id);
      if (artikelToUpdate) {
        Object.assign(artikelToUpdate, newData);
      }
      state.artikel = state.allArtikel;
    },
    filterCategory: (state, action) => {
      state.filterCategory = action.payload;
      state.artikel = action.payload === "all" ? state.allArtikel : state.allArtikel.filter((item) => item.categori === action.payload);
    },
    searchByKeyword: (state, action) => {
      const keyword = action.payload.toLowerCase();
      state.artikel = state.allArtikel.filter((item) => item.title.toLowerCase().includes(keyword));
    },
    resetFilter: (state) => {
      state.artikel = state.allArtikel;
      state.filterCategory = "all";
    },
  },
});

export const { startFetching, successGetArtikel, addArtikel, removeArtikel, editArtikel, filterCategory, searchByKeyword, resetFilter } = artikelSlice.actions;

export default artikelSlice.reducer;
