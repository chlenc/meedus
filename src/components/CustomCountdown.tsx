import React from "react";
import Countdown from "react-countdown";
import { CountdownProps } from "react-countdown/dist/Countdown";

const CustomCountdown: React.FC<CountdownProps> = (props) => {
  return <Countdown renderer={renderer} {...props} />;
};
const Completionist = () => <span>soon</span>;

const renderer = ({ hours, minutes, seconds, days, completed }: any) =>
  completed ? (
    <Completionist />
  ) : (
    <span>
      {days > 0 && `${("0" + days).slice(-2)}:`}
      {hours > 0 && `${("0" + hours).slice(-2)}:`}
      {("0" + minutes).slice(-2)}:{("0" + seconds).slice(-2)}
    </span>
  );

export default CustomCountdown;
