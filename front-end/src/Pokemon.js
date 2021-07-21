import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#d9d9d9',
    backgroundImage: 'linear-gradient(315deg, #d9d9d9 0%, #f6f2f2 74%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px grey',
    color: 'DarkBlue',
    width: '60%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));

function Pokemon() {
  const testPokemon = {
    "id": 1,
    "name": {
      "english": "Bulbasaur",
      "japanese": "フシギダネ",
      "chinese": "妙蛙种子",
      "french": "Bulbizarre"
    },
    "type": [
      "Grass",
      "Poison"
    ],
    "base": {
      "HP": 45,
      "Attack": 49,
      "Defense": 49,
      "Sp. Attack": 65,
      "Sp. Defense": 65,
      "Speed": 45
    }
  }
  const testPokemonImg = "https://i.imgur.com/mgQBTVE.png"

  const testPokemonSprite = "https://i.imgur.com/yd6Y2Qw.png"
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
          <img src={testPokemonSprite} />
          <Typography>{testPokemon.name.english}</Typography>
          <Typography>Pokédex ID: {testPokemon.id}
          </Typography>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <img src={testPokemonImg}/>
        <Grid className={classes.heading} container direction="column" alignItems="flex-end">
          <Typography>Types: {testPokemon.type.toString().split(",").join(", ")}</Typography>
          <Typography>HP: {testPokemon.base.HP}</Typography>
          <Typography>Attack: {testPokemon.base.Attack}</Typography>
          <Typography>Defense: {testPokemon.base.Defense}</Typography>
          <Typography>Speed: {testPokemon.base.Speed}</Typography>
        </Grid>
        </AccordionDetails>
      </Accordion>

  );
}

export default Pokemon;
