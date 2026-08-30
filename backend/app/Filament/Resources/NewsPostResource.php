<?php

namespace App\Filament\Resources;

use App\Filament\Resources\NewsPostResource\Pages;
use App\Models\NewsPost;
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

class NewsPostResource extends Resource
{
    protected static ?string $model = NewsPost::class;

    protected static string | BackedEnum | null $navigationIcon = 'heroicon-o-newspaper';

    protected static string | UnitEnum | null $navigationGroup = 'Site Content';

    protected static ?int $navigationSort = 5;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Article Information')
                    ->schema([
                        Components\TextInput::make('title')
                            ->label('Article Headline')
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
                            ->unique(NewsPost::class, 'slug', ignoreRecord: true),
                        Components\TextInput::make('published_date_text')
                            ->label('Display Date')
                            ->placeholder('e.g. 12 August 2026')
                            ->helperText('Formatted date shown on website cards.'),
                        Components\DateTimePicker::make('published_at')
                            ->label('Publication Date / Timestamp')
                            ->default(now()),
                        Components\Textarea::make('summary')
                            ->label('Article Summary / Excerpt')
                            ->rows(3)
                            ->required()
                            ->columnSpanFull(),
                        Components\RichEditor::make('content')
                            ->label('Full Story / Article Content')
                            ->columnSpanFull(),
                        Components\FileUpload::make('featured_image')
                            ->label('Featured Article Image')
                            ->image()
                            ->disk('public')
                            ->directory('news')
                            ->visibility('public')
                            ->maxSize(8192)
                            ->helperText('Upload JPG, PNG or WEBP (Max 8MB).'),
                        Components\TextInput::make('external_link')
                            ->label('External Press Release Link')
                            ->url()
                            ->placeholder('https://...'),
                        Components\Toggle::make('is_published')
                            ->label('Published & Live in Newsroom')
                            ->default(true),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('featured_image')
                    ->label('Thumbnail')
                    ->disk('public')
                    ->square(),
                Tables\Columns\TextColumn::make('title')
                    ->label('Headline')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                Tables\Columns\TextColumn::make('published_date_text')
                    ->label('Date')
                    ->searchable(),
                Tables\Columns\IconColumn::make('is_published')
                    ->label('Live')
                    ->boolean()
                    ->sortable(),
                Tables\Columns\TextColumn::make('published_at')
                    ->label('Published At')
                    ->dateTime('M d, Y')
                    ->sortable(),
            ])
            ->defaultSort('published_at', 'desc')
            ->filters([
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
            'index' => Pages\ListNewsPosts::route('/'),
            'create' => Pages\CreateNewsPost::route('/create'),
            'edit' => Pages\EditNewsPost::route('/{record}/edit'),
        ];
    }
}
