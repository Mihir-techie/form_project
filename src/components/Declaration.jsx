import { useForm } from '../context/FormContext'
import { useTranslation } from '../context/useTranslation'
import Section from './ui/Section'
import TextInput from './ui/TextInput'
import QuestionBlock from './ui/QuestionBlock'

export default function Declaration() {
  const { formData, updateField } = useForm()
  const { t } = useTranslation()

  const DOCUMENTS = [
    { labelKey: 'doc1', name: 'docFamilyLetter' },
    { labelKey: 'doc2', name: 'docMarkSheets' },
    { labelKey: 'doc3', name: 'docCasteCertificate' },
    { labelKey: 'doc4', name: 'docFamilyCard' },
    { labelKey: 'doc5', name: 'docDisabilityCertificate' },
  ]

  return (
    <Section title={t('secDeclaration')}>
      <QuestionBlock>
        <div className="field-row">
          <TextInput
            label={t('declDate')}
            name="declarationDate"
            type="date"
            value={formData.declarationDate}
            onChange={updateField}
            className="third"
          />
          <TextInput
            label={t('declPlace')}
            name="declarationPlace"
            value={formData.declarationPlace}
            onChange={updateField}
            className="third"
          />
          <TextInput
            label={t('declStudentName')}
            name="declarationStudentName"
            value={formData.declarationStudentName}
            onChange={updateField}
            className="third"
          />
        </div>
      </QuestionBlock>

      <QuestionBlock>
        <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.75rem' }}>
          {t('docsHeading')}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {DOCUMENTS.map((doc) => (
            <div key={doc.name} style={{
              padding: '0.75rem',
              background: 'var(--color-card)',
              borderRadius: 'var(--radius)',
              border: '1px solid var(--color-border)',
              borderLeft: '3px solid var(--color-accent)',
            }}>
              <label style={{
                display: 'block', fontSize: '0.82rem',
                fontWeight: 600, marginBottom: '0.5rem',
                color: 'var(--color-text)',
              }}>
                {t(doc.labelKey)}
              </label>
              <input
                type="file"
                name={doc.name}
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={updateField}
                style={{ fontSize: '0.82rem', color: 'var(--color-text)', width: '100%' }}
              />
              {formData[doc.name] && (
                <p style={{ marginTop: '0.3rem', fontSize: '0.78rem', color: 'var(--color-accent)' }}>
                  ✓ {formData[doc.name].name}
                </p>
              )}
            </div>
          ))}
        </div>
      </QuestionBlock>
    </Section>
  )
}
