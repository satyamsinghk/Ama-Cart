import axios from "axios";

// const BASE_URL = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key'
// const API_KEY = 'AIzaSyDk7Dyx8EHd_jy1lyDK5ND-dXKQMZ8z5N0'

export const signupWithEmailAndPassword = (details, callback) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDk7Dyx8EHd_jy1lyDK5ND-dXKQMZ8z5N0`,
        {
          email: details.email,
          password: details.password,
          returnSecureToken: true,
        }
      );

      dispatch({
        type: "SIGNUP",
        payload: response.data,
      });
      localStorage.setItem("token", response.data.idToken);

      return callback(response.data);
    } catch (error) {
      return callback({
        // error: true,
        response: error.response,
      });
    }
  };
};

export const loginWithEmailAndPassword = (details, callback) => {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDk7Dyx8EHd_jy1lyDK5ND-dXKQMZ8z5N0
            `,
        {
          email: details.email,
          password: details.password,
          returnSecureToken: true,
        }
      );
      dispatch({
        type: "LOGIN",
        payload: response.data,
      });
      localStorage.setItem("token", response.data.idToken);
      return callback(response.data);
    } catch (error) {
      return callback({
        error: true,
        response: error.response,
      });
    }
  };
};

export const checkIsLoggedIn = (callback) => {
  return async (dispatch) => {
    try {
      let token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDk7Dyx8EHd_jy1lyDK5ND-dXKQMZ8z5N0`,
        {
          idToken: token,
        }
      );
      dispatch({
        type: "LOGIN",
        payload: {
          idToken: token,
          localId: response.data.users[0].localId,
          ...response.data,
        },
      });
      return callback(response.data);
    } catch (error) {
      return callback({
        error: true,
        response: error.response,
      });
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    dispatch({
      type: "LOGOUT",
    });
  };
};
