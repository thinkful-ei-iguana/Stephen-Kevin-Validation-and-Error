import React from 'react';
import Context from '../Context';

export default class AddFolder extends React.Component {
    state = {
        name: ''
    }
    static contextType = Context;

    setFolder = (folder) => {
        this.setState({name: folder});
    }

    render () {

        const { addFolder } = this.context

        return (
            <form
                onSubmit={event => {
                    event.preventDefault();
                    addFolder(this.state);
                }}
            >
                <label htmlFor="folder-name"></label>
                <input 
                    type="text" 
                    id="folder-name" 
                    placeholder="folder name"
                    onChange={event => {
                        this.setFolder(event.target.value)
                        .then(event.target.value(''));
                    }}>
                </input>
                <button>Submit</button>
            </form>
        )
    }

}