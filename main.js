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

const addinput = document.getElementById('addinput');
const addvalue = document.getElementById('addvalue');
const addBtn = document.getElementById('addBtn');
const allBanks = document.getElementById('banks');

const assignValue = () => {
    totalCost.value = сostRange.value;
    payment.value = paymentRange.value;
    loanTerm.value = loanTermRange.value;
}
assignValue();
const banks = [
    {
        name:'big',
        precents: 8.7
    },
    {
        name:'best',
        precents: 9.2
    },
    {
        name:'idea',
        precents: 7.7
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
//////////////////////////////////////////////////
addBtn.addEventListener('click', (e) => {
    
    if (addinput.value === '' && addvalue.value === '') return
    createDeleteElements(addinput.value, addvalue.value)   
    addinput.value = ``; 
    addvalue.value = ``;

    
})

function createDeleteElements(value) {
    
    const list = document.createElement('li')
    const btn = document.createElement('button')
    const valuePrecent = document.createElement('span')

    list.className = 'calculator-content__bank';
    list.textContent = value
    allBanks.appendChild(list)

    valuePrecent.className = 'calculator-content__bank_value';
    valuePrecent.textContent = `${addvalue.value} %`
    list.appendChild(valuePrecent)

    btn.className = 'calculator-content__bank_btn';
    btn.textContent = "X"
    list.appendChild(btn)

    btn.addEventListener('click', (e) => {
        allBanks.removeChild(list)
    })
}





/////////////////////////////////////////////////
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

