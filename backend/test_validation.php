<?php

require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(\Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;

echo "--- 1. Testing Fake SVG with 'image' rule ---" . PHP_EOL;
$svgFile = UploadedFile::fake()->create('logo.svg', 10, 'image/svg+xml');
$v = Validator::make(['file' => $svgFile], ['file' => 'image']);
echo "Fake SVG with 'image' rule passes: " . ($v->passes() ? 'YES' : 'NO') . PHP_EOL;
if ($v->fails()) {
    print_r($v->errors()->all());
}

echo "\n--- 2. Testing Fake PNG with 'image' rule ---" . PHP_EOL;
$pngFile = UploadedFile::fake()->image('logo.png');
$vPng = Validator::make(['file' => $pngFile], ['file' => 'image']);
echo "Fake PNG with 'image' rule passes: " . ($vPng->passes() ? 'YES' : 'NO') . PHP_EOL;
if ($vPng->fails()) {
    print_r($vPng->errors()->all());
}

echo "\n--- 3. Testing Real SVG content with 'image' rule ---" . PHP_EOL;
$realSvgContent = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40"/></svg>';
$realSvg = UploadedFile::fake()->createWithContent('logo.svg', $realSvgContent);
$vRealSvg = Validator::make(['file' => $realSvg], ['file' => 'image']);
echo "Real SVG with 'image' rule passes: " . ($vRealSvg->passes() ? 'YES' : 'NO') . PHP_EOL;
if ($vRealSvg->fails()) {
    print_r($vRealSvg->errors()->all());
}

echo "\n--- 4. Testing Livewire temporary upload rules ---" . PHP_EOL;
$rules = config('livewire.temporary_file_upload.rules') ?? ['required', 'file', 'max:12288'];
$vLivewire = Validator::make(['files' => [$realSvg]], ['files.*' => $rules]);
echo "Livewire rules pass: " . ($vLivewire->passes() ? 'YES' : 'NO') . PHP_EOL;
if ($vLivewire->fails()) {
    print_r($vLivewire->errors()->all());
}

echo "\n--- 5. Testing Filament acceptedFileTypes vs image ---" . PHP_EOL;
$types = ['image/svg+xml', 'image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'];
$vMimes = Validator::make(['file' => $realSvg], ['file' => 'mimetypes:' . implode(',', $types)]);
echo "Real SVG with mimetypes rule passes: " . ($vMimes->passes() ? 'YES' : 'NO') . PHP_EOL;
if ($vMimes->fails()) {
    print_r($vMimes->errors()->all());
}
