import { useForm } from '../context/FormContext'
import { useTranslation } from '../context/useTranslation'
import Section from './ui/Section'
import TextInput from './ui/TextInput'
import RadioGroup from './ui/RadioGroup'
import QuestionBlock from './ui/QuestionBlock'
import { YES_NO, RESIDENCE_OPTIONS, HOUSE_TYPE_OPTIONS } from '../constants/formFields'

export default function HouseholdInfo() {
  const { formData, updateField } = useForm()
  const { t } = useTranslation()

  return (
    <Section title={t('secHousehold')}>
      <QuestionBlock>
        <RadioGroup
          label={t('residence')}
          name="residenceType"
          options={RESIDENCE_OPTIONS}
          value={formData.residenceType}
          onChange={updateField}
        />
        {formData.residenceType === 'rent' && (
          <div className="conditional-block">
            <TextInput
              label={t('monthlyRent')}
              name="monthlyRent"
              type="number"
              value={formData.monthlyRent}
              onChange={updateField}
              className="half"
              min={0}
            />
          </div>
        )}
      </QuestionBlock>

      <QuestionBlock>
        <RadioGroup
          label={t('houseType')}
          name="houseType"
          options={HOUSE_TYPE_OPTIONS}
          value={formData.houseType}
          onChange={updateField}
        />
      </QuestionBlock>

      <QuestionBlock>
        <div className="field-row">
          <RadioGroup
            label={t('toilet')}
            name="hasToilet"
            options={YES_NO}
            value={formData.hasToilet}
            onChange={updateField}
            className="third"
          />
          <RadioGroup
            label={t('water')}
            name="hasWater"
            options={YES_NO}
            value={formData.hasWater}
            onChange={updateField}
            className="third"
          />
          <RadioGroup
            label={t('electricity')}
            name="hasElectricity"
            options={YES_NO}
            value={formData.hasElectricity}
            onChange={updateField}
            className="third"
          />
        </div>
      </QuestionBlock>
    </Section>
  )
}
