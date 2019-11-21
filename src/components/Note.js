import React from "react";
import { Link } from "react-router-dom";
import Context from "../Context";
import PropTypes from "prop-types";

export default class Note extends React.Component {
  static contextType = Context;
  render() {
    let readableDate = new Date(this.props.modified);
    readableDate = readableDate.toString();

    return (
      <Link to={`/notes/${this.props.id}`}>
        <div className="note" id={this.props.id}>
          <h3 id={this.props.id}>{this.props.name}</h3>
          <p>{readableDate}</p>
          <button
            id={this.props.id}
            onClick={event => {
              event.preventDefault();
              event.stopPropagation();
              this.context.delete(event.target.id);
              this.props.history.push("/");
            }}
          >
            Delete
          </button>
        </div>
      </Link>
    );
  }
}

Note.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  modieifed: PropTypes.string.isRequired
}