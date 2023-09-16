'use client';
import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { FiInstagram, FiFacebook, FiTwitter, FiLinkedin } from 'react-icons/fi';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
} from 'react-share';

interface Props {
  title?: string;
}

const ShareButtons = ({ title }: Props) => {
  const url = typeof window !== 'undefined' ? window.location.href : '/';
  return (
    <div className="flex flex-row flex-nowrap justify-end gap-2">
      <InstapaperShareButton url={url} title={title}>
        <FiInstagram />
      </InstapaperShareButton>

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
