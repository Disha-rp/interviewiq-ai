function Input({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
}) {
  return (
    <div className="mb-4">
      <label className="block text-gray-300 mb-2">
        {label}
      </label>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="
          w-full
          px-4
          py-3
          rounded-lg
          bg-slate-800
          border
          border-slate-700
          text-white
          outline-none
          focus:border-cyan-500
        "
      />
    </div>
  );
}

export default Input;