import React from 'react'

const UserInput = ({ data, onChange }) => {
  return (
    <section id="user-input">
      <div className="input-group">
        <p>
          <label htmlFor="initialInvestment">Initial investment</label>
          <input
            type="number"
            name="initialInvestment"
            id="initialInvestment"
            required
            onChange={onChange}
            value={data.initialInvestment}
          />
        </p>
        <p>
          <label htmlFor="annualInvestment">Annual investment</label>
          <input
            type="number"
            name="annualInvestment"
            id="annualInvestment"
            required
            onChange={onChange}
            value={data.annualInvestment}
          />
        </p>
      </div>

      <div className="input-group">
        <p>
          <label htmlFor="expected_return">Expected return</label>
          <input
            type="number"
            name="expectedReturn"
            id="expectedReturn"
            required
            onChange={onChange}
            value={data.expectedReturn}
          />
        </p>
        <p>
          <label htmlFor="duration">Duration</label>
          <input type="number" name="duration" id="duration" required onChange={onChange} value={data.duration} />
        </p>
      </div>
    </section>
  )
}

export default UserInput
