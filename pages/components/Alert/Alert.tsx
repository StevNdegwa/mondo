import { FC, memo } from "react";
import { FeedbackTypes } from "../../FeedbackTypes";
import { Wrapper } from "./styles";

export interface AlertProps {
  paint?: string;
  feedback?: FeedbackTypes;
}

export const Alert: FC<AlertProps> = memo(({ paint, children, feedback }) => (
  <Wrapper paint={paint} feedback={feedback}>
    <div className="alert-bg" />
    {children}
  </Wrapper>
));
