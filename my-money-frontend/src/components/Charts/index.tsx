import { Flex, Select } from "@chakra-ui/react";
import { ApexOptions } from "apexcharts";
import Chart, { Props } from "react-apexcharts";
import { YearSelectorProps } from "../../interfaces/yearSelector";
import "./styles.css";


export function CurrentMonthChart({ series }: Props) {
  const options: ApexOptions = {
    chart: {
      id: "current-month",
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
    yaxis: {
      labels: { style: { colors: "#000000" } },
      title: { text: "Value (USD)", style: { color: "#000000" } },
    },
    colors: ["#043927", "#cc0000"],
    legend: {
      show: false,
    },
    tooltip: {
      enabled: false,
    },
    title: {
      text: "Current Month",
      align: "center",
      offsetY: 15,
      style: {
        fontSize: "20px",
        color: "#1f2029",
      },
    },
  };

  return (
    <Flex w="100%" flexDirection="column">
      <Chart options={options} series={series} height="90%" />
      <Flex
        h="10%"
        alignItems="center"
        justifyContent="space-evenly"
        bgColor="#eeeef2"
      >
        <Flex flexDirection="column">
          <Flex justifyContent="center" color="#043927" fontWeight="bold">
            {series?.length === 0 ? 0 : series?.[0].data[0]}
          </Flex>
          <Flex justifyContent="center" color="#000000">
            Credit
          </Flex>
        </Flex>
        <Flex flexDirection="column">
          <Flex justifyContent="center" color="#cc0000" fontWeight="bold">
            {series?.length === 0 ? 0 : series?.[1].data[0]}
          </Flex>
          <Flex justifyContent="center" color="#000000">
            Debit
          </Flex>
        </Flex>
        <Flex flexDirection="column">
          <Flex justifyContent="center" color="#d4af37" fontWeight="bold">
            {series?.length === 0
              ? 0
              : series?.[0].data[0] - series?.[1].data[0]}
          </Flex>
          <Flex justifyContent="center" color="#000000">
            Balance
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}


export function ExpensesByCategoryChart({
  series,
  years,
  year,
  setYear,
  setLoading,
}: Props & YearSelectorProps) {
  const options: ApexOptions = {
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
    labels: [
      "Market",
      "Transportation",
      "Clothing",
      "Bills",
      "Health expenses",
      "Savings",
      "Other",
    ],
    colors: [
      "#ffff00",
      "#00ff00",
      "#7f007f",
      "#ff0000",
      "#ff7f00",
      "#ff00ff",
      "#0000ff",
    ],
    legend: {
      position: "bottom",
      labels: {
        colors: ["#000000"],
      },
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
  };

  return (
    <Flex w="100%" flexDirection="column">
      <Chart options={options} series={series} type="pie" />
      <YearSelector
        years={years}
        year={year}
        setYear={setYear}
        setLoading={setLoading}
      />
    </Flex>
  );
}


export function CreditAndDebitChart({
  series,
  years,
  year,
  setYear,
  setLoading,
}: Props & YearSelectorProps) {
  const options: ApexOptions = {
    chart: {
      id: "credit-and-debit",
      background: "#eeeef2",
      stacked: true,
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      tooltip: {
        enabled: false,
      },
      labels: { style: { colors: "#000000" } },
      title: { text: "Month", style: { color: "#000000" }, offsetY: -5 },
    },
    yaxis: {
      labels: { style: { colors: "#000000" } },
      title: { text: "Value (USD)", style: { color: "#000000" } },
    },
    stroke: {
      show: false,
    },
    colors: ["#043927", "#cc0000", "#d4af37"],
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
      text: "Credit and Debit",
      align: "center",
      offsetY: 15,
      style: {
        fontSize: "20px",
        color: "#1f2029",
      },
    },
  };

  return (
    <Flex w="100%" flexDirection="column">
      <Chart options={options} series={series} height="95%" />
      <YearSelector
        years={years}
        year={year}
        setYear={setYear}
        setLoading={setLoading}
      />
    </Flex>
  );
}


export function CumulativeBalanceChart({
  series,
  years,
  year,
  setYear,
  setLoading,
}: Props & YearSelectorProps) {
  const options: ApexOptions = {
    chart: {
      id: "cumulative-balance",
      background: "#eeeef2",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: { style: { colors: "#000000" } },
      title: { text: "Month", style: { color: "#000000" }, offsetY: -5 },
    },
    yaxis: {
      labels: { style: { colors: "#000000" } },
      title: { text: "Value (USD)", style: { color: "#000000" } },
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
  };

  return (
    <Flex w="100%" flexDirection="column">
      <Chart options={options} series={series} height="95%" />
      <YearSelector
        years={years}
        year={year}
        setYear={setYear}
        setLoading={setLoading}
      />
    </Flex>
  );
}


function YearSelector({ years, year, setYear, setLoading }: YearSelectorProps) {
  return (
    <Flex h="5%" alignItems="center" justifyContent="center" bgColor="#eeeef2">
      <Flex mr="0.25rem" fontWeight="bold" color="#1f2029">
        Year:
      </Flex>
      <Select
        maxWidth="fit-content"
        variant="unstyled"
        color="#000000"
        value={year}
        onChange={(event) => {
          setYear(event.target.value);
          setLoading(true);
        }}
      >
        {years.map((year: string) => {
          return (
            <option key={year} value={year}>
              {year}
            </option>
          );
        })}
      </Select>
    </Flex>
  );
}
