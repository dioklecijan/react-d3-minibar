import React from "react";
import { render } from "react-dom";
import Minibar from "./Minibar";

let data = [
  { text: "COMEDY", value: 70 },
  { text: "THRILLER", value: 35 },
  { text: "DRAMA", value: 55 }
];

class App extends React.Component {
  render() {
    return (
      <div
        style={{
          width: "400px",
          height: "120px",
          fontFamily: "sans-serif"
        }}
      >
        <div
          style={{
            fontWeight: "bold",
            textAlign: "left",
            borderBottom: "2px solid darkred"
          }}
        >
          GENRE AFFINITY
        </div>
        <Minibar width="400" height="120" data={data} />
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
