import { useForm } from '../context/FormContext'
import { useTranslation } from '../context/useTranslation'
import Section from './ui/Section'
import TextInput from './ui/TextInput'
import RadioGroup from './ui/RadioGroup'
import QuestionBlock from './ui/QuestionBlock'
import { YES_NO, OCCUPATION_OPTIONS } from '../constants/formFields'

export default function FatherInfo() {
  const { formData, updateField } = useForm()
  const { t } = useTranslation()

  return (
    <Section title={t('secFather')}>
      <QuestionBlock>
        <div className="field-row">
          <TextInput
            label={t('fatherName')}
            name="fatherName"
            value={formData.fatherName}
            onChange={updateField}
          />
          <TextInput
            label={t('age')}
            name="fatherAge"
            type="number"
            value={formData.fatherAge}
            onChange={updateField}
            className="third"
            min={0} max={120}
          />
          <TextInput
            label={t('education')}
            name="fatherEducation"
            value={formData.fatherEducation}
            onChange={updateField}
            className="third"
          />
        </div>
        <div className="field-row">
          <RadioGroup
            label={t('fatherAlive')}
            name="isFatherAlive"
            options={YES_NO}
            value={formData.isFatherAlive}
            onChange={updateField}
            className="half"
          />
          <RadioGroup
            label={t('fatherContact')}
            name="isFatherInContact"
            options={YES_NO}
            value={formData.isFatherInContact}
            onChange={updateField}
            className="half"
          />
        </div>
      </QuestionBlock>

      <QuestionBlock>
        <RadioGroup
          label={t('occupation')}
          name="fatherOccupation"
          options={OCCUPATION_OPTIONS}
          value={formData.fatherOccupation}
          onChange={updateField}
        />
        {formData.fatherOccupation === 'other' && (
          <TextInput
            label={t('specifyOther')}
            name="fatherOccupationOther"
            value={formData.fatherOccupationOther}
            onChange={updateField}
          />
        )}
        <div className="field-row" style={{ marginTop: '0.75rem' }}>
          <TextInput
            label={t('dailyWage')}
            name="fatherDailyWage"
            type="number"
            value={formData.fatherDailyWage}
            onChange={updateField}
            className="half"
            min={0}
          />
          <TextInput
            label={t('monthlyIncome')}
            name="fatherMonthlyIncome"
            type="number"
            value={formData.fatherMonthlyIncome}
            onChange={updateField}
            className="half"
            min={0}
          />
        </div>
      </QuestionBlock>
    </Section>
  )
}
