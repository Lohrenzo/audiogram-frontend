"use client";
import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

export default function PieChart() {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Get the canvas context and create the chart only if chartRef.current is not null
    if (chartRef.current) {
      // Destroy chart if exists
      if ((chartRef.current as any).chart) {
        (chartRef.current as any).chart.destroy();
      }

      // Set get context to 2d
      const context = chartRef.current.getContext("2d");

      if (context) {
        // Create new chart instance
        const newChart = new Chart(context, {
          type: "pie",
          data: {
            labels: [
              "Jan",
              "Feb",
              "March",
              "April",
              "May",
              "June",
              "July",
              "Aug",
              "Sept",
              "Oct",
              "Nov",
              "Dec",
            ],
            datasets: [
              {
                label: "Total Plays",
                data: [10, 40, 30, 50, 23, 76, 20, 0, 0, 0, 0, 0],
                backgroundColor: ["#080810", "#6f006f", "#6562a9", "#4572a9"],
                borderColor: ["white"],
                borderWidth: 1,
              },
            ],
          },
          options: {
            responsive: true,
          },
        });

        (chartRef.current as any).chart = newChart;
      }
    }
  }, []);
  return (
    <div className="relative w-[100%] h-[50vh] grid place-items-center place-self-center">
      <canvas ref={chartRef} />
    </div>
  );
}
