import React from "react";
import Chart, { Props } from "react-apexcharts";
import "./styles.css"


export class TransactionsAndBalanceChart extends React.Component<{}, Props> {
  constructor(props: any) {
    super(props);

    this.state = {
      series: [
        {
          name: "Debit",
          type: "column",
          data: [-500, -400, -300, 0, -150, -200, -100, -50, 0, -300, 0, 0],
        },
        {
          name: "Credit",
          type: "column",
          data: [100, 400, 0, 500, 350, 700, 700, 750, 900, 1000, 1200, 1300],
        },
        {
          name: "Monthly Balance",
          type: "line",
          data: [-400, 0, -300, 500, 200, 500, 600, 700, 900, 700, 1200, 1300],
        },
      ],
      options: {
        chart: {
          id: "transactions-and-monthly-balance",
          background: "#eeeef2",
          stacked: true,
        },
        xaxis: {
          categories: ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"],
          tickPlacement: "between",
          labels: {style: {colors: "#000000"}},
          title: {text: "Month", style: {color: "#000000"}},
        },
        yaxis: {
          min: -600, /* min(y values) - 100 */
          max: 1400, /* max(y values) + 100 */
          labels: {style: {colors: "#000000"}},
          title: {text: "Value (USD)", style: {color: "#000000"}},
        },
        colors: ["#cc0000", "#043927", "#d4af37", "#0000ff"],
        dataLabels: {
          enabled: true,
          enabledOnSeries: [2],
          background: {
            foreColor: "#000000",
            borderColor: "#d4af37",
            dropShadow: {},
          },
        },
        title: {
          text: "Transactions and Monthly Balance",
          align: "center",
          offsetY: 15,
          style: {
            fontSize: "20px",
            color: "#1f2029",
          },
        },
      },
    };
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        height="100%"
      />
    );
  }
}

export class CumulativeBalanceChart extends React.Component<{}, Props> {
  constructor(props: any) {
    super(props);

    this.state = {
      series: [
        {
          name: "Comulative Balance",
          type: "line",
          data: [-400, -400, -700, -200, 0, 500, 1100, 1800, 2700, 3400, 4600,
            5900],
        },
      ],
      options: {
        chart: {
          id: "cumulative-balance",
          background: "#eeeef2",
        },
        xaxis: {
          categories: ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"],
          tickPlacement: "between",
          labels: {style: {colors: "#000000"}},
          title: {text: "Month", style: {color: "#000000"}},
        },
        yaxis: {
          min: -800, /* min(y values) - 100 */
          max: 6000, /* max(y values) + 100 */
          labels: {style: {colors: "#000000"}},
          title: {text: "Value (USD)", style: {color: "#000000"}},
        },
        colors: ["#ff4d00"],
        dataLabels: {
          enabled: true,
          enabledOnSeries: [0],
          background: {
            foreColor: "#000000",
            borderColor: "#ff4d00",
            dropShadow: {},
          },
        },
        title: {
          text: "Cumulative Balance",
          align: "center",
          offsetY: 15,
          style: {
            fontSize: "20px",
            color: "#1f2029",
          },
        },
      },
    };
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        height="100%"
      />
    );
  }
}
