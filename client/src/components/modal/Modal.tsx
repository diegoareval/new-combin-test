import { FunctionComponent } from "react";
import { X } from "phosphor-react";
import classNames from "classnames";
import AlertBasic from "../alert/AlertBasic";

type Props = {
  open: boolean;
  onCloseModal: () => void;
  children?: React.ReactElement;
  closeClickOutside?: boolean;
  showCloseButton?: boolean;
  modalWithPadding?: boolean;
  modalWithRounded?: boolean;
  marginTopInClildren?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "full";
};

export const CloseIcon = ({
  onClick,
  className,
  color = "#A4AAB6",
}: {
  onClick: () => void;
  className?: string;
  color?: string;
}) => (
  <X
    size={20}
    color={color}
    weight="bold"
    className={classNames("cursor-pointer", className)}
    onClick={onClick}
  />
);

const Modal: FunctionComponent<Props> = ({
  open = false,
  onCloseModal,
  children,
  closeClickOutside = true,
  size,
  showCloseButton = true,
  modalWithPadding = true,
  modalWithRounded = true,
  marginTopInClildren = true,
  className,
}) => {
  return (
    <>
      <AlertBasic
        closeClickOutside={closeClickOutside}
        className="max-w-lg"
        open={open}
        closed={onCloseModal}
        size={size}
        modalWithPadding={modalWithPadding}
        modalWithRounded={modalWithRounded}
      >
        <>
          {showCloseButton && (
            <CloseIcon
              className="float-right absolute right-6 top-6"
              onClick={onCloseModal}
            />
          )}

          <div className={classNames(marginTopInClildren && "mt-5", className)}>
            {children}
          </div>
        </>
      </AlertBasic>
    </>
  );
};

export default Modal;
