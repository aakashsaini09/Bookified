
import BookCard from "@/components/BookCard";
import Hero from "@/components/Hero";
import { sampleBooks } from "@/lib/constants";

export default function Home() {
  return (
    <main className="pt-3">
      <Hero />
      <div className="nav-hero-grid">
        {sampleBooks.map((book) => (
          <BookCard key={book._id} title={book.title} author={book.author} slug={book.slug} coverURL={book.coverURL} />
        ))}
      </div>
    </main>
  );
}
