import "./App.css";
import cardLogo from "./images/card-logo.svg";
import completeIcon from "./images/icon-complete.svg";
import React from "react";

const initState = {
	name: "John Doe",
	number: "0000 0000 0000 0000",
	month: "00",
	year: "00",
	cvc: "000",
};
class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = initState;
		this.inputName = this.inputName.bind(this);
		this.inputNumber = this.inputNumber.bind(this);
		this.inputMonth = this.inputMonth.bind(this);
		this.inputYear = this.inputYear.bind(this);
		this.inputCvc = this.inputCvc.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleContinue = this.handleContinue.bind(this);
	}

	inputName(e) {
		if (e.target.value === "") {
			this.setState({ name: initState.name });
			return;
		}
		if (e.target.value.length > 25) {
			return;
		}
		this.setState({ name: e.target.value });
	}

	inputNumber(e) {
		if (e.target.value === "") {
			this.setState({ number: initState.number });
			return;
		}

		let num = e.target.value;
		for (let i = 0; i < 16 - e.target.value.length; i++) num += "0";

		this.setState({
			number: num.replace(/\d{4}(?=.)/g, "$& "),
		});
	}

	inputMonth(e) {
		if (e.target.value === "") {
			this.setState({ month: initState.month });
			return;
		}
		if (e.target.value.length === 1) {
			this.setState({ month: "0" + e.target.value });
			return;
		}
		this.setState({ month: e.target.value });
	}

	inputYear(e) {
		if (e.target.value === "") {
			this.setState({ year: initState.year });
			return;
		}
		if (e.target.value.length === 1) {
			this.setState({ year: "0" + e.target.value });
			return;
		}
		this.setState({ year: e.target.value });
	}

	inputCvc(e) {
		if (e.target.value === "") {
			this.setState({ cvc: initState.cvc });
			return;
		}

		this.setState({ cvc: e.target.value });
	}

	handleSubmit() {
		let validName = true;
		if (this.state.name === initState.name) {
			document.getElementById("nameWarning").innerText =
				"Name cannot be empty";
			validName = false;
		} else {
			for (let i = 0; i < this.state.name.length; i++) {
				if (
					!isNaN(this.state.name.charAt(i)) &&
					this.state.name.charAt(i) !== " "
				) {
					document.getElementById("nameWarning").innerText =
						"Name cannot contain a number";
					validName = false;
				}
			}
		}
		if (validName) document.getElementById("nameWarning").innerText = "";

		let validNumber = true;
		if (this.state.number === initState.number) {
			document.getElementById("numberWarning").innerText =
				"Number cannot be empty";
			validNumber = false;
		} else if (this.state.number.replace(/\s/g, "").length < 16) {
			document.getElementById("numberWarning").innerText =
				"Number must be 16 digits";
			validNumber = false;
		} else {
			for (let i = 0; i < this.state.number.length; i++) {
				if (
					isNaN(this.state.number.charAt(i)) &&
					this.state.number.charAt(i) !== " "
				) {
					document.getElementById("numberWarning").innerText =
						"Number cannot contain a letter";
					validNumber = false;
				}
			}
		}
		if (validNumber)
			document.getElementById("numberWarning").innerText = "";

		let validDate = true;
		if (
			this.state.month === initState.month ||
			this.state.year === initState.year
		) {
			document.getElementById("dateWarning").innerText =
				"Date cannot be empty";
			validDate = false;
		} else if (this.state.month > 12) {
			document.getElementById("dateWarning").innerText =
				"Month cannot be greater than 12";
			validDate = false;
		} else {
			for (let i = 0; i < 2; i++) {
				if (
					isNaN(this.state.month.charAt(i)) ||
					isNaN(this.state.year.charAt(i))
				) {
					document.getElementById("dateWarning").innerText =
						"Date cannot contain a letter or spaces";
					validDate = false;
				}
			}
		}
		if (validDate) document.getElementById("dateWarning").innerText = "";

		let validCvc = true;
		if (this.state.cvc === initState.cvc) {
			document.getElementById("cvcWarning").innerText =
				"CVC cannot be empty";
			validCvc = false;
		} else if (this.state.cvc.replace(/\s/g, "").length < 3) {
			document.getElementById("cvcWarning").innerText =
				"CVC must be 3 digits";
			validCvc = false;
		} else {
			for (let i = 0; i < this.state.cvc.length; i++) {
				if (isNaN(this.state.cvc.charAt(i))) {
					document.getElementById("cvcWarning").innerText =
						"CVC cannot contain a letter or spaces";
					validCvc = false;
				}
			}
		}
		if (validCvc) document.getElementById("cvcWarning").innerText = "";

		if (validName && validNumber && validDate && validCvc) {
			document.getElementById("form").style.display = "none";
			document.getElementById("success").style.display = "flex";
		}
	}

	handleContinue() {
		const fields = document.getElementsByClassName("field");
		for (let i = 0; i < fields.length; i++) {
			fields[i].value = "";
		}
		this.setState(initState);
		document.getElementById("success").style.display = "none";
		document.getElementById("form").style.display = "flex";
	}

	render() {
		return (
			<div className="App">
				<div className="cards">
					<div className="card front">
						<img src={cardLogo} alt="Card Logo"></img>
						<p id="card-number" className="number">
							{this.state.number}
						</p>
						<div id="details">
							<p>{this.state.name}</p>
							<p className="number">
								{this.state.month}/{this.state.year}
							</p>
						</div>
					</div>
					<div className="card back">
						<p>{this.state.cvc}</p>
					</div>
				</div>
				<div id="form-section">
					<form onSubmit={this.handleSubmit} id="form">
						<label>CARDHOLDER NAME</label>
						<input
							type="text"
							placeholder="John Doe"
							name="name"
							maxLength="25"
							className="field"
							onChange={this.inputName}
						></input>
						<p className="warning" id="nameWarning"></p>
						<label>CARD NUMBER</label>
						<input
							type="text"
							placeholder="0000 0000 0000 0000"
							name="number"
							maxLength="16"
							className="field"
							onChange={this.inputNumber}
						></input>
						<p className="warning" id="numberWarning"></p>

						<div className="subfields">
							<div className="subfield" id="date">
								<label>EXP. DATE</label>
								<div className="date-fields">
									<input
										type="text"
										placeholder="MM"
										name="month"
										maxLength="2"
										className="field"
										onChange={this.inputMonth}
									></input>
									<input
										type="text"
										placeholder="YY"
										name="year"
										maxLength="2"
										className="field"
										onChange={this.inputYear}
									></input>
								</div>
								<p className="warning" id="dateWarning"></p>
							</div>
							<div className="subfield">
								<label>CVC</label>
								<input
									type="text"
									placeholder="e.g. 123"
									name="cvc"
									maxLength="3"
									className="field"
									onChange={this.inputCvc}
								></input>
								<p className="warning" id="cvcWarning"></p>
							</div>
						</div>
						<input
							type="button"
							value="SUBMIT"
							className="submit"
							onClick={this.handleSubmit}
						></input>
					</form>
					<div id="success">
						<img src={completeIcon}></img>
						<h2>THANK YOU!</h2>
						<h3>We've added your card details</h3>
						<button
							className="submit"
							onClick={this.handleContinue}
						>
							Continue
						</button>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
