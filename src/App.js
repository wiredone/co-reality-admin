import React from 'react';
import { withFirebase } from 'react-redux-firebase';

import ManageChats from './ManageChats';
import ManageAnnouncements from './ManageAnnouncements';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      invalid: false,
      loggedIn: false,
      password: undefined
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      password: event.target.value,
      invalid: false
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const setValid = (valid) => {
      this.setState({
        loggedIn: valid,
        invalid: !valid
      });
    };

    const checkAdminPassword = this.props.firebase.functions().httpsCallable('checkAdminPassword');
    checkAdminPassword({password: this.state.password})
      .then(() => setValid(true))
      .catch(() => setValid(false));
  }

  render() {
    if (!this.state.loggedIn) {
      return (
        <div className="container">
          <div className="row mt-3">
            <div className="col">
              <h2>Godyssey: Party Admin Tool - Login</h2>
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label htmlFor="password">
                    Password
                  </label>
                  <input onChange={this.handleChange}
                    className={"form-control" + (this.state.invalid ? " is-invalid" : "")}
                    id="password"
                    placeholder="Password"/>
                  {this.state.invalid &&
                    <div className="invalid-feedback">
                      Incorrect password
                    </div>
                  }
                  <small id="emailHelp" className="form-text text-muted">
                    Please enter the password. You can ask for the password in <a href="https://co-reality.slack.com/archives/C012GKX7DC7">#tech-team on Slack</a>.
                  </small>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="row mt-3">
          <div className="col">
            <h2>Godyssey: Party Admin Tool</h2>
            <p>
              Parties are real. Is God real? Are you real? What is it for? Let's have some fun!
            </p>
            <p>
              Here you can send & delete announcements and chat messages.
            </p>
            <div className="alert alert-danger" role="alert">
              Hiding & showing rooms, tech support, & room updates: <a href="https://co-reality.slack.com/archives/C012GKX7DC7">#tech-team on Slack</a>.
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <ManageAnnouncements />
          </div>
          <div className="col-md-6">
            <ManageChats />
          </div>
        </div>
      </div>
    );
  }
}

export default withFirebase(App);