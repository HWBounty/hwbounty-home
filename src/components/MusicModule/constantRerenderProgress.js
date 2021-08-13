import { useState } from "react";

import { Slider, Typography } from "@material-ui/core";

let parseSecsToEnglish = (secs) => {
  let mins = Math.floor(secs / 60);
  let sec = Math.round(secs % 60);
  mins = `${mins}`.length === 1 ? `0${mins}` : mins;
  sec = `${sec}`.length === 1 ? `0${sec}` : sec;
  return `${mins}:${sec}`;
};
let ProgressBarMusic = (props) => {
  const { disabled } = props;
  const [currentTime, setcurrentTime] = useState(0);
  const [duration, setDuration] = useState(1);

  let [reRender, setRerender] = useState(false);
  const [rerenderInt, setrerenderInt] = useState(null);
  if (disabled) {
    return (
      <div>
        <Slider value={0} />
        <Typography
          variant="body2"
          color="textSecondary"
          style={{
            display: "inline-block",
          }}
        >{`00:00 | 00:00`}</Typography>
      </div>
    );
  }
  if (!rerenderInt)
    setrerenderInt(
      setInterval(() => {
        try {
          let player = document.getElementById("streamingVideoForMusic");
          setcurrentTime(player.currentTime);
          setDuration(player.duration);
        } catch (error) {}
      }, 1)
    );
  const changeTime = (event, newValue) => {
    let player = document.getElementById("streamingVideoForMusic");
    player.currentTime = (player.duration * newValue) / 100;
  };
  return (
    <div>
      <Slider
        value={Math.round(
          (document.getElementById("streamingVideoForMusic").currentTime *
            100) /
            document.getElementById("streamingVideoForMusic").duration
        )}
        onChange={changeTime}
      />
      <Typography
        variant="body2"
        color="textSecondary"
        style={{
          display: "inline-block",
        }}
      >{`${parseSecsToEnglish(
        document.getElementById("streamingVideoForMusic").currentTime
      )} | ${parseSecsToEnglish(
        document.getElementById("streamingVideoForMusic").duration
      )}`}</Typography>
    </div>
  );
};
export default ProgressBarMusic;
