export const Message = ({ label, placeholder ,name,onChange,value}) => {
  return (
    <div className="text-sm w-full">
      <label className="text-border font-semibold">{label}</label>
      <textarea
        name={name}
        onChange={onChange}
        value={value}
        className="w-full h-40 mt-2 p-6 bg-main border border-border rounded"
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};

export const Select = ({ label, options, onChange,name,value }) => {
  return (
    <>
      <label className="text-border font-semibold">{label}</label>
      <select
       name={name}
       value={value}
       className="w-full mt-2 p-4 text-text bg-main border border-border rounded"
        onChange={onChange}
      >
        {options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.title}
          </option>
        ))}
      </select>
    </>
  );
};

export const Input = ({ label, placeholder, type, bg ,onChange,name,value}) => {
  return (
    <>
      <div className="text-sm w-full " onChange={onChange}>
        <label className="text-border font-semibold">{label}</label>
        <input
          required
          name={name}
          value={value}
          type={type}
          placeholder={placeholder}
          className={`w-full text-sm mt-2 p-4 text-white ${bg?'bg-main':'bg-dry'} border border-border rounded`}
        ></input>
      </div>
    </>
  );
};
