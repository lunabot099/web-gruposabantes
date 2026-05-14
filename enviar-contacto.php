<?php
// Envío de formulario de contacto para hosting compartido con PHP mail().
// Si más adelante se requiere mayor entregabilidad, este archivo puede migrarse a SMTP/PHPMailer.

function redirect_error() {
    header('Location: contacto.html?error=1');
    exit;
}

function redirect_success() {
    header('Location: gracias.html');
    exit;
}

function clean_text($value) {
    $value = trim((string)$value);
    $value = strip_tags($value);
    $value = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $value);
    return $value;
}

function has_header_injection($value) {
    return preg_match('/(\r|\n|%0a|%0d|Content-Type:|Bcc:|Cc:|To:)/i', (string)$value);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    redirect_error();
}

$nombre = clean_text($_POST['nombre'] ?? '');
$celular = clean_text($_POST['celular'] ?? '');
$email = trim((string)($_POST['email'] ?? ''));
$servicio = clean_text($_POST['servicio'] ?? '');
$mensaje = clean_text($_POST['mensaje'] ?? '');

if ($nombre === '' || $celular === '' || $email === '' || $servicio === '' || $mensaje === '') {
    redirect_error();
}

if (has_header_injection($nombre) || has_header_injection($celular) || has_header_injection($email) || has_header_injection($servicio)) {
    redirect_error();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL) || has_header_injection($email)) {
    redirect_error();
}

$destinatarios = [
    'gruposabantes@gmail.com',
    'Ingfernandorivera99@gmail.com',
    'raulcort3z@gmail.com'
];

$asunto = 'Nueva solicitud desde el sitio web de Grupo Sabantes';
$cuerpo = "Nueva solicitud recibida desde el sitio web de Grupo Sabantes.\n\n" .
    "Nombre completo:\n{$nombre}\n\n" .
    "Número de celular:\n{$celular}\n\n" .
    "Correo electrónico:\n{$email}\n\n" .
    "Servicio de interés:\n{$servicio}\n\n" .
    "Comentario:\n{$mensaje}\n";

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'From: Grupo Sabantes <no-reply@gruposabantes.com>';
$headers[] = 'Reply-To: ' . $nombre . ' <' . $email . '>';
$headers[] = 'X-Mailer: PHP/' . phpversion();

$enviado = @mail(implode(',', $destinatarios), $asunto, $cuerpo, implode("\r\n", $headers));

if ($enviado) {
    redirect_success();
}

redirect_error();
