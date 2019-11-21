import React, { Component } from "react";
import HomePage from "./components/HomePage";
import NotFound from "./components/NotFound";
import NoteView from "./components/NoteView";
import FolderView from "./components/FolderView";
import { Route, Switch, Link } from "react-router-dom";
import Context from "./Context";
import "./App.css";

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folders: [],
      notes: [],
      baseFolders: "http://localhost:9090/folders",
      baseNotes: "http://localhost:9090/notes",
      noteId: ""
    };
  }

  fetchNotes = function(url, { method }) {
    return fetch(url, { method })
      .then(response => {
        if (!response.ok) {
          console.log("An error occured");
          throw new Error("This is a problem");
        }
        return response;
      })
      .then(response => response.json())
      .then(data =>this.setState({ notes: data }))
      .catch(err => {
        console.log("Handling error", err);
      });
  };

  fetchFolders = function(url, { method }) {
    return fetch(url, { method })
      .then(response => {
        if (!response.ok) {
          console.log("An error occured");
          throw new Error("This is a problem");
        }
        return response;
      })
      .then(response => response.json())
      .then(data => this.setState({ folders: data}))
      .catch(err => {
        console.log("Handling error", err);
      });
  };

  handleAddFolder = (state) => {
    const url = "http://localhost:9090/folders"
    return fetch(url, { method: "POST", body: JSON.stringify(state), headers: {'Content-Type': 'application/json'}})
      .then(response => {
        if(!response.ok) {
          console.log("An error occured");
          throw new Error("This is a problem");
        } return response;
      })
      .then(response => response.json())
      .then(data => {
        this.fetchFolders(url, { method: "GET" })})
      .catch(err => {
        console.log("Handling error", err);
      })
  };

  handleAddNote = (state) => {
    const url = "http://localhost:9090/notes"
    return fetch(url, { method: "POST", body: JSON.stringify(state), headers: {'Content-Type': 'application/json'}})
      .then(response => {
        if(!response.ok) {
          console.log("An error occured");
          throw new Error("This is a problem");
        } return response;
      })
      .then(response => response.json())
      .then(data => {
        this.fetchNotes(url, { method: "GET" })})
      .catch(err => {
        console.log("Handling error", err);
      })
  }

  componentDidMount() {
    this.fetchFolders(this.state.baseFolders, { method: "GET" });
    this.fetchNotes(this.state.baseNotes, { method: "GET" });
  }

  handleDeleteNote = (id) => {
    const url = `${this.state.baseNotes}/${id}`
      return fetch(url, { method: "DELETE" })
        .then(response => {
          if (!response.ok) {
            console.log("An error occured");
            throw new Error("This is a problem");
          }
          return response;
        })
        .then(response => response.json())
        .catch(err => {
          console.log("Handling error", err);
        });
  }

  delete = noteId => {
    let newNotes = this.state.notes.filter(note => note.id !== noteId);
    console.log(newNotes);
    this.handleDeleteNote(noteId)
      .then(() => {
        this.fetchNotes(this.state.baseNotes, { method: "GET" })
      });
  };


  render() {
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      delete: this.delete,
      addFolder: this.handleAddFolder,
      addNote: this.handleAddNote
    };

    return (
      <Context.Provider value={contextValue}>
        <div>
          <header>
            <Link to="/">
              <h2>Noteful</h2>
            </Link>
          </header>
          <Switch>
            <Route exact path="/" component={HomePage} />

            <Route path="/folder/:folderId" component={FolderView} />

            <Route path="/notes/:noteId" component={NoteView} />

            <Route component={NotFound} />
          </Switch>
        </div>
      </Context.Provider>
    );
  }
}

export default App;
