import { useTranslation } from '../../context/useTranslation'

export default function CheckboxGroup({
  label, name, options, values = [], onChange, className = '',
}) {
  const { opt } = useTranslation()

  const handleToggle = (optValue) => {
    const next = values.includes(optValue)
      ? values.filter((v) => v !== optValue)
      : [...values, optValue]
    onChange({ target: { name, value: next } })
  }

  return (
    <div className={`field-group ${className}`}>
      {label && <label>{label}</label>}
      <div className="checkbox-group">
        {options.map((o) => (
          <label key={o.value} className="checkbox-option">
            <input
              type="checkbox"
              checked={values.includes(o.value)}
              onChange={() => handleToggle(o.value)}
            />
            {opt(o)}
          </label>
        ))}
      </div>
    </div>
  )
}
