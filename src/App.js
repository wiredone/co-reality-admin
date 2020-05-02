import React from 'react';
import ManageRooms from './ManageRooms';
import ManageAnnouncements from './ManageAnnouncements';

export default function App() {
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
            Hiding & showing rooms, tech support, & room updates: <a href="https://co-reality.slack.com/archives/C012GKX7DC7">#ops on Slack</a>, the Whatsapp group, or Chris on +1 415-758-8161
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
