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

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['status'])) {
    $allowed = ['pending','reviewed','accepted','rejected'];
    $status  = in_array($_POST['status'], $allowed, true) ? $_POST['status'] : 'pending';
    $repo->updateStatus($id, $status);
    header("Location: admin_view.php?id={$id}&saved=1"); exit;
}

$saved = isset($_GET['saved']);
$d = $data;
$sc = ['pending'=>'#e67e22','reviewed'=>'#2980b9','accepted'=>'#27ae60','rejected'=>'#c0392b'][$row['status']] ?? '#888';
?>
<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Submission #<?=$id?> — Agaram Admin</title><style><?=adminCardCss()?></style></head><body>
<div class="admin-header"><h1>Submission #<?=$id?></h1><div class="nav-btns">
  <a class="btn-nav btn-back" href="admin.php">← Back</a>
  <a class="btn-nav btn-pdf" href="pdf.php?id=<?=$id?>" target="_blank">Print / PDF</a>
</div></div>
<div class="main">
<?php if($saved):?><p class="notice">Status updated successfully.</p><?php endif;?>

<div class="card"><div class="section-head">Status</div><div class="status-form">
  <span class="badge" style="background:<?=$sc?>"><?=htmlspecialchars($row['status'])?></span>
  <form method="POST" style="display:flex;gap:.5rem;align-items:center">
    <select name="status"><?php foreach(['pending','reviewed','accepted','rejected'] as $s):?>
      <option value="<?=$s?>"<?=$row['status']===$s?' selected':''?>><?=ucfirst($s)?></option>
    <?php endforeach;?></select><button class="btn-save" type="submit">Save</button>
  </form>
</div></div>

<div class="card"><div class="section-head">Personal Information</div><div class="field-grid">
<?php foreach([['Student Name','studentName'],['EMIS No','emisNumber'],['Date of Birth','dateOfBirth'],['Gender','gender'],['Disabled','isDisabled'],['Disability Details','disabilityDetails']] as [$l,$k]):?><div class="fld"><label><?=$l?></label><span><?=val($d,$k)?></span></div><?php endforeach;?>
</div></div>

<div class="card"><div class="section-head">Address</div><div class="field-grid">
<?php foreach([['Door No','doorNumber'],['Address','address'],['Taluk','taluk'],['District','district'],['Pincode','pincode'],['Phone 1','phone1'],['Phone 2','phone2'],['Nearest City','nearestCity'],['Distance','distance']] as [$l,$k]):?><div class="fld"><label><?=$l?></label><span><?=val($d,$k)?></span></div><?php endforeach;?>
</div></div>

<div class="card"><div class="section-head">Father's Information</div><div class="field-grid">
<?php foreach([['Name','fatherName'],['Age','fatherAge'],['Education','fatherEducation'],['Alive','isFatherAlive'],['In Contact','isFatherInContact'],['Occupation','fatherOccupation'],['Occ. Other','fatherOccupationOther'],['Daily Wage','fatherDailyWage'],['Monthly Income','fatherMonthlyIncome']] as [$l,$k]):?><div class="fld"><label><?=$l?></label><span><?=val($d,$k)?></span></div><?php endforeach;?>
</div></div>

<div class="card"><div class="section-head">Mother's Information</div><div class="field-grid">
<?php foreach([['Name','motherName'],['Age','motherAge'],['Education','motherEducation'],['Alive','isMotherAlive'],['In Contact','isMotherInContact'],['Occupation','motherOccupation'],['Occ. Other','motherOccupationOther'],['Daily Wage','motherDailyWage'],['Monthly Income','motherMonthlyIncome']] as [$l,$k]):?><div class="fld"><label><?=$l?></label><span><?=val($d,$k)?></span></div><?php endforeach;?>
</div></div>

<div class="card"><div class="section-head">Guardian &amp; Caste</div><div class="field-grid">
<?php foreach([['Guardian Name','guardianName'],['Relationship','guardianRelationship'],['Caste','caste']] as [$l,$k]):?><div class="fld"><label><?=$l?></label><span><?=val($d,$k)?></span></div><?php endforeach;?>
</div></div>

<div class="card"><div class="section-head">School / Education</div><div class="field-grid">
<?php foreach([['10th School','school10Name'],['10th Type','school10Type'],['12th School','school12Name'],['12th Type','school12Type'],['Medium 10','medium10'],['Medium 12','medium12'],['Group 12','group12'],['Vocational','vocationalSpec'],['Exam No 12','examNumber12'],['Marks 10','marks10'],['Marks 11','marks11'],['Marks 12','marks12']] as [$l,$k]):?><div class="fld"><label><?=$l?></label><span><?=val($d,$k)?></span></div><?php endforeach;?>
</div></div>

