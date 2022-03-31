import { useQuery } from "@apollo/client";
import { getAuthorsQuery } from "../queries/queries";

export default function AddBook() {
  const { loading, error, data } = useQuery(getAuthorsQuery);

  const displayAuthors = () => {
    if (loading) return <option>Loading Authors...</option>;
    if (error) return <option>Oops! :(</option>;

    return data.authors.map((author) => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ));
  };

  return (
    <form id="add-book">
      <div className="field">
        <label htmlFor="book-name">Name:</label>
        <input type="text" name="book-name" />
      </div>
      <div className="field">
        <label htmlFor="book-genre">Genre:</label>
        <input type="text" name="book-genre" />
      </div>
      <div className="field">
        <label htmlFor="book-author">Author:</label>
        <select name="book-author">
          <option>--Selecione--</option>
          {displayAuthors()}
        </select>
      </div>

      <button>Add Book</button>
    </form>
  );
}
