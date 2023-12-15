const { Spending } = require('../models');

const chartData = [
    {   
        month: '12/1/23',
        amount: '387.93',
    },
    {   
        month: '12/2/23',
        amount: '543.50',
    },
    {   
        month: '12/3/23',
        amount: '433.54',
    },
    {   
        month: '12/4/23',
        amount: '350.24',
    },
    {   
        month: '12/5/23',
        amount: '200.33',
    },
    {
        month: '12/6/23',
        amount: '610.42',
    },
    {   
        month: '12/7/23',
        amount: '323.42',
    },
    {   
        month: '12/8/23',
        amount: '854.21',
    },
]

const seedChart = () => Spending.bulkCreate(chartData);

module.exports = seedChart;