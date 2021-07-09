import React from "react";
import styles from "./Card.module.css";

class MovieCard extends React.Component {
    constructor(props) {
      super(props);
    }
    render() {
      return (
      
          <div className={styles.movieCard}>
          <div className={styles.heading}>
            {this.props.movie.title}
          </div>
          <div className={styles.cardCon}>
            {this.props.movie.year}
          </div>
          <div className={styles.cardCon}>
            {this.props.movie.genre}
          </div>
        </div>
      
      );
    }
}
export default MovieCard;