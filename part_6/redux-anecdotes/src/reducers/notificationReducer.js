const initialState = [];

const notificationReducer = (state = initialState, action) => {
  const { type, data } = action;

  switch (type) {
    case "ADD_ALERT":
      return [...state, data];
    case "REMOVE_ALERT":
      return state.filter((alert) => alert.id !== data);
    default:
      return state;
  }
};

export const addAlert = (text, style) => (dispatch) => {
  const id = (100000 * Math.random()).toFixed(0);

  dispatch({
    type: "ADD_ALERT",
    data: {
      text,
      id,
      style,
    },
  });
  setTimeout(() => dispatch({ type: "REMOVE_ALERT", data: id }), 5000);
};

export default notificationReducer;
