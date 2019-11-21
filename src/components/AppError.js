import React from 'react';

export default class AppError extends React.Component {
    state = {error: null};
    static getDerivedStateFromError(error) {
        console.error(error);
        return {error};
    }

    render() {
        if (this.state.error) {
            return (
                <div className="error">
                    <h2>Something has gone wrong</h2>
                    <p>Try refreshing the page.  Then panic.</p>
                </div>
            );
        } else {
            return this.props.children;
        }
    }
}