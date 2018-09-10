import React from 'react';
import {Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
        // Display fallback UI
        this.setState({ hasError: true });
        // You can also log the error to an error reporting service
        this.logErrorToMyService(error, info);
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return (
            <div>
                <h1>Something went wrong.</h1>
                <Link to="/"><button>Inicio</button></Link>
            </div>        
            );
        }
        return this.props.children;
    }

    logErrorToMyService(error, info) {
        console.log("Error Bundary");
    }
}



export default ErrorBoundary;