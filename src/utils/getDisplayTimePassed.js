export default function getDisplayTimePassed(time) {
    const currentTime = new Date();
    const diffSecond = (currentTime.getTime() - time.getTime()) / 1000;

    if (diffSecond < 1) {
        return "방금 전";
    } else if (diffSecond < 60) {
        return `${Math.floor(diffSecond)}초 전`;
    } else if (diffSecond < 3600) {
        return `${Math.floor(diffSecond / 60)}분 전`;
    } else if (diffSecond < 86400) {
        return `${Math.floor(diffSecond / 3600)}시간 전`;
    } else if (diffSecond < 604800) {
        return `${Math.floor(diffSecond / 86400)}일 전`;
    } else if (diffSecond < 2592000) {
        return `${Math.floor(diffSecond / 604800)}주 전`;
    } else if (diffSecond < 31536000) {
        return `${Math.floor(diffSecond / 2592000)}달 전`;
    } else {
        return "오래 전";
    }
}
