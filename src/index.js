import "./main.scss"

import React, {Component} from "react";
import ReactDOM from "react-dom";
import HelloWorld from "./components/hello-world"
import Footer from "./components/footer"

class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <HelloWorld />
        <Footer />
      </React.Fragment>
    )
  }
}

// Rendering App to the DOM
ReactDOM.render(<App />, document.getElementById("root"));