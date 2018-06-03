const jwt = require('jsonwebtoken');
const googleBooks = require('google-books-search');

class AuthError extends Error {
  constructor() {
    super('Not authorized');
  }
}

function getUserId(ctx) {
  const Authorization = ctx.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    return userId;
  }
  throw new AuthError();
}

const jsUrl = process.env.NODE_ENV
  ? '/main.js' // production
  : 'http://localhost:3001/main.js'; // dev
console.log('\x1b[35m%s\x1b[0m', `${process.env.NODE_ENV} - ${jsUrl}`);

function googleBooksPromise(bookTitle) {
  return new Promise((resolve, reject) => {
    googleBooks.search(bookTitle, (error, resBookList) => {
      if (error) return reject(error);
      const googleBookList = resBookList.map(book => ({
        googleId: book.id,
        bookTitle: book.title,
        googleLink: book.link,
        bookThumbnail: book.thumbnail,
        bookRating: book.averageRating,
        ratingsCount: book.ratingsCount,
        authorList: book.authors,
        publicationDate: book.publishedDate,
        categoryList: book.categories,
      }));
      return resolve(googleBookList);
    });
  });
}

const asyncBookSearch = async bookTitle => {
  const googleBookList = await googleBooksPromise(bookTitle);
  return googleBookList;
};

module.exports = {
  AuthError,
  getUserId,
  jsUrl,
  asyncBookSearch,
};
