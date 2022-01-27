import "./main.scss"
import beep from "./assets/beep.wav";

import React, {Component} from "react";
import ReactDOM from "react-dom";
import ClockSettings from "./components/clock-settings";
import Display from "./components/display";
import Controls from "./components/controls";
import Footer from "./components/footer";

const defaults = {
  breakLength: 5,
  sessionLength: 25
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      breakLength: defaults.breakLength,
      sessionLength: defaults.sessionLength,
      breakTimeLeft: defaults.breakLength * 60,
      sessionTimeLeft: defaults.sessionLength * 60,
      currentModeIsSession: true,
      timer: null
    };
    this.changeLength = this.changeLength.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.reset = this.reset.bind(this);
    this.audioRef = React.createRef();
  }
  // Setting the length of the session and break
  changeLength(mode, action) {
    if(this.state.timer) return;
    const currentLength = this.state[mode + "Length"];
    if((action === "decrement" && currentLength <= 1) || (action === "increment" && currentLength >= 60)) return;
    this.setState({
      [mode + "Length"]: action === "increment" ? currentLength + 1 : currentLength - 1,
      [mode + "TimeLeft"]: action === "increment" ? (currentLength + 1) * 60 : (currentLength - 1) * 60
    });
  }
  // Starting the countdown for the current session or break
  startTimer() {
    const timer = setInterval(() => {
      const mode = this.state.currentModeIsSession ? "session" : "break";
      const timeLeft = this.state[mode + "TimeLeft"];
      // Switch to the next mode if the time is up
      if(timeLeft === 0) return this.setState(prevState => ({
        [mode + "TimeLeft"]: prevState[mode + "Length"] * 60,
        currentModeIsSession: !prevState.currentModeIsSession
      }));
      // Play the beeping sound on the last tick
      if(timeLeft === 1) this.audioRef.current.play();
      // Decrementing the timer
      this.setState({
        [mode + "TimeLeft"]: timeLeft - 1
      });
    }, 1000);
    // Saving the interval id to the State
    this.setState({
      timer: timer
    })
  }
  // Stopping the current timer
  stopTimer() {
    if(this.state.timer) clearInterval(this.state.timer);
    this.setState({
      timer: null
    });
  }
  // Resetting the clock to default settings
  reset() {
    // Stopping the current timer
    if(this.state.timer) clearInterval(this.state.timer);
    // Stopping the beeping sound
    const audio = this.audioRef.current;
    audio.pause();
    audio.currentTime = 0;
    this.setState({
      breakLength: defaults.breakLength,
      sessionLength: defaults.sessionLength,
      breakTimeLeft: defaults.breakLength * 60,
      sessionTimeLeft: defaults.sessionLength * 60,
      currentModeIsSession: true,
      timer: null
    });
  }
  render() {
    return (
      <div id="clock-container">
        <div id="clock">
          <div id="clock-settings" className={this.state.timer ? "inactive" : ""}>
            <ClockSettings setting="session" changeLength={this.changeLength} intervalLength={this.state.sessionLength} />
            <ClockSettings setting="break" changeLength={this.changeLength} intervalLength={this.state.breakLength} />
          </div>
          <Display currentModeIsSession={this.state.currentModeIsSession} sessionTimeLeft={this.state.sessionTimeLeft} breakTimeLeft={this.state.breakTimeLeft} />
          <Controls timer={this.state.timer} startTimer={this.startTimer} stopTimer={this.stopTimer} reset={this.reset}/>
          <audio id="beep" ref={this.audioRef} src={beep} />
        </div>
        <Footer />
      </div>
    );
  }
}

// Rendering App to the DOM
ReactDOM.render(<App />, document.getElementById("root"));