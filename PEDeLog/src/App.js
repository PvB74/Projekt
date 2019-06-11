import React, { Component } from 'react';
import './App.css';
import axios from 'axios'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      response: '',
      tableData: [],
      dateFrom: null,
      dateTo: null,
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
    this.fetchApi()
      .then(res => this.setState({ tableData: res.records }))
      .catch(err => console.log(err));
  }

  fetchApi = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/login');
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      return body;
    } catch (err) {
      console.error(err)
    }
  }

  saveData = ()=>{
    const state = Object.assign({}, this.state)
    delete state.response
    delete state.tableData
    axios.post('http://localhost:5000/api/login', { state })
    // .then((response)=>response.json())
    .then((response)=>{
      console.log("response",response)
      this.setState({tableData: [...this.state.tableData].concat(state)})
    })
    .catch((err)=>{
      console.error(err)
      alert(err)
    })
  }

  resetData = ()=>{
    this.setState({
      dateFrom: null,
      dateTo: null,
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
    document.getElementById('datefrom').value = null
    document.getElementById('dateto').value = null
  }


  render() {
    return (
      <div className="App">
        <div><input type="date" id="datefrom" placeholder="Date From" onChange={(event)=>this.setState({dateFrom: event.target.valueAsDate})} /></div>
        <div><input type="date" id="dateto" placeholder="Date To" onChange={(event)=>this.setState({dateTo: event.target.valueAsDate})} /></div>
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
        <div><button onClick={this.saveData}>Save</button><button onClick={this.resetData}>Reset</button></div>
        {/* <hr/> */}
        <div style={{paddingTop: 10, paddingBottom: 20}}>
          <table>
            <thead>
                <tr style={{borderTop: '1px solid #eee', borderBottom: '2px solid #eee', paddingTop: 5, paddingBottom: 5, fontWeight: 'bold'}}>
                  <th colSpan="1">Roles</th>
                  <th colSpan="1">License ID</th>
                  <th colSpan="1">Login Email</th>
                  <th colSpan="1">Login ID</th>
                  <th colSpan="1">Account Type</th>
                  <th colSpan="1">Auth Methods</th>
                  <th colSpan="1">Account Active</th>
                  <th colSpan="1">Login Active</th>
                </tr>
            </thead>
            <tbody>
              {
                this.state.tableData.map((entry)=>(
                  <tr key={Math.random()}>
                    <td>{entry.roles? entry.roles.join(" / ") : ""}</td>
                    <td>{entry.license_id}</td>
                    <td>{entry.login_email}</td>
                    <td>{entry.login_id}</td>
                    <td>{entry.account_type}</td>
                    <td>{entry.auth_methods}</td>
                    <td>{entry.account_active === '1'? "Yes" : "No"}</td>
                    <td>{entry.login_active === '1'? "Yes" : "No"}</td>
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