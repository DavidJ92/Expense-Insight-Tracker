let data = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [{
     label: 'Money Spent per Month',
     data: [300, 200, 100, 200, 100, 300, 400, 100, 300, 200, 100, 300],
     borderColor: 'rgba(75, 192, 192, 1)',
     backgroundColor: 'rgba(75, 192, 192, 0.2)',
  }]
 };
 
 let options = {
  scales: {
     y: {
       beginAtZero: true
     }
  }
 };
 
 let ctx = document.getElementById('myChart').getContext('2d');
 let chart = new Chart(ctx, {
  type: 'line',
  data: data,
  options: options
 });