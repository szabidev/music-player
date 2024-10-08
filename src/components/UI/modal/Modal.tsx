import { ReactNode } from "react";

const Modal = ({
  onClose,
  children,
}: {
  onClose: (event: any) => void;
  children: ReactNode;
}) => {
  const stopPropagation = (e: any) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed inset-0 z-40 min-h-full overflow-y-auto overflow-x-hidden  flex items-center"
      onClick={onClose}
    >
      <div
        aria-hidden="true"
        className="fixed inset-0 w-full h-full bg-transparent cursor-pointer"
      ></div>
      <div
        onClick={stopPropagation}
        className="relative w-full cursor-pointer pointer-events-none  my-auto p-4 animate-slide-down"
      >
        {children}
      </div>
    </div>
  );
};

export default Modal;
