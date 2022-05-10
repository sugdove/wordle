import React, { Component } from "react";
import { createPortal } from "react-dom";
import "./index.css";
class Dialog extends Component {
  render() {
    const {
      dialogVisible,
      headerVisible = true,
      footerVisible = true,
      width,
      children,
      close,
      borderColor
    } = this.props;
    return createPortal(
      <div
        className="dialog"
        style={{ display: dialogVisible ? "flex" : "none" }}
      >
        <div
          className="dialog_wrap"
          style={{
            display: dialogVisible ? "block" : "none",
            width,
            borderColor
          }}
        >
          <div
            className="diaolog_header"
            style={{ display: headerVisible ? "block" : "none" }}
          ></div>
          <div className="diaolog_content">{children}</div>
          <div
            className="diaolog_footer"
            style={{ display: footerVisible ? "block" : "none" }}
          ></div>
        </div>

        <div
          className="mask"
          style={{ display: dialogVisible ? "block" : "none" }}
          onClick={close}
        ></div>
      </div>,
      document.body
    );
  }
}
Dialog.defaultProps = {
  dialogVisible: false,
  headerVisible: true,
  footerVisible: true,
  width: "300px"
};
export default Dialog;
