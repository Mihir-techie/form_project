<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/Database.php';
require_once __DIR__ . '/AdminAuth.php';
require_once __DIR__ . '/SubmissionRepo.php';
require_once __DIR__ . '/admin_helpers.php';

$auth = new AdminAuth(); $auth->requireLogin();
$repo = new SubmissionRepo();
$id   = (int)($_GET['id'] ?? 0);
$row  = $repo->find($id);
if (!$row) { http_response_code(404); echo '<p>Submission not found.</p>'; exit; }

$data  = json_decode($row['data']  ?? '{}', true) ?? [];
$files = json_decode($row['files'] ?? '{}', true) ?? [];
$d = $data;

function f(string $l, string $v): string {
    return '<div class="fld"><span class="flabel">'.htmlspecialchars($l).'</span><span class="fval">'.$v.'</span></div>';
}
function sh(string $t): string {
    return '<h3 class="sec-head">'.htmlspecialchars($t).'</h3>';
}
?>
<!DOCTYPE html><html lang="ta"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Application #<?=$id?> — Agaram Foundation</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+Tamil:wght@400;600;700&family=Noto+Sans:wght@400;600;700&display=swap" rel="stylesheet">
<style><?=pdfCss()?></style></head><body>

<div class="no-print">
  <a class="btn-back-link" href="admin_view.php?id=<?=$id?>">← Back</a>
  <button class="btn-print" onclick="window.print()">Print / Save as PDF</button>
</div>

<div class="page">
<div class="doc-header">
  <div class="org-name">Agaram Foundation</div>
  <div class="org-addr">Scholarship Application Form</div>
  <div class="app-id">Application No.: AGF-<?=str_pad($id,5,'0',STR_PAD_LEFT)?></div>
</div>

<?=sh('Personal Information')?>
<div class="grid">
<?=f('Student Name',val($d,'studentName')).f('EMIS No',val($d,'emisNumber')).f('Date of Birth',val($d,'dateOfBirth')).f('Gender',val($d,'gender')).f('Disabled',val($d,'isDisabled')).f('Disability Details',val($d,'disabilityDetails'))?>
</div>

<?=sh('Address')?>
<div class="grid">
<?=f('Door No',val($d,'doorNumber')).f('Address',val($d,'address')).f('Taluk',val($d,'taluk')).f('District',val($d,'district')).f('Pincode',val($d,'pincode')).f('Phone 1',val($d,'phone1')).f('Phone 2',val($d,'phone2')).f('Nearest City',val($d,'nearestCity')).f('Distance',val($d,'distance'))?>
</div>

<?=sh("Father's Information")?>
<div class="grid">
<?=f('Name',val($d,'fatherName')).f('Age',val($d,'fatherAge')).f('Education',val($d,'fatherEducation')).f('Alive',val($d,'isFatherAlive')).f('In Contact',val($d,'isFatherInContact')).f('Occupation',val($d,'fatherOccupation')).f('Daily Wage',val($d,'fatherDailyWage')).f('Monthly Income',val($d,'fatherMonthlyIncome'))?>
</div>

<?=sh("Mother's Information")?>
<div class="grid">
<?=f('Name',val($d,'motherName')).f('Age',val($d,'motherAge')).f('Education',val($d,'motherEducation')).f('Alive',val($d,'isMotherAlive')).f('In Contact',val($d,'isMotherInContact')).f('Occupation',val($d,'motherOccupation')).f('Daily Wage',val($d,'motherDailyWage')).f('Monthly Income',val($d,'motherMonthlyIncome'))?>
</div>

<?=sh('Guardian & Caste')?>
<div class="grid">
<?=f('Guardian Name',val($d,'guardianName')).f('Relationship',val($d,'guardianRelationship')).f('Caste',val($d,'caste'))?>
</div>

<?=sh('School / Education')?>
<div class="grid">
<?=f('10th School',val($d,'school10Name')).f('10th Type',val($d,'school10Type')).f('12th School',val($d,'school12Name')).f('12th Type',val($d,'school12Type')).f('Medium 10',val($d,'medium10')).f('Medium 12',val($d,'medium12')).f('Group 12',val($d,'group12')).f('Exam No 12',val($d,'examNumber12')).f('Marks 10',val($d,'marks10')).f('Marks 11',val($d,'marks11')).f('Marks 12',val($d,'marks12'))?>
</div>

