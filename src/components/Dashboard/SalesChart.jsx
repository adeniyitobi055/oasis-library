import styled from "styled-components";
import DashboardBox from "./DashboardBox";

const StyledSalesChart = styled(DashboardBox)`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  &
    .recharts-cartesian-grid-horizontal
    line
    &
    .recharts-cartesian-grid-vertical
    line {
    stroke: var(--color-grey-300);
  }
`;

function SalesChart() {
  return <div></div>;
}

export default SalesChart;
