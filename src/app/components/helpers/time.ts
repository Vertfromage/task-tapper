export function isNotToday(date: string | null): boolean {
    if (!date) {
        console.log("!date: " + date);
        return true;
    }

    console.log("Input date in UTC:", date);

    // Get today's date in local time and set it to midnight
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Parse the stored date string as UTC and adjust to local midnight
    const comparisonDate = new Date(date);
    const localComparisonDate = new Date(
        comparisonDate.getUTCFullYear(),
        comparisonDate.getUTCMonth(),
        comparisonDate.getUTCDate()
    );

    console.log("Today (Local):", today);
    console.log("Comparison Date (Local):", localComparisonDate);

    return (
        today.getFullYear() !== localComparisonDate.getFullYear() ||
        today.getMonth() !== localComparisonDate.getMonth() ||
        today.getDate() !== localComparisonDate.getDate()
    );
}


