import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { deleteBook } from '../features/books/booksSlice'
import NotFound from './NotFound'
import BookModalDelete from './BookModalDelete'

const BookView = () => {
	const [open, setOpen] = useState(false)

	const { id } = useParams()

	const navigate = useNavigate()

	const dispatch = useDispatch()

	const books = useSelector(state => state.books)

	const book = books.find(book => book.id === id)

	const handleDeleteBook = () => {
		dispatch(deleteBook(id))

		toast('Deleted book!', { type: 'success' })

		navigate('/books')
	}

	if (!book) return <NotFound />

	const { img, title, author, isbn, published, description } = book

	return (
		<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<BookModalDelete
				open={open}
				setOpen={setOpen}
				handleDeleteBook={handleDeleteBook}
			/>
			<div className="my-6 grid grid-cols-12 gap-6">
				<div className="col-span-12 md:col-span-6 lg:col-span-4">
					<img
						src={img}
						alt={`Cover of the book ${title}`}
						className="h-full w-full object-cover object-center lg:h-full lg:w-full"
					/>
				</div>
				<div className="py-4 flex flex-col gap-2 col-span-12 md:col-span-6 lg:col-span-8">
					<h3 className="text-4xl font-semibold text-gray-800">
						{title}
					</h3>
					<div>
						<p className="text-lg text-gray-700">Author</p>
						<p className="text-gray-800">{author}</p>
					</div>
					<div>
						<p className="text-lg text-gray-700">ISBN</p>
						<p className="text-gray-800">{isbn}</p>
					</div>
					<div>
						<p className="text-lg text-gray-700">Published</p>
						<p className="text-gray-800">{published}</p>
					</div>
					<div>
						<p className="text-lg text-gray-700">Description</p>
						<p className="text-gray-800">{description}</p>
					</div>
					<div>
						<p className="text-lg text-gray-700">Options</p>
						<div className="flex gap-2">
							<button
								className="rounded-md border border-transparent bg-red-600 py-2 px-4 font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
								onClick={() => setOpen(true)}
							>
								Delete
							</button>
							<Link
								to={`/update-book/${id}`}
								key={id}
								className="rounded-md border border-transparent bg-indigo-600 py-2 px-4 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
							>
								Update
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default BookView
