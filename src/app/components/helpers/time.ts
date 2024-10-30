export function isNotToday(date: string | null): boolean {
    if(!date){
        return true;
    }
    
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to midnight to only compare dates
    
    const comparisonDate = new Date(date);
    comparisonDate.setHours(0, 0, 0, 0); // Set time to midnight
  
    return comparisonDate.getTime() !== today.getTime();
  }