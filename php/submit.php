<?php
/**
 * Form submission endpoint.
 * Accepts multipart POST, validates, stores to DB, handles file uploads.
 * Returns JSON: {"success":true,"id":123} or {"success":false,"error":"..."}
 */

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

$ct = $_SERVER['CONTENT_TYPE'] ?? '';
if (!str_contains($ct, 'multipart/form-data')) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'multipart/form-data required']);
    exit;
}

function checkRateLimit(): void
{
    $ip   = preg_replace('/[^a-fA-F0-9:.]/', '', $_SERVER['REMOTE_ADDR'] ?? '0');
    $file = sys_get_temp_dir() . '/agaram_rl_' . md5($ip) . '.json';
    $now  = time(); $window = 60; $max = 3;
    $data = file_exists($file) ? (json_decode(file_get_contents($file), true) ?? []) : [];
    $data = array_values(array_filter($data, fn($t) => ($now - $t) < $window));
    if (count($data) >= $max) {
        http_response_code(429);
        echo json_encode(['success' => false, 'error' => 'Too many submissions. Please wait a minute.']);
        exit;
    }
    $data[] = $now;
    file_put_contents($file, json_encode($data), LOCK_EX);
}

checkRateLimit();

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/Database.php';
require_once __DIR__ . '/Validator.php';
require_once __DIR__ . '/FileHandler.php';
require_once __DIR__ . '/SubmissionRepo.php';

