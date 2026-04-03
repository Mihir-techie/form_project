export default function TextInput({
  label, name, value, onChange,
  type = 'text', placeholder = '', required = false,
  className = '', ...rest
}) {
  return (
    <div className={`field-group ${className}`}>
      {label && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        {...rest}
      />
    </div>
  )
}
