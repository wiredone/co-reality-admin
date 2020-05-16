import React from 'react';

import firebase from 'firebase/app';

import { firestoreConnect } from 'react-redux-firebase';

class AnnouncementForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			announcer: '',
			text: '',
			imageUrl: '',
		}

		this.handleAnnouncerChange = this.handleAnnouncerChange.bind(this);
		this.handleTextChange = this.handleTextChange.bind(this);
		this.handleImageUrlChange = this.handleImageUrlChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	valid() {
		return this.state.announcer.length > 0 &&
			this.state.text.length > 0;
	}

	handleAnnouncerChange(event) {
		this.setState({
			announcer: event.target.value
		});
	}

	handleTextChange(event) {
		this.setState({
			text: event.target.value
		});
	}

	handleImageUrlChange(event) {
		this.setState({
			imageUrl: event.target.value
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		this.props.firestore
			.collection('announcements')
			.add({
				ts_utc: firebase.firestore.Timestamp.fromDate(new Date()),
				announcer: this.state.announcer,
				text: this.state.text,
				imageUrl: this.state.imageUrl,
			}
		);
		this.setState({
			announcer: '',
			text: '',
			imageUrl: '',
		});
	}

	render() {
		return (
			<form onSubmit={this.handleSubmit}>
				<div className="form-group">
					<label htmlFor="announcer"/>
					<input type="text"
						className="form-control"
						id="announcer"
						placeholder="Example: El cuerpo"
						value={this.state.announcer}
						onChange={this.handleAnnouncerChange}/>
					<small className="form-text text-muted">
						Your name, your alias, your nickname... whatever you like
					</small>

					<label htmlFor="text"/>
					<input type="text"
						className="form-control"
						id="text"
						placeholder="Example: Come join the fun!"
						value={this.state.text}
						onChange={this.handleTextChange}/>
					<small className="form-text text-muted">
						Sell people on your event or occasion!
					</small>

					<label htmlFor="imageUrl"/>
					<input type="text"
						className="form-control"
						id="imageUrl"
						placeholder="Example: https://imgur.com/f3412"
						value={this.state.imageUrl}
						onChange={this.handleImageUrlChange}/>
					<small className="form-text text-muted">
						OPTOINAL: URL to an image to include in your announcement. You must upload it elsewhere (eg. Google Docs) and grab its URL.
					</small>
				</div>
				<button type="submit" disabled={!this.valid()} className="btn btn-primary">Announce It!</button>
			</form>
		);
	}
}

export default firestoreConnect()(AnnouncementForm);