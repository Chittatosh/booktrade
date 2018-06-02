const { getUserId, asyncBookSearch } = require('../utils');

const userId = ctx => ({ id: getUserId(ctx) });

const Query = {
  fullBookList: (parent, args, ctx, info) => ctx.db.query.books({}, info),
  bookSearch: (_, { bookTitle }) => asyncBookSearch(bookTitle),
  userList: (parent, args, ctx, info) => ctx.db.query.users({}, info),
  me: (parent, args, ctx, info) =>
    ctx.db.query.user({ where: userId(ctx) }, info),
};

module.exports = { Query };
