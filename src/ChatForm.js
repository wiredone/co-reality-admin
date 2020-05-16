import React from 'react';

import firebase from 'firebase/app';

import { firestoreConnect } from 'react-redux-firebase';

class ChatForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      text: ''
    }

    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  valid() {
    return this.state.name.length > 0 &&
      this.state.text.length > 0;
  }

  handleNameChange(event) {
    this.setState({
      name: event.target.value
    });
  }

  handleTextChange(event) {
    this.setState({
      text: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.firestore
      .collection('chats')
      .add({
        ts_utc: firebase.firestore.Timestamp.fromDate(new Date()),
        name: this.state.name,
        text: this.state.text
      }
    );
    this.setState({
      name: '',
      text: ''
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name"/>
          <input type="text"
            className="form-control"
            id="name"
            placeholder="Example: The Chatty One"
            value={this.state.name}
            onChange={this.handleNameChange}/>
          <small className="form-text text-muted">
            Your name, your alias, your nickname... whatever you like
          </small>

          <label htmlFor="text"/>
          <input type="text"
            className="form-control"
            id="text"
            placeholder="Example: How goes it folks"
            value={this.state.text}
            onChange={this.handleTextChange}/>
          <small className="form-text text-muted">
            Sell people on your event or occasion!
          </small>
        </div>
        <button type="submit" disabled={!this.valid()} className="btn btn-primary">Send</button>
      </form>
    );
  }
}

export default firestoreConnect()(ChatForm);