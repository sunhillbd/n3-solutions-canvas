<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ServiceResource\Pages;
use App\Models\Service;
use Filament\Actions\Action;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use UnitEnum;
use BackedEnum;

class ServiceResource extends Resource
{
    protected static ?string $model = Service::class;

    protected static string | BackedEnum | null $navigationIcon = 'heroicon-o-cpu-chip';

    protected static string | UnitEnum | null $navigationGroup = 'Content Management';

    protected static ?string $navigationLabel = 'Solutions & Services';

    protected static ?int $navigationSort = 2;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Service Details')
                    ->extraAttributes(['class' => 'vertical-section-tabs'])
                    ->tabs([
                        Tabs\Tab::make('General Overview')
                            ->icon('heroicon-o-information-circle')
                            ->schema([
                                Section::make('Discipline Identity')
                                    ->schema([
                                        Components\TextInput::make('title')
                                            ->label('Service Discipline Title')
                                            ->required()
                                            ->maxLength(255)
                                            ->live(onBlur: true)
                                            ->afterStateUpdated(function (string $operation, $state, $set) {
                                                if ($operation === 'create') {
                                                    $set('slug', \Illuminate\Support\Str::slug($state));
                                                }
                                            }),
                                        Components\TextInput::make('slug')
                                            ->label('URL Slug')
                                            ->required()
                                            ->unique(Service::class, 'slug', ignoreRecord: true),
                                        Components\TextInput::make('eyebrow')
                                            ->label('Section Eyebrow')
                                            ->default('Discipline — Utility Infrastructure'),
                                        Components\TextInput::make('badge')
                                            ->label('Technical Class Badge')
                                            ->placeholder('e.g. Billing-Grade Metrology // MID R400'),
                                        Components\TextInput::make('icon')
                                            ->label('Lucide Icon Name')
                                            ->placeholder('e.g. Gauge, RadioTower, Wrench, CircuitBoard')
                                            ->default('Gauge'),
                                        Components\TextInput::make('sort_order')
                                            ->label('Display Order')
                                            ->numeric()
                                            ->default(0),
                                        Components\Toggle::make('is_published')
                                            ->label('Published & Live on Website')
                                            ->default(true)
                                            ->inline(false),
                                    ])->columns(2),

                                Section::make('Descriptions')
                                    ->schema([
                                        Components\Textarea::make('tagline')
                                            ->label('Hero Tagline / Value Proposition')
                                            ->rows(2)
                                            ->required(),
                                        Components\Textarea::make('short_description')
                                            ->label('Short Summary (Card Overview)')
                                            ->rows(2)
                                            ->required(),
                                        Components\MarkdownEditor::make('description')
                                            ->label('Comprehensive Engineering Overview')
                                            ->columnSpanFull(),
                                    ]),
                            ]),

                        Tabs\Tab::make('Key Metrics')
                            ->icon('heroicon-o-chart-bar')
                            ->schema([
                                Components\Repeater::make('metrics')
                                    ->label('Key Stat Metrics (4 Columns)')
                                    ->schema([
                                        Components\TextInput::make('value')->label('Metric Value (e.g. 860,000+)')->required(),
                                        Components\TextInput::make('label')->label('Metric Label (e.g. Addressable Endpoints)')->required(),
                                        Components\TextInput::make('subtext')->label('Supporting Subtext (optional)'),
                                    ])
                                    ->columns(3)
                                    ->collapsible()
                                    ->reorderableWithButtons(),
                            ]),

                        Tabs\Tab::make('Architecture Pillars')
                            ->icon('heroicon-o-square-3-stack-3d')
                            ->schema([
                                Components\Repeater::make('pillars')
                                    ->label('Core System Architecture Pillars')
                                    ->schema([
                                        Components\TextInput::make('number')->label('Step Tag (e.g. 01)')->default('01'),
                                        Components\TextInput::make('title')->label('Pillar Title')->required(),
                                        Components\TextInput::make('subtitle')->label('Pillar Subtitle')->placeholder('Technical Benchmark'),
                                        Components\Textarea::make('description')->label('Pillar Description')->rows(2)->required(),
                                        Components\TagsInput::make('features')
                                            ->label('Key Features / Checklist')
                                            ->placeholder('Add feature point'),
                                    ])
                                    ->columns(2)
                                    ->collapsible()
                                    ->reorderableWithButtons(),
                            ]),

                        Tabs\Tab::make('Execution Roadmap')
                            ->icon('heroicon-o-arrow-path')
                            ->schema([
                                Components\Repeater::make('lifecycle_phases')
                                    ->label('Turnkey Delivery Lifecycle Stages')
                                    ->schema([
                                        Components\TextInput::make('step')->label('Phase Number (e.g. 01)')->default('01'),
                                        Components\TextInput::make('phase')->label('Phase Name')->required(),
                                        Components\TextInput::make('timeframe')->label('Timeframe (e.g. Weeks 1–4)'),
                                        Components\Textarea::make('detail')->label('Phase Execution Detail')->rows(2)->required(),
                                    ])
                                    ->columns(2)
                                    ->collapsible()
                                    ->reorderableWithButtons(),
                            ]),

                        Tabs\Tab::make('Technical FAQs')
                            ->icon('heroicon-o-question-mark-circle')
                            ->schema([
                                Components\Repeater::make('faqs')
                                    ->label('Service-Specific FAQs')
                                    ->schema([
                                        Components\TextInput::make('question')->label('Question')->required(),
                                        Components\Textarea::make('answer')->label('Engineering Answer')->rows(3)->required(),
                                    ])
                                    ->collapsible()
                                    ->reorderableWithButtons(),
                            ]),

                        Tabs\Tab::make('SEO & AEO')
                            ->icon('heroicon-o-globe-alt')
                            ->schema([
                                Section::make('Search & AI Optimization')
                                    ->schema([
                                        Components\TextInput::make('seo.meta_title')->label('Meta Title'),
                                        Components\Textarea::make('seo.meta_description')->label('Meta Description')->rows(2),
                                        Components\Textarea::make('aeo.direct_answer')
                                            ->label('AI Direct Answer Snippet')
                                            ->rows(2)
                                            ->helperText('Concise 1–2 sentence summary for LLM citations.'),
                                        Components\TagsInput::make('aeo.key_entities')->label('Key Topics / Entities'),
                                    ]),
                            ]),
                    ])->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->label('Discipline Title')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                Tables\Columns\TextColumn::make('slug')
                    ->label('Slug')
                    ->badge()
                    ->color('gray'),
                Tables\Columns\TextColumn::make('badge')
                    ->label('Metrology / Class')
                    ->badge()
                    ->color('success'),
                Tables\Columns\IconColumn::make('is_published')
                    ->label('Live')
                    ->boolean()
                    ->sortable(),
                Tables\Columns\TextColumn::make('sort_order')
                    ->label('Order')
                    ->sortable(),
            ])
            ->defaultSort('sort_order', 'asc')
            ->filters([
                Tables\Filters\TernaryFilter::make('is_published')->label('Live Status'),
            ])
            ->actions([
                EditAction::make(),
                Action::make('duplicate')
                    ->label('Duplicate')
                    ->icon('heroicon-o-document-duplicate')
                    ->color('warning')
                    ->requiresConfirmation()
                    ->form([
                        Components\TextInput::make('new_title')->label('New Service Title')->required(),
                        Components\TextInput::make('new_slug')->label('New Slug')->required()->unique(Service::class, 'slug'),
                    ])
                    ->action(function (Service $record, array $data): void {
                        $clone = $record->replicate();
                        $clone->title = $data['new_title'];
                        $clone->slug = $data['new_slug'];
                        $clone->save();
                    }),
                DeleteAction::make(),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListServices::route('/'),
            'create' => Pages\CreateService::route('/create'),
            'edit' => Pages\EditService::route('/{record}/edit'),
        ];
    }
}
