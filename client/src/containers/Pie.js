import React from 'react';
const Chart = require('chart.js');

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Colors for the pie chart
const colors = ['#F44336', '#9C27B0', '#2196F3', 
'#3F51B5', '#03A9F4', '#00BCD4', '#009688', '#1DE9B6', 
'#00E676', '#FFEB3B', '#FFC107', '#FF9800', '#607D8B'];

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
      options: { cutoutPercentage: 50 }
    });
  }

  render() {
    // Update the chart when the props are present
    if (this.props.options[0] !== undefined) {
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