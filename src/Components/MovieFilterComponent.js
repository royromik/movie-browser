// src/components/MovieFilterComponent.js
import React, { useState } from 'react';
import { Form, Row, Col, Button, Container } from 'react-bootstrap';
import '../Styles/MovieFilterComponent.css'; // Import the CSS file

const MovieFilterComponent = ({ onFilter }) => {
  const [genre, setGenre] = useState('');
  const [yearRange, setYearRange] = useState([2000, 2024]);
  const [rating, setRating] = useState(0);

  const handleFilterChange = () => {
    onFilter({ genre, yearRange, rating });
  };

  return (
    <Container>
    <div className="movie-filter-container bg-dark mb-3">
      <Form>
        <Row className="align-items-center">
          <Col xs={12} md={4} className="mb-3 mt-3">
            <Form.Group controlId="genreSelect">
              <Form.Label className=' text-white'>Genre</Form.Label>
              <Form.Control
                as="select"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
                className="custom-select"
              >
                <option value="">All</option>
                <option value="Action">Action</option>
                <option value="Comedy">Comedy</option>
                <option value="Drama">Drama</option>
                {/* Add more genres */}
              </Form.Control>
            </Form.Group>
          </Col>

          <Col xs={12} md={4} className="mb-3">
            <Form.Group controlId="yearRange">
              <Form.Label className=' text-white'>Year Range</Form.Label>
              <Row>
                <Col>
                  <Form.Control
                    type="number"
                    min="1900"
                    max="2024"
                    value={yearRange[0]}
                    onChange={(e) => setYearRange([+e.target.value, yearRange[1]])}
                    placeholder="From"
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="number"
                    min="1900"
                    max="2024"
                    value={yearRange[1]}
                    onChange={(e) => setYearRange([yearRange[0], +e.target.value])}
                    placeholder="To"
                  />
                </Col>
              </Row>
            </Form.Group>
          </Col>

          <Col xs={12} md={2} className="mb-3">
            <Form.Group controlId="rating">
              <Form.Label className=' text-white'>Rating</Form.Label>
              <Form.Control
                type="number"
                min="0"
                max="10"
                value={parseFloat(rating)}
                onChange={(e) => setRating(parseFloat(e.target.value))}
                placeholder="Min Rating"
              />
            </Form.Group>
          </Col>

          <Col xs={12} md={2} className="d-flex align-items-end">
            <Button variant="primary" onClick={handleFilterChange} className="w-100">
              Apply Filters
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
    </Container>
  );
};

export default MovieFilterComponent;
