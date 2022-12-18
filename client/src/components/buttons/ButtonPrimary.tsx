import classNames from "classnames";
import { ReactNode } from "react";

type Props = {
  label?: string | ReactNode;
  onClick?: (event: React.MouseEvent<HTMLElement>) => void;
  className?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  type?: string;
};

const ButtonPrimary = ({
  label = "",
  className = "",
  onClick,
  icon,
  disabled = false,
  loading = false,
  type = "button",
}: Props) => (
  <>
    <button
      type={type === "button" ? "button" : "submit"}
      className={classNames(
        "w-full items-center gap-3 justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-500",
        disabled && "cursor-not-allowed",
        className
      )}
      onClick={(event) =>
        !loading && onClick
          ? onClick(event as React.MouseEvent<HTMLElement>)
          : {}
      }
      disabled={disabled || loading}
    >
      {label}
      {!!icon && icon}
    </button>
  </>
);

export default ButtonPrimary;
