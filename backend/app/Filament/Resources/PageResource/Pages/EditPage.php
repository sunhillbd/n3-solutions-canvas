<?php

namespace App\Filament\Resources\PageResource\Pages;

use App\Filament\Resources\PageResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Contracts\Support\Htmlable;

class EditPage extends EditRecord
{
    protected static string $resource = PageResource::class;

    public function getTitle(): string | Htmlable
    {
        return 'Edit: ' . ($this->getRecord()?->title ?? 'Page');
    }

    public function getHeading(): string | Htmlable
    {
        return 'Edit Page: ' . ($this->getRecord()?->title ?? 'Untitled Page');
    }

    public function getSubheading(): string | Htmlable | null
    {
        $record = $this->getRecord();
        if (!$record) return null;

        $slug = $record->slug === '/' ? 'Homepage (/)' : "/{$record->slug}";
        $template = ucfirst(str_replace('_', ' ', $record->template ?? 'Custom'));
        $status = $record->is_published ? 'Live & Published' : 'Draft';

        return "Route: {$slug}  •  Template: {$template}  •  Status: {$status}";
    }

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
