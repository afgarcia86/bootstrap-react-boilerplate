// Packages
import React from 'react'
import { browserHistory, Link } from 'react-router'


class Header extends React.Component {

  constructor(props) {
    super(props)

    this.signOut = this.signOut.bind(this)
  }

  static propTypes = {
    userDetails: React.PropTypes.object
  }

  signOut() {
    // firebaseHelpers.signOut(function(res){
    //   if(res.status === 'success') {
    //     browserHistory.push('/sign-in')
    //   }
    // })
  }

  render() {
    const { signOut } = this
    return (
      <nav className="navbar navbar-light">
        <div className="container">
          <button className="navbar-toggler hidden-sm-up text-white" type="button" data-toggle="collapse" data-target="#MainNav">&#9776;</button>
          <span className="navbar-brand">
            <img src="./assets/images/logo.png" width="36"/>
          </span>
          <div className="collapse navbar-toggleable-xs" id="MainNav">
            <ul className="nav navbar-nav pull-sm-left">
              <li className="nav-item">
                <Link to="/" className="nav-link" activeClassName="active">Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link to="sign-in" className="nav-link" activeClassName="active">Sign In</Link>
              </li>
              <li className="nav-item hidden-md-up">
                <a onClick={signOut} className="nav-link" href="#">Sign Out</a>
              </li>
            </ul>

            <ul className="nav navbar-nav pull-sm-right hidden-md-down">
              <li className="nav-item">
                <span className="nav-link active">Hello</span>
              </li>
              <li className="nav-item btn-group">
                <a className="nav-link" data-toggle="dropdown" href="#"> {/*dropdown-toggle*/}
                  <i className="fa fa-cog"></i>
                </a>
                <div className="dropdown-menu dropdown-menu-right text-xs-center">
                  <Link to="/edit-profile" className="dropdown-item" activeClassName="active">Edit Profile</Link>
                  <div className="dropdown-divider"></div>
                  <a onClick={signOut} className="dropdown-item" href="#">Sign Out</a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    )
  }
}

export default Header