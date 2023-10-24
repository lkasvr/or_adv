'use client';
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiFacebook, FiTwitter, FiLinkedin } from 'react-icons/fi';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
} from 'react-share';

interface Props {
  title?: string;
  url: string;
}

const ShareButtons = ({ title, url }: Props) => {
  return (
    <div className="flex flex-row flex-nowrap justify-end gap-2">
      <FacebookShareButton url={url} title={title}>
        <FiFacebook />
      </FacebookShareButton>

      <TwitterShareButton url={url} title={title}>
        <FiTwitter />
      </TwitterShareButton>

      <WhatsappShareButton url={url} title={title}>
        <FaWhatsapp />
      </WhatsappShareButton>
      <LinkedinShareButton url={url} title={title}>
        <FiLinkedin />
      </LinkedinShareButton>
    </div>
  );
};

export default ShareButtons;
