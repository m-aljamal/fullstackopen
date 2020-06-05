import React from "react";
// import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { addAlert } from "../reducers/notificationReducer";
import { connect } from "react-redux";
const AnecdoteList = (props) => {
  // const filterText = useSelector(({ filterReducer }) => filterReducer);

  // const anecdotes = useSelector(({ anecdoteReducer }) => {
  //   return anecdoteReducer
  //     .filter((ane) =>
  //       ane.content.toLowerCase().includes(filterText.toLowerCase())
  //     )
  //     .sort((a, b) => b.votes - a.votes);
  // });
  // const dispatch = useDispatch();
  return (
    <div>
      {props.anecdoteReducer
        .filter((ane) =>
          ane.content.toLowerCase().includes(props.filterReducer.toLowerCase())
        )
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes} votes
              <button
                onClick={() => {
                  // dispatch(addVote(anecdote.id));
                  // dispatch(addAlert(`voting for ${anecdote.content}`, "normal"));
                  props.addVote(anecdote.id);
                  props.addAlert(`voting for ${anecdote.content}`, "normal");
                }}
              >
                vote
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};
const mapStateToProps = (state) => {
  console.log(state);
  return {
    anecdoteReducer: state.anecdoteReducer,

    filterReducer: state.filterReducer,
  };
};

const mapDispatchToProps = {
  addVote,
  addAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
