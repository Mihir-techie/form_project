import { useTranslation } from '../../context/useTranslation'

export default function RadioGroup({
  label, name, options, value, onChange, className = '',
}) {
  const { opt } = useTranslation()

  return (
    <div className={`field-group ${className}`}>
      {label && <label>{label}</label>}
      <div className="radio-group">
        {options.map((o) => (
          <label key={o.value} className="radio-option">
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={onChange}
            />
            {opt(o)}
          </label>
        ))}
      </div>
    </div>
  )
}
