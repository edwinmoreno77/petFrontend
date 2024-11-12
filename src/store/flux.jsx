/* eslint-disable no-unused-vars */
const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      userState: {
        userStatus: "not-authenticated", //authenticated, not-authenticated
        user: {},
        userErrorMessage: undefined,
      },
      events: {},
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
    },
  };
};

export default getState;
