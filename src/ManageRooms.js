import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { isRoomValid } from './validation';

function ManageRooms() {
	const firestore = useFirestore();

	useFirestoreConnect('rooms');
	const rooms = useSelector(state => state.firestore.ordered.rooms);
	if (rooms === undefined) {
		return "Loading rooms & schedule...";
	}

	return (
		<div className="card" id="rooms">
			<div className="card-header">
				<h2>Manage Rooms</h2>
			</div>
			<ul className="list-group">
				{rooms
					.filter(isRoomValid)
					.filter(r => r.on_list)
					.concat()
					.sort((a, b) => a.order - b.order)
					.map(room =>
					<li className="list-group-item" key={room.id}>
						<a href={room.url}
							target="_blank"
							rel="noopener noreferrer"
							title={room.title + " - " + room.subtitle}>
							{room.title}
							{room.open ?
								<span className="badge badge-success mx-2">OPEN</span>
							:
								<span className="badge badge-danger mx-2">CLOSED</span>
							}
						</a>
						<span>- {room.subtitle}</span>
						<form onSubmit={event => {
							firestore
								.collection('rooms')
								.doc(room.id)
								.update({ open: !room.open });
							event.preventDefault();
						}}>
							<button type="submit" className="btn btn-primary btn-sm">
								{room.open ? "Close" : "Open"} {room.name}
							</button>
						</form>
					</li>
				)}
			</ul>
		</div>
	);
}

ManageRooms.propTypes = {
	firestore: PropTypes.shape({
    	update: PropTypes.func.isRequired
	})
}

export default ManageRooms;