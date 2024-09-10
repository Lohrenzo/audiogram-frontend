"use client";
import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

export default function LineChart() {
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
          type: "line",
          data: {
            // labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            datasets: [
              {
                hoverBorderColor: ["#454370]", "red"],
                label: "Total Plays",
                data: [
                  { month: 1, plays: 10 },
                  { month: 2, plays: 40 },
                  { month: 3, plays: 30 },
                  { month: 4, plays: 50 },
                  { month: 5, plays: 24 },
                  { month: 6, plays: 73 },
                  { month: 7, plays: 20 },
                  // { x: 8, y: 0 },
                  // { x: 9, y: 0 },
                  // { x: 10, y: 0 },
                  // { x: 11, y: 0 },
                  // { x: 12, y: 0 },
                ],
                // data: [10, 40, 30, 50, 23, 76, 20, 0, 0, 0, 0, 0],
                borderColor: ["white"],
                borderWidth: 3,
              },
            ],
          },
          options: {
            plugins: {
              title: {
                display: true,
                text: "Total Plays Per Month",
              },
            },
            // layout: {
            //   padding: 10,
            // },
            parsing: {
              xAxisKey: "month",
              yAxisKey: "plays",
            },
            responsive: true,
            scales: {
              x: {
                type: "linear",
                beginAtZero: false,
              },
              y: {
                beginAtZero: true,
              },
            },
          },
        });

        (chartRef.current as any).chart = newChart;
      }
    }
  }, []);
  return (
    <div className="relative w-[100%] h-[46vh] grid place-items-center place-self-center">
      <canvas ref={chartRef} />
    </div>
  );
}
