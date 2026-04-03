import { useForm } from '../context/FormContext'
import { useTranslation } from '../context/useTranslation'
import Section from './ui/Section'
import TextInput from './ui/TextInput'
import RadioGroup from './ui/RadioGroup'
import QuestionBlock from './ui/QuestionBlock'
import { CASTE_OPTIONS } from '../constants/formFields'

export default function GuardianCaste() {
  const { formData, updateField } = useForm()
  const { t } = useTranslation()

  return (
    <Section title={t('secGuardian')}>
      <QuestionBlock>
        <p style={{
          fontSize: '0.82rem', color: 'var(--color-text-light)',
          marginBottom: '0.75rem', fontStyle: 'italic',
        }}>
          {t('guardianNote')}
        </p>
        <div className="field-row">
          <TextInput
            label={t('guardianName')}
            name="guardianName"
            value={formData.guardianName}
            onChange={updateField}
          />
          <TextInput
            label={t('relationship')}
            name="guardianRelationship"
            value={formData.guardianRelationship}
            onChange={updateField}
            className="third"
          />
        </div>
      </QuestionBlock>

      <QuestionBlock>
        <RadioGroup
          label={t('caste')}
          name="caste"
          options={CASTE_OPTIONS}
          value={formData.caste}
          onChange={updateField}
        />
      </QuestionBlock>
    </Section>
  )
}
