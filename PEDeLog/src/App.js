import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      response: '',
      tableData: [],
      dateFrom: new Date(),
      dateTo: new Date(),
      email: '',
      accountId: '',
      accountType: '',
      country: '',
      role: '',
      license: '',
      authenticationMethod: '',
      typeOfLogData: '',
      substance: '',
      product: ''
    };
  }

  componentDidMount() {
    /* this.fetchApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err)); */
  }

  /* fetchApi = async () => {
    const response = await fetch('/api/login');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  } */

  saveData = ()=>{
    fetch({
      method: 'POST',
      url: '/',
      body: {...this.state}
    })
    .then((response)=>response.json())
    .then((response)=>console.log(response))
    .catch((err)=>console.error(err))
  }

  resetData = ()=>{
    this.setState({
      dateFrom: new Date(),
      dateTo: new Date(),
      email: '',
      accountId: '',
      accountType: '',
      country: '',
      role: '',
      license: '',
      authenticationMethod: '',
      typeOfLogData: '',
      substance: '',
      product: ''
    })
  }


  render() {
    return (
      <div className="App">
        <div><input type="date" placeholder="Date From" onChange={(event)=>this.setState({dateFrom: event.target.valueAsDate})} /></div>
        <div><input type="date" placeholder="Date To" onChange={(event)=>this.setState({dateTo: event.target.valueAsDate})} /></div>
        <div><input type="email" placeholder="Email" value={this.state.email} onChange={(event)=>this.setState({email: event.target.value})} /></div>
        <div><input type="text" placeholder="Account Id" value={this.state.accountId} onChange={(event)=>this.setState({accountId: event.target.value})} /></div>
        <div><input type="text" placeholder="Account Type" value={this.state.accountType} onChange={(event)=>this.setState({accountType: event.target.value})} /></div>
        <div><input type="text" placeholder="Country" value={this.state.country} onChange={(event)=>this.setState({country: event.target.value})} /></div>
        <div><input type="text" placeholder="Role" value={this.state.role} onChange={(event)=>this.setState({role: event.target.value})} /></div>
        <div><input type="text" placeholder="License" value={this.state.license} onChange={(event)=>this.setState({license: event.target.value})} /></div>
        <div><input type="text" placeholder="Authentication Method" value={this.state.authenticationMethod} onChange={(event)=>this.setState({authenticationMethod: event.target.value})} /></div>
        <div><input type="text" placeholder="Type Of Log Data" value={this.state.typeOfLogData} onChange={(event)=>this.setState({typeOfLogData: event.target.value})} /></div>
        <div><input type="text" placeholder="Substance" value={this.state.substance} onChange={(event)=>this.setState({substance: event.target.value})} /></div>
        <div><input type="text" placeholder="Product" value={this.state.product} onChange={(event)=>this.setState({product: event.target.value})} /></div>
        <div><button onClick={this.saveData}>Save</button><button>Reset</button></div>
        {/* <hr/> */}
        <div style={{paddingTop: 10, paddingBottom: 20}}>
          <table>
            <thead>
              <div style={{borderTop: '1px solid #eee', borderBottom: '2px solid #eee', paddingTop: 5, paddingBottom: 5, fontWeight: 'bold'}}>
                <tr>
                  <th colspan="1">Time</th>
                  <th colspan="1">Log ID</th>
                  <th colspan="1">Login Email</th>
                  <th colspan="1">Login ID</th>
                  <th colspan="1">Type</th>
                  <th colspan="1">Log Information</th>
                </tr>
              </div>
            </thead>
            <tbody>
              {
                this.state.tableData.map((entry)=>(
                  <tr>
                    <td>{entry.time}</td>
                    <td>{entry.logId}</td>
                    <td>{entry.loginEmail}</td>
                    <td>{entry.loginId}</td>
                    <td>{entry.type}</td>
                    <td>{entry.logInformation}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default App;