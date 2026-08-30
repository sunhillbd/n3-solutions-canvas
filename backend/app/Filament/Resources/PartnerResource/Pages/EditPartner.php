<?php

namespace App\Filament\Resources\PartnerResource\Pages;

use App\Filament\Resources\PartnerResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Contracts\Support\Htmlable;

class EditPartner extends EditRecord
{
    protected static string $resource = PartnerResource::class;

    public function getTitle(): string | Htmlable
    {
        return 'Edit: ' . ($this->getRecord()?->name ?? 'Partner');
    }

    public function getHeading(): string | Htmlable
    {
        return 'Edit Partner: ' . ($this->getRecord()?->name ?? 'Untitled');
    }

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
