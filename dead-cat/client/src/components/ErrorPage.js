import React from 'react'

export default class ErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = {error: ""};
    }
  
    componentDidCatch(error) {
      this.setState({error: `${error.name}: ${error.message}`});
    }
  
    render() {
        return <>{this.props.children}</>;
      }
    }