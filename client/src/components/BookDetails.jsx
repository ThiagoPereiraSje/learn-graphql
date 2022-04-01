import { getBookQuery } from "../queries/queries";

import { useQuery } from "@apollo/client";

export default function BookDetails({ bookId }) {
  const query = useQuery(getBookQuery, { variables: { id: bookId } });

  if (query.loading) return <p>Loading...</p>;
  if (query.error) return <p>{!bookId ? "Select a Book" : "Oops! :("}</p>;

  const book = query.data.book;

  return (
    <div id="book-details">
      <h1>{book.name}</h1>
      <p>{book.genre}</p>
      <p>
        <b>Author: </b>
        {book.author.name}
      </p>

      <b>Books:</b>
      <ul>
        {book.author.books.map((b) => (
          <li key={b.id}>{b.name}</li>
        ))}
      </ul>
    </div>
  );
}
