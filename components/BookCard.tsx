import { BookCardProps } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
const BookCard = ({ title, author, slug, coverURL }: BookCardProps) => {
    // console.log({author, coverURL})
  return (
    <Link href={`/books/${slug}`} className="block rounded-lg overflow-hidden shadow-md">
      <article className='book-card-content'>
        <figure className='book-card-figure'>
            <div className="book-card-cover-wrapper">
                <Image src={coverURL} alt={title} width={133} height={200} className="book-card-cover" />
            </div>
        </figure>
        <figcaption className='book-card-meta'>
          <h3 className='book-card-title'>{title}</h3>
          <p className='book-card-author'>{author}</p>
        </figcaption>
      </article>
    </Link>
  )
}

export default BookCard
