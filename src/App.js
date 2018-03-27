import React, { Component } from 'react';
import moment from 'moment';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list: [],
      isLoading: true,
      error: null,
    };
  }

  componentDidMount() {
    return fetch('api/users')
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            isLoading: false,
            list: responseJson || []
          });
        })
        .catch(error => {
          console.error(error);
          this.setState({ error });
        });
  }

  render() {
    return (
      <div className="App container">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="scope">Company</th>
              <th scope="scope">Date</th>
              <th scope="scope">Status</th>
            </tr>
          </thead>
          <tbody>
          {this.state.list.map(row =>
              <tr key={row.id}>
                <th scope="row">{row.id}</th>
                <td>
                  <b>{row.user.companyName}</b><br />
                  <small>{row.user.address} {row.user.zipCode} {row.user.city}</small>
                </td>
                <td>{moment(row.date).format('YYYY-MM-DD')}</td>
                <td>
                  <span className={`badge badge-${row.active ? 'success' : 'danger'}`}>
                    {row.active ? 'active' : 'inactive'}
                  </span>
                </td>
              </tr>
          )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
