import { useState } from "react";

export default function TagSelector({ tags, active, onChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="tag-selector">
      <button
        className="toggle-tags"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {isOpen ? "▲ Ocultar tags" : "▼ Mostrar tags"}
      </button>

      {isOpen && (
        <div className="tags" role="tablist" aria-label="filtros de tema">
          {tags.map((t) => (
            <button
              key={t}
              role="tab"
              aria-selected={active === t}
              className={`chip ${active === t ? "chip--active" : ""}`}
              onClick={() => onChange(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)} {/* Capitaliza */}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

