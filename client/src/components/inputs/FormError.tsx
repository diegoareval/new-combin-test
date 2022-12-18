import { FC, ReactElement } from "react";
import classNames from "classnames";

export type FormErrorMessageProps = {
  className?: string;
  children: ReactElement;
};

export const FormErrorMessage: FC<FormErrorMessageProps> = ({
  children,
  className,
}) => (
  <p className={classNames("mt-1 text-sm text-black", className)}>{children}</p>
);
