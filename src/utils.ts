// Return an array of all days in the specified month and year that are from monday to friday
export function getWeekdays(month: number, year: number): number[] {
  // Get the number of days in the month
  const daysInMonth = new Date(year, month, 0).getDate();
  const weekdays: number[] = [];

  // Iterate through each day of the month
  for (let day = 1; day <= daysInMonth; day++) {
    const currentDate = new Date(year, month - 1, day);
    const dayOfWeek = currentDate.getDay();
    // Check if the day is a weekday (Monday to Friday)
    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      weekdays.push(day);
    }
  }

  return weekdays;
}
