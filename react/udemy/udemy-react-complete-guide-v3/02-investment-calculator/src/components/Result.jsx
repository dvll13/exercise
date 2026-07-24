import React from 'react'
import { calculateInvestmentResults, formatter } from '../util/investment'

const Result = ({ userInput }) => {
  let resultsData = []
  resultsData = calculateInvestmentResults(userInput)

  return (
    <table id="result">
      <thead>
        <tr>
          <th>Year</th>
          <th>Investment Value</th>
          <th>Interest (Year)</th>
          <th>Total Interest</th>
          <th>Invested Capital</th>
        </tr>
      </thead>
      <tbody>
        {resultsData.map((d) => {
          const { format } = formatter
          const totalInterest = d.valueEndOfYear - d.annualInvestment * d.year - userInput.initialInvestment
          const totalAmountInvested = d.valueEndOfYear - totalInterest

          return (
            <tr key={d.year}>
              <td>{d.year}</td>
              <td>{format(d.annualInvestment)}</td>
              <td>{format(d.valueEndOfYear)}</td>
              <td>{format(totalInterest)}</td>
              <td>{format(totalAmountInvested)}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Result
