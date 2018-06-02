const { getUserId } = require('../../utils');

const userId = ctx => ({ id: getUserId(ctx) });

const book = {
  addBook: async (parent, args, ctx, info) =>
    ctx.db.mutation.createBook(
      {
        data: {
          ...args,
          authorList: {
            set: args.authorList,
          },
          categoryList: {
            set: args.categoryList,
          },
          bookOwner: {
            connect: userId(ctx),
          },
        },
      },
      info,
    ),
  removeBook: async (parent, { id }, ctx, info) => {
    const bookExists = await ctx.db.exists.Book({
      id,
      bookOwner: userId(ctx),
    });
    if (!bookExists) {
      throw new Error("Book not found or you're not the uploader");
    }
    return ctx.db.mutation.deleteBook({ where: { id } }, info);
  },
};

module.exports = { book };
