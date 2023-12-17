const { Spending } = require('../models');

const chartData = [
    {   
        category: 'food',
        amount: '8.93',
        date: '12/1/23',
    },
    {   
        category: 'shopping',
        amount: '43.50',
        date: '12/2/23',
    },
    {   
        category: 'shopping',
        amount: '33.54',
        date: '12/3/23',
    },
    {   
        amount: '5.24',
        date: '12/4/23',
    },
    {   
        category: 'food',
        amount: '20.33',
        date: '12/5/23',
    },
    {
        category: 'food',
        amount: '10.42',
        date: '12/6/23',
    },
    {   
        category: 'food',
        amount: '23.42',
        date: '12/7/23',
    },
    {   
        category: 'shopping',
        amount: '54.21',
        date: '12/8/23',
    },
]

const seedChart = () => Spending.bulkCreate(chartData);

module.exports = seedChart;