import React from 'react';
import { Query } from 'react-apollo';

import BookCard from './BookCard';
import { AUTH_TOKEN, ME_QUERY } from '../client/constants';
import { LoadingAlert, ErrorAlert, AuthAlert } from './Alerts';

const MyBooksQry = () => {
  const authToken = localStorage.getItem(AUTH_TOKEN);
  return authToken ? (
    <Query query={ME_QUERY}>
      {({ loading, error, data }) => {
        if (loading) return <LoadingAlert text="Fetching Your Books..." />;
        if (error) return <ErrorAlert text={error.message} />;
        if (!data.me.myBookList) {
          return <ErrorAlert text="You haven't saved any books yet!" />;
        }
        return (
          <div className="card-columns">
            {data.me.myBookList.map(bookProp => (
              <BookCard
                key={bookProp.id}
                {...{ bookProp }}
                addBool={false}
                deleteBool
              />
            ))}
          </div>
        );
      }}
    </Query>
  ) : (
    <AuthAlert text="view your" />
  );
};

export default MyBooksQry;
