<?php

namespace App\Filament\Resources\ServiceResource\Pages;

use App\Filament\Resources\ServiceResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Contracts\Support\Htmlable;

class EditService extends EditRecord
{
    protected static string $resource = ServiceResource::class;

    public function getTitle(): string | Htmlable
    {
        return 'Edit: ' . ($this->getRecord()?->title ?? 'Service');
    }

    public function getHeading(): string | Htmlable
    {
        return 'Edit Solution: ' . ($this->getRecord()?->title ?? 'Untitled');
    }

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
