import { useForm } from '../context/FormContext'
import { useTranslation } from '../context/useTranslation'
import TextInput from './ui/TextInput'

export default function FormHeader() {
  const { formData, updateField } = useForm()
  const { t } = useTranslation()

  return (
    <div className="section" style={{ borderLeft: '4px solid var(--color-dark)' }}>
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem',
      }}>
        <div>
          <h1 style={{
            fontSize: '1.6rem', fontWeight: 900,
            color: 'var(--color-dark)', lineHeight: 1.3,
          }}>
            {t('appTitle')}
          </h1>
          <h2 style={{
            fontSize: '1.2rem', fontWeight: 700,
            color: 'var(--color-accent)', marginTop: '0.25rem',
          }}>
            {t('appSubtitle')}
          </h2>
          <p style={{
            fontSize: '0.8rem', color: 'var(--color-text-light)',
            marginTop: '0.5rem', lineHeight: 1.5, whiteSpace: 'pre-line',
          }}>
            {t('orgName')}{'\n'}{t('orgAddress')}
          </p>
        </div>

        <div style={{
          padding: '1rem 1.5rem', background: 'var(--color-input-bg)',
          borderRadius: 'var(--radius)', border: '2px solid var(--color-border)',
          textAlign: 'center', minWidth: '220px',
        }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--color-text-light)', marginBottom: '0.5rem' }}>
            {t('officeUseOnly')}
          </p>
          <p style={{ fontWeight: 700, fontSize: '0.85rem' }}>
            {t('applicationNo')}
          </p>
        </div>
      </div>

      <div className="field-row" style={{ marginTop: '1.5rem' }}>
        <TextInput
          label={t('emisNo')}
          name="emisNumber"
          value={formData.emisNumber}
          onChange={updateField}
          placeholder={t('emisPlaceholder')}
          className="half"
        />
      </div>
    </div>
  )
}
