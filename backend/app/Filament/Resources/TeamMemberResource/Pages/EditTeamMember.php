<?php

namespace App\Filament\Resources\TeamMemberResource\Pages;

use App\Filament\Resources\TeamMemberResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Contracts\Support\Htmlable;

class EditTeamMember extends EditRecord
{
    protected static string $resource = TeamMemberResource::class;

    public function getTitle(): string | Htmlable
    {
        return 'Edit: ' . ($this->getRecord()?->name ?? 'Team Member');
    }

    public function getHeading(): string | Htmlable
    {
        return 'Edit Profile: ' . ($this->getRecord()?->name ?? 'Untitled');
    }

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
