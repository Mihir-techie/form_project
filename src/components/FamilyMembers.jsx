import { useForm } from '../context/FormContext'
import { useTranslation } from '../context/useTranslation'
import Section from './ui/Section'
import RadioGroup from './ui/RadioGroup'
import QuestionBlock from './ui/QuestionBlock'
import { YES_NO, FEE_PAYMENT_OPTIONS, EMPTY_FAMILY_MEMBER } from '../constants/formFields'

export default function FamilyMembers() {
  const { formData, updateField, updateNested } = useForm()
  const { t } = useTranslation()
  const members = formData.familyMembers

  const updateMember = (index, field, value) => {
    const updated = members.map((m, i) =>
      i === index ? { ...m, [field]: value } : m
    )
    updateNested('familyMembers', updated)
  }

  const addMember = () => {
    updateNested('familyMembers', [...members, { ...EMPTY_FAMILY_MEMBER }])
  }

  const removeMember = (index) => {
    if (members.length <= 1) return
    updateNested('familyMembers', members.filter((_, i) => i !== index))
  }

  const fields = [
    { key: 'name',             labelKey: 'colName' },
    { key: 'age',              labelKey: 'colAge',       type: 'number' },
    { key: 'relationship',     labelKey: 'colRelation' },
    { key: 'education',        labelKey: 'colEducation' },
    { key: 'schoolOrOccupation', labelKey: 'colSchoolOcc' },
    { key: 'feesOrIncome',     labelKey: 'colFeesIncome' },
  ]

  return (
    <Section title={`19. ${t('secFamily')}`}>
      <QuestionBlock>
        <p style={{
          fontSize: '0.8rem', color: 'var(--color-text-light)',
          marginBottom: '1rem', fontStyle: 'italic',
        }}>
          {t('familyNote')}
        </p>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem' }}>
            <thead>
              <tr>
                {fields.map((f) => (
                  <th key={f.key} style={{
                    padding: '0.5rem', textAlign: 'left',
                    background: 'var(--color-dark)', color: 'white',
                    fontWeight: 600, fontSize: '0.78rem',
                    whiteSpace: 'nowrap',
                  }}>
                    {t(f.labelKey)}
                  </th>
                ))}
                <th style={{
                  padding: '0.5rem', background: 'var(--color-dark)',
                  color: 'white', width: '40px',
                }} />
              </tr>
            </thead>
            <tbody>
              {members.map((member, i) => (
                <tr key={i}>
                  {fields.map((f) => (
                    <td key={f.key} style={{ padding: '0.3rem' }}>
                      <input
                        type={f.type || 'text'}
                        value={member[f.key]}
                        onChange={(e) => updateMember(i, f.key, e.target.value)}
                        style={{
                          width: '100%', padding: '0.4rem',
                          border: '2px solid var(--color-border)',
                          borderRadius: '4px', fontSize: '0.82rem',
                          fontFamily: 'var(--font-tamil)',
                        }}
                      />
                    </td>
                  ))}
                  <td style={{ textAlign: 'center' }}>
                    {members.length > 1 && (
                      <button type="button" onClick={() => removeMember(i)}
                        style={{
                          background: 'none', border: 'none',
                          color: 'var(--color-error)', cursor: 'pointer',
                          fontSize: '1.2rem', fontWeight: 700,
                        }}>
                        &times;
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <button type="button" onClick={addMember} style={{
          marginTop: '0.75rem', padding: '0.5rem 1.25rem',
          background: 'white',
          border: '2px dashed var(--color-border)',
          borderRadius: 'var(--radius)', cursor: 'pointer',
          fontFamily: 'var(--font-tamil)', fontWeight: 600,
          fontSize: '0.85rem', color: 'var(--color-accent)',
        }}>
          {t('addMember')}
        </button>
      </QuestionBlock>

      <QuestionBlock>
        <RadioGroup
          label={t('siblingsPrivate')}
          name="siblingsInPrivate"
          options={YES_NO}
          value={formData.siblingsInPrivate}
          onChange={updateField}
        />
        {formData.siblingsInPrivate === 'yes' && (
          <RadioGroup
            label={t('feeConcession')}
            name="siblingsFeeConcession"
            options={YES_NO}
            value={formData.siblingsFeeConcession}
            onChange={updateField}
          />
        )}
        {formData.siblingsInPrivate === 'no' && (
          <RadioGroup
            label={t('feePayment')}
            name="feePaymentMethod"
            options={FEE_PAYMENT_OPTIONS}
            value={formData.feePaymentMethod}
            onChange={updateField}
          />
        )}
      </QuestionBlock>
    </Section>
  )
}
