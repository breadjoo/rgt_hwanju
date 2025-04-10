import React, { useEffect, useState } from "react";
import { fetchBooks } from "../api/books";
import { Book } from "../types/book";
import {Link} from "react-router-dom";

const pageSize = 10;

const BookListPage: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [keyword, setKeyword] = useState('');
    const [searchBy, setSearchBy] = useState<'title' | 'author'>('title');
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        fetchBooks()
            .then((res) => setBooks(res.data))
            .catch((err) => console.error('[BookListPage] 책 목록 불러오기 실패', err));
    }, []);

    const filtered = books.filter((book) =>
    book[searchBy].toLowerCase().includes(keyword.toLowerCase()));

    const pagedBooks = filtered.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    const totalPages = Math.ceil(filtered.length / pageSize);

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">📚 책 목록</h1>
            <Link to="/books/new" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                ✏️ 책 등록하기
            </Link>
            <div className="mb-4 flex gap-2">
                <select
                    value={searchBy}
                    onChange={(e) => setSearchBy(e.target.value as 'title' | 'author')}
                    className="border px-2 py-1"
                >
                    <option value="title">제목</option>
                    <option value="author">저자</option>
                </select>
                <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="검색어 입력"
                    className="border px-2 py-1 w-64"
                />
            </div>

            {pagedBooks.length === 0 ? (
                <p>검색 결과가 없습니다.</p>
            ) : (
                <ul className="space-y-2">
                    {pagedBooks.map((book) => (
                        <li key={book.id} className="border p-4 rounded">
                            <h2 className="text-lg font-semibold">{book.title}</h2>
                            <p>저자: {book.author}</p>
                            <p>가격: {book.price.toLocaleString()}원</p>
                            <p>재고: {book.stock}권</p>
                            <a
                                href={`/books/${book.id}`}
                                className="text-blue-500 underline mt-2 inline-block"
                            >
                                상세보기 →
                            </a>
                        </li>
                    ))}
                </ul>
            )}

            <div className="mt-6 flex gap-2">
                {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((n) => (
                    <button
                        key={n}
                        onClick={() => setCurrentPage(n)}
                        className={`px-3 py-1 border rounded ${
                            currentPage === n ? 'bg-blue-500 text-white' : ''
                        }`}
                    >
                        {n}
                    </button>
                ))}
            </div>
        </div>

    );

}

export default BookListPage;