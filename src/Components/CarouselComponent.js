// src/components/CarouselComponent.js
import React from "react";
import "../Styles/CarouselComponent.scss";
import { Carousel } from "react-bootstrap";

const CarouselComponent = ({ movies }) => {
  
  return (
    <Carousel>
      {movies.map((movie, index) => (
            <Carousel.Item key={`${movie.id}-${index}`}>
              <img
                className="d-block w-100"
                src={movie.backgroundImage}
                alt={movie.title}
              />
              <Carousel.Caption className="text-start text-white">
                <h3>{movie.title}</h3>
                <p>{movie.description}</p>
                <p>Rating: {movie.rating}/10</p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
    </Carousel>
  );
};

export default CarouselComponent;
