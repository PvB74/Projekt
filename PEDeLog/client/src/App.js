import React, { Component } from 'react';
import './App.css';
// import axios from 'axios'
import moment from 'moment'

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      response: '',
      tableData: [],
      displayedData: [],
      dateFrom: null,
      dateTo: null,
      loginId: "",
      context: ""
      /* email: '',
      accountId: '',
      accountType: '',
      country: '',
      role: '',
      license: '',
      authenticationMethod: '',
      typeOfLogData: '',
      substance: '',
      product: '' */
    };
  }

  componentDidMount() {
    this.fetchApi()
      .then(res => this.setState({ tableData: res.records, displayedData: res.records }))
      .catch(err => console.log(err));
  }

  fetchApi = async () => {
    try {
      const response = await fetch('https://ffhs-project-pedelog-backend.herokuapp.com/api/login');
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      console.log(body)
      body.records.forEach(element => {
        if(element.login_data && element.login_data.datetime){
          element.login_data.datetime += ":00"
        }
      });
      return body;
    } catch (err) {
      console.error(err)
    }
  }

  /* saveData = ()=>{
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
  } */

  filterData = ()=>{
    this.setState({displayedData: this.state.tableData.filter((entry)=>{
      if(entry.login_data && entry.login_data.datetime){
        const dateSplit = entry.login_data.datetime.split(" ")
        const reorganizedDay = dateSplit[0].split(".").reverse().join("-")
        const dateToUse = moment(reorganizedDay + " " + dateSplit[1])
        if(this.state.dateFrom){
          const from = moment(this.state.dateFrom).startOf('day')
          if(dateToUse < from) return false;
        }
        if(this.state.dateTo){
          const to = moment(this.state.dateTo).startOf('day')
          if(dateToUse > to) return false;
        }
      }
      if(this.state.loginId){
        if(entry.login_id !== this.state.loginId) return false;
      }
      if(this.state.context){
        if(!entry.login_data || entry.login_data.context !== this.state.context) return false;
      }
      return true;
    })})
  }

  resetData = ()=>{
    this.setState({
      dateFrom: null,
      dateTo: null,
      loginId: "",
      context: "",
      // email: '',
      // accountId: '',
      // accountType: '',
      // country: '',
      // role: '',
      // license: '',
      // authenticationMethod: '',
      // typeOfLogData: '',
      // substance: '',
      // product: '',
      displayedData: this.state.tableData
    })
    document.getElementById('datefrom').value = null
    document.getElementById('dateto').value = null
  }


  render() {
    return (
      <div className="App">
        <div><input type="date" id="datefrom" placeholder="Date From" onChange={(event)=>this.setState({dateFrom: event.target.valueAsDate})} /></div>
        <div><input type="date" id="dateto" placeholder="Date To" onChange={(event)=>this.setState({dateTo: event.target.valueAsDate})} /></div>
        <div><input type="number" min="1" max="1000" placeholder="Login ID" value={this.state.loginId} onChange={(event)=>this.setState({loginId: event.target.value})} /></div>
        <div>
          <select value={this.state.context} onChange={(event)=>this.setState({context: event.target.value})}>
            <option value="" disabled>Choose Context</option>
            <option value="CALCULATOR.CALCDOSAGE">CALCULATOR.CALCDOSAGE</option>
            <option value="CALCULATOR.PERCENTILE">CALCULATOR.PERCENTILE</option>
            <option value="CALCULATOR.CHECKCHILD">CALCULATOR.CHECKCHILD</option>
            <option value="CALCULATOR.CHECKDOSAGE">CALCULATOR.CHECKDOSAGE</option>
          </select>
        </div>
        {/* <div><input type="email" placeholder="Email" value={this.state.email} onChange={(event)=>this.setState({email: event.target.value})} /></div>
        <div><input type="text" placeholder="Account Id" value={this.state.accountId} onChange={(event)=>this.setState({accountId: event.target.value})} /></div>
        <div><input type="text" placeholder="Account Type" value={this.state.accountType} onChange={(event)=>this.setState({accountType: event.target.value})} /></div>
        <div><input type="text" placeholder="Country" value={this.state.country} onChange={(event)=>this.setState({country: event.target.value})} /></div>
        <div><input type="text" placeholder="Role" value={this.state.role} onChange={(event)=>this.setState({role: event.target.value})} /></div>
        <div><input type="text" placeholder="License" value={this.state.license} onChange={(event)=>this.setState({license: event.target.value})} /></div>
        <div><input type="text" placeholder="Authentication Method" value={this.state.authenticationMethod} onChange={(event)=>this.setState({authenticationMethod: event.target.value})} /></div>
        <div><input type="text" placeholder="Type Of Log Data" value={this.state.typeOfLogData} onChange={(event)=>this.setState({typeOfLogData: event.target.value})} /></div> */}
        {/* <div><input type="text" placeholder="Substance" value={this.state.substance} onChange={(event)=>this.setState({substance: event.target.value})} /></div>
        <div><input type="text" placeholder="Product" value={this.state.product} onChange={(event)=>this.setState({product: event.target.value})} /></div> */}
        <div>
          {/* <button onClick={this.saveData}>Save</button> */}
          <button onClick={this.filterData}>Filter</button>
          <button onClick={this.resetData}>Reset</button>
        </div>
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
                  <th colSpan="1">DateTime</th>
                  <th colSpan="1">Context</th>
                </tr>
            </thead>
            <tbody>
              {
                this.state.displayedData.map((entry)=>(
                  <tr key={Math.random()}>
                    <td>{entry.roles}</td>
                    <td>{entry.license_id}</td>
                    <td>{entry.login_email}</td>
                    <td>{entry.login_id}</td>
                    <td>{entry.account_type}</td>
                    <td>{entry.auth_methods}</td>
                    <td>{entry.account_active === '1'? "Yes" : "No"}</td>
                    <td>{entry.login_active === '1'? "Yes" : "No"}</td>
                    <td>{entry.login_data && entry.login_data.datetime}</td>
                    <td>{entry.login_data && entry.login_data.context}</td>
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