import { useForm } from '../context/FormContext'
import { useTranslation } from '../context/useTranslation'
import Section from './ui/Section'
import TextInput from './ui/TextInput'
import RadioGroup from './ui/RadioGroup'
import QuestionBlock from './ui/QuestionBlock'
import { GENDER_OPTIONS, YES_NO } from '../constants/formFields'

export default function PersonalInfo() {
  const { formData, updateField } = useForm()
  const { t } = useTranslation()

  return (
    <Section title={t('secPersonal')}>
      <QuestionBlock>
        <div className="field-row">
          <TextInput
            label={t('studentName')}
            name="studentName"
            value={formData.studentName}
            onChange={updateField}
            required
          />
          <TextInput
            label={t('dateOfBirth')}
            name="dateOfBirth"
            type="date"
            value={formData.dateOfBirth}
            onChange={updateField}
            className="third"
            required
          />
        </div>
      </QuestionBlock>

      <QuestionBlock>
        <RadioGroup
          label={t('gender')}
          name="gender"
          options={GENDER_OPTIONS}
          value={formData.gender}
          onChange={updateField}
        />
      </QuestionBlock>

      <QuestionBlock>
        <RadioGroup
          label={t('differentlyAbled')}
          name="isDisabled"
          options={YES_NO}
          value={formData.isDisabled}
          onChange={updateField}
        />
        {formData.isDisabled === 'yes' && (
          <div className="conditional-block">
            <TextInput
              label={t('disabilityDetails')}
              name="disabilityDetails"
              value={formData.disabilityDetails}
              onChange={updateField}
            />
          </div>
        )}
      </QuestionBlock>
    </Section>
  )
}
