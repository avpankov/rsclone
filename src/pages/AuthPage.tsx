import React, { useEffect, useState } from "react";
import Disclaimer from "../components/UI/Disclaimer";
import ModalWindow from "../components/UI/ModalWindow";
import { IconRSSLogo, IconSpotifyLogoWithoutName } from "../icons";

function AuthPage(props: { AUTH_ENDPOINT: string; CLIENT_ID: string; REDIRECT_URI: string; RESPONSE_TYPE: string; }) {

  const [modalWindow, setModalWindow] = useState(true);

  return (
    <div className="auth-page">
      <div className="auth-page__container">
        <div className="auth-page__login">
          <div className="spotify-logo">
            <IconSpotifyLogoWithoutName /> SpotifyClone
          </div>
          <p className="auth-page__login__description">SpotifyClone is the result of the rsclone team task, performed within the Rolling Scopes school JavaScript/Front-end 2022Q3 course</p>
          <div className="rs-school-logo">
            <a href="https://rs.school/js/" target="_blank" rel="noreferrer">
              <IconRSSLogo />
            </a>
          </div>
          <button className="login-btn"><a href={`${props.AUTH_ENDPOINT}?client_id=${props.CLIENT_ID}&redirect_uri=${props.REDIRECT_URI}&response_type=${props.RESPONSE_TYPE}&scope=user-library-read,playlist-modify-public,user-library-modify`}>Login to Spotify</a></button>
          <div className="disclaimer__button" onClick={() => setModalWindow(!modalWindow)}>Disclaimer</div>
        </div>
        <div className="auth-page__preview">
          <div className="auth-page__preview__container">
            <iframe src="https://www.youtube.com/embed/1HVi1fXe2q4?controls=0" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
          </div>
        </div>
      </div>

      <ModalWindow visible={modalWindow} setVisible={setModalWindow}>
        <Disclaimer />
      </ModalWindow>
    </div>
  )

}

export default AuthPage;
