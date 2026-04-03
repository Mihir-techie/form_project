import { useForm } from '../context/FormContext'
import { useTranslation } from '../context/useTranslation'
import Section from './ui/Section'
import TextInput from './ui/TextInput'
import RadioGroup from './ui/RadioGroup'
import CheckboxGroup from './ui/CheckboxGroup'
import QuestionBlock from './ui/QuestionBlock'
import { YES_NO, COVID_IMPACT_OPTIONS } from '../constants/formFields'

export default function AdditionalInfo() {
  const { formData, updateField, updateNested } = useForm()
  const { t } = useTranslation()

  const updateOrg = (index, value) => {
    const updated = [...formData.otherOrganizations]
    updated[index] = value
    updateNested('otherOrganizations', updated)
  }

  return (
    <Section title={t('secAdditional')}>
      <QuestionBlock>
        <RadioGroup
          label={t('covid')}
          name="covidImpact"
          options={YES_NO}
          value={formData.covidImpact}
          onChange={updateField}
        />
        {formData.covidImpact === 'yes' && (
          <div className="conditional-block">
            <CheckboxGroup
              label={t('impactType')}
              name="covidImpactTypes"
              options={COVID_IMPACT_OPTIONS}
              values={formData.covidImpactTypes}
              onChange={updateField}
            />
            {formData.covidImpactTypes.includes('other') && (
              <TextInput
                label={t('othersLabel')}
                name="covidImpactOther"
                value={formData.covidImpactOther}
                onChange={updateField}
              />
            )}
          </div>
        )}
      </QuestionBlock>

      <QuestionBlock>
        <RadioGroup
          label={t('otherScholarships')}
          name="appliedOtherScholarships"
          options={YES_NO}
          value={formData.appliedOtherScholarships}
          onChange={updateField}
        />
        {formData.appliedOtherScholarships === 'yes' && (
          <div className="conditional-block">
            <p style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: '0.5rem' }}>
              {t('orgNames')}
            </p>
            <div className="field-row">
              {formData.otherOrganizations.map((org, i) => (
                <TextInput
                  key={i}
                  label={`${t('org')} ${i + 1}`}
                  name={`org_${i}`}
                  value={org}
                  onChange={(e) => updateOrg(i, e.target.value)}
                  className="third"
                />
              ))}
            </div>
          </div>
        )}
      </QuestionBlock>
    </Section>
  )
}
