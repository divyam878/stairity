"use client";

export default function StudioLayout({ children }) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "white",
      }}
    >
      {children}
    </div>
  );
}
