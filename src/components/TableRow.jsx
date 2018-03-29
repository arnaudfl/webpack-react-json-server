import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

class TableRow extends Component {

  constructor(props) {
    super(props);

    this._toggleStatus = this._toggleStatus.bind(this);
  }

  _toggleStatus() {
    this.props.toggleStatus(this.props.id, this.props.active);
  }

  render() {
    return (
      <tr>
        <th scope="row">{this.props.id}</th>
        <td>
          <b>{this.props.user.companyName}</b><br />
          <small>{this.props.user.address} {this.props.user.zipCode} {this.props.user.city}</small>
        </td>
        <td>{moment(this.props.date).format('YYYY-MM-DD')}</td>
        <td>
          <a
              href="#!"
              role="presentation"
              onClick={this._toggleStatus}
              className={`badge badge-${this.props.active ? 'success' : 'danger'}`}
          >
            {this.props.active ? 'active' : 'inactive'}
          </a>
        </td>
      </tr>
    );
  }
}

TableRow.propTypes = {
  id: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  date: PropTypes.string.isRequired,
  user: PropTypes.shape({
    companyName: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    zipCode: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
  }),
  toggleStatus: PropTypes.func.isRequired
};

export default TableRow;
