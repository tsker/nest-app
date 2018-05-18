import { makeExecutableSchema } from 'graphql-tools';

let authors = [
	{ id: 1, name: 'name111111' },
	{ id: 2, name: 'name222222' },
	{ id: 3, name: 'name333333' },
	{ id: 4, name: 'name444444' }
];
let books = [
	{ id: 1, author: 'name111111', title: 'book1111111111111111' },
	{ id: 2, author: 'name222222', title: 'book2222222222222222' },
	{ id: 3, author: 'name333333', title: 'book3333333333333333' }
];
const typeDefs = `
type Author {
    id:Int
    name:String
}
type Book {
    id: Int
    author: Author,
    title: String
    content:String
}
type Query {
    author(id: Int): Author
    book(id: Int): Book
}
`;
const resolvers = {
	Query: {
		author(root, args) {
			return authors.find((u) => u.id === args.id);
		},
		book(root, args) {
			return books.find((b) => b.id === args.id);
		}
	}
};

export const schema = makeExecutableSchema({ typeDefs, resolvers });
