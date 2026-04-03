const translations = {
  // ── Header ────────────────────────────────────────────────
  appTitle:           { ta: 'அகரம் விதைத்திட்டம்',              en: 'Agaram Scholarship Scheme' },
  appSubtitle:        { ta: 'விண்ணப்பப் படிவம்',                en: 'Application Form' },
  orgName:            { ta: 'அகரம் ஃபவுண்டேஷன்',               en: 'Agaram Foundation' },
  orgAddress:         { ta: '15(4), அருளாம்பாள் தெரு,\nதியாகராய நகர், சென்னை - 600 017\nPh: 044 - 4350 6361, 9841891000',
                        en: '15(4), Arulambaal Street,\nThyagaraya Nagar, Chennai - 600 017\nPh: 044 - 4350 6361, 9841891000' },
  officeUseOnly:      { ta: 'அலுவலக உபயோகத்திற்கு மட்டும்',     en: 'For Office Use Only' },
  applicationNo:      { ta: 'விண்ணப்ப எண்',                     en: 'Application No.' },
  emisNo:             { ta: 'EMIS No.',                          en: 'EMIS No.' },
  emisPlaceholder:    { ta: 'EMIS எண் உள்ளிடவும்',              en: 'Enter EMIS Number' },

  // ── Section Titles ─────────────────────────────────────────
  secPersonal:        { ta: 'மாணவர் அடிப்படை விவரம்',           en: 'Personal Information' },
  secAddress:         { ta: 'முகவரி மற்றும் தொடர்பு',           en: 'Address & Contact' },
  secFather:          { ta: 'தந்தை விவரம்',                     en: "Father's Details" },
  secMother:          { ta: 'தாய் விவரம்',                      en: "Mother's Details" },
  secGuardian:        { ta: 'காப்பாளர் / சாதி',                  en: 'Guardian & Caste' },
  secSchool:          { ta: 'பள்ளி மற்றும் கல்வி விவரம்',        en: 'School & Education' },
  secExtra:           { ta: 'கல்வி இணை மற்றும் பிற விவரம்',      en: 'Extracurricular & Others' },
  secFamily:          { ta: 'குடும்ப உறுப்பினர்கள் விவரம்',      en: 'Family Members' },
  secHousehold:       { ta: 'குடியிருப்பு விவரம்',               en: 'Household Details' },
  secAdditional:      { ta: 'கூடுதல் விவரம்',                   en: 'Additional Information' },
  secDeclaration:     { ta: 'உறுதிமொழி மற்றும் கையொப்பம்',       en: 'Declaration & Signatures' },

  // ── Personal Info ──────────────────────────────────────────
  studentName:        { ta: '1. மாணவர் பெயர்',                  en: '1. Student Name' },
  dateOfBirth:        { ta: 'பிறந்த தேதி',                      en: 'Date of Birth' },
  gender:             { ta: '2. பாலினம்',                       en: '2. Gender' },
  differentlyAbled:   { ta: '3. மாற்றுத்திறனாளி',               en: '3. Differently Abled' },
  disabilityDetails:  { ta: 'எவ்வகை தன்மை மற்றும் சதவீதம்',     en: 'Type & Percentage of Disability' },

  // ── Address ────────────────────────────────────────────────
  doorNo:             { ta: '4. முகவரி: கதவு எண்',              en: '4. Address: Door No.' },
  fullAddress:        { ta: 'முழு முகவரி',                      en: 'Full Address' },
  taluk:              { ta: 'தாலுகா',                           en: 'Taluk' },
  district:           { ta: 'மாவட்டம்',                         en: 'District' },
  pincode:            { ta: 'அஞ்சலக எண்',                      en: 'Pincode' },
  phone1:             { ta: 'தொலைபேசி எண் 1',                  en: 'Phone 1' },
  phone2:             { ta: 'தொலைபேசி எண் 2',                  en: 'Phone 2' },
  nearestCity:        { ta: '5. அருகில் இருக்கும் நகரம்',        en: '5. Nearest City' },
  distance:           { ta: 'தொலைவு',                           en: 'Distance' },

  // ── Father ─────────────────────────────────────────────────
  fatherName:         { ta: '6. தந்தை பெயர்',                   en: "6. Father's Name" },
  fatherAlive:        { ta: 'தந்தை உள்ளாரா?',                  en: 'Is father alive?' },
  fatherContact:      { ta: 'குடும்பத்துடன் தொடர்பில் உள்ளாரா?', en: 'In contact with family?' },

  // ── Mother ─────────────────────────────────────────────────
  motherName:         { ta: '7. தாய் பெயர்',                    en: "7. Mother's Name" },
  motherAlive:        { ta: 'தாய் உள்ளாரா?',                   en: 'Is mother alive?' },
  motherContact:      { ta: 'குடும்பத்துடன் தொடர்பில் உள்ளாரா?', en: 'In contact with family?' },

  // ── Shared parent fields ────────────────────────────────────
  age:                { ta: 'வயது',                             en: 'Age' },
  education:          { ta: 'கல்வி',                            en: 'Education' },
  occupation:         { ta: 'வேலை',                             en: 'Occupation' },
  specifyOther:       { ta: 'மற்றவை (குறிப்பிடவும்)',           en: 'Specify (Other)' },
  dailyWage:          { ta: 'ஒரு நாள் கூலி ரூ.',               en: 'Daily Wage ₹' },
  monthlyIncome:      { ta: 'மாத வருவாய் ரூ.',                  en: 'Monthly Income ₹' },

  // ── Guardian & Caste ───────────────────────────────────────
  guardianNote:       { ta: '8. தந்தை, தாய் இல்லை எனில் காப்பாளர் விவரம்',
                        en: '8. Guardian details (if parents are not available)' },
  guardianName:       { ta: 'காப்பாளர் பெயர்',                  en: 'Guardian Name' },
  relationship:       { ta: 'உறவு முறை',                        en: 'Relationship' },
  caste:              { ta: '9. சாதி',                          en: '9. Caste / Community' },

  // ── School ─────────────────────────────────────────────────
  school10:           { ta: '10. பள்ளியின் பெயர் மற்றும் ஊர் — 10th STD', en: '10. School Name & Place — 10th STD' },
  schoolType10:       { ta: 'பள்ளி வகை (10th)',                 en: 'School Type (10th)' },
  school12:           { ta: '12th STD — பள்ளியின் பெயர் மற்றும் ஊர்',     en: '12th STD — School Name & Place' },
  schoolType12:       { ta: 'பள்ளி வகை (12th)',                 en: 'School Type (12th)' },
  medium10:           { ta: '11. பயிற்று மொழி 10th',            en: '11. Medium of Instruction (10th)' },
  medium12:           { ta: 'பயிற்று மொழி 12th',               en: 'Medium of Instruction (12th)' },
  group12:            { ta: '12. 12th Group',                   en: '12. 12th Group' },
  vocSpec:            { ta: 'தொழிற்கல்வி பிரிவு',              en: 'Vocational Specification' },
  examNo:             { ta: '12th தேர்வு எண்',                  en: '12th Exam No.' },
  publicMarks:        { ta: '13. பொதுத்தேர்வில் பெற்ற மதிப்பெண்', en: '13. Public Exam Marks' },
  marks10:            { ta: '10th மதிப்பெண்',                   en: '10th Marks' },
  marks11:            { ta: '11th மதிப்பெண்',                   en: '11th Marks' },
  marks12:            { ta: '12th மதிப்பெண்',                   en: '12th Marks' },

  // ── Extracurricular ────────────────────────────────────────
  hasExtra:           { ta: '14. கல்வி இணைச் செயல்பாடுகளில் ஈடுபாடு உள்ளதா?', en: '14. Involved in extracurricular activities?' },
  specifyExtra:       { ta: 'குறிப்பிடுக',                     en: 'Specify' },
  othersLabel:        { ta: 'மற்றவை',                           en: 'Others' },
  firstGen:           { ta: '15. குடும்பத்தில் முதல் தலைமுறை பட்டதாரியா?', en: '15. First generation graduate in the family?' },
  desiredCourse:      { ta: '16. படிக்க விரும்பும் படிப்பு',    en: '16. Desired Course' },
  choice1:            { ta: 'விருப்பம் 1',                     en: 'Choice 1' },
  choice2:            { ta: 'விருப்பம் 2',                     en: 'Choice 2' },
  hostel:             { ta: '17. வெளியூரில் விடுதியில் தங்கிப் படிக்க விருப்பமா?', en: '17. Willing to stay in hostel outside hometown?' },
  reason:             { ta: 'காரணம்',                           en: 'Reason' },
  knowsBeneficiary:   { ta: '18. அகரம் விதைத்திட்டத்தில் பயன் பெற்றவர் தெரியுமா?', en: '18. Do you know any Agaram beneficiary?' },
  relation:           { ta: 'உறவு',                             en: 'Relation' },
  benefName:          { ta: 'பெயர்',                            en: 'Name' },
  college:            { ta: 'கல்லூரி',                         en: 'College' },

  // ── Family Members ─────────────────────────────────────────
  familyNote:         { ta: 'பெற்றோர் தவிர்த்து மற்ற குடும்ப உறுப்பினர்கள்', en: 'Other family members, excluding parents' },
  colName:            { ta: 'பெயர்',                            en: 'Name' },
  colAge:             { ta: 'வயது',                             en: 'Age' },
  colRelation:        { ta: 'உறவு முறை',                        en: 'Relationship' },
  colEducation:       { ta: 'படிப்பு',                          en: 'Education' },
  colSchoolOcc:       { ta: 'பள்ளி/தொழில்',                    en: 'School/Occupation' },
  colFeesIncome:      { ta: 'கட்டணம்/வருமானம்',                en: 'Fees/Income' },
  addMember:          { ta: '+ உறுப்பினர் சேர்க்க',            en: '+ Add Member' },
  siblingsPrivate:    { ta: 'உடன் பிறந்தவர்கள் தனியார் நிறுவனங்களில் படிக்கிறார்களா?', en: 'Are siblings studying in private institutions?' },
  feeConcession:      { ta: 'கட்டண சலுகையுடன் படிக்கிறார்களா?', en: 'With fee concession?' },
  feePayment:         { ta: 'கட்டணங்களை எப்படி செலுத்துகிறீர்கள்?', en: 'How are fees paid?' },

  // ── Household ──────────────────────────────────────────────
  residence:          { ta: '20. குடியிருக்கும் வீடு',          en: '20. Residence' },
  monthlyRent:        { ta: 'மாத வாடகை ரூ.',                   en: 'Monthly Rent ₹' },
  houseType:          { ta: '21. வீடு வகை',                    en: '21. House Type' },
  toilet:             { ta: '22. கழிவறை வசதி',                 en: '22. Toilet facility?' },
  water:              { ta: '23. தண்ணீர் வசதி',                en: '23. Water facility?' },
  electricity:        { ta: '24. மின்சார வசதி',                 en: '24. Electricity facility?' },

  // ── Additional ─────────────────────────────────────────────
  covid:              { ta: '25. உங்கள் குடும்பத்தில் கோவிட்-19 பாதிப்பு ஏற்பட்டுள்ளதா?', en: '25. Has your family been impacted by COVID-19?' },
  impactType:         { ta: 'பாதிப்பு வகை',                    en: 'Impact type' },
  otherScholarships:  { ta: '26. வேறு அமைப்புகளுக்கு விண்ணப்பித்துள்ளீர்களா?', en: '26. Have you applied to other scholarship organisations?' },
  orgNames:           { ta: 'அமைப்புகள் பெயர்',                en: 'Organisation Names' },
  org:                { ta: 'அமைப்பு',                          en: 'Organisation' },

  // ── Declaration ────────────────────────────────────────────
  declDate:           { ta: 'தேதி',                             en: 'Date' },
  declPlace:          { ta: 'இடம்',                             en: 'Place' },
  declStudentName:    { ta: 'மாணவர் பெயர்',                    en: 'Student Name' },
  docsHeading:        { ta: 'விண்ணப்பத்துடன் இணைக்க வேண்டியவை', en: 'Documents to Attach' },
  doc1:               { ta: 'குடும்பச் சூழல் பற்றி கைப்பட எழுதிய கடிதம்', en: 'Handwritten family background letter' },
  doc2:               { ta: 'X, XI, XII மதிப்பெண் சான்றிதழ் நகல்',         en: 'Mark sheets copy (X, XI, XII)' },
  doc3:               { ta: 'சாதி சான்றிதழ் நகல்',              en: 'Caste certificate copy' },
  doc4:               { ta: 'குடும்ப அட்டை நகல்',               en: 'Family card / Ration card copy' },
  doc5:               { ta: 'மாற்றுத்திறனாளி சான்று நகல்',      en: 'Disability certificate (if applicable)' },

  // ── Submit / Footer ────────────────────────────────────────
  submit:             { ta: 'சமர்ப்பிக்கவும்',                  en: 'Submit Application' },
  footer:             { ta: 'அகரம் ஃபவுண்டேஷன் — உதவித்தொகை விண்ணப்பப் படிவம்', en: 'Agaram Foundation — Scholarship Application Form' },
}

export default translations
