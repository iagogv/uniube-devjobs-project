export default function SearchBar({ value, onChange }) {
  return (
    <section className="search-section container">
      <label htmlFor="busca">Buscar vagas</label>
      <input
        type="search"
        id="busca"
        placeholder="Ex: React, Node, Remoto..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </section>
  );
}
