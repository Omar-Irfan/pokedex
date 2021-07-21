import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './extraCss.css';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#d9d9d9',
    backgroundImage: 'linear-gradient(315deg, #d9d9d9 0%, #f6f2f2 74%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px grey',
    color: 'DarkBlue',
    width: '40%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function Pokemon(props) {


  const thumbnail = `http://localhost:3001/thumbnails/${props.id}.png`

  const sprite = `http://localhost:3001/sprites/${props.id}MS.png`

  const classes = useStyles();

  return (

      <Accordion className={classes.root}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Grid className={classes.heading} container direction="row" alignItems="center"
          justifyContent="space-between"
          >
          <img src={sprite} />
          <Typography>{props.name}</Typography>
          <Typography>Pokédex ID: {props.id}
          </Typography>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <img className="Thumbnail" src={thumbnail}/>
        <Grid className={classes.heading} container direction="column" alignItems="flex-end">
          <Typography>Types: {props.types}</Typography>
          <Typography>HP: {props.HP}</Typography>
          <Typography>Attack: {props.Attack}</Typography>
          <Typography>Defense: {props.Defense}</Typography>
          <Typography>Speed: {props.Speed}</Typography>
        </Grid>
        </AccordionDetails>
      </Accordion>

  );
}

export default Pokemon;
