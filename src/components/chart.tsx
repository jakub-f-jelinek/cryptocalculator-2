import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

ChartJS.register(ArcElement, Tooltip, Legend);

export const ChartCalc: React.FC = () => {
  const items = useSelector((store: RootState) => store.items);
  console.log(items);
  const prices = items.map((item) => item.amountValue);
  console.log(prices);
  const names = items.map((item) => item.name);

  const data = {
    labels: names,
    datasets: [
      {
        data: prices,

        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Doughnut data={data} />;
};