try {
    $v = new Validator();
    $p = $_POST;

    $data = [
        // Personal
        'studentName'           => $v->str($p['studentName'] ?? ''),
        'emisNumber'            => $v->str($p['emisNumber'] ?? '', 50),
        'dateOfBirth'           => $v->date($p['dateOfBirth'] ?? ''),
        'gender'                => $v->str($p['gender'] ?? '', 20),
        'isDisabled'            => $v->str($p['isDisabled'] ?? ''),
        'disabilityDetails'     => $v->str($p['disabilityDetails'] ?? ''),
        // Address
        'doorNumber'            => $v->str($p['doorNumber'] ?? ''),
        'address'               => $v->str($p['address'] ?? ''),
        'taluk'                 => $v->str($p['taluk'] ?? ''),
        'district'              => $v->str($p['district'] ?? ''),
        'pincode'               => $v->str($p['pincode'] ?? '', 10),
        'phone1'                => $v->str($p['phone1'] ?? '', 15),
        'phone2'                => $v->str($p['phone2'] ?? '', 15),
        'nearestCity'           => $v->str($p['nearestCity'] ?? ''),
        'distance'              => $v->str($p['distance'] ?? ''),
        // Father
        'fatherName'            => $v->str($p['fatherName'] ?? ''),
        'fatherAge'             => $v->str($p['fatherAge'] ?? ''),
        'fatherEducation'       => $v->str($p['fatherEducation'] ?? ''),
        'isFatherAlive'         => $v->str($p['isFatherAlive'] ?? ''),
        'isFatherInContact'     => $v->str($p['isFatherInContact'] ?? ''),
        'fatherOccupation'      => $v->str($p['fatherOccupation'] ?? ''),
        'fatherOccupationOther' => $v->str($p['fatherOccupationOther'] ?? ''),
        'fatherDailyWage'       => $v->str($p['fatherDailyWage'] ?? ''),
        'fatherMonthlyIncome'   => $v->decimal($p['fatherMonthlyIncome'] ?? ''),
        // Mother
        'motherName'            => $v->str($p['motherName'] ?? ''),
        'motherAge'             => $v->str($p['motherAge'] ?? ''),
        'motherEducation'       => $v->str($p['motherEducation'] ?? ''),
        'isMotherAlive'         => $v->str($p['isMotherAlive'] ?? ''),
        'isMotherInContact'     => $v->str($p['isMotherInContact'] ?? ''),
        'motherOccupation'      => $v->str($p['motherOccupation'] ?? ''),
        'motherOccupationOther' => $v->str($p['motherOccupationOther'] ?? ''),
        'motherDailyWage'       => $v->str($p['motherDailyWage'] ?? ''),
        'motherMonthlyIncome'   => $v->decimal($p['motherMonthlyIncome'] ?? ''),
        // Guardian / Caste
        'guardianName'          => $v->str($p['guardianName'] ?? ''),
        'guardianRelationship'  => $v->str($p['guardianRelationship'] ?? ''),
        'caste'                 => $v->str($p['caste'] ?? ''),
        // School
        'school10Name'          => $v->str($p['school10Name'] ?? ''),
        'school10Type'          => $v->str($p['school10Type'] ?? ''),
        'school12Name'          => $v->str($p['school12Name'] ?? ''),
        'school12Type'          => $v->str($p['school12Type'] ?? ''),
        'medium10'              => $v->str($p['medium10'] ?? ''),
        'medium12'              => $v->str($p['medium12'] ?? ''),
        'group12'               => $v->str($p['group12'] ?? ''),
        'vocationalSpec'        => $v->str($p['vocationalSpec'] ?? ''),
        'examNumber12'          => $v->str($p['examNumber12'] ?? ''),
        'marks10'               => $v->str($p['marks10'] ?? ''),
        'marks11'               => $v->str($p['marks11'] ?? ''),
        'marks12'               => $v->str($p['marks12'] ?? ''),
        // Extracurricular / Goals
        'hasExtracurricular'        => $v->str($p['hasExtracurricular'] ?? ''),
        'extracurriculars'          => $v->json($p['extracurriculars'] ?? '[]'),
        'extracurricularOther'      => $v->str($p['extracurricularOther'] ?? ''),
        'isFirstGenGraduate'        => $v->str($p['isFirstGenGraduate'] ?? ''),
        'desiredCourse1'            => $v->str($p['desiredCourse1'] ?? ''),
        'desiredCourse2'            => $v->str($p['desiredCourse2'] ?? ''),
        'willingForHostel'          => $v->str($p['willingForHostel'] ?? ''),
        'hostelReason'              => $v->str($p['hostelReason'] ?? ''),
        'knowsAgaramBeneficiary'    => $v->str($p['knowsAgaramBeneficiary'] ?? ''),
        'beneficiaryRelation'       => $v->str($p['beneficiaryRelation'] ?? ''),
        'beneficiaryName'           => $v->str($p['beneficiaryName'] ?? ''),
        'beneficiaryCollege'        => $v->str($p['beneficiaryCollege'] ?? ''),
        // Family Members
        'familyMembers'             => $v->json($p['familyMembers'] ?? '[]'),
        'siblingsInPrivate'         => $v->str($p['siblingsInPrivate'] ?? ''),
        'siblingsFeeConcession'     => $v->str($p['siblingsFeeConcession'] ?? ''),
        'feePaymentMethod'          => $v->str($p['feePaymentMethod'] ?? ''),
        // Household
        'residenceType'             => $v->str($p['residenceType'] ?? ''),
        'monthlyRent'               => $v->str($p['monthlyRent'] ?? ''),
        'houseType'                 => $v->str($p['houseType'] ?? ''),
        'hasToilet'                 => $v->str($p['hasToilet'] ?? ''),
        'hasWater'                  => $v->str($p['hasWater'] ?? ''),
        'hasElectricity'            => $v->str($p['hasElectricity'] ?? ''),
        // Additional
        'covidImpact'               => $v->str($p['covidImpact'] ?? ''),
        'covidImpactTypes'          => $v->json($p['covidImpactTypes'] ?? '[]'),
        'covidImpactOther'          => $v->str($p['covidImpactOther'] ?? ''),
        'appliedOtherScholarships'  => $v->str($p['appliedOtherScholarships'] ?? ''),
        'otherOrganizations'        => $v->json($p['otherOrganizations'] ?? '[]'),
        // Declaration
        'declarationDate'           => $v->date($p['declarationDate'] ?? ''),
        'declarationPlace'          => $v->str($p['declarationPlace'] ?? ''),
        'declarationStudentName'    => $v->str($p['declarationStudentName'] ?? ''),
    ];

    $v->required('studentName', $data['studentName']);
    $v->required('emisNumber',  $data['emisNumber']);

    if ($v->fails()) {
        http_response_code(422);
        echo json_encode(['success' => false, 'error' => implode(', ', $v->errors())]);
        exit;
    }

    $repo = new SubmissionRepo();
    $id   = $repo->create(
        $data['studentName'],
        $data['emisNumber'],
        $data['school10Name'],
        $data['school12Name'],
        json_encode($data, JSON_UNESCAPED_UNICODE)
    );

    $fh = new FileHandler();
    $files = [];
    foreach (['docFamilyLetter','docMarkSheets','docCasteCertificate','docFamilyCard','docDisabilityCertificate'] as $field) {
        if (isset($_FILES[$field]) && $_FILES[$field]['error'] !== UPLOAD_ERR_NO_FILE) {
            $filename = $fh->handle($_FILES[$field], $field, $id);
            if ($filename !== null) $files[$field] = $filename;
        }
    }

    $repo->updateFiles($id, json_encode($files, JSON_UNESCAPED_UNICODE));
    echo json_encode(['success' => true, 'id' => $id]);

} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