<?=sh('Extracurricular & Goals')?>
<div class="grid">
<?php $extras = jsonArr($d,'extracurriculars'); $extStr = $extras ? htmlspecialchars(implode(', ',$extras)) : '—'; ?>
<?=f('Has Extracurricular',val($d,'hasExtracurricular')).f('Extracurriculars',$extStr).f('First Gen Graduate',val($d,'isFirstGenGraduate')).f('Desired Course 1',val($d,'desiredCourse1')).f('Desired Course 2',val($d,'desiredCourse2')).f('Willing for Hostel',val($d,'willingForHostel')).f('Knows Agaram Beneficiary',val($d,'knowsAgaramBeneficiary')).f('Beneficiary Name',val($d,'beneficiaryName')).f('Beneficiary College',val($d,'beneficiaryCollege'))?>
</div>

<?=sh('Family Members')?>
<?php $members = jsonArr($d,'familyMembers'); if($members):?>
<table class="fam"><thead><tr><th>#</th><th>Name</th><th>Age</th><th>Relationship</th><th>Education</th><th>School/Occupation</th><th>Fees/Income</th></tr></thead><tbody>
<?php foreach($members as $i=>$m):?><tr><td><?=$i+1?></td><td><?=htmlspecialchars((string)($m['name']??''))?></td><td><?=htmlspecialchars((string)($m['age']??''))?></td><td><?=htmlspecialchars((string)($m['relationship']??''))?></td><td><?=htmlspecialchars((string)($m['education']??''))?></td><td><?=htmlspecialchars((string)($m['schoolOrOccupation']??''))?></td><td><?=htmlspecialchars((string)($m['feesOrIncome']??''))?></td></tr><?php endforeach;?>
</tbody></table>
<?php else:?><p style="font-size:.82rem;padding:.3rem .5rem">—</p><?php endif;?>
<div class="grid">
<?=f('Siblings in Private',val($d,'siblingsInPrivate')).f('Fee Payment Method',val($d,'feePaymentMethod'))?>
</div>

<?=sh('Household')?>
<div class="grid">
<?=f('Residence Type',val($d,'residenceType')).f('Monthly Rent',val($d,'monthlyRent')).f('House Type',val($d,'houseType')).f('Has Toilet',val($d,'hasToilet')).f('Has Water',val($d,'hasWater')).f('Has Electricity',val($d,'hasElectricity'))?>
</div>

<?=sh('Additional Information')?>
<div class="grid">
<?php $cvTypes = jsonArr($d,'covidImpactTypes'); $cvStr = $cvTypes ? htmlspecialchars(implode(', ',$cvTypes)) : '—'; $orgs = array_filter(jsonArr($d,'otherOrganizations')); $orgStr = $orgs ? htmlspecialchars(implode(', ',$orgs)) : '—'; ?>
<?=f('COVID Impact',val($d,'covidImpact')).f('COVID Impact Types',$cvStr).f('Applied Other Scholarships',val($d,'appliedOtherScholarships')).f('Other Organizations',$orgStr)?>
</div>

<?=sh('Declaration')?>
<div class="grid">
<?=f('Date',val($d,'declarationDate')).f('Place',val($d,'declarationPlace')).f('Student Name',val($d,'declarationStudentName'))?>
</div>

<?=sh('Uploaded Documents')?>
<div style="padding:.4rem .5rem">
<?php if(empty($files)):?><p style="font-size:.82rem">No files uploaded.</p>
<?php else: foreach($files as $field=>$fname):?><p style="font-size:.82rem;padding:.15rem 0"><strong><?=htmlspecialchars($field)?>:</strong> <?=htmlspecialchars($fname)?></p><?php endforeach; endif;?>
</div>

<div class="doc-footer">
  Submitted on: <?=htmlspecialchars($row['created_at'])?> &nbsp;|&nbsp;
  Status: <strong><?=htmlspecialchars($row['status'])?></strong> &nbsp;|&nbsp;
  Agaram Foundation Scholarship Program
</div>
</div>
</body></html>
