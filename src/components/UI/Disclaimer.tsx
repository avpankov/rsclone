import React from "react";

function Disclaimer() {
  return (
    <div className="disclaimer">
      <h3>Dear reviewer!</h3>
      <p>We are pleased to present you SpotifyClone — an application made as part of the rsclone task.</p>
      <p>Unfortunately, not everything that was conceived was realized, although we tried very hard. But there are objective reasons for this, and perhaps the main one is the Spotify Api, which we used to get information.</p>
      <p>Firstly, you will need a valid Spotify account to log in to the app.</p>
      <p>Secondly, we need to give you access to the application in development mode. Therefore, please contact us to grant access (we need a email address linked to your Spotify account).</p>
      <div className="disclaimer__contatcs">
        <span><img src="https://images.chesscomfiles.com/uploads/v1/images_users/tiny_mce/jotahernandezv/phpZb0A0d.png" alt="" width="20px"/>@Artyom Pankov#7440</span>
        <span><img src="https://worldsocialmedia.directory/wp-content/uploads/smicons/telegram.png" alt="" width="20px"/>@barbikov</span>
        <span><img src="https://worldsocialmedia.directory/wp-content/uploads/smicons/telegram.png" alt="" width="20px"/>@georgealiev</span>
      </div>
      <p>Or just use account for reviewers:</p>
      <div className="account-info">
        <span>Email: checker@inbox.eu</span>
        <span>Password: 12345678Spotify</span>
      </div>
      <p>Thirdly, must say that the Spotify Api itself is not perfect, so if errors occur during operation, please pay attention to the type of error, perhaps this is a bad response from the server. Most often, the problem can be solved by reloading the page.</p>
      <p>Fourthly, access token in development mode expires every 30 minutes.</p>
      <p>Finally, Spotify Api only provides a 30-second preview of songs, and for some songs even it is not available.</p>
      <p>Also you can watch video presentation of the app.</p>
    </div>
  )

}

export default Disclaimer;
  