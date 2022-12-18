/* eslint-disable react/display-name */
import { FC, forwardRef, HTMLInputTypeAttribute } from "react";
import { Eye, EyeSlash } from "phosphor-react";
import useBooleanToggler from "../../hooks/useBooleanToggler";

export type InputProps = {
  label?: string;
  name?: string;
  placeholder?: string;
  customClassContainer?: string;
  className?: string;
  iconLeft?: JSX.Element | undefined;
  iconRight?: JSX.Element | undefined;
  helpText?: string;
  typeInput?: HTMLInputTypeAttribute;
  value?: string;
  disabled?: boolean;
};

export const InputGeneric: FC<InputProps> = forwardRef<
  HTMLInputElement,
  InputProps
>(
  (
    {
      label = "",
      name = "",
      customClassContainer = "",
      className = "",
      iconLeft,
      iconRight,
      helpText = "",
      placeholder = "",
      typeInput = "",
      value,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const { isToggled, toggle } = useBooleanToggler();
    const isTypePassword = typeInput === "password";

    return (
      <div className={customClassContainer}>
        {label && (
          <label
            htmlFor={typeInput}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <div className="relative rounded-md shadow-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {!!iconLeft && iconLeft}
          </div>
          <input
            ref={ref}
            type={isTypePassword && isToggled ? "text" : typeInput}
            className={`p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-blue-800 rounded-lg ${className} ${
              !!iconLeft ? "pl-10" : ""
            } ${!!iconRight || isTypePassword ? "pr-10" : ""}`}
            placeholder={placeholder}
            value={value}
            name={name}
            {...(typeInput === "number" && {
              min: 0,
            })}
            {...props}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500">
            {isTypePassword ? (
              <div
                className="h-full flex justify-center items-center cursor-pointer"
                onClick={toggle}
              >
                {isToggled ? (
                  <Eye className="h-5 w-5 text-gray-500" aria-hidden="true" />
                ) : (
                  <EyeSlash
                    className="h-5 w-5 text-gray-500"
                    aria-hidden="true"
                  />
                )}
              </div>
            ) : (
              !!iconRight && iconRight
            )}
          </div>
        </div>
        {helpText && (
          <p className="mt-1 text-sm text-gray-500" id="email-description">
            {helpText}
          </p>
        )}
      </div>
    );
  }
);
