<?php

namespace App\Filament\Resources;

use App\Filament\Resources\TeamMemberResource\Pages;
use App\Models\TeamMember;
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

class TeamMemberResource extends Resource
{
    protected static ?string $model = TeamMember::class;

    protected static string | BackedEnum | null $navigationIcon = 'heroicon-o-user-group';

    protected static string | UnitEnum | null $navigationGroup = 'Content Management';

    protected static ?string $navigationLabel = 'Leadership & Team';

    protected static ?int $navigationSort = 3;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Personal Details')
                    ->schema([
                        Components\TextInput::make('name')
                            ->label('Full Name')
                            ->required()
                            ->maxLength(255),
                        Components\TextInput::make('role')
                            ->label('Role / Title')
                            ->placeholder('e.g. Managing Director, Director of Technology')
                            ->required(),
                        Components\Select::make('category')
                            ->label('Team Category')
                            ->options([
                                'executive' => 'Executive Leadership / Founding Partner',
                                'functional_lead' => 'Functional Engineering Lead',
                                'advisor' => 'Technical Advisor',
                            ])
                            ->default('executive')
                            ->required(),
                        Components\TextInput::make('credential')
                            ->label('Credential / Experience Tag')
                            ->placeholder('e.g. Infrastructure Delivery, 18+ Years'),
                        Components\TextInput::make('initials')
                            ->label('Initials (Avatar Fallback)')
                            ->placeholder('e.g. NR, NH, NK')
                            ->maxLength(5),
                        Components\FileUpload::make('photo')
                            ->label('Profile Photo')
                            ->image()
                            ->acceptedFileTypes(['image/svg+xml', 'image/png', 'image/jpeg', 'image/webp'])
                            ->disk('public')
                            ->directory('team')
                            ->visibility('public')
                            ->maxSize(5120)
                            ->imageCropAspectRatio('1:1')
                            ->helperText('Recommended 1:1 square photo (Max 5MB). If left empty, stylized initials will be displayed.'),
                        Components\Textarea::make('bio')
                            ->label('Professional Bio / Scope')
                            ->rows(3)
                            ->columnSpanFull(),
                    ])->columns(2),

                Section::make('Display & Visibility')
                    ->schema([
                        Components\Toggle::make('show_on_home')
                            ->label('Feature on Homepage Team Section')
                            ->default(false),
                        Components\Toggle::make('is_active')
                            ->label('Active & Visible on Site')
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
            ->emptyStateHeading('No team members found')
            ->emptyStateDescription('Add leadership partners and functional discipline leads.')
            ->emptyStateIcon('heroicon-o-user-group')
            ->columns([
                Tables\Columns\ImageColumn::make('photo')
                    ->label('Photo')
                    ->disk('public')
                    ->circular()
                    ->defaultImageUrl(fn ($record) => null),
                Tables\Columns\TextColumn::make('name')
                    ->label('Name')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                Tables\Columns\TextColumn::make('role')
                    ->label('Role')
                    ->searchable(),
                Tables\Columns\TextColumn::make('category')
                    ->label('Category')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'executive' => 'teal',
                        'functional_lead' => 'info',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'executive' => 'Executive Leadership',
                        'functional_lead' => 'Functional Lead',
                        'advisor' => 'Technical Advisor',
                        default => ucfirst($state),
                    }),
                Tables\Columns\IconColumn::make('show_on_home')
                    ->label('Homepage')
                    ->boolean(),
                Tables\Columns\TextColumn::make('is_active')
                    ->label('Status')
                    ->badge()
                    ->color(fn (bool $state): string => $state ? 'success' : 'gray')
                    ->formatStateUsing(fn (bool $state): string => $state ? 'Active' : 'Inactive'),
                Tables\Columns\TextColumn::make('sort_order')
                    ->label('Order')
                    ->sortable(),
            ])
            ->defaultSort('sort_order', 'asc')
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->options([
                        'executive' => 'Executive Leadership',
                        'functional_lead' => 'Functional Leads',
                        'advisor' => 'Advisors',
                    ]),
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
            'index' => Pages\ListTeamMembers::route('/'),
            'create' => Pages\CreateTeamMember::route('/create'),
            'edit' => Pages\EditTeamMember::route('/{record}/edit'),
        ];
    }
}
