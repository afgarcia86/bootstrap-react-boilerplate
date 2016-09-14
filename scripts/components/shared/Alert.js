// Packages
import React from 'react'

class Alert extends React.Component {

  static defaultProps = {
    className : 'alert',
    alertClass : 'alert-success',
    boldText: '',
    text: ''
  }

  render() {

    const { alertClass, ...props } = this.props
    props.className += ` ${alertClass}`

    return (
      <div className={props.className} role="alert">
        <button type="button" className="close" data-dismiss="alert">
          <span aria-hidden="true">&times;</span>
        </button>
        <strong>{this.props.boldText}</strong> {this.props.text}
      </div>
    )
  }
}

export default Alert