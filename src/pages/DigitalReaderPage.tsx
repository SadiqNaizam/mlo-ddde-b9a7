import React from 'react';
import ImmersiveReaderUI from '@/components/ImmersiveReaderUI';

/**
 * DigitalReaderPage serves as the main entry point for the immersive reading experience.
 * It's a lightweight wrapper around the ImmersiveReaderUI component, which handles
 * all the complex logic for displaying book content, managing audio playback,
 * and handling user settings for a distraction-free environment.
 */
const DigitalReaderPage = () => {
  console.log('DigitalReaderPage loaded');

  return (
    <>
      <ImmersiveReaderUI />
    </>
  );
};

export default DigitalReaderPage;