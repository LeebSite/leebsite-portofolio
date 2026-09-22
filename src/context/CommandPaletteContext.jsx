import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const CommandPaletteContext = createContext();

export const CommandPaletteProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openPalette = useCallback(() => setIsOpen(true), []);
  const closePalette = useCallback(() => setIsOpen(false), []);
  const togglePalette = useCallback(() => setIsOpen((prev) => !prev), []);

  // Global Key Listener for Ctrl+K, Cmd+K, and '/'
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ignore if user is typing in input or textarea
      const target = e.target;
      const isInput = target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        togglePalette();
      } else if (e.key === "/" && !isInput && !isOpen) {
        e.preventDefault();
        openPalette();
      } else if (e.key === "Escape" && isOpen) {
        closePalette();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, openPalette, closePalette, togglePalette]);

  // Lock body scroll when Command Palette is open
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

  return (
    <CommandPaletteContext.Provider value={{ isPaletteOpen: isOpen, openPalette, closePalette, togglePalette }}>
      {children}
    </CommandPaletteContext.Provider>
  );
};

export const useCommandPalette = () => {
  const context = useContext(CommandPaletteContext);
  if (!context) {
    return {
      isPaletteOpen: false,
      openPalette: () => {},
      closePalette: () => {},
      togglePalette: () => {}
    };
  }
  return context;
};
