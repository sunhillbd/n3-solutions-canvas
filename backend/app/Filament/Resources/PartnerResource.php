<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PartnerResource\Pages;
use App\Models\Partner;
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

class PartnerResource extends Resource
{
    protected static ?string $model = Partner::class;

    protected static string | BackedEnum | null $navigationIcon = 'heroicon-o-building-office-2';

    protected static string | UnitEnum | null $navigationGroup = 'Content Management';

    protected static ?string $navigationLabel = 'Ecosystem & Partners';

    protected static ?int $navigationSort = 4;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Partner Organization')
                    ->schema([
                        Components\TextInput::make('name')
                            ->label('Organization / Partner Name')
                            ->required()
                            ->maxLength(255),
                        Components\Select::make('category')
                            ->label('Ecosystem Tier')
                            ->options([
                                'utility_authority' => 'Public Utility Authority',
                                'metrology_oem' => 'Global Metrology & Hardware OEM',
                                'telecom_iot' => 'Telecommunications & IoT Network',
                                'multilateral_institution' => 'Multilateral & Development Bank',
                            ])
                            ->required(),
                        Components\Textarea::make('collaboration_detail')
                            ->label('Collaboration Detail / Scope')
                            ->rows(2)
                            ->required()
                            ->columnSpanFull(),
                        Components\FileUpload::make('logo')
                            ->label('Custom Logo Upload (SVG, PNG or JPG)')
                            ->acceptedFileTypes(['image/svg+xml', 'image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif'])
                            ->disk('public')
                            ->directory('partners')
                            ->visibility('public')
                            ->maxSize(5120)
                            ->helperText('Upload transparent SVG, PNG, JPG or WEBP (Max 5MB). If blank, built-in vector logo mark will be used.'),
                        Components\TextInput::make('website_url')
                            ->label('Website URL')
                            ->url()
                            ->placeholder('https://...'),
                    ])->columns(2),

                Section::make('Display & Placement')
                    ->schema([
                        Components\Toggle::make('is_featured')
                            ->label('Feature in Top Partner Logo Strip')
                            ->default(false),
                        Components\Toggle::make('is_active')
                            ->label('Active & Visible in Ecosystem')
                            ->default(true),
                        Components\TextInput::make('sort_order')
                            ->label('Display Order')
                            ->numeric()
                            ->default(0),
                    ])->columns(3),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('logo')
                    ->label('Logo')
                    ->disk('public')
                    ->height(32)
                    ->defaultImageUrl(fn ($record) => null),
                Tables\Columns\TextColumn::make('name')
                    ->label('Partner Name')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                Tables\Columns\TextColumn::make('category')
                    ->label('Ecosystem Tier')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'utility_authority' => 'info',
                        'metrology_oem' => 'success',
                        'telecom_iot' => 'warning',
                        'multilateral_institution' => 'primary',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'utility_authority' => 'Utility Authority',
                        'metrology_oem' => 'Metrology OEM',
                        'telecom_iot' => 'Telecom & IoT',
                        'multilateral_institution' => 'Multilateral Bank',
                        default => $state,
                    }),
                Tables\Columns\TextColumn::make('collaboration_detail')
                    ->label('Scope')
                    ->limit(40),
                Tables\Columns\IconColumn::make('is_featured')
                    ->label('Featured')
                    ->boolean(),
                Tables\Columns\IconColumn::make('is_active')
                    ->label('Active')
                    ->boolean(),
                Tables\Columns\TextColumn::make('sort_order')
                    ->label('Order')
                    ->sortable(),
            ])
            ->defaultSort('sort_order', 'asc')
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->options([
                        'utility_authority' => 'Utility Authority',
                        'metrology_oem' => 'Metrology OEM',
                        'telecom_iot' => 'Telecom & IoT',
                        'multilateral_institution' => 'Multilateral Bank',
                    ]),
                Tables\Filters\TernaryFilter::make('is_featured')->label('Featured in Strip'),
                Tables\Filters\TernaryFilter::make('is_active')->label('Active Status'),
            ])
            ->actions([
                EditAction::make(),
                DeleteAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPartners::route('/'),
            'create' => Pages\CreatePartner::route('/create'),
            'edit' => Pages\EditPartner::route('/{record}/edit'),
        ];
    }
}
