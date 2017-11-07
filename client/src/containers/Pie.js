import React from 'react';
const Chart = require('chart.js');

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// Colors for the pie chart
const colors = ['#F44336', '#E91E63', '#9C27B0', 
'#673AB7', '#03A9F4', '#00BCD4', '#009688', 
'#8BC34A', '#FFEB38', '#FF9800', '#FF5722', '#795548'];

export default class Pie extends React.Component {
  constructor(props) {
    super(props);
    // Storing the pie chart instance here
    this.newPie;
  }

  componentDidMount() {
    const options = this.props.options;
    const votes = this.props.votes;
    const ctx = this.canvas.getContext('2d');
    const label = this.props.label ? this.props.label : false;
    const pieData = {
      datasets: [{
          data: votes,
          backgroundColor: shuffle(colors)
      }],
      labels: options,
    }
    this.newPie = new Chart(ctx ,{
      type: 'pie',
      data: pieData,
      options: { 
        legend: { display: label },
        cutoutPercentage: 50 
      }
    });
  }

  render() {
    // Update the chart when the props are present
    if (this.newPie) {
      this.newPie.data.labels = this.props.options;
      this.newPie.data.datasets[0].data = this.props.votes;
      this.newPie.update();
    }
    return (
      <canvas
      ref={ (canvas) => { this.canvas = canvas } }
      />
    )
  }
}