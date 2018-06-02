import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

import BookCard from './BookCard';
import { SEARCH_QUERY } from '../client/constants';
import { LoadingAlert, ErrorAlert } from './Alerts';

const propTypes = {
  bookTitle: PropTypes.string.isRequired,
};

const SearchQuery = ({ bookTitle }) => (
  <Query query={SEARCH_QUERY} variables={{ bookTitle }}>
    {({ loading, error, data }) => {
      if (loading) return <LoadingAlert text="Searching Books..." />;
      if (error) return <ErrorAlert text={error.message} />;
      const bookListObj = data.bookSearch.reduce(
        (acc, book) => Object.assign(acc, { [book.googleId]: book }),
        {},
      ); // To drop duplicate book entries
      return (
        <div className="card-columns">
          {Object.keys(bookListObj).map(googleId => (
            <BookCard
              key={googleId}
              bookProp={bookListObj[googleId]}
              deleteBool={false}
              addBool
            />
          ))}
        </div>
      );
    }}
  </Query>
);

SearchQuery.propTypes = propTypes;

export default SearchQuery;
