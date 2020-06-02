const filterReducer = (state = "", action) => {
  const { type, data } = action;
  switch (type) {
    case "SET_FILTER":
      return data;

    default:
      return state;
  }
};

export const addFilter = (text) => {
  return {
    type: "SET_FILTER",
    data: text,
  };
};

export default filterReducer;
