<?php

namespace App\Filament\Resources;

use App\Filament\Resources\FaqResource\Pages;
use App\Models\Faq;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use UnitEnum;
use BackedEnum;

class FaqResource extends Resource
{
    protected static ?string $model = Faq::class;

    protected static string | BackedEnum | null $navigationIcon = 'heroicon-o-question-mark-circle';

    protected static string | UnitEnum | null $navigationGroup = 'Content Management';

    protected static ?string $navigationLabel = 'Frequently Asked Questions';

    protected static ?int $navigationSort = 6;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('FAQ Content')
                    ->schema([
                        Components\TextInput::make('question')
                            ->label('Question')
                            ->required()
                            ->maxLength(255)
                            ->columnSpanFull(),
                        Components\Textarea::make('answer')
                            ->label('Answer')
                            ->rows(4)
                            ->required()
                            ->columnSpanFull(),
                        Components\Select::make('placement')
                            ->label('FAQ Placement Area')
                            ->options([
                                'homepage' => 'Homepage FAQ Section',
                                'service_specific' => 'Service-Specific Page',
                                'general' => 'General / Knowledge Base',
                            ])
                            ->default('homepage')
                            ->required()
                            ->reactive(),
                        Components\Select::make('service_id')
                            ->label('Linked Service Discipline')
                            ->relationship('service', 'title')
                            ->visible(fn ($get) => $get('placement') === 'service_specific'),
                        Components\Toggle::make('is_published')
                            ->label('Published & Visible')
                            ->default(true),
                        Components\TextInput::make('sort_order')
                            ->label('Display Order')
                            ->numeric()
                            ->default(0),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('question')
                    ->label('Question')
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->limit(60),
                Tables\Columns\TextColumn::make('placement')
                    ->label('Placement')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'homepage' => 'primary',
                        'service_specific' => 'info',
                        default => 'gray',
                    }),
                Tables\Columns\TextColumn::make('service.title')
                    ->label('Linked Service')
                    ->placeholder('None (Global)'),
                Tables\Columns\IconColumn::make('is_published')
                    ->label('Live')
                    ->boolean(),
                Tables\Columns\TextColumn::make('sort_order')
                    ->label('Order')
                    ->sortable(),
            ])
            ->defaultSort('sort_order', 'asc')
            ->filters([
                Tables\Filters\SelectFilter::make('placement')
                    ->options([
                        'homepage' => 'Homepage',
                        'service_specific' => 'Service-Specific',
                        'general' => 'General',
                    ]),
                Tables\Filters\TernaryFilter::make('is_published')->label('Published Status'),
            ])
            ->actions([
                EditAction::make(),
                DeleteAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListFaqs::route('/'),
            'create' => Pages\CreateFaq::route('/create'),
            'edit' => Pages\EditFaq::route('/{record}/edit'),
        ];
    }
}
