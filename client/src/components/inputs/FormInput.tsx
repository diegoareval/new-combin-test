import get from "lodash/get";

import {
  RegisterOptions,
  DeepMap,
  FieldError,
  UseFormRegister,
  Path,
} from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { InputGeneric, InputProps } from "./InputGeneric";
import { FormErrorMessage } from "./FormError";

export type FormInputProps<TFormValues> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register?: UseFormRegister<any>;
  errors?: Partial<DeepMap<TFormValues, FieldError>>;
  showError?: boolean;
} & Omit<InputProps, "name">;

export const FormInput = <TFormValues extends Record<string, unknown>>({
  name,
  register,
  rules,
  errors,
  className,
  typeInput = "text",
  showError = true,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  const errorMessages = get(errors, name);
  const hasError = !!(errors && errorMessages);
  return (
    <div>
      <InputGeneric
        name={name}
        aria-invalid={errorMessages}
        className={
          hasError
            ? "transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 border-red-500 hover:border-red-500 focus:border-red-500 focus:ring-red-500"
            : ""
        }
        typeInput={typeInput}
        {...props}
        {...(register && register(name, rules))}
      />

      {showError && (
        <ErrorMessage
          errors={errors}
          name={name as any}
          render={({ message }) => (
            <FormErrorMessage className="mt-1">
              <span className="text-red-500">{message}</span>
            </FormErrorMessage>
          )}
        />
      )}
    </div>
  );
};
