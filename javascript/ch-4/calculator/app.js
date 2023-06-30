
document.querySelector('#loan-form').addEventListener('submit', (e) => {
    const loading = document.querySelector('#loading');
    const submitBtn = document.querySelector('#calculate');
    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');

    submitBtn.disabled = true;
    loading.style.display = 'block';

    // Clear Results:
    monthlyPayment.value = '';
    totalPayment.value = '';
    totalInterest.value = '';

    setTimeout(() => {
        loading.style.display = 'none';
        submitBtn.disabled = false;
        calculateResults();
    }, 1000);

    e.preventDefault();
});

function calculateResults() {
    const amount = document.querySelector('#amount');
    const interest = document.querySelector('#interest')
    const years = document.querySelector('#years');
    
    if (amount.value == ''
        || interest.value == ''
        || years == '') {
            showError('Please complete form details.');
            return;
        }

    const monthlyPayment = document.querySelector('#monthly-payment');
    const totalPayment = document.querySelector('#total-payment');
    const totalInterest = document.querySelector('#total-interest');
    
    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(years.value * 12);

    // Calculate Monthly Payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
    } else {
        showError('Something went wrong. please check your input.');
    }
}

function showError(message) {
    const errorContainer = document.querySelector('#error-message');
    const errorMessage = document.createTextNode(message);
    const submitBtn = document.querySelector('#calculate');

    errorContainer.appendChild(errorMessage);
    errorContainer.style.display = 'block';
    submitBtn.disabled = true;

    setTimeout(() => {
        errorContainer.style.display = 'none';
        errorContainer.innerHTML = ''
        submitBtn.disabled = false;

    }, 2000);
}