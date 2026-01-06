"use client";

import { useEffect } from "react";
import { X, Calendar } from "lucide-react";

export default function CalendlyModal({ isOpen, onClose }) {
  const calLink = "https://cal.com/divyamgoyal878/15min?overlayCalendar=true";

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl w-full max-w-3xl h-[85vh] overflow-hidden shadow-2xl">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-3xl">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-100 rounded-xl">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-black">Book a Call</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Cal.com Embed */}
          <div className="h-[calc(100%-70px)]">
            <iframe
              src={calLink}
              style={{ width: '100%', height: '100%', border: '0' }}
              title="Schedule a call - Cal.com"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </>
  );
}
