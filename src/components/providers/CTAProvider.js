"use client";

import { createContext, useContext, useState, useCallback } from "react";
import CTAModal from "../ui/CTAModal";
import CareerModal from "../ui/CareerModal";
import CalendlyModal from "../ui/CalendlyModal";

const CTAContext = createContext(null);

export function CTAProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isCareerOpen, setIsCareerOpen] = useState(false);
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false);

  const openCTAModal = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeCTAModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  const openCareerModal = useCallback(() => {
    setIsCareerOpen(true);
  }, []);

  const closeCareerModal = useCallback(() => {
    setIsCareerOpen(false);
  }, []);

  const openCalendlyModal = useCallback(() => {
    setIsCalendlyOpen(true);
  }, []);

  const closeCalendlyModal = useCallback(() => {
    setIsCalendlyOpen(false);
  }, []);

  return (
    <CTAContext.Provider value={{ openCTAModal, openCareerModal, openCalendlyModal, isOpen, isCareerOpen, isCalendlyOpen }}>
      {children}
      <CTAModal isOpen={isOpen} onClose={closeCTAModal} />
      <CareerModal isOpen={isCareerOpen} onClose={closeCareerModal} />
      <CalendlyModal isOpen={isCalendlyOpen} onClose={closeCalendlyModal} />
    </CTAContext.Provider>
  );
}

export function useCTAModal() {
  const context = useContext(CTAContext);
  if (!context) {
    throw new Error("useCTAModal must be used within a CTAProvider");
  }
  return context;
}

// Reusable CTA Button component
export function CTAButton({ children, className, ...props }) {
  const { openCTAModal } = useCTAModal();

  return (
    <button
      onClick={openCTAModal}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}
