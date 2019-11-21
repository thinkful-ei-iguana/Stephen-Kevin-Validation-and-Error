import React from "react";

const Context = React.createContext({
  folders: [],
  notes: [],
  delete: function() {},
  addFolder: function() {},
  addNote: function() {}
});

export default Context;
