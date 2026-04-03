import { useState } from 'react'
import { FormProvider, useForm } from './context/FormContext'
import { LanguageProvider } from './context/LanguageContext'
import { useTranslation } from './context/useTranslation'
import FormHeader from './components/FormHeader'
import PersonalInfo from './components/PersonalInfo'
import AddressInfo from './components/AddressInfo'
import FatherInfo from './components/FatherInfo'
import MotherInfo from './components/MotherInfo'
import GuardianCaste from './components/GuardianCaste'
import SchoolInfo from './components/SchoolInfo'
import Extracurricular from './components/Extracurricular'
import FamilyMembers from './components/FamilyMembers'
import HouseholdInfo from './components/HouseholdInfo'
import AdditionalInfo from './components/AdditionalInfo'
import Declaration from './components/Declaration'
import LanguageSwitcher from './components/ui/LanguageSwitcher'

/** Fields that are arrays and must be JSON-stringified */
const ARRAY_FIELDS = [
  'extracurriculars',
  'familyMembers',
  'otherOrganizations',
  'covidImpactTypes',
]

/** Fields that are File objects and must be appended directly */
const FILE_FIELDS = [
  'docFamilyLetter',
  'docMarkSheets',
  'docCasteCertificate',
  'docFamilyCard',
  'docDisabilityCertificate',
]

function ScholarshipForm() {
  const { formData } = useForm()
  const { t } = useTranslation()
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const fd = new FormData()

      for (const [key, value] of Object.entries(formData)) {
        if (FILE_FIELDS.includes(key)) {
          if (value instanceof File) {
            fd.append(key, value)
          }
        } else if (ARRAY_FIELDS.includes(key)) {
          fd.append(key, JSON.stringify(Array.isArray(value) ? value : []))
        } else {
          fd.append(key, value === null || value === undefined ? '' : String(value))
        }
      }

      const response = await fetch('./php/submit.php', {
        method: 'POST',
        body: fd,
      })

      const json = await response.json()

      if (json.success) {
        alert(`Application submitted successfully! Your Application ID is: ${json.id}`)
      } else {
        alert(`Submission failed: ${json.error || 'Unknown error'}`)
      }
    } catch (err) {
      alert(`Submission error: ${err.message}`)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <FormHeader />
        <PersonalInfo />
        <AddressInfo />
        <FatherInfo />
        <MotherInfo />
        <GuardianCaste />
        <SchoolInfo />
        <Extracurricular />
        <FamilyMembers />
        <HouseholdInfo />
        <AdditionalInfo />
        <Declaration />

        <button type="submit" className="submit-btn" disabled={submitting}>
          {submitting ? 'Submitting…' : t('submit')}
        </button>

        <p style={{
          textAlign: 'center', marginTop: '1rem',
          fontSize: '0.8rem', color: 'var(--color-text-light)',
          paddingBottom: '5rem',
        }}>
          {t('footer')}
        </p>
      </form>

      <LanguageSwitcher />
    </div>
  )
}

export default function App() {
  return (
    <LanguageProvider>
      <FormProvider>
        <ScholarshipForm />
      </FormProvider>
    </LanguageProvider>
  )
}
