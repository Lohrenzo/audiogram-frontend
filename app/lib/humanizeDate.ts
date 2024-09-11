export default function humanizeDate(dateString: string): string {
  const date = new Date(dateString);

  // Extract day, month, and year
  const day = date.getUTCDate();
  const month = date.toLocaleString("default", { month: "short" }); // Get abbreviated month
  const year = date.getUTCFullYear();

  // Function to get ordinal suffix
  function getOrdinalSuffix(day: number): string {
    if (day > 3 && day < 21) return "th"; // 11th, 12th, 13th
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  // Format the date in "31st Aug 2024"
  return `${day}${getOrdinalSuffix(day)} ${month}, ${year}`;
}