<div class="card"><div class="section-head">Extracurricular &amp; Goals</div><div class="field-grid">
<?php foreach([['Has Extracurricular','hasExtracurricular'],['Extracurricular Other','extracurricularOther'],['First Gen Graduate','isFirstGenGraduate'],['Desired Course 1','desiredCourse1'],['Desired Course 2','desiredCourse2'],['Willing for Hostel','willingForHostel'],['Hostel Reason','hostelReason'],['Knows Agaram Beneficiary','knowsAgaramBeneficiary'],['Beneficiary Relation','beneficiaryRelation'],['Beneficiary Name','beneficiaryName'],['Beneficiary College','beneficiaryCollege']] as [$l,$k]):?><div class="fld"><label><?=$l?></label><span><?=val($d,$k)?></span></div><?php endforeach;?>
<div class="fld"><label>Extracurriculars</label><span><?=htmlspecialchars(implode(', ', jsonArr($d,'extracurriculars')) ?: '—')?></span></div>
</div></div>

<div class="card"><div class="section-head">Family Members</div>
<?php $members = jsonArr($d,'familyMembers'); if($members):?>
<table class="inner"><thead><tr><th>#</th><th>Name</th><th>Age</th><th>Relationship</th><th>Education</th><th>School/Occupation</th><th>Fees/Income</th></tr></thead><tbody>
<?php foreach($members as $i=>$m):?><tr><td><?=$i+1?></td><td><?=htmlspecialchars((string)($m['name']??''))?></td><td><?=htmlspecialchars((string)($m['age']??''))?></td><td><?=htmlspecialchars((string)($m['relationship']??''))?></td><td><?=htmlspecialchars((string)($m['education']??''))?></td><td><?=htmlspecialchars((string)($m['schoolOrOccupation']??''))?></td><td><?=htmlspecialchars((string)($m['feesOrIncome']??''))?></td></tr><?php endforeach;?>
</tbody></table>
<?php else:?><div class="file-list"><em style="color:#999">None</em></div><?php endif;?>
<div class="field-grid">
<?php foreach([['Siblings in Private','siblingsInPrivate'],['Siblings Fee Concession','siblingsFeeConcession'],['Fee Payment Method','feePaymentMethod']] as [$l,$k]):?><div class="fld"><label><?=$l?></label><span><?=val($d,$k)?></span></div><?php endforeach;?>
</div></div>

<div class="card"><div class="section-head">Household</div><div class="field-grid">
<?php foreach([['Residence Type','residenceType'],['Monthly Rent','monthlyRent'],['House Type','houseType'],['Has Toilet','hasToilet'],['Has Water','hasWater'],['Has Electricity','hasElectricity']] as [$l,$k]):?><div class="fld"><label><?=$l?></label><span><?=val($d,$k)?></span></div><?php endforeach;?>
</div></div>

<div class="card"><div class="section-head">Additional Information</div><div class="field-grid">
<?php foreach([['COVID Impact','covidImpact'],['COVID Impact Other','covidImpactOther'],['Applied Other Scholarships','appliedOtherScholarships']] as [$l,$k]):?><div class="fld"><label><?=$l?></label><span><?=val($d,$k)?></span></div><?php endforeach;?>
<div class="fld"><label>COVID Impact Types</label><span><?=htmlspecialchars(implode(', ', jsonArr($d,'covidImpactTypes')) ?: '—')?></span></div>
<div class="fld"><label>Other Organizations</label><span><?=htmlspecialchars(implode(', ', array_filter(jsonArr($d,'otherOrganizations'))) ?: '—')?></span></div>
</div></div>

<div class="card"><div class="section-head">Declaration</div><div class="field-grid">
<?php foreach([['Date','declarationDate'],['Place','declarationPlace'],['Student Name','declarationStudentName']] as [$l,$k]):?><div class="fld"><label><?=$l?></label><span><?=val($d,$k)?></span></div><?php endforeach;?>
</div></div>

<div class="card"><div class="section-head">Uploaded Documents</div><div class="file-list">
<?php if(empty($files)):?><em style="color:#999">No files uploaded.</em>
<?php else: foreach($files as $field=>$filename):?>
  <div style="margin-bottom:.4rem"><strong style="font-size:.8rem;color:#888"><?=htmlspecialchars($field)?>:</strong>
  <a class="file-link" href="file.php?file=<?=urlencode($filename)?>"><?=htmlspecialchars($filename)?></a></div>
<?php endforeach; endif;?>
</div></div>

</div></body></html>
