import styled from "styled-components";

const ChartBox = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

const startDataLight = [
  {
    duration: "1 day",
    value: 0,
    color: "#ef4444",
  },
  {
    duration: "2 days",
    value: 0,
    color: "#f97316",
  },
  {
    duration: "3 days",
    value: 0,
    color: "#eab308",
  },
  {
    duration: "4-5 days",
    value: 0,
    color: "#84cc16",
  },
  {
    duration: "6-7 days",
    value: 0,
    color: "#22c55e",
  },
  {
    duration: "8-14 days",
    value: 0,
    color: "#14b8a6",
  },
  {
    duration: "15-21 days",
    value: 0,
    color: "#3b82f6",
  },
  {
    duration: "21+ days",
    value: 0,
    color: "#a855f7",
  },
];

const startDataDark = [
  {
    duration: "1 day",
    value: 0,
    color: "#b91c1c",
  },
  {
    duration: "2 days",
    value: 0,
    color: "#c2410c",
  },
  {
    duration: "3 days",
    value: 0,
    color: "#a16207",
  },
  {
    duration: "4-5 days",
    value: 0,
    color: "#4d7c0f",
  },
  {
    duration: "6-7 days",
    value: 0,
    color: "#15803d",
  },
  {
    duration: "8-14 days",
    value: 0,
    color: "#0f766e",
  },
  {
    duration: "15-21 days",
    value: 0,
    color: "#1d4ed8",
  },
  {
    duration: "21+ days",
    value: 0,
    color: "#7e22ce",
  },
];

function prepareData(startData, days) {
  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  const data = days
    .reduce((arr, cur) => {
      const num = cur.numDays;
      if (num === 1) return incArrayValue(arr, "1 day");
      if (num === 2) return incArrayValue(arr, "2 days");
      if (num === 3) return incArrayValue(arr, "3 days");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 days");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 days");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 days");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 days");
      if (num >= 21) return incArrayValue(arr, "21+ days");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0);

  return data;
}

function DurationChart() {
  return <div></div>;
}

export default DurationChart;
