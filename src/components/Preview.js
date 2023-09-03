import React from "react";
import "../styles/Preview.css";
import LayoutOne from "./LayoutOne";

export default class Preview extends React.Component {
  render() {
    return (
      <section id="preview-container">
        <section className="preview">
          <LayoutOne {...this.props}></LayoutOne>
        </section>
      </section>
    );
  }
}
