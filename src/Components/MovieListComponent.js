// src/components/MovieListComponent.js
import React, { useState, useRef, useEffect } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";


const MovieListComponent = ({ movies, setFavourites, favouriteMovies }) => {
  const listRef = useRef(null);
  const handleFavourites = (id) => {
    setFavourites(id);
  };

  return (
    <Container>
      <Row ref={listRef}>
        {movies.map((movie, index) => (
          <Col
            key={`${movie.id}-${index}`}
            xs={12}
            md={4}
            lg={3}
            className="mb-4"
          >
            <Card className="movie-list-card">
              <Card.Img variant="top" src={movie.image} loading="lazy" />
              <div
                className="fav-icon"
                onClick={() => handleFavourites(movie.id)}
              >
                <i
                  className={
                    !favouriteMovies.includes(movie.id)
                      ? "fa-regular fa-heart"
                      : "fa-solid fa-heart"
                  }
                ></i>
              </div>
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Text>Released: {movie.releaseYear}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default MovieListComponent;
