// Basic Packages
import React from 'react'
import Helmet from 'react-helmet'
import { browserHistory, Link } from 'react-router'

// Views
import Alert from './shared/Alert'

// Form Stuff
import Formsy from 'formsy-react'
import { Checkbox, CheckboxGroup, Input, RadioGroup, Row, Select, File, Textarea, ParentContextMixin } from 'formsy-react-components'

const MyForm = React.createClass({

  mixins: [ParentContextMixin],

  propTypes: {
    children: React.PropTypes.node
  },

  render() {
    const { layout, validatePristine, ...rest } = this.props
    return (
      <Formsy.Form
        className={this.getLayoutClassName()}
        {...rest}
        ref="formsy">
        {this.props.children}
      </Formsy.Form>
    )
  }

})

class SignIn extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      layout: "vertical",
      validatePristine: false,
      disabled: false,
      showAlert: false,
      alertDetails: {}
    }
    this.signIn = this.signIn.bind(this)
  }

  componentWillMount() {
    // firebaseHelpers.isAuthenticated(function(res){
    //   if(res.status == 'success') {
    //     browserHistory.push('/')
    //   }
    // })
  }

  signIn(user) {
    this.setState({ disabled: true })
    // firebaseHelpers.signIn(user.email, user.password, function(res){
    //   if(!res) {
    //     browserHistory.push('/')
    //   } else {
    //     this.setState({
    //       disabled: false,
    //       showAlert: true,
    //       alertDetails: res
    //     })
    //   }
    // }.bind(this))
  }

  render() {
    const { signIn } = this
    const { layout, validatePristine, disabled, showAlert, alertDetails } = this.state
    return (
      <div className="container">
        <Helmet
          title="Sign In"
          titleTemplate="Kiki Vodka | %s"
          htmlAttributes={{"class": "account-form"}}
        />
        <div className="logo mt30 mb15 text-xs-center">
          <img src="./assets/images/logo.png" width="63"/>
        </div>
        <div className="row">
          <div className="col-xs-12 col-md-6 offset-md-3">
            {showAlert && (
              <Alert alertClass={alertDetails.alertClass} boldText={alertDetails.boldText} text={alertDetails.text} />
            )}
            <MyForm
              className="vertical-form"
              onValidSubmit={signIn}
              layout={layout}
              validatePristine={validatePristine}
              disabled={disabled}
              ref="myform">
              <Input
                name="email"
                label={false}
                type="email"
                placeholder="Email"
                value=""
                validations="isEmail"
                required
              />
              <Input
                name="password"
                label={false}
                type="password"
                placeholder="Password"
                value=""
                required
              />              
              <div className="form-group">
                <input className="btn btn-primary btn-block" formNoValidate={true} type="submit" disabled={disabled} value="Sign In"/>
              </div>
            </MyForm>
          </div>
        </div>
      </div>
    )
  }

}

export default SignIn