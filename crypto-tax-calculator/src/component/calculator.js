import React, { Component } from "react";
import "./calculator.css";

class Calcul extends Component {
  state = {
    financialYear: "2023-2024",
    selectedCountry: "Australia",
    purchasePrice: "",
    salePrice: "",
    yourExpense: "",
    annualIncome: "$20,000", // Default annual income value
    investmentType: "Long Term", // Default investment type value
  };

  handleYearChange = (e) => {
    this.setState({ financialYear: e.target.value });
  };

  handleCountryChange = (e) => {
    this.setState({ selectedCountry: e.target.value });
  };

  handlePurchasePriceChange = (e) => {
    this.setState({ purchasePrice: e.target.value });
  };

  handleSalePriceChange = (e) => {
    this.setState({ salePrice: e.target.value });
  };

  handleExpenseChange = (e) => {
    this.setState({ yourExpense: e.target.value });
  };

  handleAnnualIncomeChange = (e) => {
    this.setState({ annualIncome: e.target.value });
  };

  handleInvestmentTypeChange = (e) => {
    this.setState({ investmentType: e.target.value });
  };

  calculateTaxRate = () => {
    const { annualIncome } = this.state;

    if (annualIncome <= "$45,000") {
      return "$5,092";
    } else {
      return `$5,092 + ${((annualIncome - "$45,000") * 0.325).toFixed(
        2
      )}% of excess over $45,000`;
    }
  };

  calculateCapitalGainsAmount = () => {
    const { purchasePrice, salePrice, yourExpense } = this.state;
    return salePrice - purchasePrice - yourExpense;
  };

  calculateLongTermGainsDiscount = () => {
    const { investmentType } = this.state;
    const capitalGainsAmount = this.calculateCapitalGainsAmount();

    if (investmentType === "Long Term" && capitalGainsAmount > 0) {
      return capitalGainsAmount * 0.5;
    }
    return 0;
  };

  calculateNetCapitalGains = () => {
    const capitalGainsAmount = this.calculateCapitalGainsAmount();
    const longTermGainsDiscount = this.calculateLongTermGainsDiscount();

    return capitalGainsAmount - longTermGainsDiscount;
  };

  calculateTaxToBePaid = () => {
    const taxRate = this.calculateTaxRate();
    const netCapitalGains = this.calculateNetCapitalGains();

    if (taxRate && typeof taxRate === "string") {
      const percentageMatch = taxRate.match(/(\d+(\.\d+)?)%/);

      if (percentageMatch) {
        const [, percentage] = percentageMatch;
        const baseTaxAmount = Number(taxRate.replace(/\D/g, ""));
        const tax = baseTaxAmount + netCapitalGains * (percentage / 100);
        return tax.toFixed(3);
      } else {
        return "Invalid Tax Rate";
      }
    } else {
      return "Invalid Input Data";
    }
  };

  render() {
    const {
      financialYear,
      selectedCountry,
      purchasePrice,
      salePrice,
      yourExpense,
      annualIncome,
      investmentType1,
    } = this.state;

    const taxRate = this.calculateTaxRate();
    const capitalGainsAmount = this.calculateCapitalGainsAmount();
    const longTermGainsDiscount = this.calculateLongTermGainsDiscount();
    const netCapitalGains = this.calculateNetCapitalGains();
    const taxToBePaid = this.calculateTaxToBePaid();

    return (
      <div className="calculator-container">
        <h2>Free Crypto Tax Calculator for Australia</h2>
        <div className="row">
          <div className="column">
            <label>Financial Year:</label>
            <select
              value={financialYear}
              onChange={this.handleYearChange}
              className="inputbox"
            >
              <option value="2022-2023">2022-2023</option>
              <option value="2023-2024">2023-2024</option>
              <option value="2024-2025">2024-2025</option>
            </select>
          </div>
          <div className="column">
            <label>Country:</label>
            <select
              value={selectedCountry}
              onChange={this.handleCountryChange}
              className="inputbox"
            >
              <option value="Australia">Australia</option>
              <option value="OtherCountry1">Other Country 1</option>
              <option value="OtherCountry2">Other Country 2</option>
            </select>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <label>Enter Purchase Price of Crypto:</label>
            <input
              type="text"
              className="inputbox"
              value={purchasePrice}
              onChange={this.handlePurchasePriceChange}
              placeholder="$"
            />
          </div>
          <div className="column">
            <label>Enter Sale Price of Crypto:</label>
            <input
              type="text"
              className="inputbox"
              value={salePrice}
              onChange={this.handleSalePriceChange}
              placeholder="$"
            />
          </div>
        </div>
        <div className="row">
          <div className="column1">
            <label>Enter Your Expense:</label>
            <input
              type="text"
              className="inputbox"
              value={yourExpense}
              onChange={this.handleExpenseChange}
              placeholder="$"
            />
          </div>
          <div className="column2">
            <label>Investment Type:</label>
            <div className="row">
              <div className="column3">
                <div className="investment-input">
                  <input
                    type="text"
                    value={investmentType1}
                    onChange={this.handleInvestmentType1Change}
                    placeholder="Type 1"
                    style={{ borderRadius: "20px", width: "100px" }}
                  />
                  <div className="checkmark">✔</div>
                </div>
              </div>
              <div className="column3">
                <div className="investment-input">
                  <input
                    type="text"
                    value={investmentType1}
                    onChange={this.handleInvestmentType2Change}
                    placeholder="Type 2"
                    style={{ borderRadius: "20px", width: "100px" }}
                  />
                  <div className="checkmark">✔</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <label>Select Your Annual Income:</label>
            <div className="input-dropdown">
              <select
                className="dropdown"
                value={annualIncome}
                onChange={this.handleAnnualIncomeChange}
                placeholder="$"
              >
                <option value="$20,000">$20,000</option>
                <option value="$30,000">$30,000</option>
                <option value="$40,000">$40,000</option>
              </select>
            </div>
          </div>
          <div className="column">
            <label>Tax Rate:</label>
            <span>{taxRate}</span>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <label>Capital Gain amount:</label>
            <span>{capitalGainsAmount}</span>
          </div>
          <div className="column">
            <label>Discount for Long Term Gains:</label>
            <span>{longTermGainsDiscount}</span>
          </div>
        </div>
        <div className="row">
          <div className="column">
            <label>Net Capital Gains:</label>
            <span>{netCapitalGains}</span>
          </div>
          <div className="column">
            <label>Tax to be Paid:</label>
            <span>{taxToBePaid}</span>
          </div>
        </div>
      </div>
    );
  }
}

export default Calcul;
