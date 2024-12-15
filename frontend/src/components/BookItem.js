function BookItem({ book }) {
    return (
      <div>
        <img src={book.thumbnail} alt={book.title} />
        <h3>{book.title}</h3>
        <p>{book.author}</p>
      </div>
    );
  }
  
  export default BookItem;
  