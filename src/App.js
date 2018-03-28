import React, { Component } from 'react';
import moment from 'moment';
import logo from './logo.svg';
import './App.css';

import Api from './api/Api';
import TableRow from './components/TableRow';
import Alert from './components/Alert';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      list: [],
      isLoading: true,
      message: '',
      error: '',
    };

    this._onClickToggleStatus = this._onClickToggleStatus.bind(this);
  }

  componentWillMount() {
    Api.list().then(data => {
      this.setState({
        list: data.list || [],
        isLoading: data.isLoading,
        error: data.error
      });
    });
  }

  shouldComponentUpdate(nextState) {
    return this.state.list !== nextState.list
      || this.state.isLoading !== nextState.isLoading
      || this.state.message !== nextState.message
      || this.state.error !== nextState.error;
  }

  _onClickToggleStatus(id, status) {
    Api.updateStatus(id, !status).then(data => {
      if (null === data.error) {
        // update modified user in list
        this.setState({
          list: this.state.list.map(tt => {
            if (tt.id === id) {
              return {
                ...tt,
                active: !status
              };
            }
            return tt;
          })
        });

        // show message alert
        this.setState({ message: data.message });
      } else {
        // show error alert
        this.setState({ error: data.error });
      }
    });
  }

  render() {

    const Header = () => {
      return (
        <div>
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <h1 className="App-title">Webpack React JSON Server</h1>
          </header>
          <p className="App-intro">
            Simple demo for a project using React with Webpack, linked with JSON Server launched by NodeJS.
          </p>
        </div>
      );
    };

    if (this.state.isLoading) {
      return (
        <div className="App container">
          { Header() }
          <div className="preloader">
            <div className="loader-small" />
          </div>
        </div>
      );
    }

    if (0 === this.state.list.length) {
      return (
          <div className="App container">
            { Header() }
            <div className="alert alert-dark" role="alert">
              No results!
            </div>
          </div>
      );
    }

    return (
      <div className="App container">
        { Header() }
        <div className="alerts">
          {this.state.error && ('string' === typeof this.state.error) &&
            <Alert message={this.state.error} error />
          }
          {this.state.message && ('string' === typeof this.state.message) &&
            <Alert message={this.state.message} />
          }
        </div>
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
              <TableRow
                  key={row.id}
                  id={row.id}
                  date={row.date}
                  active={row.active}
                  user={row.user}
                  toggleStatus={this._onClickToggleStatus}
              />
          )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
