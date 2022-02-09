import { CSSProperties } from "react";

export interface CustomIconProps {
  style?: CSSProperties,
  onClick?: () => void,
}

export interface CustomIconWithRequiredClickProps extends CustomIconProps {
  style?: CSSProperties,
  onClick: () => void,
}