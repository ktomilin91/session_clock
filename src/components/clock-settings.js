import React from "react";

// Settings to set the duration of sessions/breaks
// Receives props setting (String), intervalLength (Number) and function changeLength(mode, action)
export default props => {
    return (
        <div className="settings-section">
            <div className="label">{props.setting === "session" ? "Session Length" : "Break Length"}</div>
            <div className="settings">
                <i className="bi bi-arrow-down-circle-fill" onClick={() => props.changeLength(props.setting, "decrement")} />
                <span>{props.intervalLength}</span>
                <i className="bi bi-arrow-up-circle-fill" onClick={() => props.changeLength(props.setting, "increment")} />
            </div>
        </div>
    );
};