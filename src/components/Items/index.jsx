import { Box, makeStyles, Typography } from "@material-ui/core";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import { useCallback } from "react";

const useStyles = makeStyles((theme) => ({
  items: {
    display: "flex",
    borderBottom: "2px solid #eeeeee",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: 400,
    padding: "1rem",
  },
  itemsButtons: {
    display: "flex",
    marginRight: "1rem",
    justifyContent: "center",
    width: "15%",
  },
  arrawIcons: {
    fontSize: "2em",
    margin: 0,
    cursor: "pointer",
  },
  voteLabel: {
    fontSize: 20,
  },
  itemText: {
    width: "75%",
    fontSize: "1.2rem",
  },
  itemsEmoji: {
    fontSize: "3rem",
    marginLeft: "auto",
    borderRadius: "50%",
    boxShadow: "0 18px 39px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.1)",
  },
}));

function Items({ joke, upvote, downvote }) {
  const classes = useStyles();
  const getEmoji = useCallback((votes) => {
    if (votes >= 9) {
      return "em em-rolling_on_the_floor_laughing";
    } else if (votes >= 6) {
      return "em em-laughing";
    } else if (votes >= 3) {
      return "em em-slightly_smiling_face";
    } else if (votes >= 0) {
      return "em em-neutral_face";
    } else {
      return "em em-angry";
    }
  }, []);

  return (
    <Box className={classes.items}>
      <Box className={classes.itemsButtons}>
        <ArrowUpwardIcon
          onClick={() => upvote(joke.id)}
          className={classes.arrawIcons}
        />
        <Typography className={classes.voteLabel}>{joke.votes}</Typography>
        <ArrowDownwardIcon
          onClick={() => downvote(joke.id)}
          className={classes.arrawIcons}
        />
      </Box>
      <Box className={classes.itemText}>{joke.text}</Box>
      <Box className={classes.itemsEmoji}>
        <i className={getEmoji(joke.votes)}></i>
      </Box>
    </Box>
  );
}

export default Items;
