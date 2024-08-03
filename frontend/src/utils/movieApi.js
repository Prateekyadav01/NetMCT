import axios from "axios";

export const fetchData = async (url, params) => {
  try {
    const response = await axios.get("https://api.themoviedb.org/3" + url, {
      params,
      headers: {
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ZWU2YmFkNzZkN2E2MGE0NjhiN2VhNzIxMTM4MjA3YyIsInN1YiI6IjY2MTY1ZjFjZmFjNTAyMDE3YjBiYjNmNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lF9eCvRowvVMHldpk_risBn1K7PjR23BS6EHjpcaYFY',
        accept: "application/json",
      },
    });
    return response.data;
  } catch (err) {
    console.log(err);
    return;
  }
};
