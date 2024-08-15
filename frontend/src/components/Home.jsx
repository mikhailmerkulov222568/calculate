import React, { useState } from "react";
import Calculator from "./calculators/Calculator";
import './styles/Home.css';

function Home() {
    const [activeCalculator, setActiveCalculator] = useState("mortgage");

    const calculators = {
        mortgage: { interestRate: 9.6, loanType: "Ипотека" },
        car: { interestRate: 3.5, loanType: "Автокредит" },
        consumer: { interestRate: 14.5, loanType: "Потребительский кредит" }
    };

    const handleCalculatorChange = (type) => {
        setActiveCalculator(type);
    };

    return (
        <div className="home-wrapper">
            <header className="home-header">
                <h1>Выбор калькулятора</h1>
                <nav className="calculator-navigation">
                    {Object.entries(calculators).map(([type, { loanType }]) => (
                        <button
                            key={type}
                            className={`nav-button ${activeCalculator === type ? "active" : ""}`}
                            onClick={() => handleCalculatorChange(type)}
                        >
                            {loanType}
                        </button>
                    ))}
                </nav>
            </header>
            <section className="calculator-section">
                <div className="calculator-info">
                    <h2 className="calculator-title">
                        {calculators[activeCalculator].loanType}
                    </h2>
                    <p>Процентная ставка: {calculators[activeCalculator].interestRate}%</p>
                </div>
                <Calculator
                    interestRate={calculators[activeCalculator].interestRate}
                    loanType={calculators[activeCalculator].loanType}
                />
            </section>
            <footer className="home-footer">
                <p>© 2024 Кредитный Калькулятор. Все права защищены.</p>
            </footer>
        </div>
    );
}

export default Home;
