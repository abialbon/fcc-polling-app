import React from 'react';
const Chart = require('chart.js');

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
          backgroundColor: colors
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