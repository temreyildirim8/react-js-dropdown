import React, { Component } from "react";
import { Link } from "react-router-dom";

const DropDownMenuDivider = () => {
  return <li role="seperator" className="divider" />;
};

const DropDownMenuItem = props => {
  return (
    <li onClick={props.onclick}>
      <Link to={props.to}>
        <i className="material-icons">{props.icon}</i>
        {props.label}
      </Link>
    </li>
  );
};

class DropDownMenu extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.handleOutsideClick = this.handleOutsideClick.bind(this);

    this.state = {
      isOpened: false
    };
  }

  handleClick() {
    if (!this.state.isOpened) {
      // attach/remove event handler
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }
    this.setState({
      isOpened: !this.state.isOpened
    });
  }

  handleOutsideClick(e) {
    // ignore clicks on the component itself
    if (this.node.contains(e.target)) {
      return;
    }

    this.handleClick();
  }

  render() {
    const dropDownWrapperCss = this.state.isOpened
      ? "btn-group user-helper-dropdown open"
      : "btn-group user-helper-dropdown";
    const dropDownMenuCss = this.props.pullRight ? "dropdown-menu pull-right" : "dropdown-menu";
    let dropDownMenu = <ul className={dropDownMenuCss}>{this.props.children}</ul>;
    return (
      <div
        className={dropDownWrapperCss}
        ref={node => {
          this.node = node;
        }}
      >
        <i className="material-icons" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">
          {this.props.icon}
        </i>
        {dropDownMenu}
      </div>
    );
  }
}

export { DropDownMenu, DropDownMenuItem, DropDownMenuDivider };
