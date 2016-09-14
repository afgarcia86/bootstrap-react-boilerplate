// Basic Packages
import React from 'react'
import Helmet from 'react-helmet'

class NotFound extends React.Component {

  render() {
    return (
      <div className="container">
        <Helmet
          title="404 Not Found"
          titleTemplate="Craves CMS | %s"
          htmlAttributes={{"class": "dashboard"}}
        />
      </div>
    )
  }

}

export default NotFound