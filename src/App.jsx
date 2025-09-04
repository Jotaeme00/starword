import QuoteCard from "./components/QuoteCard.jsx";
import TagSelector from "./components/TagSelector.jsx";
import { useQuotes } from "./hooks/useQuotes.js";

export default function App(){
  const { quote, tags, tag, setTag, next, copy, share } = useQuotes();

  return (
    <div className="app"> 
    <div className="star"></div>
      <div className="card" aria-live="polite">
        <header className="header">
          <div className="brand">Starword</div>
          <div className="actions">
            <button className="btn" onClick={copy} title="Copiar (Ctrl/Cmd+C)">
              Copiar
            </button>
            <button className="btn" onClick={share} title="Compartilhar">
              Compartilhar
            </button>
            <button className="btn btn-accent" onClick={next} title="Próxima (Espaço)">
              Próxima
            </button>
          </div>
        </header>

        <QuoteCard quote={quote} />

        <footer className="footer">
          <TagSelector tags={tags} active={tag} onChange={setTag} />
          <div className="hint">Pressione <kbd> ESPAÇO</kbd> para sortear </div>
        </footer>
      </div>
    </div>
  );
}

