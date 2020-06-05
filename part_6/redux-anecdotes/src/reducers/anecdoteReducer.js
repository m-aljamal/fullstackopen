import { getAll, createNew, addVoteToServer } from "../services/anecdotes";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_ANECDOTES":
      return [...state, action.data];
    case "NEW_ANEC":
      return action.data;
    case "ADD_VOTE":
      const id = action.data.id;
      return state.map((a) => (a.id !== id ? a : action.data));
    default:
      return state;
  }
};

export const initialAne = () => async (dispatch) => {
  const res = await getAll();
  dispatch({
    type: "NEW_ANEC",
    data: res,
  });
};

export const addVote = (id) => async (dispatch) => {
  const updateVote = await addVoteToServer(id);
  dispatch({
    type: "ADD_VOTE",
    data: updateVote,
  });
};

export const createAnecdote = (content) => async (dispatch) => {
  const res = await createNew(content);
  dispatch({
    type: "NEW_ANECDOTES",
    data: res,
  });
};

export default reducer;
