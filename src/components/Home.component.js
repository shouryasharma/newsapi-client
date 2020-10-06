//NPM
import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";

//Custom

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    maxWidth: "100%",
    marginBottom: "1%",
    marginLeft: "1%",
    marginRight: "1%",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 16,
    fontWeight: 500,
  },
  pos: {
    marginBottom: 12,
  },
  center: {
    margin: "auto",
    width: "50%",
    padding: "10px",
    textAlign: "center",
  },
}));

const Home = () => {
  const classes = useStyles();
  const [search, setSearch] = useState("");
  const [news, setNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  useEffect(() => {
    axios({
      url: `http://localhost:5000/news`,
      method: "GET",
      responseType: "json",
    })
      .then((response) => {
        setIsLoading(false);
        setNews(response.data.articles);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios({
      url: `http://localhost:5000/news/everything/q/${search}`,
      method: "GET",
      responseType: "json",
    })
      .then((response) => {
        setIsLoading(false);
        setNews(response.data.articles);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <h1 className={classes.center}>
        <a
          style={{
            color: "#777777",
            textDecoration: "none",
          }}
          href="http://localhost:3000"
        >
          News API
        </a>
      </h1>
      <form
        onSubmit={handleSubmit}
        className={classes.root}
        noValidate
        autoComplete="off"
      >
        <TextField
          fullWidth
          id="outlined-basic"
          label="Search"
          variant="outlined"
          size="small"
          onChange={handleChange}
        />
      </form>
      {isLoading && <p>Loading News</p>}
      <List>
        {news.map((e, index) => (
          <div key={index}>
            <Card className={classes.root} variant="outlined">
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    alt="News Icon"
                    variant="rounded"
                    src={e.urlToImage}
                  />
                </ListItemAvatar>

                <ListItemText
                  href={e.url}
                  primary={
                    <Link href={e.url} target="_blank">
                      <div className={classes.title}>{e.title}</div>
                    </Link>
                  }
                  secondary={
                    <React.Fragment>
                      <Typography
                        component="span"
                        variant="body2"
                        className={classes.inline}
                        color="textPrimary"
                      >
                        {new Date(e.publishedAt).toLocaleTimeString("en-US")}
                        &nbsp;-&nbsp;
                        {new Date(e.publishedAt).toLocaleDateString(
                          "en-US",
                          options
                        )}
                        <br />
                      </Typography>
                      {e.description}
                    </React.Fragment>
                  }
                />
              </ListItem>
            </Card>
          </div>
        ))}
      </List>
    </div>
  );
};

export default Home;
