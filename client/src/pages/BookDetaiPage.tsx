import { useNavigate, useParams } from 'react-router-dom';
import {useEffect, useState} from "react";
import {Book} from "../types/book";
import {deleteBook, fetchBook} from "../api/books";
import BookDetail from "../components/BookDetail";
import StockAdjuster from "../components/StockAdjuster";


const BookDetailPage: React.FC = () => {
    const { bookId } = useParams<{ bookId: string }>();
    const navigate = useNavigate();

    const [book, setBook] = useState<Book | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!bookId) return;

        fetchBook(Number(bookId))
            .then((res) => {
            setBook(res.data);
            setLoading(false);
        })
            .catch((err) => {
                console.error('도서 정보를 불러오는 데 실패했습니다 : ', err);
                alert('해당 책을 찾을 수 없습니다,');
                navigate('/');
            });
    }, [bookId, navigate]);

    const handleDelete = async () => {
        if (!book) return;

        const ok = window.confirm(`"${book.title}" 책을 삭제하시겠습니까?`);
        if (!ok) return;

        try {
            await deleteBook(book.id);
            alert('삭제되었습니다.');
            navigate('/');
        } catch (err) {
            console.error('삭제 실패: ', err);
            alert('삭제에 실패했습니다.');
        }
    };

    if (loading) return <p> 책 불러오는 중 ..</p>;
    if (!book) return <p>도서 정보를 찾을 수 없습니다.</p>;

    return (
        <div className="p-6">
            <BookDetail book={book}
                        onDelete={handleDelete}
            />
            <StockAdjuster
                bookId={book.id}
                currentStock={book.stock}
                onUpdate={(newStock) => setBook({ ...book, stock: newStock })}
            />
        </div>
    );
};
export default BookDetailPage;