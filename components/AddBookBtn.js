import React from 'react';
import { Query } from 'react-apollo';
import PropTypes from 'prop-types';

import { ME_QUERY } from '../client/constants';

const propTypes = {
  mutateFunc: PropTypes.func.isRequired,
  thisGoogleId: PropTypes.string.isRequired,
};

const AddBookBtn = ({ mutateFunc, thisGoogleId }) => (
  <Query query={ME_QUERY}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p className="text-danger">{error.message}</p>;
      const googleIdList = data.me.myBookList.map(({ googleId }) => googleId);
      const bookExists = googleIdList.indexOf(thisGoogleId) + 1;
      return bookExists ? (
        <button type="button" className="btn btn-success" disabled>
          Added
        </button>
      ) : (
        <button type="button" className="btn btn-primary" onClick={mutateFunc}>
          Add
        </button>
      );
    }}
  </Query>
);

AddBookBtn.propTypes = propTypes;

export default AddBookBtn;
