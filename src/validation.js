function validDate(date) {
	return typeof date === 'object' &&
		date.seconds > 0;

}

export function isAnnouncementValid(announcement) {
	return announcement !== undefined &&
		announcement.id !== undefined &&
		announcement.announcer !== undefined &&
		announcement.ts_utc !== undefined &&
		validDate(announcement.ts_utc) &&
		announcement.text !== undefined;
}

export function isChatValid(chat) {
	return chat !== undefined &&
		chat.id !== undefined &&
		chat.name !== undefined &&
		chat.ts_utc !== undefined &&
		validDate(chat.ts_utc) &&
		chat.text !== undefined;
}
