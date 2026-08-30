<?php

require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(\Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;

$svg = UploadedFile::fake()->createWithContent('logo.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40"/></svg>');
$png = UploadedFile::fake()->image('logo.png');

echo "SVG getMimeType(): " . $svg->getMimeType() . PHP_EOL;
echo "PNG getMimeType(): " . $png->getMimeType() . PHP_EOL;

// Test mimetypes:image/* on SVG
$v1 = Validator::make(['file' => $svg], ['file' => 'mimetypes:image/*']);
echo "SVG with 'mimetypes:image/*': " . ($v1->passes() ? 'PASS' : 'FAIL: ' . json_encode($v1->errors()->all())) . PHP_EOL;

// Test mimetypes:image/* on PNG
$v2 = Validator::make(['file' => $png], ['file' => 'mimetypes:image/*']);
echo "PNG with 'mimetypes:image/*': " . ($v2->passes() ? 'PASS' : 'FAIL: ' . json_encode($v2->errors()->all())) . PHP_EOL;

// Test mimes:svg,png,jpg,jpeg,webp on SVG
$v3 = Validator::make(['file' => $svg], ['file' => 'mimes:svg,png,jpg,jpeg,webp']);
echo "SVG with 'mimes:svg,png,jpg,jpeg,webp': " . ($v3->passes() ? 'PASS' : 'FAIL: ' . json_encode($v3->errors()->all())) . PHP_EOL;

// Test acceptedFileTypes with specific MIME list
$specificMimes = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];
$v4 = Validator::make(['file' => $svg], ['file' => 'mimetypes:' . implode(',', $specificMimes)]);
echo "SVG with specific mimetypes: " . ($v4->passes() ? 'PASS' : 'FAIL: ' . json_encode($v4->errors()->all())) . PHP_EOL;
