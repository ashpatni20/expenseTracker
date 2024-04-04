const calcTaxAmount = document.getElementById("calcTaxAmount");
const taxAmmount = document.getElementById("taxAmmount");
const totalIncomeContainer = document.getElementById("totalIncomeContainer");
const leftOver = document.getElementById("leftOver");
let home = document.getElementById("home");
const payNow = document.getElementById("payNow");

calcTaxAmount.addEventListener("click", () => {
  calciAmt();
});

let taxToPay;

const calciAmt = () => {
  let incomeSum = parseInt(localStorage.getItem("incomeSum")) || 0;
  totalIncomeContainer.innerHTML = incomeSum;
  console.log(incomeSum);

  taxToPay =
    incomeSum >= 1000000
      ? (incomeSum * 20) / 100
      : incomeSum >= 700000
      ? (incomeSum * 15) / 100
      : incomeSum >= 500000
      ? (incomeSum * 10) / 100
      : incomeSum >= 300000
      ? (incomeSum * 5) / 100
      : 0;

  taxAmmount.innerHTML = taxToPay;
  leftOver.innerHTML = incomeSum - taxToPay;
};

calciAmt();

home.addEventListener("click", () => {
  window.location.href = "./index.html";
});

console.log(taxToPay);

// var newOrderID = "order_" + Math.random().toString(36).substring(7);

var options = {
  key: "rzp_test_fOqmASUXt5fJSs", // Enter the Key ID generated from the Dashboard
  amount: Number(taxToPay)*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
  currency: "INR",
  name: "Acme Corp", //your business name
  description: "Test Transaction",
  image: "https://example.com/your_logo",
 // order_id: "order_NuSMb56yoj7ji7", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  // handler: function (response) {
  //   alert(response.razorpay_payment_id);
  //   alert(response.razorpay_order_id);
  //   alert(response.razorpay_signature);
  // },
  callback_url: "https://eneqd3r9zrjok.x.pipedream.net/",
  prefill: {
    //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
    name: "Aishwarya", //your customer's name
    email: "patni@example.com",
    contact: "9000090000", //Provide the customer's phone number for better conversion rates
  },
  notes: {
    address: "Razorpay Corporate Office",
  },
  theme: {
    color: "#3399cc",
  },
};
var rzp1 = new Razorpay(options);
document.getElementById("rzp-button1").onclick = function (e) {
  rzp1.open();
  e.preventDefault();
};

// -------------------------------------------------------------------------------------------------------

// Create a new instance of Razorpay with your key_id and key_secret
// var requestData = {
//   amount: 500,
//   currency: "INR",
//   receipt: "qwsaq1",
// };

// var requestOptions = {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization:
//       "Basic " +
//       btoa("rzp_test_fOqmASUXt5fJSs" + ":" + "XYCoMLLHB1FLTZWQsoDRTlWM"),
//   },
//   body: JSON.stringify(requestData),
// };

// fetch("https://api.razorpay.com/v1/orders", requestOptions)
//   .then((response) => {
//     response.json();
//     console.log("in");
//   })
//   .then((data) => {
//     console.log("Order created:", data);
//     // Handle the response data here
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//     // Handle errors here
//   });
