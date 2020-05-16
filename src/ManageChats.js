import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { formatUtcSeconds } from './utils';
import { isChatValid } from './validation';

import ChatForm from './ChatForm';

function ManageChats() {
	const firestore = useFirestore();

	useFirestoreConnect('chats');
	const chats = useSelector(state => state.firestore.ordered.chats);
	if (chats === undefined) {
		return "Loading chats...";
	}

	return (
		<div className="card" id="chats">
			<div className="card-header">
				<h2>Manage Chats</h2>
				<small>
					You can create and delete chat messages from here.
				</small>
			</div>
			<div className="card-body">
				<ChatForm />
			</div>
			<ul className="list-group">
				{chats
					.filter(isChatValid)
					.concat()
					.sort((a, b) => b.ts_utc - a.ts_utc)
					.map(chat =>
					<li className="list-group-item" key={chat.id}>
						<b>{chat.name}</b>: {formatUtcSeconds(chat.ts_utc)}
						<br/>
						{chat.text}
						<form onSubmit={event => {
							if (window.confirm(
								`WARNING: You are about to delete chat by ${chat.name} @ ${formatUtcSeconds(chat.ts_utc)}:` +
								"\n" +
								chat.text +
								"\n\n" +
								"This action cannot be undone! Are you sure?"
							)) {
								firestore
									.collection('chats')
									.doc(chat.id)
									.delete();
							}
							event.preventDefault();
						}}>
							<button type="submit" className="btn btn-danger btn-sm">
								DELETE
							</button>
						</form>
					</li>
				)}
			</ul>
		</div>
	);
}

ManageChats.propTypes = {
	firestore: PropTypes.shape({
    	update: PropTypes.func.isRequired
	})
}

export default ManageChats;