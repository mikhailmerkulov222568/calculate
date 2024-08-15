import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchCalculations, deleteCalculation } from "../../store/actions/adminActions";
import CalculationForm from './../calculators/CalculationForm';
import './../styles/AdminPanel.css';

const AdminPanel = () => {
    const dispatch = useDispatch();
    const { calculations, loadingCalculations, error } = useSelector(state => state.admin);
    const [currentCalculation, setCurrentCalculation] = useState(null);

    useEffect(() => {
        dispatch(fetchCalculations());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteCalculation(id));
        if (currentCalculation && currentCalculation._id === id) {
            setCurrentCalculation(null);
        }
    };

    const handleEdit = (calculation) => {
        setCurrentCalculation(calculation);
    };

    const handleExport = async () => {
        try {
            const response = await fetch('http://localhost:8000/admin/export');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'calculations.csv';
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error('Error exporting calculations:', error);
        }
    };

    return (
        <div className="admin-container">
            <header className="dashboard-header">
                <h1>Панель администратора</h1>
                <button className="export-btn" onClick={handleExport}>Экспортировать</button>
            </header>
            <main className="admin-content">
                <h2>Список расчетов</h2>
                {loadingCalculations && <p className="loading">Загрузка расчетов...</p>}
                {error && <p className="error">Ошибка: {error}</p>}
                <div className="calculations-table">
                    <table>
                        <thead>
                        <tr>
                            <th>Тип</th>
                            <th>Сумма</th>
                            <th>Первоначальный взнос</th>
                            <th>Срок</th>
                            <th>Процентная ставка</th>
                            <th>Ежемесячный платеж</th>
                            <th>Общая сумма выплат</th>
                            <th>Необходимый доход</th>
                            <th>Дата создания</th>
                            <th>Действия</th>
                        </tr>
                        </thead>
                        <tbody>
                        {calculations && calculations.map((calculation, index) => (
                            <tr key={index}>
                                <td>{calculation.type}</td>
                                <td>{calculation.cost} ₽</td>
                                <td>{calculation.initialPayment} ₽</td>
                                <td>{calculation.term} лет</td>
                                <td>{calculation.interestRate}%</td>
                                <td>{calculation.monthlyPayment} ₽</td>
                                <td>{calculation.totalPayment} ₽</td>
                                <td>{calculation.requiredIncome} ₽</td>
                                <td>{new Date(calculation.createdAt).toLocaleString()}</td>
                                <td>
                                    <button onClick={() => handleEdit(calculation)} className="edit-btn">Редактировать
                                    </button>
                                    <button onClick={() => handleDelete(calculation._id)}
                                            className="delete-btn">Удалить
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </main>
            <div className="admin-dashboard">

                <main className="dashboard-content">
                    <aside className="form-sidebar">
                        <CalculationForm currentCalculation={currentCalculation}
                                         setCurrentCalculation={setCurrentCalculation}/>
                    </aside>
                </main>
            </div>
        </div>
    );
}

export default AdminPanel;
