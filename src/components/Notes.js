import React from "react";
import Note from "./Note";
import Context from "../Context";

export default class Notes extends React.Component {
  static contextType = Context;
  render() {
    let filteredNotes;
    const selectedFolderId = this.props.match.params.folderId;
    if (!selectedFolderId) {
      filteredNotes = this.context.notes;
    } else {
      filteredNotes = this.context.notes.filter(
        note => note.folderId === selectedFolderId
      );
    }
    return (
      <div>
        {filteredNotes.map(note => {
          return (
            <Note
              key={note.id}
              id={note.id}
              name={note.name}
              modified={note.modified}
              history={this.props.history}
              match={this.props.match}
            />
          );
        })}
        <button>Add new note</button>
      </div>
    );
  }
}
