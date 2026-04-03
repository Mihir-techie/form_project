import { createContext, useContext, useState } from 'react'
import { EMPTY_FAMILY_MEMBER } from '../constants/formFields'

const FormContext = createContext()

const initialState = {
  emisNumber: '',
  studentName: '',
  dateOfBirth: '',
  gender: '',
  isDisabled: '',
  disabilityDetails: '',
  doorNumber: '',
  address: '',
  taluk: '',
  district: '',
  pincode: '',
  phone1: '',
  phone2: '',
  nearestCity: '',
  distance: '',
  fatherName: '',
  fatherAge: '',
  fatherEducation: '',
  isFatherAlive: '',
  isFatherInContact: '',
  fatherOccupation: '',
  fatherOccupationOther: '',
  fatherDailyWage: '',
  fatherMonthlyIncome: '',
  motherName: '',
  motherAge: '',
  motherEducation: '',
  isMotherAlive: '',
  isMotherInContact: '',
  motherOccupation: '',
  motherOccupationOther: '',
  motherDailyWage: '',
  motherMonthlyIncome: '',
  guardianName: '',
  guardianRelationship: '',
  caste: '',
  school10Name: '',
  school10Type: '',
  school12Name: '',
  school12Type: '',
  medium10: '',
  medium12: '',
  group12: '',
  vocationalSpec: '',
  examNumber12: '',
  marks10: '',
  marks11: '',
  marks12: '',
  hasExtracurricular: '',
  extracurriculars: [],
  extracurricularOther: '',
  isFirstGenGraduate: '',
  desiredCourse1: '',
  desiredCourse2: '',
  willingForHostel: '',
  hostelReason: '',
  knowsAgaramBeneficiary: '',
  beneficiaryRelation: '',
  beneficiaryName: '',
  beneficiaryCollege: '',
  familyMembers: [{ ...EMPTY_FAMILY_MEMBER }],
  siblingsInPrivate: '',
  siblingsFeeConcession: '',
  feePaymentMethod: '',
  residenceType: '',
  monthlyRent: '',
  houseType: '',
  hasToilet: '',
  hasWater: '',
  hasElectricity: '',
  covidImpact: '',
  covidImpactTypes: [],
  covidImpactOther: '',
  appliedOtherScholarships: '',
  otherOrganizations: ['', '', ''],
  declarationDate: '',
  declarationPlace: '',
  declarationStudentName: '',
  docFamilyLetter: null,
  docMarkSheets: null,
  docCasteCertificate: null,
  docFamilyCard: null,
  docDisabilityCertificate: null,
}

export function FormProvider({ children }) {
  const [formData, setFormData] = useState(initialState)

  const updateField = (e) => {
    const { name, value, files, type } = e.target
    const newValue = type === 'file' ? (files[0] || null) : value
    setFormData((prev) => ({ ...prev, [name]: newValue }))
  }

  const updateNested = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <FormContext.Provider value={{ formData, updateField, updateNested }}>
      {children}
    </FormContext.Provider>
  )
}

export function useForm() {
  const ctx = useContext(FormContext)
  if (!ctx) throw new Error('useForm must be used within FormProvider')
  return ctx
}
