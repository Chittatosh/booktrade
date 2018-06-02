import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import AddBookBtn from './AddBookBtn';
import { FULL_BOOK_LIST, ME_QUERY, ADD_BOOK } from '../client/constants';

const propTypes = {
  bookProp: PropTypes.shape({
    googleId: PropTypes.string.isRequired,
    googleLink: PropTypes.string.isRequired,
    bookThumbnail: PropTypes.string.isRequired,
    bookTitle: PropTypes.string.isRequired,
    bookRating: PropTypes.number,
    ratingsCount: PropTypes.number,
    authorList: PropTypes.arrayOf(PropTypes.string.isRequired),
    publicationDate: PropTypes.string,
    categoryList: PropTypes.arrayOf(PropTypes.string.isRequired),
  }).isRequired,
};

const updateFunc = (cache, { data: { addBook } }) => {
  const { fullBookList } = cache.readQuery({ query: FULL_BOOK_LIST });
  cache.writeQuery({
    query: FULL_BOOK_LIST,
    data: { fullBookList: fullBookList.concat([addBook]) },
  });
  const {
    me: { id, userName, myBookList, __typename },
  } = cache.readQuery({ query: ME_QUERY });
  cache.writeQuery({
    query: ME_QUERY,
    data: {
      me: {
        id,
        userName,
        myBookList: myBookList.concat([addBook]),
        __typename,
      },
    },
  });
};

const AddBookMutn = ({ bookProp }) => (
  <Mutation
    mutation={ADD_BOOK}
    update={updateFunc}
    variables={{
      googleId: bookProp.googleId,
      googleLink: bookProp.googleLink,
      bookThumbnail: bookProp.bookThumbnail,
      bookTitle: bookProp.bookTitle,
      bookRating: bookProp.bookRating,
      ratingsCount: bookProp.ratingsCount,
      authorList: bookProp.authorList,
      publicationDate: bookProp.publicationDate,
      categoryList: bookProp.categoryList,
    }}
  >
    {(mutateFunc, { loading, error }) => {
      if (loading) return <p className="bg-info text-white p-2">Adding...</p>;
      if (error) return <p className="text-danger">{error.message}</p>;
      return (
        <AddBookBtn {...{ mutateFunc }} thisGoogleId={bookProp.googleId} />
      );
    }}
  </Mutation>
);

AddBookMutn.propTypes = propTypes;

export default AddBookMutn;
