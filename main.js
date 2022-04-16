const totalCost = document.getElementById('cost'),
      payment = document.getElementById('payment'),
      loanTerm = document.getElementById('loan-term');

const сostRange = document.getElementById('cost-range'),
      paymentRange = document.getElementById('payment-range'),
      loanTermRange = document.getElementById('loan-range');

const amountCredit = document.getElementById('amount-credit'),
      montlyPayments = document.getElementById('montly-payment'),
      recomentedIncome = document.getElementById('recomented-income');

const inputsRange = document.querySelectorAll('.input-range');

const banksBtn = document.querySelectorAll('.calculator-content__bank');

const assignValue = () => {
    totalCost.value = сostRange.value;
    payment.value = paymentRange.value;
    loanTerm.value = loanTermRange.value;
}
assignValue();
const banks = [
    {
        name:'lite',
        precents: 8.4
    },
    {
        name:'big',
        precents: 8.7
    },
    {
        name:'smile',
        precents: 7.9
    },
    {
        name:'best',
        precents: 9.2
    },
    {
        name:'idea',
        precents: 7.7
    },
    {
        name:'mono',
        precents: 8.1
    },
]

let currentPrecent = banks[0].precents;


for (let bank of banksBtn){
    bank.addEventListener('click', () => {
        for(let item of banksBtn){
            item.classList.remove('active');
        }
        bank.classList.add('active');
        takeActiveBank(bank)
    })
}

const takeActiveBank = currentActive => {
    const dataAttrValue = currentActive.dataset.name;
    const currentBank= banks.find(bank => bank.name ===dataAttrValue);
    currentPrecent = currentBank.precents;
    calculation(totalCost.value, payment.value, loanTerm.value)
};

for (let input of inputsRange){
    input.addEventListener('input', () =>{
        assignValue();
        calculation(totalCost.value, payment.value, loanTerm.value)
    })
}

const calculation = (totalCost = 0, payment=1000, loanTerm=1) => {
 let monthPay;
 let lounAmount = totalCost - payment;
 let interestRate = currentPrecent;
//  let numberYears = loanTerm;
 let numberMonth = loanTerm;
 monthPay = (lounAmount + (((lounAmount/100)*interestRate) / 12) * numberMonth)/numberMonth;
 const monthPayAround = Math.round(monthPay);
 
 if (monthPayAround < 0){
     return false
 }else {
    amountCredit.innerHTML = `${lounAmount} `;
    montlyPayments.innerHTML = `${monthPayAround} `;
    recomentedIncome.innerHTML = `${monthPayAround + ((monthPayAround / 100) * 35)} `;

 }
}

