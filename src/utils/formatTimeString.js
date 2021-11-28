export default function formatTimeString(time, format) {
    const hour = parseInt(time.split(":")[0]);
    const minute = parseInt(time.split(":")[1]);
    const second = parseInt(time.split(":")[2]);

    const zf = (len, str) => {
        if (typeof str === "number") str = str.toString();
        let result = "";
        for (let i = 0; i < len - str.length; i++) {
            result += "0";
        }
        return (result += str);
    };

    if (!format || !time) return "";

    return format.replace(/(HHH|HH|hhh|hh|mm|ss|a\/p|a\/pENG)/gi, function (formatstr) {
        switch (formatstr) {
            case "HHH":
                return zf(2, hour);
            case "HH":
                return zf(1, hour);
            case "hhh":
                return zf(2, hour % 12 ? hour % 12 : 12);
            case "hh":
                return hour % 12 ? hour % 12 : 12;
            case "mm":
                return zf(2, minute);
            case "ss":
                return zf(2, second);
            case "a/p":
                return hour < 12 ? "오전" : "오후";
            case "a/pENG":
                return hour < 12 ? "AM" : "PM";
            default:
                return formatstr;
        }
    });
}
