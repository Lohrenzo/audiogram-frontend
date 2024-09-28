export default function secondsToTime(seconds: any) {
  // Round the seconds to the nearest whole number
  const roundedSeconds = Math.floor(seconds);

  // Calculate the minutes and seconds
  const minutes = Math.floor(roundedSeconds / 60);
  const remainingSeconds = roundedSeconds % 60;

  // Pad minutes and seconds to ensure two digits
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}
