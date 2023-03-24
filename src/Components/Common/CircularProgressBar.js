import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

const CircularProgressBar = ({ completedPercentage }) => {
  return (
    <CircularProgressbar
      value={completedPercentage}
      text={completedPercentage + "%"}
      styles={buildStyles({
        // Text size
        textSize: "20px",
        // How long animation takes to go from one percentage to another, in seconds
        pathTransitionDuration: 0.5,
        // Colors
        pathColor: "royalblue",
        textColor: completedPercentage === 100 ? "royalblue" : "red",
        trailColor: "wheat",
        backgroundColor: "#3e98c7",
      })}
    />
  );
};

export default CircularProgressBar;
