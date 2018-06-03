import { gql } from 'apollo-boost';

const AUTH_TOKEN = 'auth_token';
const SEARCH_TERM = 'search_term';

const GOOGLE_BOOK_FIELDS = `
  googleId
  bookTitle
  googleLink
  bookThumbnail
  bookRating
  ratingsCount
  authorList
  publicationDate
  categoryList
`;

const BOOK = `{
  id
  ${GOOGLE_BOOK_FIELDS}
  bookOwner{
    userName
  }
}`;

const USER = `{
  id
  userName
  myBookList ${BOOK}
}`;

const FULL_BOOK_LIST = gql`
  query { 
    fullBookList ${BOOK} 
  }
`;

const ME_QUERY = gql`
  query { 
    me ${USER} 
  }
`;

const SEARCH_QUERY = gql`
  query bookSearch($bookTitle: String!) {
    bookSearch(bookTitle: $bookTitle) {
      ${GOOGLE_BOOK_FIELDS}
    }
  }
`;

const ADD_BOOK = gql`
  mutation addBook(
    $googleId: String!,
    $bookTitle: String!,
    $googleLink: String!,
    $bookThumbnail: String,
    $bookRating: Float,
    $ratingsCount: Float,
    $authorList: [String!],
    $publicationDate: String,
    $categoryList: [String!]
  ) {
    addBook(
      googleId: $googleId,
      bookTitle: $bookTitle,
      googleLink: $googleLink,
      bookThumbnail: $bookThumbnail,
      bookRating: $bookRating,
      ratingsCount: $ratingsCount,
      authorList: $authorList,
      publicationDate: $publicationDate,
      categoryList: $categoryList
    ) ${BOOK}
  }
`;

const REMOVE_BOOK = gql`
  mutation removeBook($id: ID!) {
    removeBook(id: $id) {
      id
    }
  }
`;

export {
  AUTH_TOKEN,
  SEARCH_TERM,
  GOOGLE_BOOK_FIELDS,
  BOOK,
  USER,
  FULL_BOOK_LIST,
  ME_QUERY,
  SEARCH_QUERY,
  ADD_BOOK,
  REMOVE_BOOK,
};
