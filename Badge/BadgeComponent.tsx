import { BadgeProps } from "./BadgeProps";
import "./Badge.scss";

function BadgeComponent({ Class, BadgeName }: BadgeProps) {
  return (
    <span className={`BadgeComponent badge `} style={{backgroundColor:`${Class}`}}>
      {BadgeName}
    </span>
  );
}

export default BadgeComponent;
