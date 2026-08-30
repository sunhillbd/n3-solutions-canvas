<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SiteSettingResource\Pages;
use App\Models\SiteSetting;
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

class SiteSettingResource extends Resource
{
    protected static ?string $model = SiteSetting::class;

    protected static string | BackedEnum | null $navigationIcon = 'heroicon-o-cog-6-tooth';

    protected static string | UnitEnum | null $navigationGroup = 'Site Navigation & Layout';

    protected static ?string $navigationLabel = 'Website Settings';

    protected static ?int $navigationSort = 1;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Settings Area')
                    ->schema([
                        Components\TextInput::make('key')
                            ->label('Settings Identifier')
                            ->disabled()
                            ->formatStateUsing(fn ($state) => match ($state) {
                                'general' => 'Global Brand, Contact & Default SEO',
                                'header' => 'Top Navigation Header & Branding',
                                'footer' => 'Footer Columns & Layout',
                                default => ucfirst($state ?? ''),
                            }),
                    ]),

                // 1. General Global Settings
                Section::make('General Brand & Global Identity')
                    ->visible(fn ($record) => $record?->key === 'general')
                    ->schema([
                        Tabs::make('GeneralSettingsTabs')
                            ->tabs([
                                Tabs\Tab::make('Brand & Identity')
                                    ->icon('heroicon-o-building-office-2')
                                    ->schema([
                                        Components\TextInput::make('payload.site_name')
                                            ->label('Website / Company Name')
                                            ->default('N3 Solutions Limited')
                                            ->required(),
                                        Components\TextInput::make('payload.tagline')
                                            ->label('Global Tagline')
                                            ->default('Engineering measured, connected and maintainable infrastructure at national scale.'),
                                        Components\FileUpload::make('payload.logo')
                                            ->label('Website Logo (SVG, PNG or JPG)')
                                            ->image()
                                            ->disk('public')
                                            ->directory('settings')
                                            ->visibility('public')
                                            ->maxSize(5120)
                                            ->helperText('Upload transparent SVG, PNG, JPG or WEBP (Max 5MB).'),
                                        Components\FileUpload::make('payload.favicon')
                                            ->label('Website Favicon (ICO or PNG)')
                                            ->disk('public')
                                            ->directory('settings')
                                            ->visibility('public')
                                            ->maxSize(2048)
                                            ->acceptedFileTypes(['image/x-icon', 'image/vnd.microsoft.icon', 'image/png', 'image/svg+xml', 'image/svg', 'image/jpeg', 'image/webp', 'text/plain', 'text/xml'])
                                            ->helperText('Upload ICO, PNG or SVG favicon (Max 2MB).'),
                                    ])->columns(2),

                                Tabs\Tab::make('Contact & Office')
                                    ->icon('heroicon-o-envelope')
                                    ->schema([
                                        Components\TextInput::make('payload.contact_email')
                                            ->label('Primary Contact Email')
                                            ->email()
                                            ->default('contact@n3solutions.com')
                                            ->required(),
                                        Components\TextInput::make('payload.contact_phone')
                                            ->label('Telephone Number')
                                            ->default('+880 2 000 0000'),
                                        Components\Textarea::make('payload.office_address')
                                            ->label('Physical Office Address')
                                            ->default('Gulshan Avenue, Dhaka 1212, Bangladesh')
                                            ->rows(2)
                                            ->columnSpanFull(),
                                        Components\TextInput::make('payload.copyright_text')
                                            ->label('Footer Copyright Notice')
                                            ->default('© 2026 N3 Solutions Limited. All rights reserved.')
                                            ->columnSpanFull(),
                                    ])->columns(2),

                                Tabs\Tab::make('Social Media')
                                    ->icon('heroicon-o-share')
                                    ->schema([
                                        Components\TextInput::make('payload.social_links.linkedin')
                                            ->label('LinkedIn Profile URL')
                                            ->url()
                                            ->placeholder('https://linkedin.com/company/...'),
                                        Components\TextInput::make('payload.social_links.twitter')
                                            ->label('Twitter / X Profile URL')
                                            ->url()
                                            ->placeholder('https://x.com/...'),
                                        Components\TextInput::make('payload.social_links.facebook')
                                            ->label('Facebook Page URL')
                                            ->url()
                                            ->placeholder('https://facebook.com/...'),
                                        Components\TextInput::make('payload.social_links.github')
                                            ->label('GitHub Organization URL')
                                            ->url()
                                            ->placeholder('https://github.com/...'),
                                    ])->columns(2),

                                Tabs\Tab::make('Global Default SEO')
                                    ->icon('heroicon-o-magnifying-glass')
                                    ->schema([
                                        Components\TextInput::make('payload.default_seo.meta_title')
                                            ->label('Default Meta Title')
                                            ->default('N3 Solutions Limited — Infrastructure & IoT Engineering')
                                            ->helperText('Fallback title when page-specific title is not set.'),
                                        Components\Textarea::make('payload.default_seo.meta_description')
                                            ->label('Default Meta Description')
                                            ->default('N3 Solutions Limited engineers smart water metering, IoT infrastructure and field operations for utilities and public infrastructure at national scale.')
                                            ->rows(3)
                                            ->helperText('Fallback meta description for search engines and social cards.'),
                                        Components\FileUpload::make('payload.default_seo.og_image')
                                            ->label('Default Social Share Card (OG Image)')
                                            ->disk('public')
                                            ->directory('settings')
                                            ->visibility('public')
                                            ->maxSize(5120)
                                            ->imageResizeMode('cover')
                                            ->imageCropAspectRatio('1200:630')
                                            ->helperText('Recommended 1200x630px JPG, PNG or WEBP (Max 5MB).'),
                                    ])->columns(1),
                            ])
                            ->columnSpanFull(),
                    ]),

