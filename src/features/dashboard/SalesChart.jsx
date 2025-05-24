import styled from "styled-components";
import DashboardBox from "./DashboardBox";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import Heading from "../../ui/Heading";
import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { useDarkMode } from "../../context/DarkModeContext";
const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;
  height: 400px;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function SalesChart({ bookings, numDays }) {
  const { isDarkMode } = useDarkMode();
  const colors = isDarkMode
    ? {
        totalSales: { stroke: "#4f46e5", fill: "#4f46e5" },
        extraSales: { stroke: "#22c55e", fill: "#22c55e" },
        text: "#e5e7eb",
        background: "#18212f",
      }
    : {
        totalSales: { stroke: "#4f46e5", fill: "#c7d2fe" },
        extraSales: { stroke: "#16a34a", fill: "#dcfce7" },
        text: "#374151",
        background: "#fff",
      };
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });
  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        ?.filter((booking) => isSameDay(date, new Date(booking.created_at)))
        ?.reduce((acc, cur) => acc + cur.totalPrice, 0),
      extraSales: bookings
        ?.filter((booking) => isSameDay(date, new Date(booking.created_at)))
        ?.reduce((acc, cur) => acc + cur.extraPrice, 0),
    };
  });
  return (
    <StyledSalesChart>
      <Heading as="h2">
        Sales from {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
        {format(allDates.at(-1), "MMM dd yyyy")}{" "}
      </Heading>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart
          data={data}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <CartesianGrid stroke="#ccc" strokeDasharray="4" />
          <XAxis dataKey="label" />
          <YAxis unit={"$"} />
          <Tooltip contentStyle={{ backgroundColor: colors.background }} />
          <Area
            type="monotone"
            dataKey="totalSales"
            stroke={colors.totalSales.stroke}
            fill={colors.totalSales.fill}
            unit={"$"}
          ></Area>
          <Area
            unit={"$"}
            type="monotone"
            dataKey="extraSales"
            stroke={colors.extraSales.stroke}
            fill={colors.extraSales.fill}
          ></Area>
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default SalesChart;
