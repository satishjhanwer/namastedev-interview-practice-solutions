import { type JSX, useState } from 'react';
import './styles.css';

interface MortgageInputs {
  loanAmount: number;
  annualRate: number;
  years: number;
}

function parseInputs(loanAmount: string, interestRate: string, loanTerm: string): MortgageInputs | null {
  const P = Number(loanAmount);
  const annualRate = Number(interestRate);
  const years = Number(loanTerm);

  const isValid =
    loanAmount.trim() !== '' &&
    interestRate.trim() !== '' &&
    loanTerm.trim() !== '' &&
    Number.isFinite(P) &&
    P > 0 &&
    Number.isFinite(annualRate) &&
    annualRate > 0 &&
    Number.isFinite(years) &&
    years > 0;

  return isValid ? { loanAmount: P, annualRate, years } : null;
}

function calculateMonthlyPayment({ loanAmount, annualRate, years }: MortgageInputs): number {
  const r = annualRate / 12 / 100;
  const n = years * 12;
  const factor = Math.pow(1 + r, n);
  return loanAmount * ((r * factor) / (factor - 1));
}

export default function MortgageCalculator(): JSX.Element {
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [interestRate, setInterestRate] = useState<string>('');
  const [loanTerm, setLoanTerm] = useState<string>('');
  const [result, setResult] = useState<number | null>(null);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  const handleCalculate = (): void => {
    const inputs = parseInputs(loanAmount, interestRate, loanTerm);

    if (!inputs) {
      setResult(null);
      setIsInvalid(true);
      return;
    }

    setResult(calculateMonthlyPayment(inputs));
    setIsInvalid(false);
  };

  return (
    <div className="mortgage-calculator-body-container">
      <h1>Mortgage Calculator</h1>

      <div className="mortgage-calculator-field">
        <label htmlFor="loanAmount">Loan Amount</label>
        <input
          id="loanAmount"
          aria-label="Loan Amount"
          type="number"
          min="0"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
        />
      </div>

      <div className="mortgage-calculator-field">
        <label htmlFor="interestRate">Annual Interest Rate</label>
        <input
          id="interestRate"
          aria-label="Annual Interest Rate"
          type="number"
          min="0"
          step="any"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
        />
      </div>

      <div className="mortgage-calculator-field">
        <label htmlFor="Loan Term">Loan Term (years)</label>
        <input id="Loan Term" type="number" min="0" value={loanTerm} onChange={(e) => setLoanTerm(e.target.value)} />
      </div>

      <button onClick={handleCalculate}>Calculate</button>

      {isInvalid && <p className="mortgage-calculator-error">Invalid input</p>}
      {!isInvalid && result !== null && (
        <p aria-label="result" className="mortgage-calculator-result">
          Monthly Payment: {result.toFixed(2)}
        </p>
      )}
    </div>
  );
}
