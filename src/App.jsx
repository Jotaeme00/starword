import QuoteCard from "./components/QuoteCard.jsx";
import TagSelector from "./components/TagSelector.jsx";
import { useQuotes } from "./hooks/useQuotes.js";

export default function App(){
  const { quote, tags, tag, setTag, next, copy, share } = useQuotes();

  return (
    <div className="app">
      <div className="floating-star"></div>
       <div className="card" aria-live="polite">
         <header className="header">
           <div className="brand">STARWORD</div>
           <div className="actions">
             <button className="btn" onClick={copy} title="Copiar (Ctrl/Cmd+C)" disabled={!quote}>
               Copiar
             </button>
             <button className="btn" onClick={share} title="Compartilhar" disabled={!quote}>
               Compartilhar
             </button>
             <button className="btn btn-accent" onClick={next} title="Próxima (Espaço)">
               Gerar
             </button>
           </div>
         </header>

        {quote ? (
          <QuoteCard quote={quote} />
        ) : (
          <div className="placeholder">
            Clique em <b>Gerar</b> para receber sua frase!
          </div>
        )}

        <footer className="footer">
          <TagSelector tags={tags} active={tag} onChange={setTag} />
          <div className="hint">Pressione <kbd> ESPAÇO</kbd> para sortear </div>
        </footer>
      </div>
    </div>
  );
}


