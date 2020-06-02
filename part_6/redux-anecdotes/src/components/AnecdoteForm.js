import React from "react";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { connect } from "react-redux";
import { addAlert } from "../reducers/notificationReducer";
import PropTypes from 'prop-types'
const AnecdoteForm = ({ createAnecdote, addAlert }) => {
  const addAnecdote = (e) => {
    e.preventDefault();
    const text = e.target.anecdote.value;
    e.target.anecdote.value = "";

    createAnecdote(text);
    addAlert(`Adding ${text}`, "normal");
  };
console.log();

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input type="text" name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};
AnecdoteForm.prototype = {
  createAnecdote: PropTypes.func.isRequired,
  addAlert: PropTypes.func.isRequired,
}
export default connect(null, { createAnecdote, addAlert })(AnecdoteForm);
