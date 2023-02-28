import React, { ReactNode } from "react";

interface IModalChildren {
  children: ReactNode;
  visible: boolean;
  setVisible: (visible: boolean) => void;
}

const ModalWindow = ({ children, visible, setVisible }: IModalChildren) => {
  const rootClasses = ['modal-window'];
  if (visible) {
    rootClasses.push('modal-window_active');
  }

  console.log(children)
  return (
    <div className={rootClasses.join(' ')} onClick={() => {
      setVisible(false);
      window.localStorage.setItem('buyNow', 'false');
    }}>
      <div className="modal-window__content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default ModalWindow;
