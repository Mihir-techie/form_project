export const GENDER_OPTIONS = [
  { value: 'male',        ta: 'ஆண்',           en: 'Male' },
  { value: 'female',      ta: 'பெண்',           en: 'Female' },
  { value: 'transgender', ta: 'திருநங்கை',       en: 'Transgender' },
  { value: 'thirunambi',  ta: 'திருநம்பி',       en: 'Thirunambi' },
]

export const YES_NO = [
  { value: 'yes', ta: 'ஆம்',     en: 'Yes' },
  { value: 'no',  ta: 'இல்லை',  en: 'No' },
]

export const OCCUPATION_OPTIONS = [
  { value: 'agriculture',  ta: 'விவசாயம்',      en: 'Agriculture' },
  { value: 'agriLabor',    ta: 'விவசாய கூலி',   en: 'Agricultural Labour' },
  { value: 'construction', ta: 'கட்டிட வேலை',   en: 'Construction' },
  { value: '100days',      ta: '100 நாள் வேலை', en: '100 Days Work' },
  { value: 'weaving',      ta: 'நெசவு கூலி',    en: 'Weaving Labour' },
  { value: 'other',        ta: 'மற்றவை',        en: 'Other' },
]

export const CASTE_OPTIONS = [
  { value: 'ST',               ta: 'ST',                 en: 'ST' },
  { value: 'SC-A',             ta: 'SC-A',               en: 'SC-A' },
  { value: 'SC',               ta: 'SC',                 en: 'SC' },
  { value: 'DNC',              ta: 'DNC',                en: 'DNC' },
  { value: 'MBC',              ta: 'MBC',                en: 'MBC' },
  { value: 'BC-M',             ta: 'BC-M',               en: 'BC-M' },
  { value: 'BC',               ta: 'BC',                 en: 'BC' },
  { value: 'OC',               ta: 'OC',                 en: 'OC' },
  { value: 'srilankanRefugee', ta: 'இலங்கை அகதி',       en: 'Srilankan Refugee' },
]

export const SCHOOL_TYPE_10 = [
  { value: 'government', ta: 'அரசுப் பள்ளி',              en: 'Government School' },
  { value: 'govtAided',  ta: 'அரசு உதவி பெறும் பள்ளி',   en: 'Government Aided School' },
]

export const SCHOOL_TYPE_12 = [
  { value: 'government',     ta: 'அரசுப் பள்ளி',            en: 'Government School' },
  { value: 'govtAided',      ta: 'அரசு உதவி பெறும் பள்ளி', en: 'Government Aided School' },
  { value: 'matriculation',  ta: 'மெட்ரிகுலேஷன் பள்ளி',    en: 'Matriculation School' },
  { value: 'private',        ta: 'தனியார் பள்ளி',           en: 'Private School' },
]

export const MEDIUM_OPTIONS = [
  { value: 'tamil',   ta: 'தமிழ்',    en: 'Tamil' },
  { value: 'english', ta: 'ஆங்கிலம்', en: 'English' },
]

export const GROUP_OPTIONS = [
  { value: 'bioMaths',    ta: 'Bio-Maths',    en: 'Bio-Maths' },
  { value: 'csMaths',     ta: 'CS-Maths',     en: 'CS-Maths' },
  { value: 'pureScience', ta: 'Pure Science', en: 'Pure Science' },
  { value: 'commerce',    ta: 'Commerce',     en: 'Commerce' },
  { value: 'csCommerce',  ta: 'CS-Commerce',  en: 'CS-Commerce' },
  { value: 'bioCS',       ta: 'Bio-CS',       en: 'Bio-CS' },
]

export const EXTRACURRICULAR_OPTIONS = [
  { value: 'ncc',    ta: 'NCC',                       en: 'NCC' },
  { value: 'nss',    ta: 'NSS',                       en: 'NSS' },
  { value: 'sports', ta: 'விளையாட்டு',                en: 'Sports' },
  { value: 'speech', ta: 'பேச்சுப்போட்டி',            en: 'Speech Competition' },
  { value: 'essay',  ta: 'கட்டுரைப்போட்டி',          en: 'Essay Competition' },
]

export const HOUSE_TYPE_OPTIONS = [
  { value: 'hut',        ta: 'குடிசை',                en: 'Hut' },
  { value: 'tiles',      ta: 'ஓடு',                  en: 'Tiled Roof' },
  { value: 'asbestos',   ta: 'ஆஸ்பெஸ்டாஸ் / தகரம்', en: 'Asbestos / Sheet' },
  { value: 'concrete',   ta: 'காங்கிரீட்',            en: 'Concrete' },
  { value: 'govtScheme', ta: 'அரசாங்க திட்டம்',      en: 'Government Scheme' },
]

export const BENEFICIARY_RELATION = [
  { value: 'relative', ta: 'உறவினர்',               en: 'Relative' },
  { value: 'friend',   ta: 'நண்பர்',                en: 'Friend' },
  { value: 'alumni',   ta: 'பள்ளியின் முன்னாள் மாணவர்', en: 'School Alumni' },
]

export const RESIDENCE_OPTIONS = [
  { value: 'own',  ta: 'சொந்தம்', en: 'Own' },
  { value: 'rent', ta: 'வாடகை',  en: 'Rent' },
]

export const FEE_PAYMENT_OPTIONS = [
  { value: 'parents',   ta: 'பெற்றோர்',    en: 'Parents' },
  { value: 'bankLoan',  ta: 'வங்கி கடன்', en: 'Bank Loan' },
  { value: 'otherLoan', ta: 'மற்ற கடன்',  en: 'Other Loan' },
]

export const COVID_IMPACT_OPTIONS = [
  { value: 'economic', ta: 'பொருளாதார பாதிப்பு',      en: 'Economic Impact' },
  { value: 'death',    ta: 'குடும்பத்தில் உயிரிழப்பு', en: 'Family Death' },
  { value: 'other',    ta: 'மற்றவை',                  en: 'Other' },
]

export const EMPTY_FAMILY_MEMBER = {
  name: '', age: '', relationship: '',
  education: '', schoolOrOccupation: '', feesOrIncome: '',
}
