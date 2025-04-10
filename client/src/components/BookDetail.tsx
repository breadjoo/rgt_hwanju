import React from 'react';
import type { Book } from '../types/book';
import { useNavigate } from 'react-router-dom';

type Props = {
    book: Book;
    onDelete: () => void;
};

    const BookDetail: React.FC<Props> = ({book, onDelete }) => {
    const navigate = useNavigate();

    return (
        <div className="border p-6 rounded shadow-md">
            <h2 className="text-2xl font-bold mb-2">책 제목 : {book.title}</h2>
            <p className="text-gray-700 mb-1">저자: {book.author}</p>
            <p className="text-gray-700 mb-1">가격: {book.price.toLocaleString()}원</p>
            <p className="text-gray-700 mb-1">재고: {book.stock}권</p>
            {book.description && <p className="text-sm text-gray-600 mt-2">설명: {book.description}</p>}
            <div className="flex gap-4 mt-6">
                <button
                    onClick={onDelete}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                    🗑️ 책 삭제하기
                </button>

                <button
                    onClick={() => navigate(`/books/edit/${book.id}`)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                >
                    ✏️ 수정하기
                </button>
            </div>
        </div>
    );
};

export default BookDetail;
