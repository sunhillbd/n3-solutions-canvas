<?php

namespace App\Filament\Widgets;

use App\Models\ContactInquiry;
use Filament\Actions\Action;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class LatestInquiriesWidget extends BaseWidget
{
    protected static ?int $sort = 3;

    protected int | string | array $columnSpan = 'full';

    protected static ?string $heading = 'Recent Inbound Contact Inquiries';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                ContactInquiry::query()->latest()->limit(5)
            )
            ->emptyStateHeading('No contact inquiries yet')
            ->emptyStateDescription('New messages and engineering inquiries submitted through the website contact form will appear here.')
            ->emptyStateIcon('heroicon-o-inbox')
            ->columns([
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Received')
                    ->since()
                    ->sortable(),
                Tables\Columns\TextColumn::make('name')
                    ->label('Contact Name')
                    ->weight('bold')
                    ->searchable(),
                Tables\Columns\TextColumn::make('organization')
                    ->label('Organization')
                    ->placeholder('N/A'),
                Tables\Columns\TextColumn::make('email')
                    ->label('Email')
                    ->copyable(),
                Tables\Columns\TextColumn::make('service_interest')
                    ->label('Interest')
                    ->badge()
                    ->color('teal')
                    ->placeholder('General Inquiry'),
                Tables\Columns\TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'new' => 'danger',
                        'in_review' => 'warning',
                        'responded' => 'success',
                        'archived' => 'gray',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'new' => 'New',
                        'in_review' => 'In Review',
                        'responded' => 'Responded',
                        'archived' => 'Archived',
                        default => ucfirst($state),
                    }),
            ])
            ->actions([
                Action::make('view')
                    ->label('Open')
                    ->icon('heroicon-m-eye')
                    ->url(fn (ContactInquiry $record): string => route('filament.admin.resources.contact-inquiries.edit', $record)),
            ]);
    }
}
