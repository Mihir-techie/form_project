import { useForm } from '../context/FormContext'
import { useTranslation } from '../context/useTranslation'
import Section from './ui/Section'
import TextInput from './ui/TextInput'
import RadioGroup from './ui/RadioGroup'
import QuestionBlock from './ui/QuestionBlock'
import {
  SCHOOL_TYPE_10, SCHOOL_TYPE_12,
  MEDIUM_OPTIONS, GROUP_OPTIONS,
} from '../constants/formFields'

export default function SchoolInfo() {
  const { formData, updateField } = useForm()
  const { t } = useTranslation()

  return (
    <Section title={t('secSchool')}>
      <QuestionBlock>
        <TextInput
          label={t('school10')}
          name="school10Name"
          value={formData.school10Name}
          onChange={updateField}
          className="full"
        />
        <RadioGroup
          label={t('schoolType10')}
          name="school10Type"
          options={SCHOOL_TYPE_10}
          value={formData.school10Type}
          onChange={updateField}
        />
        <div style={{ marginTop: '1rem' }}>
          <TextInput
            label={t('school12')}
            name="school12Name"
            value={formData.school12Name}
            onChange={updateField}
            className="full"
          />
          <RadioGroup
            label={t('schoolType12')}
            name="school12Type"
            options={SCHOOL_TYPE_12}
            value={formData.school12Type}
            onChange={updateField}
          />
        </div>
      </QuestionBlock>

      <QuestionBlock>
        <div className="field-row">
          <RadioGroup
            label={t('medium10')}
            name="medium10"
            options={MEDIUM_OPTIONS}
            value={formData.medium10}
            onChange={updateField}
            className="half"
          />
          <RadioGroup
            label={t('medium12')}
            name="medium12"
            options={MEDIUM_OPTIONS}
            value={formData.medium12}
            onChange={updateField}
            className="half"
          />
        </div>
      </QuestionBlock>

      <QuestionBlock>
        <RadioGroup
          label={t('group12')}
          name="group12"
          options={GROUP_OPTIONS}
          value={formData.group12}
          onChange={updateField}
        />
        <div className="field-row" style={{ marginTop: '0.75rem' }}>
          <TextInput
            label={t('vocSpec')}
            name="vocationalSpec"
            value={formData.vocationalSpec}
            onChange={updateField}
          />
          <TextInput
            label={t('examNo')}
            name="examNumber12"
            value={formData.examNumber12}
            onChange={updateField}
            className="third"
          />
        </div>
      </QuestionBlock>

      <QuestionBlock>
        <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.75rem' }}>
          {t('publicMarks')}
        </p>
        <div className="field-row">
          <TextInput
            label={t('marks10')}
            name="marks10"
            type="number"
            value={formData.marks10}
            onChange={updateField}
            className="third"
            min={0} max={500}
            placeholder="e.g. 485"
          />
          <TextInput
            label={t('marks11')}
            name="marks11"
            type="number"
            value={formData.marks11}
            onChange={updateField}
            className="third"
            min={0} max={600}
          />
          <TextInput
            label={t('marks12')}
            name="marks12"
            type="number"
            value={formData.marks12}
            onChange={updateField}
            className="third"
            min={0} max={600}
          />
        </div>
      </QuestionBlock>
    </Section>
  )
}
