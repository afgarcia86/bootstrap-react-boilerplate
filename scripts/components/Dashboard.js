// Basic Packages
import React from 'react'
import Helmet from 'react-helmet'


class Dashboard extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  static propTypes = {
    userDetails: React.PropTypes.object
  }

  render() {
    return (
      <div className="container">
        <Helmet
          title="Dashboard"
          titleTemplate="Craves CMS | %s"
          htmlAttributes={{"class": "dashboard"}}
        />
      </div>
    )
  }

}

export default Dashboard