                // 2. Header Specific Settings
                Section::make('Header Configuration')
                    ->visible(fn ($record) => $record?->key === 'header')
                    ->schema([
                        Components\TextInput::make('payload.logo_text')
                            ->label('Logo / Brand Text')
                            ->default('N3 Solutions Limited'),
                        Components\Toggle::make('payload.show_cta_button')
                            ->label('Display "Talk to us" Action Button in Header')
                            ->default(true),
                        Components\TextInput::make('payload.cta_button_text')
                            ->label('Header Button Label')
                            ->default('Talk to us'),
                        Components\TextInput::make('payload.cta_button_link')
                            ->label('Header Button Link Destination')
                            ->default('/contact'),

                        Components\Repeater::make('payload.menu_items')
                            ->label('Header Navigation Menu Items')
                            ->schema([
                                Components\TextInput::make('label')->label('Menu Label (e.g. Services, About, Partners)')->required(),
                                Components\TextInput::make('url')->label('URL / Route (e.g. /services, /about)')->required(),
                                Components\Select::make('type')
                                    ->label('Type')
                                    ->options([
                                        'link' => 'Direct Link',
                                        'dropdown' => 'Dropdown Menu',
                                    ])
                                    ->default('link')
                                    ->reactive(),
                                Components\Repeater::make('children')
                                    ->label('Dropdown Sub-Items')
                                    ->visible(fn ($get) => $get('type') === 'dropdown')
                                    ->schema([
                                        Components\TextInput::make('label')->label('Sub-Item Label')->required(),
                                        Components\TextInput::make('url')->label('Sub-Item URL')->required(),
                                        Components\TextInput::make('desc')->label('Brief Subtitle / Description'),
                                    ])
                                    ->columns(3)
                                    ->collapsible(),
                            ])
                            ->collapsible()
                            ->reorderableWithButtons()
                            ->columnSpanFull(),
                    ])->columns(2),

                // 3. Footer Specific Settings
                Section::make('Footer Configuration')
                    ->visible(fn ($record) => $record?->key === 'footer')
                    ->schema([
                        Components\Textarea::make('payload.tagline')
                            ->label('Footer Tagline / Mission Statement')
                            ->rows(2)
                            ->columnSpanFull(),
                        Components\TextInput::make('payload.contact_email')
                            ->label('Primary Contact Email')
                            ->email(),
                        Components\TextInput::make('payload.contact_phone')
                            ->label('Primary Telephone Number'),
                        Components\Textarea::make('payload.office_address')
                            ->label('Office Address')
                            ->rows(2),
                        Components\TextInput::make('payload.copyright_text')
                            ->label('Copyright Notice'),

                        Components\Repeater::make('payload.columns')
                            ->label('Footer Navigation Columns')
                            ->schema([
                                Components\TextInput::make('title')->label('Column Title (e.g. Company, Solutions, Resources)')->required(),
                                Components\Repeater::make('links')
                                    ->label('Column Links')
                                    ->schema([
                                        Components\TextInput::make('label')->label('Link Label')->required(),
                                        Components\TextInput::make('url')->label('Link URL')->required(),
                                    ])
                                    ->columns(2)
                                    ->collapsible(),
                            ])
                            ->collapsible()
                            ->reorderableWithButtons()
                            ->columnSpanFull(),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('key')
                    ->label('Settings Area')
                    ->weight('bold')
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'general' => 'Global Brand, Contact & Default SEO',
                        'header' => 'Header Navigation & Top Bar',
                        'footer' => 'Footer Columns & Layout',
                        default => ucfirst($state),
                    }),
                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Last Updated')
                    ->dateTime('M d, Y H:i'),
            ])
            ->actions([
                EditAction::make()->label('Configure Settings'),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListSiteSettings::route('/'),
            'edit' => Pages\EditSiteSetting::route('/{record}/edit'),
        ];
    }
}
