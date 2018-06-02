import React from 'react';
import { Query } from 'react-apollo';

import BookCard from './BookCard';
import { AUTH_TOKEN, FULL_BOOK_LIST } from '../client/constants';
import { AuthAlert, LoadingAlert, ErrorAlert } from './Alerts';

const AllBooksQuery = () => (
  <React.Fragment>
    {!localStorage.getItem(AUTH_TOKEN) && <AuthAlert text="add" />}
    <Query query={FULL_BOOK_LIST}>
      {({ loading, error, data }) => {
        if (loading) return <LoadingAlert text="Fetching All Books..." />;
        if (error) return <ErrorAlert text={error.message} />;
        return (
          <div className="card-columns">
            {data.fullBookList.map(bookProp => (
              <BookCard
                key={bookProp.id}
                {...{ bookProp }}
                deleteBool={false}
                addBool={false}
              />
            ))}
          </div>
        );
      }}
    </Query>
  </React.Fragment>
);

export default AllBooksQuery;
