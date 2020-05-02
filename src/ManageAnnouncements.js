import React from 'react';
import { useSelector } from 'react-redux';
import { useFirestoreConnect } from 'react-redux-firebase';
import { formatUtcSeconds } from './utils';
import { isAnnouncementValid } from './validation';

export default function ManageAnnouncements() {
	useFirestoreConnect('announcements');
	const announcements = useSelector(state => state.firestore.ordered.announcements);
	if (announcements === undefined ) {
		return "Loading announcements...";
	}

	return (
		<div className="card" id="announcements">
			<div className="card-header">
				<h2>Manage Announcements</h2>
			</div>
			<div className="card-body">
				PLACEHOLDER: NEW ANNOUNCEMENT BUTTON & FORM
			</div>
			<ul className="list-group">
				{announcements.filter(isAnnouncementValid).concat().sort((a, b) => b.ts_utc - a.ts_utc).map(announcement =>
					<li className="list-group-item" key={announcement.id}>
						<b>{announcement.announcer}</b>: {formatUtcSeconds(announcement.ts_utc)}
						<br/>
						{announcement.text}
						PLACEHOLDER: DELETE BUTTON & FORM
					</li>
				)}
			</ul>
		</div>
	);
}
