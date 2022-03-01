import("./ImportantAlert.css");

export default function ImportantAlert() {
    const alertContent = (
        <a target="_blank" href="/job" className="important_information">
            구인공고
        </a>
    );

    return alertContent;
}
