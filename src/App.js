import React from 'react';

import ManageRooms from './ManageRooms';
import ManageAnnouncements from './ManageAnnouncements';

import { PASSWORD } from './secrets';

export default class App extends React.Component {
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
    const valid = this.state.password === PASSWORD;
    this.setState({
      loggedIn: valid,
      invalid: !valid
    });
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
                    Please enter the password. You can ask in <a href="https://co-reality.slack.com/archives/C012GKX7DC7">#ops on Slack</a> or the Whatsapp group
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
              Here you can send announcements and toggle rooms to show open and closed. A closed room gets a red badge in the room list and appears red in the clickable map. It does not affect whether the room can be clicked on.
            </p>
            <p>
              If you need to hide a room, rooms can be hidden from the map, room list, or both.
            </p>
            <p>
              Announcements you make appear to everyone instantly. There is no need for people to refresh or reload their page.
            </p>
            <div className="alert alert-danger" role="alert">
              Hiding & showing rooms, tech support, & room updates: <a href="https://co-reality.slack.com/archives/C012GKX7DC7">#ops on Slack</a> or the Whatsapp group
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <ManageAnnouncements />
          </div>
          <div className="col-md-6">
            <ManageRooms />
          </div>
        </div>
      </div>
    );
  }
}
