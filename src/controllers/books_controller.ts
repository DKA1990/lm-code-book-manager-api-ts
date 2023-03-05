import { Request, Response } from "express";
import * as bookService from "../services/books";

export const getBooks = async (req: Request, res: Response) => {
	const books = await bookService.getBooks();
	res.json(books).status(200);
};

export const getBook = async (req: Request, res: Response) => {
	const bookId = req.params.bookId;
	const book = await bookService.getBook(Number(bookId));

	if (book) {
		res.json(book).status(200);
	} else {
		res.status(404).json("Book Not found");
	}
};

export const saveBook = async (req: Request, res: Response) => {
	const bookToBeSaved = req.body;
	try {
		if (bookToBeSaved.bookId !== undefined) {
			const bookCheck = await bookService.getBook(Number(bookToBeSaved.bookId));
			if (bookCheck) {
				res.status(406).json("Book Id already exists");
			} else {
				const book = await bookService.saveBook(bookToBeSaved);
				res.status(201).json(book);
			}
		} else {
			throw new Error("BookId cannot be null");
		}
	} catch (error) {
		res.status(400).json({ message: (error as Error).message });
	}
};

// User Story 4 - Update Book By Id Solution
export const updateBook = async (req: Request, res: Response) => {
	const bookUpdateData = req.body;
	const bookId = Number.parseInt(req.params.bookId);

	const book = await bookService.updateBook(bookId, bookUpdateData);
	res.status(204).json(book);
};

// Delete Book By Id
export const deleteBook = async (req: Request, res: Response) => {
	try {
		const bookId = Number.parseInt(req.params.bookId);
		await bookService.deleteBook(bookId);
		res.status(204).json("Book successfully deleted");
	} catch (error) {
		res.status(400).json({ message: (error as Error).message });
	}
}
