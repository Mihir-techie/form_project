import { useForm } from '../context/FormContext'
import { useTranslation } from '../context/useTranslation'
import Section from './ui/Section'
import TextInput from './ui/TextInput'
import RadioGroup from './ui/RadioGroup'
import CheckboxGroup from './ui/CheckboxGroup'
import QuestionBlock from './ui/QuestionBlock'
import {
  YES_NO, EXTRACURRICULAR_OPTIONS, BENEFICIARY_RELATION,
} from '../constants/formFields'

export default function Extracurricular() {
  const { formData, updateField } = useForm()
  const { t } = useTranslation()

  return (
    <Section title={t('secExtra')}>
      <QuestionBlock>
        <RadioGroup
          label={t('hasExtra')}
          name="hasExtracurricular"
          options={YES_NO}
          value={formData.hasExtracurricular}
          onChange={updateField}
        />
        {formData.hasExtracurricular === 'yes' && (
          <div className="conditional-block">
            <CheckboxGroup
              label={t('specifyExtra')}
              name="extracurriculars"
              options={EXTRACURRICULAR_OPTIONS}
              values={formData.extracurriculars}
              onChange={updateField}
            />
            <TextInput
              label={t('othersLabel')}
              name="extracurricularOther"
              value={formData.extracurricularOther}
              onChange={updateField}
            />
          </div>
        )}
      </QuestionBlock>

      <QuestionBlock>
        <RadioGroup
          label={t('firstGen')}
          name="isFirstGenGraduate"
          options={YES_NO}
          value={formData.isFirstGenGraduate}
          onChange={updateField}
        />
      </QuestionBlock>

      <QuestionBlock>
        <p style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.75rem' }}>
          {t('desiredCourse')}
        </p>
        <div className="field-row">
          <TextInput
            label={t('choice1')}
            name="desiredCourse1"
            value={formData.desiredCourse1}
            onChange={updateField}
            className="half"
          />
          <TextInput
            label={t('choice2')}
            name="desiredCourse2"
            value={formData.desiredCourse2}
            onChange={updateField}
            className="half"
          />
        </div>
      </QuestionBlock>

      <QuestionBlock>
        <RadioGroup
          label={t('hostel')}
          name="willingForHostel"
          options={YES_NO}
          value={formData.willingForHostel}
          onChange={updateField}
        />
        {formData.willingForHostel === 'no' && (
          <div className="conditional-block">
            <TextInput
              label={t('reason')}
              name="hostelReason"
              value={formData.hostelReason}
              onChange={updateField}
            />
          </div>
        )}
      </QuestionBlock>

      <QuestionBlock>
        <RadioGroup
          label={t('knowsBeneficiary')}
          name="knowsAgaramBeneficiary"
          options={YES_NO}
          value={formData.knowsAgaramBeneficiary}
          onChange={updateField}
        />
        {formData.knowsAgaramBeneficiary === 'yes' && (
          <div className="conditional-block">
            <RadioGroup
              label={t('relation')}
              name="beneficiaryRelation"
              options={BENEFICIARY_RELATION}
              value={formData.beneficiaryRelation}
              onChange={updateField}
            />
            <div className="field-row">
              <TextInput
                label={t('benefName')}
                name="beneficiaryName"
                value={formData.beneficiaryName}
                onChange={updateField}
                className="half"
              />
              <TextInput
                label={t('college')}
                name="beneficiaryCollege"
                value={formData.beneficiaryCollege}
                onChange={updateField}
                className="half"
              />
            </div>
          </div>
        )}
      </QuestionBlock>
    </Section>
  )
}
