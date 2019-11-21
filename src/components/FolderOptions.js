import React from 'react';
import Context from '../Context';

export default class FolderOptions extends React.Component {
  static contextType = Context;

  render() {
    const { folders } = this.context
    const folderOptions = folders.map(folder => {
      const folderId = folder.id;
      const folderName = folder.name
      return (
      <option value={folderId}>{folderName}</option>
      )
    })
    return folderOptions;
  }
}