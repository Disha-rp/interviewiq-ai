function Card({ children }) {
  return (
    <div
      className="
        w-full
        max-w-md
        bg-slate-900/70
        backdrop-blur-lg
        rounded-2xl
        shadow-2xl
        p-8
        border
        border-slate-700
      "
    >
      {children}
    </div>
  );
}

export default Card;