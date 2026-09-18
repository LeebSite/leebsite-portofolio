import React, { createContext, useContext, useState, useEffect } from "react";

const CvModalContext = createContext();

export const CvModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openCvModal = () => setIsOpen(true);
  const closeCvModal = () => setIsOpen(false);

  // Lock body scroll when CV modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        closeCvModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <CvModalContext.Provider value={{ isCvModalOpen: isOpen, openCvModal, closeCvModal }}>
      {children}
    </CvModalContext.Provider>
  );
};

export const useCvModal = () => {
  const context = useContext(CvModalContext);
  if (!context) {
    return {
      isCvModalOpen: false,
      openCvModal: () => {},
      closeCvModal: () => {}
    };
  }
  return context;
};
