
import BookCard from "@/components/BookCard";
import Hero from "@/components/Hero";
import { sampleBooks } from "@/lib/constants";

export default function Home() {
  return (
    <main className="wrapper container">
      <Hero />
      <div className="library-books-grid">
        {sampleBooks.map((book) => (
          <BookCard key={book._id} title={book.title} author={book.author} slug={book.slug} coverURL={typeof book.coverURL === "string" ? book.coverURL : book.coverURL.src} />
        ))}
      </div>
    </main>
  );
}
