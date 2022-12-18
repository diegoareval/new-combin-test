import { FunctionComponent, ReactElement } from "react";
import classNames from "classnames";
import useOnClickOutside from "../../hooks/useClickOutside";

type Props = {
  open: boolean;
  closed: () => void;
  className?: string;
  closeClickOutside?: boolean;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "full";
  modalWithPadding?: boolean;
  modalWithRounded?: boolean;
  children: ReactElement;
};

const AreaOverlay = () => (
  <>
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
    <span
      className="hidden sm:inline-block sm:align-middle sm:h-screen"
      aria-hidden="true"
    >
      &#8203;
    </span>
  </>
);

const AlertBasic: FunctionComponent<Props> = ({
  className = "",
  open = false,
  closed,
  children,
  closeClickOutside = true,
  size,
  modalWithPadding = true,
  modalWithRounded = true,
}) => {
  const { ref } = useOnClickOutside({
    callBack: () => closeClickOutside && closed(),
  });
  return (
    <>
      {open && (
        <div className="fixed z-50 inset-0 overflow-y-auto ">
          <div className="flex justify-center h-auto items-center ">
            <AreaOverlay />
            <div
              ref={ref}
              className={classNames(
                `relative inline-block bg-white
               overflow-hidden shadow-xl transform transition-all
              align-middle max-w-sm sm:max-w-md w-full

               ${
                 size === "sm"
                   ? "sm:max-w-sm"
                   : size === "md"
                   ? "sm:max-w-md"
                   : size === "lg"
                   ? "sm:max-w-lg"
                   : size === "xl"
                   ? "sm:max-w-xl"
                   : size === "2xl"
                   ? "sm:max-w-2xl"
                   : size === "3xl"
                   ? "sm:max-w-3xl"
                   : size === "4xl"
                   ? "sm:max-w-4xl"
                   : size === "full"
                   ? "sm:max-w-full"
                   : ""
               }`,
                className,
                modalWithPadding &&
                  `px-7 py-7 sm:p-6
                  sm:my-8
                  md:mt-4 mb:mx-4 mb-20
                  mt-10
                  mx-2
                `,
                modalWithRounded && "rounded-lg"
              )}
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AlertBasic;
