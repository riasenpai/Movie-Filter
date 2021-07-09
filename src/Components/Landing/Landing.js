import React, { Component, useEffect } from 'react';
import styles from "./Landing.module.css";
import MovieCard from "./../Card/Card";
import Chip from '@material-ui/core/Chip';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { red } from "@material-ui/core/colors";
import { useState } from 'react';
import { style, width } from "dom-helpers";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        border: 2 ,
        color: 'red',
        justifyContent: 'center',

      '& > * + *': {
        marginTop: theme.spacing(3),
      },
      highlight: {
        backgroundColor: 'red',
      }
    },
  }));


  export default function Tags() {  
    const [movies,setmovies]=useState([{title:"ria1", year:"1912"}]);
    const [genreOptions, setgenreOptions]=useState([{genre:"crime"}]);
    //  fetch('http://localhost:5000/movies')
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data)
    //     setmovies(data)
    //   }, []);
    //   fetch('http://localhost:5000/movies/genre')
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log(data)
    //     setgenreOptions(data)
    //   }, []);
    
    const getMovies = ()=>{
      let displayMovies = []
      for(let movie of movies){
        displayMovies.push(<MovieCard movie={movie} key={movie.title} ></MovieCard>)
      }
      return displayMovies;
    }
    let tagsValue=[];
    const onTagsChange = (event, values) => {
      tagsValue=values;
      
      console.log(tagsValue);
    }
    const applyFilters=()=>{
      
      fetch(`http://localhost:5000/movies?genre=${tagsValue}`)
       .then(resp => resp.json())
       .then(data => {setmovies(data)
        console.log(data)  
      }, [])
       
    }
    useEffect(() => {
      fetch("http://localhost:5000/movies")
       .then(resp => resp.json())
       .then(data => setmovies(data))
      fetch("http://localhost:5000/movies/genre")
       .then(resp => resp.json())
       .then(data => setgenreOptions(data))
      }, [])
   
    
    return (
    <div>
      <div className={styles.root}>
        <div className={styles.heading}>Choose a Movie!</div>
        <div className={styles.selectionBar}>
          <Autocomplete
            multiple
            id="tags-filled"
            options={genreOptions}
            defaultValue={[]}
            freeSolo
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip variant="outlined" label={option} {...getTagProps({ index })} />
              ))
              
            }
            onChange={onTagsChange}
            renderInput={(params) => (
              <TextField {...params} variant="filled" label="Choose" placeholder="Favorites" />
            )}
            style={{width: "80%" }}
          />
          <button onClick={applyFilters} >Apply</button>
        </div>
        
      </div>
      <p>Found {movies.length} results for selected tags</p>
      <div className={styles.movieContainer}>
          {getMovies()}
      </div> 
    </div>
    );
  }
  

  
  