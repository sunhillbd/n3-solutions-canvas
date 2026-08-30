<?php

require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/bootstrap/app.php';
$kernel = $app->make(\Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Filament\Forms\Components\FileUpload;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Validator;

$svg = UploadedFile::fake()->createWithContent('logo.svg', '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><circle cx="50" cy="50" r="40"/></svg>');
$png = UploadedFile::fake()->image('logo.png');

// Case A: FileUpload with ->image()
$componentWithImage = FileUpload::make('logo')
    ->image()
    ->maxSize(5120);

$rulesA = $componentWithImage->getValidationRules();
echo "Rules with ->image(): " . json_encode($rulesA) . PHP_EOL;

$vA = Validator::make(['logo' => $svg], ['logo' => $rulesA]);
echo "SVG with ->image() passes: " . ($vA->passes() ? 'YES' : 'NO') . PHP_EOL;
if ($vA->fails()) {
    print_r($vA->errors()->all());
}

// Case B: FileUpload with acceptedFileTypes for vector & raster
$componentWithAcceptedTypes = FileUpload::make('logo')
    ->acceptedFileTypes(['image/svg+xml', 'image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'])
    ->maxSize(5120);

$rulesB = $componentWithAcceptedTypes->getValidationRules();
echo "\nRules with acceptedFileTypes: " . json_encode($rulesB) . PHP_EOL;

$vB = Validator::make(['logo' => $svg], ['logo' => $rulesB]);
echo "SVG with acceptedFileTypes passes: " . ($vB->passes() ? 'YES' : 'NO') . PHP_EOL;
if ($vB->fails()) {
    print_r($vB->errors()->all());
}

$vB_png = Validator::make(['logo' => $png], ['logo' => $rulesB]);
echo "PNG with acceptedFileTypes passes: " . ($vB_png->passes() ? 'YES' : 'NO') . PHP_EOL;
if ($vB_png->fails()) {
    print_r($vB_png->errors()->all());
}
