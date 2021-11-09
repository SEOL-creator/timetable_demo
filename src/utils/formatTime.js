export default function formatTime(time, format) {
    const date = new Date("1970-12-01T" + time + "Z");

    const zf = (len, str) => {
        if (typeof str === "number") str = str.toString();
        let result = "";
        for (let i = 0; i < len - str.length; i++) {
            result += "0";
        }
        return (result += str);
    };

    if (!format || !date) return "";

    return format.replace(/(HHH|HH|hhh|hh|mm|ss|a\/p|a\/pENG)/gi, function (formatstr) {
        switch (formatstr) {
            case "HHH":
                return zf(2, date.getHours());
            case "HH":
                return zf(1, date.getHours());
            case "hhh":
                return zf(2, date.getHours() % 12 ? date.getHours() % 12 : 12);
            case "hh":
                return date.getHours() % 12 ? date.getHours() % 12 : 12;
            case "mm":
                return zf(2, date.getMinutes());
            case "ss":
                return zf(2, date.getSeconds());
            case "a/p":
                return date.getHours() < 12 ? "오전" : "오후";
            case "a/pENG":
                return date.getHours() < 12 ? "AM" : "PM";
            default:
                return formatstr;
        }
    });
}
