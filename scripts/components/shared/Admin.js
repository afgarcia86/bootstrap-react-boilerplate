// Packages
import React from 'react'
import reactMixin from 'react-mixin'
import { browserHistory } from 'react-router'

// Views
import Header from './Header'

class Admin extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      userDetails: null
    }
  }

  componentDidMount() {
    // firebaseHelpers.isAuthenticated(function(res){
    //   if(res.status === 'error') {
    //     browserHistory.push('/sign-in')
    //   } else {
    //     // this.setState({ uid: res.uid })
    //     var database = firebase.database()
    //     var userDetails = database.ref('users/'+res.uid)
    //     this.bindAsObject(userDetails, 'userDetails')
    //   }
    // }.bind(this))
  }

  render() {
    const { userDetails } = this.state
    return ( //userDetails && (
      <div className="appWrapper">
        <Header userDetails={userDetails} />
        {React.cloneElement(this.props.children, {userDetails: userDetails})}
      </div>
    ) //)
  }
}

export default Admin