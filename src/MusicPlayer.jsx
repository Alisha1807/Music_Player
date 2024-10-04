import React, { useRef, useState, useEffect } from "react";
import Audio1 from "./Audio.mp3";
import Audio2 from "./Audio2.mp3";
import Audio3 from "./Audio3.mp3";
import meraDil from "./meraDil.jpg";
import AajKiRaath from "./AajKiRaath.jpg";
import tumSaathHO from "./tumSaathHO.jpg";
import "./Global2.css";
import {
  FaStepForward,
  FaStepBackward,
  FaPauseCircle,
  FaPlayCircle,
} from "react-icons/fa"; // Correct icon imports
import { MdOutlineLoop, MdSyncDisabled } from "react-icons/md";

const MusicPlayer = () => {
  const [isPlay, setIsPlay] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isLoop, setIsLoop] = useState(false);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef(null);
  const songs = [
    { title: "Aaj ki raath", src: Audio1, img: AajKiRaath },
    { title: "Mera Dil Janda", src: Audio2, img: meraDil },
    { title: "Agar Tum Saath ho", src: Audio3, img: tumSaathHO },
  ];

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const currentSong = songs[currentSongIndex];

  // useEffect to handle metadata loading and update duration
  useEffect(() => {
    const handleLoadedMetadata = () => {
      if (audioRef.current) {
        setDuration(audioRef.current.duration); // Update duration
      }
    };

    if (audioRef.current) {
      audioRef.current.addEventListener("loadedmetadata", handleLoadedMetadata); // Listen to duration

      // Cleanup event listener on component unmount
      return () => {
        audioRef.current.removeEventListener(
          "loadedmetadata",
          handleLoadedMetadata
        );
      };
    }
  }, [currentSongIndex]);

  // Play or pause the audio
  const playOrPauseHandler = () => {
    if (isPlay) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlay(!isPlay);
  };

  // Toggle loop state
  const toggleLoop = () => {
    const newLoopState = !isLoop;
    setIsLoop(newLoopState);

    if (audioRef.current) {
      audioRef.current.loop = newLoopState;
    }
  };

  // Update current time of the audio
  const timeHandlerFunction = (e) => {
    setCurrentTime(e.target.currentTime);
  };

  // Handle dragging of the slider to seek the audio
  const dragHandlerFunction = (e) => {
    audioRef.current.currentTime = parseFloat(e.target.value); // Convert to float
    setCurrentTime(parseFloat(e.target.value)); // Convert to float
  };

  // Skip forward or backward in the song list
  const skipForwardReverse = (direction) => {
    if (direction === "skip-forward") {
      setCurrentSongIndex((prevIndex) => (prevIndex + 1) % songs.length);
    } else if (direction === "skip-back") {
      setCurrentSongIndex(
        (prevIndex) => (prevIndex - 1 + songs.length) % songs.length
      );
    }
  };

  return (
    <div className="mainContainer">
      <div className="outerContainer">
        <h1>Song: {currentSong.title}</h1>
        <img src={currentSong.img} alt={currentSong.title} />{" "}
        {/* Changed alt */}
        <audio
          ref={audioRef}
          src={currentSong.src}
          onTimeUpdate={timeHandlerFunction}
          onEnded={() => skipForwardReverse("skip-forward")}
        ></audio>
        <div className="rangeClass">
          <input
            type="range"
            className="slider"
            min="0"
            max={duration} // Added max attribute
            value={currentTime}
            onChange={dragHandlerFunction}
          />
          <div>
            {/* {Math.floor(currentTime / 60)}:
            {Math.floor(currentTime % 60)
              .toString()
              .padStart(2, "0")}{" "}
            / {Math.floor(duration / 60)}:
            {Math.floor(duration % 60)
              .toString()
              .padStart(2, "0")} */}
          </div>
        </div>
        <div className="btnClass">
          <button onClick={() => skipForwardReverse("skip-back")}>
            <FaStepBackward />
          </button>
          <button onClick={playOrPauseHandler}>
            {isPlay ? <FaPauseCircle /> : <FaPlayCircle />} {/* Changed icon */}
          </button>
          <button onClick={() => skipForwardReverse("skip-forward")}>
            <FaStepForward />
          </button>
          <button onClick={toggleLoop}>
            {isLoop ? <MdSyncDisabled /> : <MdOutlineLoop />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;

//~timeHandlerFunction listens to events fired by the media element itself (e.g., timeupdate), while dragHandlerFunction listens to events fired by user interactions with UI controls (e.g., input sliders).

//!timeHandlerFunction updates the state based on automatic playback changes, whereas dragHandlerFunction updates the playback position and state based on user input.

//!media element, you might see properties like currentTime. For an input element, you might see properties like value.
