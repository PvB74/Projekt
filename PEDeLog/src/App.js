import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      response: ''
    };
  }

  componentDidMount() {
    this.fetchApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  fetchApi = async () => {
    const response = await fetch('/api/login');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  }

  render() {
    return (
      <div className="App">
        <p>{this.state.response}</p>
      </div>
    );
  }
}

export default App;