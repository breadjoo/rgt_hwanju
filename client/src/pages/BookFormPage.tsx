import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {BookRequest} from "../types/bookRequest";
import {createBook, fetchBook, updateBook} from "../api/books";


const BookFormPage: React.FC = () => {
    const {id} = useParams<{ id: string }>();
    const isEdit = !!id;
    const navigate = useNavigate();

    const [form, setForm] = useState<BookRequest>({
        title: '',
        author: '',
        description: '',
        price: 0,
        stock: 0
    });

    useEffect(() => {
        if (isEdit) {
            fetchBook(Number(id))
                .then((res) => {
                    const { title, author, description, price, stock } = res.data;
                    setForm({ title, author, description, price, stock });
                })
                .catch(() => {
                    alert('책 정보를 불러오지 못했습니다.');
                    navigate('/');
                });
        }
    }, [id, isEdit, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: name === 'price' || name === 'stock' ? Number(value) : value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            if (isEdit) {
                await updateBook(Number(id), form);
                alert('책이 수정되었습니다!')
                navigate(`/books/${id}`);
            } else {
                await createBook(form);
                alert('책이 등록되었습니다!')
            }
            navigate('/');
        } catch (err) {
            console.error('책 저장 실패', err);
            alert('책 저장 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="p-6 max-w-xl mx-auto">

            <h1 className="text-2xl font-bold mb-4">{isEdit ? '책 수정하기 💾' : '책 등록하기 🆕'}            </h1>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block font-medium mb-1">제목 : </label>
                    <input
                        id="title"
                        name="title"
                        value={form.title}
                        onChange={handleChange}
                        placeholder="제목"
                        required
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label htmlFor="author" className="block font-medium mb-1">저자 : </label>
                    <input
                        id="author"
                        name="author"
                        value={form.author}
                        onChange={handleChange}
                        placeholder="저자"
                        required className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block font-medium mb-1">설명 : </label>
                    <textarea
                        id="description"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        placeholder="설명"
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label htmlFor="price" className="block font-medium mb-1">가격 : </label>
                    <input
                        id="price"
                        name="price"
                        type="number"
                        value={form.price}
                        onChange={handleChange}
                        placeholder="가격"
                        required className="w-full border p-2 rounded"
                    />
                </div>

                <div>
                    <label htmlFor="stock" className="block font-medium mb-1">재고 : </label>
                    <input
                        id="stock"
                        name="stock"
                        type="number"
                        value={form.stock}
                        onChange={handleChange}
                        placeholder="재고"
                        required className="w-full border p-2 rounded"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                    {isEdit ? '✏️ 수정하기' : '✏️ 등록하기'}
                </button>
            </form>
        </div>
    );
};

export default BookFormPage;