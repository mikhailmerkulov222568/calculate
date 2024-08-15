import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmailModal from './EmailModal';
import './../styles/Button.css';
import './../styles/App.css';
import { calculateLoan, sendEmail, setCalculatorData } from "../../store/actions/calculatorActions";

function Calculator({ interestRate, loanType }) {
  const dispatch = useDispatch();
  const calculator = useSelector(state => state.calculator);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setCalculatorData({ [name]: Number(value) }));
  };

  const handleCalculate = () => {
    dispatch(setCalculatorData({ interestRate, loanType }));
    dispatch(calculateLoan());
  };

  const handleSendEmail = (email) => {
    dispatch(sendEmail(email));
  };

  return (
      <div className="calculator-container">
        <header className="calculator-header">
          <h1 className="interest-rate-title">
            Процентная ставка <strong>{interestRate}</strong> (%)
          </h1>
          <button
              className="styleButton email-button"
              onClick={() => setShowModal(true)}
          >
            Результаты на почту
          </button>
        </header>
        <main className="calculator-main">
          <section className="input-section">
            <div className="input-group">
              <label htmlFor="cost" className="title">Сумма кредита</label>
              <input
                  id="cost"
                  type="number"
                  name="cost"
                  value={calculator.cost}
                  onChange={handleChange}
                  placeholder="Введите сумму кредита"
              />
            </div>
            <div className="input-group">
              <label htmlFor="term" className="title">Срок кредита (лет)</label>
              <input
                  id="term"
                  type="number"
                  min="1"
                  max="30"
                  name="term"
                  value={calculator.term}
                  onChange={handleChange}
                  placeholder="Введите срок кредита"
              />
            </div>
            <div className="input-group">
              <label htmlFor="initialPayment" className="title">Первоначальный взнос</label>
              <input
                  id="initialPayment"
                  type="number"
                  name="initialPayment"
                  value={calculator.initialPayment === 0 ? '' : calculator.initialPayment}
                  placeholder="Первоначальный взнос"
                  onChange={handleChange}
              />
            </div>
            <button
                className="styleButton"
                onClick={handleCalculate}
                disabled={calculator.cost <= 0 || calculator.initialPayment <= 0 || calculator.term <= 0}
            >
              Расчет
            </button>
          </section>
          <section className="output-section">
            <div className="info-value-block">
              <div className="info-value grey">
                Ежемесячный платеж <br/>
                <strong>{calculator.monthlyPayment ? calculator.monthlyPayment.toLocaleString() : '0'}</strong> ₽
              </div>
              <div className="info-value blue">
                Общая сумма выплат <br/>
                <strong>{calculator.totalPayment ? calculator.totalPayment.toLocaleString() : '0'}</strong> ₽
              </div>
              <div className="info-value green">
                Необходимый доход <br/>
                <strong>{calculator.requiredIncome ? calculator.requiredIncome.toLocaleString() : '0'}</strong> ₽
              </div>
            </div>
          </section>
        </main>

        <EmailModal
            show={showModal}
            onClose={() => setShowModal(false)}
            onSend={handleSendEmail}
            isSending={calculator.emailSending}
            isSent={calculator.emailSent}
            error={calculator.error}
        />
      </div>
  );
}

export default Calculator;
