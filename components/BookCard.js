import React from 'react';
import PropTypes from 'prop-types';

import StarRating from './StarRating';
import RmBookMutn from './RmBookMutn';
import AddBookMutn from './AddBookMutn';
import { AUTH_TOKEN } from '../client/constants';

const propTypes = {
  bookProp: PropTypes.shape({
    id: PropTypes.string,
    googleId: PropTypes.string.isRequired,
    bookTitle: PropTypes.string.isRequired,
    googleLink: PropTypes.string.isRequired,
    bookThumbnail: PropTypes.string,
    bookRating: PropTypes.number,
    ratingsCount: PropTypes.number,
    authorList: PropTypes.arrayOf(PropTypes.string.isRequired),
    publicationDate: PropTypes.string,
    categoryList: PropTypes.arrayOf(PropTypes.string.isRequired),
    bookOwner: PropTypes.shape({
      userName: PropTypes.string.isRequired,
    }),
  }).isRequired,
  addBool: PropTypes.bool.isRequired,
  deleteBool: PropTypes.bool.isRequired,
};

const BookCard = ({ bookProp, addBool, deleteBool }) => (
  <div className="card">
    <a href={bookProp.googleLink}>
      <img
        className="card-img-top"
        src={
          bookProp.bookThumbnail &&
          bookProp.bookThumbnail.replace('http://', 'https://')
        }
        alt={bookProp.bookTitle}
      />
    </a>
    <div className="card-body">
      <h5 className="card-title mb-1">{bookProp.bookTitle}</h5>
      <p className="card-text mb-1">
        {bookProp.authorList && `by ${bookProp.authorList.join(' & ')}`}
      </p>
      <p className="card-text mb-1">
        {bookProp.publicationDate && `pub. on ${bookProp.publicationDate}`}
      </p>
      <p className="card-text mb-1">
        {bookProp.categoryList && bookProp.categoryList.join(', ')}
      </p>
      {bookProp.bookRating && (
        <StarRating
          bookRating={bookProp.bookRating}
          ratingsCount={bookProp.ratingsCount}
        />
      )}
      <p className="card-text mb-0">
        {!deleteBool &&
          bookProp.bookOwner &&
          `Owner: ${bookProp.bookOwner.userName}`}
      </p>
      {addBool &&
        localStorage.getItem(AUTH_TOKEN) && <AddBookMutn {...{ bookProp }} />}
      {deleteBool && <RmBookMutn id={bookProp.id} />}
    </div>
  </div>
);

BookCard.propTypes = propTypes;

export default BookCard;
