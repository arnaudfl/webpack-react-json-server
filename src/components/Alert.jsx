import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Alert extends Component {

  static closeAlert() {
    $('.alert').hide();
  }

  componentDidMount() {
    $('.alert').show();
  }

  componentDidUpdate() {
    $('.alert').show();
  }

  render() {
    const type = this.props.error ? 'danger' : 'success';
    return (
      <div className={`alert alert-${type}`} role="alert">
        {this.props.message}
        <button onClick={Alert.closeAlert} type="button" className="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    );
  }
}

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  error: PropTypes.bool
};

Alert.defaultProps = {
  error: false
};

export default Alert;