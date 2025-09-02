export default function QuoteCard({ quote }){
  if(!quote) return null;
  return (
    <div role="figure" aria-label="frase motivacional">
      <p className="quote">“{quote.text}”</p>
      <div className="author">— {quote.author}</div>
    </div>
  );
}
