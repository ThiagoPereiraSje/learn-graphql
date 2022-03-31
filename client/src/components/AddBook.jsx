import { useQuery, useMutation } from "@apollo/client";
import { useState } from "react";
import { getAuthorsQuery, addBookMutation } from "../queries/queries";

/*
const [addTodo, { data, loading, error }] = useMutation(ADD_TODO, {
  variables: {
    text: "placeholder",
    someOtherVariable: 1234,
  },
});
*/

export default function AddBook() {
  const { loading, error, data } = useQuery(getAuthorsQuery);
  const [addBook, mutation] = useMutation(addBookMutation);

  const [bookName, setBookName] = useState("");
  const [bookGenre, setBookGenre] = useState("");
  const [authorId, setAuthorId] = useState("");

  const displayAuthors = () => {
    if (loading) return <option value="">Loading Authors...</option>;
    if (error) return <option value="">Oops! :(</option>;

    return data.authors.map((author) => (
      <option key={author.id} value={author.id}>
        {author.name}
      </option>
    ));
  };

  const validForm = () => {
    return bookName.trim() && bookGenre.trim() && authorId.trim();
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      await addBook({
        variables: { name: bookName, genre: bookGenre, authorId: authorId },
      });

      console.log("error: ", mutation.error);

      setBookName("");
      setBookGenre("");
      setAuthorId("");
    } catch (error) {
      console.log("error: ", error);
    }
  };

  return (
    <form id="add-book" onSubmit={submitForm}>
      <div className="field">
        <label htmlFor="book-name">Name:</label>
        <input
          type="text"
          name="book-name"
          value={bookName}
          onChange={(e) => setBookName(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="book-genre">Genre:</label>
        <input
          type="text"
          name="book-genre"
          value={bookGenre}
          onChange={(e) => setBookGenre(e.target.value)}
        />
      </div>
      <div className="field">
        <label htmlFor="book-author">Author:</label>
        <select
          name="book-author"
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
        >
          <option value="">--Selecione--</option>
          {displayAuthors()}
        </select>
      </div>

      <button disabled={!validForm()}>Add Book</button>
    </form>
  );
}
