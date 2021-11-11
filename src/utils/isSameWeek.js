function dateFromObjOrStr(date) {
    if (date instanceof Date) {
        return date;
    }
    return new Date(date);
}

function getMondayDate(date) {
    return new Date(date.getTime() - (date.getDay() - 1) * 24 * 60 * 60 * 1000);
}

function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() && date1.getMonth() === date2.getMonth() && date1.getDate() === date2.getDate();
}

export default function isSameWeek(date1, date2) {
    return isSameDay(getMondayDate(dateFromObjOrStr(date1)), getMondayDate(dateFromObjOrStr(date2)));
}
