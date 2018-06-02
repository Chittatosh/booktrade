import React from 'react';
import PropTypes from 'prop-types';

const maxRt = 5;

const propTypes = {
  bookRating: PropTypes.number.isRequired,
  ratingsCount: PropTypes.number.isRequired,
};

const faStarList = bookRating =>
  [...Array(maxRt).keys()].map(index => {
    if (bookRating - index > 0.5) return 'fas fa-star';
    if (bookRating - index < 0.5) return 'far fa-star';
    return 'fas fa-star-half';
  });

const StarRating = ({ bookRating, ratingsCount }) => (
  <React.Fragment>
    {faStarList(bookRating).map((className, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <i key={index} className={`${className} text-warning m-0`} />
    ))}
    <p className="card-text mb-1">
      {bookRating}/{maxRt} ({ratingsCount} Rating{ratingsCount - 1 ? 's' : ''})
    </p>
  </React.Fragment>
);

StarRating.propTypes = propTypes;

export default StarRating;
