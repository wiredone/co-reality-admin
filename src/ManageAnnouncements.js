import React from 'react';
import { useSelector } from 'react-redux';
import { useFirestore, useFirestoreConnect } from 'react-redux-firebase';
import { formatUtcSeconds } from './utils';
import { isAnnouncementValid } from './validation';

import AnnouncementForm from './AnnouncementForm';

export default function ManageAnnouncements() {
	const firestore = useFirestore();

	useFirestoreConnect('announcements');
	const announcements = useSelector(state => state.firestore.ordered.announcements);
	if (announcements === undefined ) {
		return "Loading announcements...";
	}

	return (
		<div className="card" id="announcements">
			<div className="card-header">
				<h2>Manage Announcements</h2>
				<small>
					Announcements you make will appear to everyone instantly. There is no need for people to refresh or reload their page.
				</small>
			</div>
			<div className="card-body">
				<AnnouncementForm />
			</div>
			<ul className="list-group">
				{announcements.filter(isAnnouncementValid).concat().sort((a, b) => b.ts_utc - a.ts_utc).map(announcement =>
					<li className="list-group-item" key={announcement.id}>
						<b>{announcement.announcer}</b>: {formatUtcSeconds(announcement.ts_utc)}
						<br/>
						{announcement.text}
						{announcement.imageUrl &&
							<a href={announcement.imageUrl} target="_blank">
								<img className="img-fluid" src={announcement.imageUrl} title={"Announcement Image: " + announcement.imageUrl} />
							</a>
						}
						<form onSubmit={event => {
							if (window.confirm(
								`WARNING: You are about to delete announcement by ${announcement.announcer} @ ${formatUtcSeconds(announcement.ts_utc)}:` +
								"\n" +
								announcement.text +
								"\n\n" +
								"This action cannot be undone! Are you sure?"
							)) {
								firestore
									.collection('announcements')
									.doc(announcement.id)
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
