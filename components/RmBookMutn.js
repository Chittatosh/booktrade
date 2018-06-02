import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';

import { FULL_BOOK_LIST, ME_QUERY, REMOVE_BOOK } from '../client/constants';

const propTypes = {
  id: PropTypes.string.isRequired,
};

const updateFunc = (cache, { data: { removeBook } }) => {
  const { fullBookList } = cache.readQuery({ query: FULL_BOOK_LIST });
  cache.writeQuery({
    query: FULL_BOOK_LIST,
    data: {
      fullBookList: fullBookList.filter(book => removeBook.id !== book.id),
    },
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
        myBookList: myBookList.filter(book => removeBook.id !== book.id),
        __typename,
      },
    },
  });
};

const RmBookMutn = ({ id }) => (
  <Mutation mutation={REMOVE_BOOK} update={updateFunc} variables={{ id }}>
    {(mutateFunc, { loading, error }) => {
      if (loading) return <p className="bg-info text-white p-2">Removing...</p>;
      if (error) return <p className="text-danger">{error.message}</p>;
      return (
        <button type="button" className="btn btn-danger" onClick={mutateFunc}>
          Remove
        </button>
      );
    }}
  </Mutation>
);

RmBookMutn.propTypes = propTypes;

export default RmBookMutn;
