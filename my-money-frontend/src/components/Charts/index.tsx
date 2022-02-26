import { Flex, Select } from "@chakra-ui/react";
import React from "react";
import Chart, { Props } from "react-apexcharts";
import "./styles.css";


export class CurrentDebitAndCreditChart extends React.Component<{}, Props> {
  constructor(props: any) {
    super(props);

    this.state = {
      series: [
        {
          name: "Debit",
          type: "column",
          data: [30],
        },
        {
          name: "Credit",
          type: "column",
          data: [70],
        },
      ],
      options: {
        chart: {
          id: "current-debit-and-credit",
          background: "#eeeef2",
          toolbar: {
            tools: {
              download: true,
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: false,
            },
          },
        },
        xaxis: {
          categories: ["Debit", "Credit"],
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          labels: {
            show: false,
          },
          title: {text: "February", style: {color: "#000000"}, offsetY: -5},
        },
        yaxis: {
          min: 0,
          max: 80, /* max(y values) + 10 */
          floating: true,
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          labels: {
            show: false,
          },
        },
        stroke: {
          show: false,
        },
        colors: ["#cc0000", "#043927"],
        legend: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + "%";
          },
          offsetY: -20,
          offsetX: 0,
          style: {
            fontSize: '24px',
            colors: ["#cc0000", "#043927"],
          },
          background: {
            enabled: false,
            dropShadow: {
              enabled: false,
            },
          },
        },
        title: {
          text: "Current Debit and Credit",
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
      <Flex
        w="100%"
        flexDirection="column"
      >
        <Chart
          options={this.state.options}
          series={this.state.series}
          height="90%"
        />
        <Flex
          h="10%"
          alignItems="center"
          justifyContent="space-evenly"
          bgColor="#eeeef2"
        >
          <Flex flexDirection="column">
            <Flex justifyContent="center" color="#cc0000" fontWeight="bold">
              300.00
            </Flex>
            <Flex justifyContent="center" color="#000000">
              Debit
            </Flex>
          </Flex>
          <Flex flexDirection="column">
            <Flex justifyContent="center" color="#043927" fontWeight="bold">
              700.00
            </Flex>
            <Flex justifyContent="center" color="#000000">
              Credit
            </Flex>
          </Flex>
          <Flex flexDirection="column">
            <Flex justifyContent="center" color="#ff4d00" fontWeight="bold">
              1,200.00
            </Flex>
            <Flex justifyContent="center" color="#000000">
              Cumulative Balance
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    );
  }
}


export class ExpensesByCategoryChart extends React.Component<{}, Props> {
  constructor(props: any) {
    super(props);

    this.state = {
      series: [44, 55, 13, 43, 22],
      options: {
        chart: {
          id: "expenses-by-category",
          background: "#eeeef2",
          toolbar: {
            show: true,
            tools: {
              download: true,
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false,
              reset: false,
            },
          },
        },
        labels: ["Market", "Transportation", "Housing", "Savings", "Other"],
        legend: {
          position: "bottom",
        },
        title: {
          text: "Expenses by Category",
          align: "center",
          margin: 30,
          offsetY: 3,
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
        type="pie"
      />
    );
  }
}


export class DebitAndCreditChart extends React.Component<{series: any[]}, Props> {
  constructor(props: any) {
    super(props);

    this.state = {
      // series: [
      //   {
      //     name: "Debit",
      //     type: "column",
      //     data: [-500, -400, -300, 0, -150, -200, -100, -50, 0, -300, 0, 0],
      //   },
      //   {
      //     name: "Credit",
      //     type: "column",
      //     data: [100, 400, 0, 500, 350, 700, 700, 750, 900, 1000, 1200, 1300],
      //   },
      //   {
      //     name: "Monthly Balance",
      //     type: "line",
      //     data: [-400, 0, -300, 500, 200, 500, 600, 700, 900, 700, 1200, 1300],
      //   },
      // ],
      options: {
        chart: {
          id: "debit-and-credit",
          background: "#eeeef2",
          stacked: true,
        },
        xaxis: {
          categories: ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"],
          tickPlacement: "between",
          labels: {style: {colors: "#000000"}},
          title: {text: "Month", style: {color: "#000000",}, offsetY: -5},
        },
        yaxis: {
          // min: -600, /* min(y values) - 100 */
          // max: 1400, /* max(y values) + 100 */
          labels: {style: {colors: "#000000"}},
          title: {text: "Value (USD)", style: {color: "#000000"}},
        },
        stroke: {
          show: false,
        },
        colors: ["#cc0000", "#043927", "#d4af37"],
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
          text: "Debit and Credit",
          align: "center",
          offsetY: 15,
          style: {
            fontSize: "20px",
            color: "#1f2029",
          },
        },
      },
      loading: true,
    };
  }

  componentDidUpdate() {
    if (this.state.loading && this.props.series.length !== 0) {
      const min = this.props.series.length !== 0 ? (Math.min(...this.props.series[0].data)*1.1) : 0;
      const max = this.props.series.length !== 0 ? (Math.max(...this.props.series[1].data)*1.1) : 0;
      this.setState({
        options: {
          chart: {
            id: "debit-and-credit",
            background: "#eeeef2",
            stacked: true,
          },
          xaxis: {
            categories: ["January", "February", "March", "April", "May", "June",
              "July", "August", "September", "October", "November", "December"],
            tickPlacement: "between",
            labels: {style: {colors: "#000000"}},
            title: {text: "Month", style: {color: "#000000",}, offsetY: -5},
          },
          yaxis: {
            min: min,
            max: max,
            labels: {style: {colors: "#000000"}},
            title: {text: "Value (USD)", style: {color: "#000000"}},
          },
          stroke: {
            show: false,
          },
          colors: ["#cc0000", "#043927", "#d4af37"],
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
            text: "Debit and Credit",
            align: "center",
            offsetY: 15,
            style: {
              fontSize: "20px",
              color: "#1f2029",
            },
          },
        },
        loading: false,
      })
    }
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.props.series}
        height="100%"
      />
    );
  }
}


export class CumulativeBalanceChart extends React.Component<{series: any[], years: string[]}, Props> {
  constructor(props: any) {
    super(props);

    this.state = {
      // series: [
      //   {
      //     name: "Comulative Balance",
      //     type: "line",
      //     data: [-400, -400, -700, -200, 0, 500, 1100, 1800, 2700, 3400, 4600,
      //       5900],
      //   },
      // ],
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
          title: {text: "Month", style: {color: "#000000"}, offsetY: -5},
        },
        yaxis: {
          // min: -800, /* min(y values) - 100 */
          // max: 6000, /* max(y values) + 100 */
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
      <Flex
        w="100%"
        flexDirection="column"
      >
        <Chart
          options={this.state.options}
          series={this.props.series}
          height="100%"
        />
        <Select
          variant="flushed"
          // size="lg"
          maxWidth="fit-content"
          borderColor="dollar.500"
          focusBorderColor="dollar.500"
          color="dollar.900"
          placeholder="Year"
          // value={year}
        >
          {this.props.years.map((year: string) => {
            return <option key={year} value={year}>{year}</option>
          })}
        </Select>
      </Flex>
    );
  }
}
