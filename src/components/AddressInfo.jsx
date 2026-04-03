import { useForm } from '../context/FormContext'
import { useTranslation } from '../context/useTranslation'
import Section from './ui/Section'
import TextInput from './ui/TextInput'
import QuestionBlock from './ui/QuestionBlock'

export default function AddressInfo() {
  const { formData, updateField } = useForm()
  const { t } = useTranslation()

  return (
    <Section title={t('secAddress')}>
      <QuestionBlock>
        <div className="field-row">
          <TextInput
            label={t('doorNo')}
            name="doorNumber"
            value={formData.doorNumber}
            onChange={updateField}
            className="third"
          />
          <TextInput
            label={t('fullAddress')}
            name="address"
            value={formData.address}
            onChange={updateField}
          />
        </div>
        <div className="field-row">
          <TextInput
            label={t('taluk')}
            name="taluk"
            value={formData.taluk}
            onChange={updateField}
            className="third"
          />
          <TextInput
            label={t('district')}
            name="district"
            value={formData.district}
            onChange={updateField}
            className="third"
          />
          <TextInput
            label={t('pincode')}
            name="pincode"
            type="text"
            value={formData.pincode}
            onChange={updateField}
            className="third"
            maxLength={6}
            pattern="[0-9]{6}"
            placeholder="600017"
          />
        </div>
        <div className="field-row">
          <TextInput
            label={t('phone1')}
            name="phone1"
            type="tel"
            value={formData.phone1}
            onChange={updateField}
            className="half"
            maxLength={10}
            placeholder="9876543210"
          />
          <TextInput
            label={t('phone2')}
            name="phone2"
            type="tel"
            value={formData.phone2}
            onChange={updateField}
            className="half"
            maxLength={10}
          />
        </div>
      </QuestionBlock>

      <QuestionBlock>
        <div className="field-row">
          <TextInput
            label={t('nearestCity')}
            name="nearestCity"
            value={formData.nearestCity}
            onChange={updateField}
          />
          <TextInput
            label={t('distance')}
            name="distance"
            value={formData.distance}
            onChange={updateField}
            className="third"
            placeholder="e.g. 15 km"
          />
        </div>
      </QuestionBlock>
    </Section>
  )
}
