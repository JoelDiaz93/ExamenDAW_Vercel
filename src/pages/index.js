import * as React from 'react';
import {styled} from '@mui/material/styles';
import MuiGrid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import {useEffect, useState} from "react";
import axios from "axios";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';

const Grid = styled(MuiGrid)(({theme}) => ({
    width: '100%',
}));


export default function Home() {
    const [randomAdvice, setRandomAdvice] = useState("");
    const [list, setList] = useState([]);
    const [result, setResult] = useState([]);
    const [word, setWord] = useState();

    useEffect(() => {
        getAdvice();
    }, []);

    const getAdvice = () => {
        axios
            .get('https://api.adviceslip.com/advice')
            .then((response) => {
                setRandomAdvice(response.data.slip);
                console.log('Siguiente consejo');
            })
            .catch((error) => console.log(error));
    };


    const AddAdvice = (idNew) => {
        axios
            .get("https://api.adviceslip.com/advice/" + idNew)
            .then((response) => {
                let aux = response.data.toString() + "}";
                let newAdvice = JSON.parse(aux);
                const newFavorite = {id: newAdvice.slip.id, advice: newAdvice.slip.advice};
                console.log("advice_id: ", newFavorite.id, "- advice_text: ", newFavorite.advice);
                if (list.length === 0) {
                    setList([newFavorite]);
                } else {
                    setList([...list, newFavorite]);
                }
            })
            .catch((error) => console.log(error));
        console.log("Add new Favorite advice", list);
    }

    const deleteAdvice = (id) => {
        setList(list.filter((advice) => advice.id !== id));
    }

    const searchAdvice = () => {
        axios
            .get("https://api.adviceslip.com/advice/search/" + word)
            .then((response) => {
                setResult(response.data.slips);

            })
            .catch((error) => console.log(error));
        console.log('Buscando consejo', result);
    }


    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{minHeight: '100vh'}}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                    '& > :not(style)': {
                        m: 1,
                        width: 600,
                        height: '40vh',
                    },
                }}
            >
                <Paper elevation={3}>
                    <Grid
                        container
                        spacing={0}
                        direction="column"
                        alignItems="center"
                        justify="center"
                    >
                        <Card sx={{
                            display: "inline",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: 5,
                        }}>
                            <CardContent>
                                <Typography textAlign={"center"} gutterBottom variant="h3" component="div">
                                    Consejo del dia
                                </Typography>
                                <Typography textAlign={"center"} variant="body2" color="text.secondary">
                                    {randomAdvice.advice}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" onClick={() => AddAdvice(randomAdvice.id)}>
                                    Marcar consejo favorito
                                </Button>
                                <Button variant="contained" onClick={() => getAdvice()} startIcon={<SearchIcon/>}>
                                    Siguinete consejo
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                </Paper>
                <Paper elevation={3}>
                    <Grid
                        container
                        spacing={0}
                        display="inline"
                        direction="column"
                        alignItems="center"
                        justify="center"
                    >
                        <Typography textAlign={"center"} gutterBottom variant="h3" component="div">
                            Consejos favoritos
                        </Typography>
                        <List
                            sx={{
                                width: '100%',
                                maxWidth: 500,
                                bgcolor: 'background.paper',
                                overflow: 'auto',
                                maxHeight: 200,
                                '& ul': {padding: 0},
                                position: 'relative',
                                left: '50%',
                                top: '35%',
                                transform: 'translate(-50%, -50%)'
                            }}
                        >
                            {list.length > 0 ?
                                list.map((item) => {
                                    const {id, advice} = item;
                                    return (
                                        <ListItem
                                            key={id}
                                        >
                                            <ListItemText aria-multiline={"true"} sx={{width: 100,}} primary={advice}/>
                                            <Button size="small" variant="contained" onClick={() => deleteAdvice(id)}>
                                                Quitar de la lista
                                            </Button>
                                        </ListItem>
                                    );
                                }) :
                                <Typography textAlign={"center"} variant="body2" color="text.secondary">
                                    No tienes consejos favoritos
                                </Typography>
                            }
                        </List>
                    </Grid>
                </Paper>
            </Box>
            <Box
                sx={{
                    display: "inline",
                    justifyContent: "center",
                    alignItems: "center",
                    flexWrap: "wrap",
                    '& > :not(style)': {
                        m: 1,
                        width: 800,
                        height: '55vh',
                    },
                }}
            >
                <Paper
                    elevation={3}>
                    <Typography textAlign={"center"} gutterBottom variant="h3" component="div">
                        Buscador de consejos
                    </Typography>

                    <TextField
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                            flexWrap: "wrap",
                            display: 'inline-grid',
                            width: '70%',
                            position: 'relative',
                            left: '50%',
                            top: '5%',
                            transform: 'translate(-50%, -50%)'
                        }}
                        required
                        id="outlined-required"
                        label="Palabra clave"
                        defaultValue="consejo"
                        onChange={(e) => setWord(e.target.value)}
                    />
                    <Button
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                            flexWrap: "wrap",
                            display: 'inline-block',
                            width: '70%',
                            position: 'relative',
                            left: '50%',
                            top: '3%',
                            transform: 'translate(-50%, -50%)'
                        }}
                        size="small"
                        variant="contained"
                        onClick={() => searchAdvice()}
                    >
                        Buscar
                    </Button>

                    {result.length >= 1 ?
                        <Typography textAlign={"center"} variant="body2" color="text.secondary">
                            Existen un total de {result.length} resultados.
                        </Typography> :
                        <Typography textAlign={"center"} variant="body2" color="text.secondary">

                        </Typography>
                    }

                    <List
                        sx={{
                            width: '100%',
                            maxWidth: 500,
                            bgcolor: 'background.paper',
                            overflow: 'auto',
                            maxHeight: 200,
                            '& ul': {padding: 0},
                            position: 'relative',
                            left: '50%',
                            top: '26%',
                            transform: 'translate(-50%, -50%)'
                        }}
                    >
                        {result.length > 0 ?
                            result.map((item) => {
                                const {id, advice} = item;
                                return (
                                    <ListItem
                                        key={id}
                                    >
                                        <ListItemText aria-multiline={"true"} sx={{width: 100,}} primary={advice}/>
                                        <Button size="small" variant="contained" onClick={() => AddAdvice(id)}>
                                            Marcar como favorito
                                        </Button>
                                    </ListItem>
                                );
                            }) :
                            <Typography textAlign={"center"} variant="body2" color="text.secondary">
                                No has realizado ninguna busqueda
                            </Typography>
                        }
                    </List>
                </Paper>
            </Box>
        </Grid>
    )
}