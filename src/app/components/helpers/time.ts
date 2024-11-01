export function isNotToday(date: string | null): boolean {
    if (!date) {
        return true;
    }
    
    const today = new Date();
    const comparisonDate = new Date(date);

    return (
        today.getFullYear() !== comparisonDate.getFullYear() ||
        today.getMonth() !== comparisonDate.getMonth() ||
        today.getDate() !== comparisonDate.getDate()
    );
}
