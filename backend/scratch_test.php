<?php

require __DIR__ . '/vendor/autoload.php';
$app = require __DIR__ . '/bootstrap/app.php';
$app->make(\Illuminate\Contracts\Console\Kernel::class)->bootstrap();

echo "=== DIAGNOSTICS ===" . PHP_EOL;

// 1. Filesystem & Livewire Config
echo "FILESYSTEM_DISK: " . env('FILESYSTEM_DISK') . PHP_EOL;
echo "Config default disk: " . config('filesystems.default') . PHP_EOL;
echo "Public disk root: " . config('filesystems.disks.public.root') . PHP_EOL;
echo "Public disk url: " . config('filesystems.disks.public.url') . PHP_EOL;
echo "Livewire tmp disk: " . (config('livewire.temporary_file_upload.disk') ?? 'null (defaults to default disk)') . PHP_EOL;
echo "Livewire tmp rules: " . json_encode(config('livewire.temporary_file_upload.rules')) . PHP_EOL;

// 2. Directories & Permissions
$publicStorage = public_path('storage');
$appPublic = storage_path('app/public');
$livewireTmp = storage_path('app/private/livewire-tmp');
$livewireTmpDefault = storage_path('app/livewire-tmp');

echo "storage/app/public exists: " . (is_dir($appPublic) ? 'YES' : 'NO') . PHP_EOL;
echo "storage/app/public is writable: " . (is_writable($appPublic) ? 'YES' : 'NO') . PHP_EOL;
echo "public/storage link exists: " . (file_exists($publicStorage) ? (is_link($publicStorage) ? 'SYMLINK' : (is_dir($publicStorage) ? 'DIRECTORY' : 'FILE')) : 'NO') . PHP_EOL;

// 3. Test Storage Write & Read
try {
    \Illuminate\Support\Facades\Storage::disk('public')->put('test.txt', 'hello');
    echo "Storage::disk('public') write: SUCCESS" . PHP_EOL;
    \Illuminate\Support\Facades\Storage::disk('public')->delete('test.txt');
} catch (\Throwable $e) {
    echo "Storage::disk('public') write ERROR: " . $e->getMessage() . PHP_EOL;
}

try {
    \Illuminate\Support\Facades\Storage::disk('local')->put('test.txt', 'hello');
    echo "Storage::disk('local') write: SUCCESS" . PHP_EOL;
    \Illuminate\Support\Facades\Storage::disk('local')->delete('test.txt');
} catch (\Throwable $e) {
    echo "Storage::disk('local') write ERROR: " . $e->getMessage() . PHP_EOL;
}

// 4. Test Livewire Temporary Upload Validation & Processing
echo "\n--- Livewire Upload Validation Test ---" . PHP_EOL;

// Test SVG file with 'image' rule
$svgFile = \Illuminate\Http\UploadedFile::fake()->create('logo.svg', 100, 'image/svg+xml');
$vSvg = \Illuminate\Support\Facades\Validator::make(['file' => $svgFile], ['file' => 'image']);
echo "SVG with 'image' rule validation: " . ($vSvg->passes() ? 'PASS' : 'FAIL: ' . json_encode($vSvg->errors()->all())) . PHP_EOL;

// Test PNG file with 'image' rule
$pngFile = \Illuminate\Http\UploadedFile::fake()->image('logo.png', 200, 200);
$vPng = \Illuminate\Support\Facades\Validator::make(['file' => $pngFile], ['file' => 'image']);
echo "PNG with 'image' rule validation: " . ($vPng->passes() ? 'PASS' : 'FAIL: ' . json_encode($vPng->errors()->all())) . PHP_EOL;

// Test Filament FileUpload validation rules on SiteSettingResource
echo "\n--- Filament SiteSetting Component Tests ---" . PHP_EOL;
$resource = \App\Filament\Resources\SiteSettingResource::class;
echo "SiteSettingResource class exists: YES" . PHP_EOL;

// Test Livewire temporary file upload controller directly
$controller = new \Livewire\Features\SupportFileUploads\FileUploadController();
$request = \Illuminate\Http\Request::create('/livewire/upload-file', 'POST', [], [], [
    'files' => [$pngFile]
]);

try {
    $response = $controller->handle();
    echo "Livewire FileUploadController handle response status: " . $response->getStatusCode() . PHP_EOL;
    echo "Livewire FileUploadController response body: " . $response->getContent() . PHP_EOL;
} catch (\Throwable $e) {
    echo "Livewire FileUploadController ERROR: " . $e->getMessage() . " at " . $e->getFile() . ":" . $e->getLine() . PHP_EOL;
}
