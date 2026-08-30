<?php

namespace App\Filament\Resources\SiteSettingResource\Pages;

use App\Filament\Resources\SiteSettingResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Contracts\Support\Htmlable;

class EditSiteSetting extends EditRecord
{
    protected static string $resource = SiteSettingResource::class;

    public function getHeading(): string | Htmlable
    {
        return 'Settings';
    }

    public function getSubheading(): string | Htmlable | null
    {
        return 'Manage your account and platform-wide settings';
    }

    protected function getHeaderActions(): array
    {
        return [];
    }
}
