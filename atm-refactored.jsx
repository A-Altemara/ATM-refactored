const ATMDeposit = ({ onChange, isDeposit, isValid }) => {
	const choice = ['Deposit', 'Withdrawal'];
	return (
	  <label className="label huge">
		 <h3> {choice[Number(!isDeposit)]}</h3>
		<input id="number-input" type="number" width="200" onChange={onChange}></input>
		{/* In the <ATMDeposit> component JSX, add a disabled HTML attribute on the submit input element 
		In the implementation of the <ATMDeposit> component, use the return value of setValidTransaction to set the value of the isValid prop*/}
		<input type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid}></input>
	  </label>
	);
  };
  
  const Account = () => {
	const [deposit, setDeposit] = React.useState(0);
	const [totalState, setTotalState] = React.useState(0);
	const [isDeposit, setIsDeposit] = React.useState(true);
	const [atmMode, setAtmMode] = React.useState("");
  
	const [validTransaction, setValidTransaction] = React.useState(false);
  
	let status = `Account Balance $ ${totalState} `;
	console.log(`Account Rendered with isDeposit: ${isDeposit}`);
	const handleChange = (event) => {
	  console.log(`handleChange ${event.target.value}`);
	  setDeposit(Number(event.target.value));
	  if(event.target.value <= 0) {
		return setValidTransaction(false)
	  }
	  if(atmMode === "Withdrawal" && event.target.value > totalState) {
		setValidTransaction(false)
		alert `You have insufficient funds to make withdrawal.`
	  } else {
		setValidTransaction(true)
	  }
	};
	const handleSubmit = (event) => {
	  let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
	  setTotalState(newTotal);
	  setValidTransaction(false);
	  event.preventDefault();
	};
	const handleModeSelect = (event) => {
	  let mode = event.target.value
	  setAtmMode(event.target.value)
	  // if(atmMode != ""){
		if(mode === "Deposit") {
		  setIsDeposit(true)
		  console.log("poop")}
		if(mode === "Withdrawal"){
		  setIsDeposit(false)}
		// }
	}
  
	return (
	  <form onSubmit={handleSubmit}>
		<h2 id="total">{status}</h2>
		<label>Select an action below to continue</label>
		  <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
			<option id="no-selection" value=""></option>
			<option id="deposit-selection" value="Deposit">Deposit</option>
			<option id="cashback-selection" value="Withdrawal">Withdrawal</option>
		  </select>
  
		  {/* Send the value of validTransaction to the <ATMDeposit> component as a parameter */}
		  {atmMode === "" ? null: <ATMDeposit onChange={handleChange} isDeposit={isDeposit} atmMode={atmMode} isValid={validTransaction} ></ATMDeposit>}
	  </form>
	);
  };
// ========================================
ReactDOM.render(<Account />, document.getElementById("root"));
