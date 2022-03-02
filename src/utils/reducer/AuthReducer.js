export const initial = {
  auth: {
    user: "",
    pwd: "",
    roles: [],
    accessToken: "",
  },
  errMsg: "",
  refreshPromise: {
    status: "Pending",
    loading: false,
  },
  loginPromise: {
    status: "Pending",
    loading: false,
  },
};

const LOGIN_REQUEST = "LOGIN_REQUEST";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_FAILED = "LOGIN_FAILED";

const LOGOUT = "LOGOUT";

const CLEAR_ERROR_MSG = "CLEAR_ERROR_MSG";

const REFRESH_REQUEST = "REFRESH_REQUEST";
const REFRESH_SUCCESS = "REFRESH_SUCCESS";
const REFRESH_FAILED = "REFRESH_FAILED";

function AuthReducer(state = initial, action) {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return {
        ...state,
        loginPromise: {
          ...state.loginPromise,
          loading: true,
        },
      };
    }
    case LOGIN_SUCCESS: {
      const {
        user,
        pwd,
        res: { accessToken, roles },
      } = action.payload;
      return {
        ...state,
        auth: {
          ...state.auth,
          user,
          pwd,
          accessToken,
          roles,
        },
        errMsg: "",
        loginPromise: {
          ...state.loginPromise,
          status: "Fulfilled",
          loading: false,
        },
      };
    }
    case LOGIN_FAILED: {
      return {
        ...state,
        errMsg: action.payload,
        loginPromise: {
          ...state.loginPromise,
          status: "Rejected",
          loading: false,
        },
      };
    }
    case LOGOUT: {
      return {
        ...initial,
      };
    }
    case CLEAR_ERROR_MSG: {
      return {
        ...state,
        errMsg: "",
      };
    }
    case REFRESH_REQUEST: {
      return {
        ...state,
        refreshPromise: {
          ...state.refreshPromise,
          loading: true,
        },
      };
    }
    case REFRESH_SUCCESS: {
      const { accessToken, roles } = action.payload;

      return {
        ...state,
        auth: {
          ...state.auth,
          accessToken,
          roles,
        },
        refreshPromise: {
          ...state.refreshPromise,
          status: "Fulfilled",
          loading: false,
        },
      };
    }
    case REFRESH_FAILED: {
      return {
        ...state,
        refreshPromise: {
          ...state.refreshPromise,
          status: "Rejected",
          loading: false,
        },
      };
    }
    default: {
      return state;
    }
  }
}

export default AuthReducer;
