import { Fragment, useEffect, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { CaretDown, Check } from "phosphor-react";
import classNames from "classnames";
export interface Provider {
  id: number;
  type: string;
  icon?: string;
}

type Props = {
  label?: string;
  options: Array<Provider> | undefined;
  defaultSelect?: Provider | null;
  disabled?: boolean;
  loading?: boolean;
  horizontal?: boolean;
  onChange?: (value: Provider) => void;
  valueSelected?: Provider;
};

const InputSelectCustom = ({
  label = "",
  options = [],
  defaultSelect,
  disabled = false,
  horizontal = false,
  loading = false,
  onChange,
  valueSelected,
}: Props) => {
  const [selected, setSelected] = useState(
    (defaultSelect && defaultSelect) || options[0]
  );

  useEffect(() => {
    if (selected && onChange) onChange(selected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  useEffect(() => {
    if (valueSelected) setSelected(valueSelected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options]);

  useEffect(() => {
    if (defaultSelect) setSelected(defaultSelect);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultSelect]);

  return (
    <Listbox
      value={selected}
      onChange={setSelected}
      disabled={disabled}
      horizontal={horizontal}
    >
      {({ open }) => (
        <>
          <Listbox.Label className="block text-sm font-medium text-gray-700">
            {label}
          </Listbox.Label>
          <div className="mt-1 relative">
            <Listbox.Button className="bg-white relative w-full border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
              <span
                className="block truncate max-w-xs"
                title={selected?.type || ""}
              >
                {selected?.type || "Seleccione una opción"}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                <CaretDown className="h-5 w-5 text-black" aria-hidden="true" />
              </span>
            </Listbox.Button>
            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {options?.length > 0 ? (
                  options.map((option) => (
                    <Listbox.Option
                      key={option.type}
                      className={({ active }) =>
                        classNames(
                          active ? "text-white bg-indigo-600" : "text-gray-900",
                          "cursor-default select-none relative "
                        )
                      }
                      value={option}
                    >
                      {({ selected, active }) => (
                        <div className="flex items-center cursor-pointer hover:bg-gray-100 py-2 pl-3 pr-9 ">
                          {option?.icon && (
                            <span className="mr-2">{option.icon}</span>
                          )}
                          <span
                            title={option.type}
                            className={classNames(
                              selected
                                ? "font-medium text-blue-secondary"
                                : "font-normal",
                              "block text-sm truncate text-gray-700 hover:text-blue-secondary duration-150 transition-all pr-3"
                            )}
                          >
                            {option.type}
                          </span>

                          {selected && (
                            <span
                              className={classNames(
                                active
                                  ? "text-blue-secondary"
                                  : "text-indigo-600",
                                "absolute inset-y-0 right-0 flex items-center pr-4"
                              )}
                            >
                              <Check
                                className="h-5 w-5 text-dark-text-primary"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                        </div>
                      )}
                    </Listbox.Option>
                  ))
                ) : (
                  <div className="block text-sm truncate text-gray-700 p-3">
                    {/* show message data empty */}
                    {loading ? "Cargando..." : "No hay datos disponibles"}
                  </div>
                )}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
};

export default InputSelectCustom;
