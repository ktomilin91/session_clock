import React from "react";
import secondsToMinutes from "../utils/secondsToMinutes";

// Display showing remaining time
// Takes props currentModeIsSession (Boolean), sessionTimeLeft (Number), breakTimeLeft (Number)
export default props => {
    return (
        <div id="clock-display">
            <div id="timer-label">
                { props.currentModeIsSession ? "Session" : "Break" }
            </div>
            <div id="time-left" className={
                props.sessionTimeLeft < 60 || props.breakTimeLeft < 60 ? "timeIsUp" : ""
                }>
                { secondsToMinutes(props.currentModeIsSession ? props.sessionTimeLeft : props.breakTimeLeft) }
            </div>
        </div>
    );
}