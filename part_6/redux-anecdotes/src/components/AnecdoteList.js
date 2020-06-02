import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addVote } from "../reducers/anecdoteReducer";
import { addAlert } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const filterText = useSelector(({filterReducer}) => filterReducer)
  console.log(filterText);
  
  const anecdotes = useSelector(({ anecdoteReducer }) => {
    return anecdoteReducer.filter(ane => ane.content.toLowerCase().includes(filterText.toLowerCase())).sort((a, b) => b.votes - a.votes);
  });
  const dispatch = useDispatch();
  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button
              onClick={() => {
                dispatch(addVote(anecdote.id));
                dispatch(addAlert(`voting for ${anecdote.content}`, "normal"));
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

export default AnecdoteList;
