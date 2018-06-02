const { Query } = require('./Query');
const { auth } = require('./Mutation/auth');
const { book } = require('./Mutation/book');
const { AuthPayload } = require('./AuthPayload');

module.exports = {
  Query,
  Mutation: {
    ...auth,
    ...book,
  },
  AuthPayload,
};
