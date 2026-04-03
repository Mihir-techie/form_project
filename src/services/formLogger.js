/**
 * Flattens nested form data into a key-value map and logs to console.
 * Arrays (like familyMembers) are expanded with indexed keys.
 */
export function logFormData(formData) {
  const flat = {}

  for (const [key, value] of Object.entries(formData)) {
    if (Array.isArray(value)) {
      if (key === 'familyMembers') {
        value.forEach((member, i) => {
          for (const [mk, mv] of Object.entries(member)) {
            flat[`familyMember_${i + 1}_${mk}`] = mv
          }
        })
      } else if (key === 'otherOrganizations') {
        value.forEach((org, i) => {
          flat[`otherOrganization_${i + 1}`] = org
        })
      } else {
        flat[key] = value.join(', ')
      }
    } else {
      flat[key] = value
    }
  }

  console.log('═══════════════════════════════════════════')
  console.log('  AGARAM SCHOLARSHIP FORM — SUBMITTED DATA')
  console.log('═══════════════════════════════════════════')
  console.table(flat)
  console.log('Raw JSON:', JSON.stringify(flat, null, 2))
  return flat
}
