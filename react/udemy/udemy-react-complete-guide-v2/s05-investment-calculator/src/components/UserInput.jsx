export default function UserInput({ userInput, onChange }) {
  return (
    <section id="user-input">
      <div className="input-group">
        <p>
          <label htmlFor="initial_investment">Initial investment</label>
          <input
            type="number"
            id="initial_investment"
            min="0"
            value={userInput.initialInvestment}
            onChange={(e) => onChange('initialInvestment', e.target.value)}
            required
          />
        </p>

        <p>
          <label htmlFor="annual_investment">Annual investment</label>
          <input
            type="number"
            id="annual_investment"
            min="0"
            value={userInput.annualInvestment}
            onChange={(e) => onChange('annualInvestment', e.target.value)}
            required
          />
        </p>
      </div>

      <div className="input-group">
        <p>
          <label htmlFor="expected_return">Expected return</label>
          <input
            type="number"
            id="expected_return"
            min="0"
            value={userInput.expectedReturn}
            onChange={(e) => onChange('expectedReturn', e.target.value)}
            required
          />
        </p>

        <p>
          <label htmlFor="duration">Duration</label>
          <input
            type="number"
            id="duration"
            min="0"
            value={userInput.duration}
            onChange={(e) => onChange('duration', e.target.value)}
            required
          />
        </p>
      </div>
    </section>
  )
}
