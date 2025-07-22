import { h } from 'preact';
import MovingbgFortasi from './MovingbgFortasi';

const VideoSection = () => {
  return (
    <section>
      <MovingbgFortasi videoSrc="/bg/mplsday1.webm" direction="left" />
      <MovingbgFortasi videoSrc="/bg/mplsday2.webm" direction="right" />
      <MovingbgFortasi videoSrc="/bg/mplsday3.webm" direction="bottom" />
      <MovingbgFortasi videoSrc="/bg/mplsday4.webm" direction="left" />
      <MovingbgFortasi videoSrc="/bg/mplsday5.webm" direction="right" />
      <MovingbgFortasi videoSrc="/bg/mplsday6.webm" direction="bottom" />
    </section>
  );
};

export default VideoSection;
