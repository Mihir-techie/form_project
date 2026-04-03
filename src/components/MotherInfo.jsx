import { useForm } from '../context/FormContext'
import { useTranslation } from '../context/useTranslation'
import Section from './ui/Section'
import TextInput from './ui/TextInput'
import RadioGroup from './ui/RadioGroup'
import QuestionBlock from './ui/QuestionBlock'
import { YES_NO, OCCUPATION_OPTIONS } from '../constants/formFields'

export default function MotherInfo() {
  const { formData, updateField } = useForm()
  const { t } = useTranslation()

  return (
    <Section title={t('secMother')}>
      <QuestionBlock>
        <div className="field-row">
          <TextInput
            label={t('motherName')}
            name="motherName"
            value={formData.motherName}
            onChange={updateField}
          />
          <TextInput
            label={t('age')}
            name="motherAge"
            type="number"
            value={formData.motherAge}
            onChange={updateField}
            className="third"
            min={0} max={120}
          />
          <TextInput
            label={t('education')}
            name="motherEducation"
            value={formData.motherEducation}
            onChange={updateField}
            className="third"
          />
        </div>
        <div className="field-row">
          <RadioGroup
            label={t('motherAlive')}
            name="isMotherAlive"
            options={YES_NO}
            value={formData.isMotherAlive}
            onChange={updateField}
            className="half"
          />
          <RadioGroup
            label={t('motherContact')}
            name="isMotherInContact"
            options={YES_NO}
            value={formData.isMotherInContact}
            onChange={updateField}
            className="half"
          />
        </div>
      </QuestionBlock>

      <QuestionBlock>
        <RadioGroup
          label={t('occupation')}
          name="motherOccupation"
          options={OCCUPATION_OPTIONS}
          value={formData.motherOccupation}
          onChange={updateField}
        />
        {formData.motherOccupation === 'other' && (
          <TextInput
            label={t('specifyOther')}
            name="motherOccupationOther"
            value={formData.motherOccupationOther}
            onChange={updateField}
          />
        )}
        <div className="field-row" style={{ marginTop: '0.75rem' }}>
          <TextInput
            label={t('dailyWage')}
            name="motherDailyWage"
            type="number"
            value={formData.motherDailyWage}
            onChange={updateField}
            className="half"
            min={0}
          />
          <TextInput
            label={t('monthlyIncome')}
            name="motherMonthlyIncome"
            type="number"
            value={formData.motherMonthlyIncome}
            onChange={updateField}
            className="half"
            min={0}
          />
        </div>
      </QuestionBlock>
    </Section>
  )
}
