/* eslint-disable no-unused-vars */
import { Context } from "./appContext";
import Swal from "sweetalert2";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      userState: {
        userStatus: "not-authenticated",
        userErrorMessage: undefined,
      },
      events: {},
      pets: [],
    },

    actions: {
      onChecking: () => {
        setStore({
          userState: {
            userStatus: "checking",
            user: {},
            userErrorMessage: undefined,
          },
        });
      },
      onLogin: (user) => {
        setStore({
          userState: {
            userStatus: "authenticated",
            user,
            userErrorMessage: undefined,
          },
        });
      },
      onLogout: (error) => {
        setStore({
          userState: {
            userStatus: "not-authenticated",
            user: {},
            userErrorMessage: error,
          },
        });
      },
      onEvents: (events) => {
        setStore({ events });
      },
      fetchPets: async (id, navigate) => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(
            `http://localhost:5004/getPetsByUserId/${id}`,
            {
              headers: {
                authorization: "Bearer " + token,
              },
            }
          );
          const data = await response.json();

          if (response.status == 200) {
            setStore({ pets: data.data });
          } else if (response.status == 401) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Su sesión ha expirado",
            }).then(() => {
              navigate("/login");
            });
          } else {
            console.error(data.message);
          }
        } catch (error) {
          console.error("Error fetching pets:", error);
        }
      },
    },
  };
};

export default getState;
