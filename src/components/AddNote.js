import React from 'react';
import FolderOptions from './FolderOptions';
import ValidationError from './ValidationError';
import Context from '../Context';

export default class AddNote extends React.Component {
  state = {
    name: "",
    modified: Date.now(),
    folderId: "",
    content: ""
  };

  static contextType = Context;

  setNoteName = (note) => {
    this.setState({
      name: note
    })
  }

  setNoteFolderId = (folderId) => {
    this.setState({
      folderId: folderId
    })
  }

  setNoteContent = (content) => {
    this.setState({
      content: content
    })
  }

  render() {
    const { addNote } = this.context;
    
    return (
      <form className="add-note" onSubmit={event => {
        event.preventDefault()
        addNote(this.state)
        this.props.reset()
      }}>
        <label htmlFor="note-name">
          Note Name:
        </label>
        <input
          type="text"
          id="note-name"
          name="note-name"
          onChange={event => {
            this.setNoteName(event.target.value)
          }}
          required
        />
        <label htmlFor="note-content">
          Note Content:
        </label>
        <input
          type="text"
          id="note-content"
          name="note-content"
          onChange={event => {
            this.setNoteContent(event.target.value)
          }}
          required
        />
        <label htmlFor="note-folder-id">
          Folder:
        </label>
        <select
          id="note-folder-id"
          name="note-folder-id"
          onChange={event => {
            this.setNoteFolderId(event.target.value)
          }}
          required
        >
          <option value="">select folder</option>
          <FolderOptions />
        </select>
        <button>submit</button>
      </form>
    )
  }
}