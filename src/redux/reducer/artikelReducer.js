import { createSlice } from "@reduxjs/toolkit";
import  axios  from 'axios';



export const getArtikel = () => async (dispatch) => {
    dispatch(startFetching());

    let config = {
        url:"https://64852924a795d24810b6be16.mockapi.io/Artikel",
        method: "get",
        headers: {
            "Content-Type": "application/json",
        }
    }

    try {
       let getDataartikel = await axios(config);
         let result = getDataartikel.data;
        dispatch(successGetArtikel(result));
    } catch (error) {
        console.log(error);
    }
}

export const createArtikel = (artikelData) => async (dispatch) => {
  try {
    // Kirim permintaan HTTP POST ke API untuk membuat artikel baru
    let config = {
      url: "https://64852924a795d24810b6be16.mockapi.io/Artikel",
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(artikelData),
    };

    let response = await axios(config);
    let newArtikel = response.data;

    dispatch(addArtikel(newArtikel));
  } catch (error) {
    console.log(error);
  }
};

export const deleteArtikel = (artikelId) => async (dispatch) => {
  try {
    // Kirim permintaan HTTP DELETE ke API untuk menghapus artikel
    let config = {
      url: `https://64852924a795d24810b6be16.mockapi.io/Artikel/${artikelId}`,
      method: "delete",
    };

    await axios(config);

    dispatch(removeArtikel(artikelId));
  } catch (error) {
    console.log(error);
  }
};

export const updateArtikel = (artikelId, artikelData) => async (dispatch) => {
  try {
    // Kirim permintaan HTTP PUT ke API untuk memperbarui artikel yang ada
    let config = {
      url: `https://64852924a795d24810b6be16.mockapi.io/Artikel/${artikelId}`,
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify(artikelData),
    };

    await axios(config);

    dispatch(editArtikel({ id: artikelId, newData: artikelData }));
  } catch (error) {
    console.log(error);
  }
};

const initialState = {
  artikel: [],
  filterCategory: 'all',
  isLoading: false,
};

export const artikelSlice = createSlice({
  name: "artikel",
  initialState,
  reducers: {
    startFetching: (state) => {
      state.isLoading = true;
    },
    successGetArtikel: (state, action) => {
      state.artikel = action.payload;
      state.isLoading = false;
    },
    addArtikel: (state, action) => {
      state.artikel.push(action.payload);
    },
    removeArtikel: (state, action) => {
      const artikelId = action.payload;
      state.artikel = state.artikel.filter(
        (artikel) => artikel.id !== artikelId
      );
    },
    editArtikel: (state, action) => {
      const { id, newData } = action.payload;
      const artikelToUpdate = state.artikel.find(
        (artikel) => artikel.id === id
      );
      if (artikelToUpdate) {
        Object.assign(artikelToUpdate, newData);
      }
    },
    filterCategory: (state, action) => {
      state.filterCategory = action.payload;
    },
    searchByKeyword: (state, action) => {
      const keyword = action.payload.toLowerCase();
      state.artikel = state.artikel.filter((item)=>{
        return (

          item.title.toLowerCase().includes(keyword) || item.description.toLowerCase().includes(keyword)
        )
      })
      console.log(keyword)
    }
  },
});





export const { startFetching,successGetArtikel,filterCategory,setArtikel,searchByKeyword,addArtikel,removeArtikel,editArtikel } = artikelSlice.actions;

export default artikelSlice.reducer;
