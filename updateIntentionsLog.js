import { saveDataToLocalStorage } from "./addIntention.js";

export function updateIntentionsLog(intention, dateTime) {
    let intentionsLog = loadArrayFromLocalStorage('intentionsLog');
    intentionsLog.push([intention, dateTime]);
    saveDataToLocalStorage('intentionsLog', intentionsLog);
    return intentionsLog;
}

export function loadArrayFromLocalStorage(key) {
    const jsonIntentionsLog = localStorage.getItem(key) ?? JSON.stringify([]);
    const intentionsLog = JSON.parse(jsonIntentionsLog);
    return intentionsLog
}