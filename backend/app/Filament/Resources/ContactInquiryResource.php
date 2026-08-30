<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ContactInquiryResource\Pages;
use App\Models\ContactInquiry;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Forms\Components;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use UnitEnum;
use BackedEnum;

class ContactInquiryResource extends Resource
{
    protected static ?string $model = ContactInquiry::class;

    protected static string | BackedEnum | null $navigationIcon = 'heroicon-o-inbox-arrow-down';

    protected static string | UnitEnum | null $navigationGroup = 'Inbox & Inquiries';

    protected static ?string $navigationLabel = 'Contact Inquiries';

    protected static ?int $navigationSort = 1;

    public static function getNavigationBadge(): ?string
    {
        $newCount = static::getModel()::where('status', 'new')->count();
        return $newCount > 0 ? (string) $newCount : null;
    }

    public static function getNavigationBadgeColor(): ?string
    {
        return 'warning';
    }

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Sender Information')
                    ->schema([
                        Components\TextInput::make('name')
                            ->label('Full Name')
                            ->required()
                            ->disabled(),
                        Components\TextInput::make('organisation')
                            ->label('Organisation / Utility')
                            ->disabled(),
                        Components\TextInput::make('email')
                            ->label('Email Address')
                            ->email()
                            ->required()
                            ->disabled(),
                        Components\TextInput::make('phone')
                            ->label('Telephone Number')
                            ->disabled(),
                    ])->columns(2),

                Section::make('Enquiry Message')
                    ->schema([
                        Components\Textarea::make('message')
                            ->label('Message Content')
                            ->rows(5)
                            ->disabled()
                            ->columnSpanFull(),
                    ]),

                Section::make('Triage & Administration')
                    ->schema([
                        Components\Select::make('status')
                            ->label('Lead / Inquiry Status')
                            ->options([
                                'new' => 'New / Unread',
                                'read' => 'Read / Under Review',
                                'replied' => 'Replied & Handled',
                                'archived' => 'Archived',
                            ])
                            ->required()
                            ->default('new'),
                        Components\Textarea::make('admin_notes')
                            ->label('Internal Engineering / Admin Notes')
                            ->rows(3)
                            ->placeholder('Add internal notes regarding scope, quote status, or dispatch...')
                            ->columnSpanFull(),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'new' => 'warning',
                        'read' => 'info',
                        'replied' => 'success',
                        'archived' => 'gray',
                        default => 'gray',
                    })
                    ->sortable(),
                Tables\Columns\TextColumn::make('name')
                    ->label('Name')
                    ->searchable()
                    ->weight('bold'),
                Tables\Columns\TextColumn::make('organisation')
                    ->label('Organisation')
                    ->searchable()
                    ->placeholder('Individual'),
                Tables\Columns\TextColumn::make('email')
                    ->label('Email')
                    ->searchable()
                    ->copyable(),
                Tables\Columns\TextColumn::make('message')
                    ->label('Message Preview')
                    ->limit(45),
                Tables\Columns\TextColumn::make('created_at')
                    ->label('Received At')
                    ->dateTime('M d, Y H:i')
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options([
                        'new' => 'New',
                        'read' => 'Read',
                        'replied' => 'Replied',
                        'archived' => 'Archived',
                    ]),
            ])
            ->actions([
                ViewAction::make(),
                EditAction::make(),
                DeleteAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListContactInquiries::route('/'),
            'edit' => Pages\EditContactInquiry::route('/{record}/edit'),
        ];
    }
}
