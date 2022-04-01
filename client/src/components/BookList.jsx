import { useQuery } from "@apollo/client";
import { useState } from "react";
import { getBooksQuery } from "../queries/queries";
import BookDetails from "./BookDetails";

export default function BookList() {
  const { loading, error, data } = useQuery(getBooksQuery);
  const [bookId, setBookId] = useState("");

  const displayBooks = () => {
    if (loading) return <>Loading books...</>;
    if (error) return <>Oops! :(</>;

    return data.books.map((book) => (
      <li key={book.id} onClick={() => setBookId(book.id)}>
        {book.name} - {book.genre}
      </li>
    ));
  };

  return (
    <div id="book-list-container">
      <div>
        Book List
        <ul id="book-list">{displayBooks()}</ul>
      </div>
      <div>
        <BookDetails bookId={bookId} />
      </div>
    </div>
  );
}
