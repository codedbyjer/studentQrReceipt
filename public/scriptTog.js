
var initialAppOptions = `
    <option value="" disabled selected>Select App</option>
    <option value="ECPAY">ECPAY</option>
    <option value="G-CASH">G-CASH</option>
    <option value="PAYMAYA">PAYMAYA</option>
`;

async function toggleReferenceNumber() {
    var paymentMethod = document.getElementById("paymentOptions").value;
    var referenceNumberInput = document.getElementById("referenceNumber");
    var appPayment = document.getElementById("appOptions");

    if (paymentMethod === "Cash") {
        referenceNumberInput.type = "text"; 
        referenceNumberInput.value = "Cash Payment";
        referenceNumberInput.disabled = true;
        referenceNumberInput.placeholder = "Cash Payment";
        appPayment.value = "Cash Payment";
        appPayment.disabled = true;
        appPayment.innerHTML = '<option disabled selected>Cash Payment</option>';
    } else {
        referenceNumberInput.value = "";
        referenceNumberInput.type = "number";
        referenceNumberInput.disabled = false;
        referenceNumberInput.placeholder = "Reference Number";
        appPayment.value = "";
        appPayment.innerHTML = "";
        appPayment.disabled = false;
        appPayment.innerHTML = await initialAppOptions; 
    }
}
