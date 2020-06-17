import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useHistory,
  useParams,
} from "react-router-dom";
import { useField } from "./hooks";

const Menu = () => {
  const padding = {
    paddingRight: 5,
  };
  return (
    <div>
      <Link style={padding} to="/">
        Anecdotes
      </Link>
      <Link style={padding} to="/create">
        Create new
      </Link>
      <Link style={padding} to="/about">
        About
      </Link>
    </div>
  );
};

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>
          <Link to={`anecdote/${anecdote.id}`}>{anecdote.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);
const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  const anecdote = anecdotes.find((a) => Number(a.id) === Number(id));
  return (
    <div>
      <h2>Anecdotes</h2>
      <p>{anecdote.content}</p>
    </div>
  );
};

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>
      An anecdote is a brief, revealing account of an individual person or an
      incident. Occasionally humorous, anecdotes differ from jokes because their
      primary purpose is not simply to provoke laughter but to reveal a truth
      more general than the brief tale itself, such as to characterize a person
      by delineating a specific quirk or trait, to communicate an abstract idea
      about a person, place, or thing through the concrete details of a short
      narrative. An anecdote is "a story with a point."
    </em>

    <p>
      Software engineering is full of excellent anecdotes, at this app you can
      find the best and add more.
    </p>
  </div>
);

const Footer = () => (
  <div>
    Anecdote app for{" "}
    <a href="https://courses.helsinki.fi/fi/tkt21009">
      Full Stack -websovelluskehitys
    </a>
    . See{" "}
    <a href="https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js">
      https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js
    </a>{" "}
    for the source code.
  </div>
);

const CreateNew = (props) => {
  const content = useField("text");
  const author = useField("text");
  const info = useField("text");

  const history = useHistory();
  const handleSubmit = (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    history.push("/");
  };
  const handleReset = () => {
    content.resetForm();
    author.resetForm();
    info.resetForm();
  };
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input
            type={content.type}
            value={content.value}
            onChange={content.onChange}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          author
          <input
            type={author.type}
            value={author.value}
            onChange={author.onChange}
          />
        </div>
        <div style={{ marginTop: "20px" }}>
          url for more info
          <input type={info.type} value={info.value} onChange={info.onChange} />
        </div>
        <button type="submit" style={{ marginTop: "20px" }}>
          create
        </button>
        <button
          type="reset"
          onClick={handleReset}
          style={{ marginLeft: "10px" }}
        >
          Reset
        </button>
      </form>
    </div>
  );
};

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: "If it hurts, do it more often",
      author: "Jez Humble",
      info: "https://martinfowler.com/bliki/FrequencyReducesDifficulty.html",
      votes: 0,
      id: "1",
    },
    {
      content: "Premature optimization is the root of all evil",
      author: "Donald Knuth",
      info: "http://wiki.c2.com/?PrematureOptimization",
      votes: 0,
      id: "2",
    },
  ]);
  console.log(anecdotes);

  const [notification, setNotification] = useState("");

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0);
    setAnecdotes(anecdotes.concat(anecdote));
    setNotification(`${anecdote.content} has been added`);

    setTimeout(() => {
      setNotification("");
    }, 2000);
  };

  const anecdoteById = (id) => anecdotes.find((a) => a.id === id);

  const vote = (id) => {
    const anecdote = anecdoteById(id);

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };

    setAnecdotes(anecdotes.map((a) => (a.id === id ? voted : a)));
  };

  return (
    <div>
      <h1>Software anecdotes</h1>
      {notification && (
        <h2
          style={{
            border: " 1px solid",
            padding: "10px",
            textAlign: "center",
            color: "green",
          }}
        >
          {notification}
        </h2>
      )}
      <Router>
        <Menu />
        <Switch>
          <Route exact path="/anecdote/:id">
            <Anecdote anecdotes={anecdotes} />
          </Route>
          <Route exact path="/">
            <AnecdoteList anecdotes={anecdotes} />
          </Route>
          <Route exact path="/create">
            <CreateNew addNew={addNew} />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  );
};

export default App;
