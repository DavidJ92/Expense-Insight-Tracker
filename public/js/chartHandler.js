let ctx = document.getElementById('myChart').getContext('2d');

let getMonthlyExpenses = () => {
    let monthlyExpenses = JSON.parse(localStorage.getItem('monthlyExpenses')) || {};
    let expenses = [];
    let labels = [];

    for (let year in monthlyExpenses) {
        for (let month in monthlyExpenses[year]) {
            expenses.push(monthlyExpenses[year][month]);
            labels.push(`${month}/${year}`);
        }
    }

    return { expenses, labels };
};

let populateChart = () => {
    let { expenses, labels } = getMonthlyExpenses();
    let myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Monthly Expenses',
                data: expenses,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
};

// Load the chart
populateChart();