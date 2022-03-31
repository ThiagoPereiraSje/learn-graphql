import { gql, useQuery } from "@apollo/client";

const getBooksQuery = gql`
  {
    books {
      name
      genre
      id
    }
  }
`;

export default function BookList() {
  const { loading, error, data } = useQuery(getBooksQuery);

  const displayBooks = () => {
    if (loading) return <>Loading books...</>;
    if (error) return <>Oops! :(</>;

    return (
      <>
        {data.books.map((book) => (
          <li key={book.id}>
            {book.name} - {book.genre}
          </li>
        ))}
      </>
    );
  };

  return (
    <div>
      Book List
      <ul id="book-list">{displayBooks()}</ul>
    </div>
  );
}
