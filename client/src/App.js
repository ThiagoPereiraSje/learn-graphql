import AddBook from "./components/AddBook";
import BookList from "./components/BookList";

export default function App() {
  return (
    <div>
      <h1>Ninja's Reading List</h1>
      <BookList />
      <AddBook />
    </div>
  );
}
