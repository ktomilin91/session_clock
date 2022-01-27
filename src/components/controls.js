import React from "react";

// Clock control panel, contains Start/Stop and Reset buttons
// Accepts timer id, functions startTimer(), stopTimer() and reset()
export default props => {
    return(
        <div id="clock-controls">
            <div id="clock-start-stop">
                <div id="start_stop" onClick={() => props.timer ? props.stopTimer() : props.startTimer()}>
                    <i className={ props.timer ? "bi bi-pause-circle" : "bi bi-play-circle" } />
                </div>
            </div>
            <div id="clock-reset">
                <i id="reset" className="bi bi-bootstrap-reboot" onClick={props.reset} />
            </div>
        </div>
    );
}