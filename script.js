const leftContainer = document.getElementById("leftContainer");
const home = document.getElementById("home");
const ai = document.getElementById("ai");
const chartbtn = document.getElementById("chartbtn");
const tax = document.getElementById("tax");
const totalIncome = document.getElementById("totalIncome");
const income = document.getElementById("income");
const selectIncomeOption = document.getElementById("selectIncomeOption");
const description = document.getElementById("description");
const amount = document.getElementById("amount");
const btn = document.getElementById("submit");
const numberOfTransactions = document.getElementById("numberOfTransactions");
const rightContainer = document.getElementById("rightContainer");
const chart = document.getElementById("chart");
const ctx = document.getElementById("myChart");
const aipromt = document.getElementById("aiprompt");
const geminiInput = document.getElementById("geminiInput");
const geminiButton = document.getElementById("geminiButton");
const middleContainer = document.getElementById("middleContainer");
const aiContainer = document.getElementById("aiContainer");
// const askMebtn = document.getElementById('askMebtn');

let totalBalance = 0;
// let incomeSum = 0;
// let expenseSum = 0;

let transactionsArr = JSON.parse(localStorage.getItem("users")) || [];
console.log(transactionsArr);

function getData() {
  numberOfTransactions.innerHTML = "";
  let incomeSum = 0;
  let expenseSum = 0;

  if (transactionsArr.length == 0) {
    console.log("empty");
    document.getElementById("transactionChecker").style.display = "block";
  } else {
    document.getElementById("transactionChecker").style.display = "none";
  }

  //   console.log(transactionsArr);

  transactionsArr.forEach((ele) => {
    if (ele.selectvalue === "income") {
      incomeSum += parseInt(ele.amountValue);
    } else {
      expenseSum += parseInt(ele.amountValue);
    }
    let div = document.createElement("div");
    numberOfTransactions.appendChild(div);
    div.innerHTML = `
        <div class="transactionsleftCard">
        <p class="entries" >${ele.descriptionValue}</p>
        <p >${ele.selectvalue}</p>
        </div>
        <div>
        <p class=" entries ${ele.selectvalue}"><span>${
      ele.selectvalue == "income" ? "+" : "-"
    }</span>${ele.amountValue}</p>
        </div>
        `;
  });
  console.log(incomeSum);
  localStorage.setItem("incomeSum", incomeSum);
  console.log(expenseSum);

  totalBalance = incomeSum - expenseSum;
  totalIncome.innerText = `$ ${totalBalance} `;
  income.innerText = `$ ${incomeSum}`;
  expense.innerText = `$ ${expenseSum}`;
  aipromt.innerHTML = `Total Balance is ${totalBalance} and Total Expense is ${expenseSum} learn how to manage with the help of AI  <br> <button id="askMebtn">Ask Me</button>`;
  console.log(aipromt);

  updateChart(incomeSum, expenseSum);

  const askMebtn = document.getElementById("askMebtn");
  askMebtn.addEventListener("click", () => {
    run(
      `hi my income is ${incomeSum} and my expenses are ${expenseSum} help to manage this money`
    );

    rightContainer.append(aiContainer);
    aiContainer.style.display = "block";
    chart.style.display = "none";
  });
}

chartbtn.addEventListener("click", () => {
  // rightContainer.innerHTML = "";
  rightContainer.append(chart);
  aiContainer.style.display = "none";
  chart.style.display = "block";
});

ai.addEventListener("click", () => {
  rightContainer.append(aiContainer);
  aiContainer.style.display = "block";
  chart.style.display = "none";
});

btn.addEventListener("click", () => {
  let selectvalue = selectIncomeOption.value;
  let descriptionValue = description.value;

  if (description.value == "") {
    console.log("inside amount value");
    alert("Add Some Description");
    return false;
  }

  if (amount.value == "") {
    console.log("inside amount value");
    alert("Please enter an amount");
    return false;
  }

  let amountValue = parseInt(amount.value);

  console.log(amountValue);

  let obj = {
    selectvalue,
    descriptionValue: description.value,
    amountValue: amount.value,
  };

  transactionsArr.push(obj);
  console.log(transactionsArr);
  localStorage.setItem("users", JSON.stringify(transactionsArr));
  getData();
});

//AI

import { GoogleGenerativeAI } from "@google/generative-ai";

let API_KEY = "AIzaSyAWJXYhKtvOKmrcHXSIyL3z33-5s4wTdKw";

const genAI = new GoogleGenerativeAI(API_KEY);

async function run(prompt) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  middleContainer.innerHTML = "";
  let plainText = text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1");
  middleContainer.innerHTML = `<pre>${plainText}</pre>`;
}

geminiButton.addEventListener("click", () => {
  let prompt = geminiInput.value;
  run(prompt);
});

// run("hello");

// AIzaSyAWJXYhKtvOKmrcHXSIyL3z33-5s4wTdKw

function updateChart(incomeSum, expenseSum) {
  const canvas = document.getElementById("myChart");
  const ctx = canvas.getContext("2d");

  // Check if a chart instance already exists
  if (canvas.chartInstance) {
    // Destroy the existing chart instance
    canvas.chartInstance.destroy();
  }

  // Create a new chart instance
  canvas.chartInstance = new Chart(ctx, {
    type: "pie",
    data: {
      labels: ["Income", "Expense"],
      datasets: [
        {
          data: [incomeSum, expenseSum],
          backgroundColor: ["#1B1A55", "#9290C3"], // Example colors
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      legend: {
        display: false,
      },
    },
  });
}

window.onload = () => {
  getData();

  rightContainer.append(chart);
  aiContainer.style.display = "none";
};

tax.addEventListener("click", () => {
  window.location.href = "./tax.html";
});
