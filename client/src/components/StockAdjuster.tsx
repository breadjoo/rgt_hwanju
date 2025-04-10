import React, { useState } from 'react';
import { patchBookStock } from '../api/books';

type Props = {
    bookId: number;
    currentStock: number;
    onUpdate: (newStock: number) => void;
};

const StockAdjuster: React.FC<Props> = ({ bookId, currentStock, onUpdate }) => {
    const [adjustAmount, setAdjustAmount] = useState<number>(0);
    const [stock, setStock] = useState(currentStock);

    const handleAdjust = async (delta: number) => {
        const newStock = stock + delta;
        if (newStock < 0) {
            alert('재고는 0 미만이 될 수 없습니다.');
            return;
        }

        try {
            await patchBookStock(bookId, newStock);
            setStock(newStock);
            onUpdate(newStock);
            alert(`재고가 ${delta > 0 ? '+' : ''}${delta}만큼 변경되었습니다.`);
        } catch (err) {
            console.error('재고 변경 실패:', err);
            alert('재고 변경 실패');
        }
    };

    return (
        <div className="mt-6 border-t pt-4">
            <h3 className="font-semibold mb-2">📦 재고 조절</h3>
            <div className="flex items-center gap-2">
                <input
                    type="number"
                    value={adjustAmount}
                    onChange={(e) => setAdjustAmount(Number(e.target.value))}
                    className="border p-1 w-24 text-center"
                    placeholder="조절 수량"
                />
                <button
                    onClick={() => handleAdjust(adjustAmount)}
                    className="bg-green-500 text-white px-3 py-1 rounded"
                >
                    + 추가하기
                </button>
                <button
                    onClick={() => handleAdjust(-adjustAmount)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                >
                    - 차감하기
                </button>
            </div>
            <p className="mt-2 text-sm text-gray-600">현재 재고: {stock}권</p>
        </div>
    );
};

export default StockAdjuster;
