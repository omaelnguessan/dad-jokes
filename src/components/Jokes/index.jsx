import { Box, makeStyles, Typography } from "@material-ui/core";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Items from "../Items";

const useStyles = makeStyles((theme) => ({
  jokes: {
    display: "flex",
    width: "80%",
    height: "80%",
  },
  jokeSidebar: {
    backgroundColor: "#9575cd",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "30%",
    justifyContent: "center",
    textAlign: "center",
    boxShadow: "0 18px 39px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.1)",
    borderRadius: 7,
  },
  jokesTitle: {
    fontSize: "3rem",
    color: "white",
    fontWeight: 700,
    margin: 60,
    letterSpacing: 0,
  },
  sidebarImage: {
    width: "50%",
    boxShadow: "0 18px 39px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.1)",
    borderRadius: "50%",
  },
  jokesListe: {
    height: "90%",
    backgroundColor: "white",
    width: "70%",
    alignSelf: "center",
    overflow: "scroll",
    boxShadow: "0 18px 39px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.1)",
    zIndex: 2,
    borderTopRightRadius: 7,
    borderBottomRightRadius: 7,
  },
}));

function Jokes() {
  const classes = useStyles();
  const [jokes, setJokes] = useState([]);
  async function getJokes() {
    let newJokes = [];

    for (var i = 1; i < 7; i++) {
      let res = await axios.get("https://icanhazdadjoke.com/", {
        headers: { Accept: "Application/json" },
      });

      newJokes.push({ id: i, text: res.data.joke, votes: 0 });
    }
    setJokes(newJokes);
  }

  useEffect(() => {
    getJokes();
  }, []);

  const handleVote = useCallback(
    (id, offset) => {
      let filterJokes = jokes.filter((joke) => joke.id !== id);
      let joke = jokes.find((joke) => joke.id === id);
      joke.votes += offset;
      filterJokes.push(joke);
      filterJokes.sort((a, b) => b.votes - a.votes);
      setJokes(filterJokes);
    },

    [jokes, setJokes]
  );

  if (jokes) {
    return (
      <Box className={classes.jokes}>
        <Box className={classes.jokeSidebar}>
          <Typography className={classes.jokesTitle}>
            Dad
            <br />
            Jokes
          </Typography>
          <img
            className={classes.sidebarImage}
            src="https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg"
            alt="emoji"
          />
        </Box>
        <Box className={classes.jokesListe}>
          {jokes.map((joke) => {
            return (
              <Items
                key={joke.id}
                joke={joke}
                upvote={() => {
                  handleVote(joke.id, 1);
                }}
                downvote={() => {
                  handleVote(joke.id, -1);
                }}
              />
            );
          })}
        </Box>
      </Box>
    );
  } else {
    return <h1>Loading</h1>;
  }
}

export default Jokes;
