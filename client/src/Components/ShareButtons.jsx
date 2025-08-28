import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  EmailShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
  EmailIcon
} from 'react-share';
import { ThemeContext } from '../App';
import './ShareButtons.css'; // Create this CSS file

const ShareButtons = ({ url, title, description, image }) => {
  const { t } = useTranslation();
  const { darkMode } = useContext(ThemeContext);

  
  return (
    <div className={`share-buttons-container ${darkMode ? 'dark' : ''}`}>
      <h3 className="share-title">{t("shareDestination", "Share this destination")}</h3>
      <div className="social-buttons">
        <FacebookShareButton url={url} quote={title}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        
        <TwitterShareButton url={url} title={title}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        
        <WhatsappShareButton url={url} title={title} separator=" - ">
          <WhatsappIcon size={32} round />
        </WhatsappShareButton>
        
        <LinkedinShareButton url={url} title={title} summary={description}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
        
        <EmailShareButton url={url} subject={title} body={description}>
          <EmailIcon size={32} round />
        </EmailShareButton>
      </div>
    </div>
  );
};

export default ShareButtons;