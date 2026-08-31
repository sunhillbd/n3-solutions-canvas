<?php

namespace App\Filament\Resources;

use App\Filament\Resources\SiteSettingResource\Pages;
use App\Models\SiteSetting;
use Filament\Actions\EditAction;
use Filament\Forms\Components;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\View as SchemaView;
use Filament\Schemas\Schema;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use UnitEnum;
use BackedEnum;

class SiteSettingResource extends Resource
{
    protected static ?string $model = SiteSetting::class;

    protected static string | BackedEnum | null $navigationIcon = 'heroicon-o-adjustments-horizontal';

    protected static string | UnitEnum | null $navigationGroup = 'Website & Branding';

    protected static ?string $navigationLabel = 'Website Settings';

    protected static ?int $navigationSort = 1;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                // 1. Main Site & Global Settings Layout (Vertical Left Menu Tabs)
                Tabs::make('SettingsTabs')
                    ->extraAttributes(['class' => 'vertical-section-tabs'])
                    ->contained(false)
                    ->visible(fn ($record) => $record?->key === 'general')
                    ->tabs([
                        // Tab 1: Branding
                        Tabs\Tab::make('Branding')
                            ->icon('heroicon-o-paint-brush')
                            ->schema([
                                self::getBrandingSection(),
                            ]),

                        // Tab 2: Site Info
                        Tabs\Tab::make('Site Info')
                            ->icon('heroicon-o-building-office-2')
                            ->schema([
                                self::getSiteInfoSection(),
                            ]),

                        // Tab 3: Social Links
                        Tabs\Tab::make('Social Links')
                            ->icon('heroicon-o-share')
                            ->schema([
                                self::getSocialLinksSection(),
                            ]),

                        // Tab 4: SEO & Meta
                        Tabs\Tab::make('SEO & Meta')
                            ->icon('heroicon-o-magnifying-glass')
                            ->schema([
                                self::getSeoSection(),
                            ]),

                        // Tab 5: AEO & AI Search
                        Tabs\Tab::make('AEO & AI Search')
                            ->icon('heroicon-o-sparkles')
                            ->schema([
                                self::getAeoSection(),
                            ]),

                        // Tab 6: Google Tag
                        Tabs\Tab::make('Google Tag')
                            ->icon('heroicon-o-tag')
                            ->schema([
                                self::getAnalyticsSection(),
                            ]),
                    ])
                    ->columnSpanFull(),

                // 3. Top Navigation Header Settings
                Section::make('Top Navigation Header & Menu Architecture')
                    ->description('Manage primary logo text, CTA button, styling, and multi-level header menu items.')
                    ->visible(fn ($record) => $record?->key === 'header')
                    ->schema([
                        Components\TextInput::make('payload.logo_text')
                            ->label('Brand Logo Text')
                            ->default('N3 Solutions Limited')
                            ->required(),
                        Components\ColorPicker::make('payload.bg_color')
                            ->label('Header Background Color')
                            ->helperText('Custom background color for the top navigation bar (e.g. #FFFFFF).'),
                        Components\ColorPicker::make('payload.text_color')
                            ->label('Header Text Color'),
                        Components\Toggle::make('payload.show_cta_button')
                            ->label('Display "Talk to us" Action Button in Header')
                            ->default(true)
                            ->inline(false),
                        Components\TextInput::make('payload.cta_button_text')
                            ->label('Header Button Label')
                            ->default('Talk to us'),
                        Components\TextInput::make('payload.cta_button_link')
                            ->label('Header Button Link Destination')
                            ->default('/contact'),
                        Components\ColorPicker::make('payload.btn_bg_color')
                            ->label('Header Button Background Color'),
                        Components\ColorPicker::make('payload.btn_text_color')
                            ->label('Header Button Text Color'),

                        Components\Repeater::make('payload.menu_items')
                            ->label('Header Navigation Menu Architecture')
                            ->addActionLabel('Add Menu Item')
                            ->schema([
                                Components\TextInput::make('label')->label('Menu Item Label')->required(),
                                Components\TextInput::make('url')->label('Destination URL / Route')->required(),
                                Components\Select::make('type')
                                    ->label('Menu Type')
                                    ->options([
                                        'link' => 'Direct Link',
                                        'dropdown' => 'Dropdown Sub-Menu',
                                    ])
                                    ->default('link')
                                    ->reactive(),
                                Components\Repeater::make('children')
                                    ->label('Dropdown Sub-Items')
                                    ->addActionLabel('Add Sub-Item')
                                    ->visible(fn ($get) => $get('type') === 'dropdown')
                                    ->schema([
                                        Components\TextInput::make('label')->label('Sub-Item Title')->required(),
                                        Components\TextInput::make('url')->label('Sub-Item URL')->required(),
                                        Components\TextInput::make('desc')->label('Supporting Subtitle / Descriptor'),
                                    ])
                                    ->columns(3)
                                    ->collapsible()
                                    ->reorderableWithButtons(),
                            ])
                            ->collapsible()
                            ->reorderableWithButtons()
                            ->itemLabel(fn (array $state): ?string => $state['label'] ?? null)
                            ->columnSpanFull(),
                    ])->columns(2),

                // 4. Footer Configuration Settings
                Section::make('Footer Architecture & Legal Notice')
                    ->description('Configure footer mission copy, office contact channels, navigation columns, and styling.')
                    ->visible(fn ($record) => $record?->key === 'footer')
                    ->schema([
                        Components\ColorPicker::make('payload.bg_color')
                            ->label('Footer Background Color')
                            ->helperText('Custom background color for the footer section (e.g. #091224).'),
                        Components\ColorPicker::make('payload.text_color')
                            ->label('Footer Text Color')
                            ->helperText('Custom text color for footer content.'),
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
                            ->label('Physical Headquarters Office Address')
                            ->rows(2),
                        Components\TextInput::make('payload.copyright_text')
                            ->label('Footer Copyright Notice'),

                        Components\Repeater::make('payload.columns')
                            ->label('Footer Multi-Column Link Directories')
                            ->addActionLabel('Add Column')
                            ->schema([
                                Components\TextInput::make('title')->label('Column Heading (e.g. Company, Solutions, Resources)')->required(),
                                Components\Repeater::make('links')
                                    ->label('Column Links')
                                    ->addActionLabel('Add Link')
                                    ->schema([
                                        Components\TextInput::make('label')->label('Link Label')->required(),
                                        Components\TextInput::make('url')->label('Target URL')->required(),
                                    ])
                                    ->columns(2)
                                    ->collapsible()
                                    ->reorderableWithButtons(),
                            ])
                            ->collapsible()
                            ->reorderableWithButtons()
                            ->itemLabel(fn (array $state): ?string => $state['title'] ?? null)
                            ->columnSpanFull(),
                    ])->columns(2),
            ]);
    }

    /* Sub-Section 1: Branding & Media Assets */
    protected static function getBrandingSection(): Section
    {
        return Section::make('Branding & Media Assets')
            ->description('Upload official brand logos and browser icons used across the application.')
            ->icon('heroicon-o-paint-brush')
            ->schema([
                Components\FileUpload::make('payload.logo')
                    ->label('Logo (Light Mode)  —  [PNG / SVG / WEBP]')
                    ->helperText('Main brand mark used on white or light backgrounds across navigation headers and sidebars.')
                    ->image()
                    ->acceptedFileTypes(['image/svg+xml', 'image/png', 'image/jpeg', 'image/webp', 'image/gif'])
                    ->disk('public')
                    ->directory('settings')
                    ->visibility('public')
                    ->maxSize(5120)
                    ->columnSpan(1),

                Components\FileUpload::make('payload.logo_dark')
                    ->label('Logo (Dark Mode)  —  [PNG / SVG / WEBP]')
                    ->helperText('Alternative brand mark used for dark backgrounds, footer banners, or dark theme views.')
                    ->image()
                    ->acceptedFileTypes(['image/svg+xml', 'image/png', 'image/jpeg', 'image/webp', 'image/gif'])
                    ->disk('public')
                    ->directory('settings')
                    ->visibility('public')
                    ->maxSize(5120)
                    ->columnSpan(1),

                Components\FileUpload::make('payload.favicon')
                    ->label('Favicon / Browser Icon  —  [ICO / PNG / SVG]')
                    ->helperText('Browser tab shortcut icon and mobile home-screen badge.')
                    ->disk('public')
                    ->directory('settings')
                    ->visibility('public')
                    ->maxSize(2048)
                    ->acceptedFileTypes(['image/x-icon', 'image/vnd.microsoft.icon', 'image/png', 'image/svg+xml', 'image/jpeg', 'image/webp'])
                    ->columnSpan(1),

                Components\TextInput::make('payload.logo_width')
                    ->label('Logo Width (px)')
                    ->numeric()
                    ->minValue(20)
                    ->maxValue(800)
                    ->suffix('px')
                    ->placeholder('e.g. 160 (or blank for auto)')
                    ->helperText('Custom display width in pixels. Leave empty for automatic width calculation.')
                    ->columnSpan(1),

                Components\TextInput::make('payload.logo_height')
                    ->label('Logo Height (px)')
                    ->numeric()
                    ->minValue(16)
                    ->maxValue(300)
                    ->suffix('px')
                    ->placeholder('e.g. 36 (default: 32px)')
                    ->helperText('Custom display height in pixels. Default is 32px.')
                    ->columnSpan(1),

                Components\ColorPicker::make('payload.header_bg_color')
                    ->label('Header Background Color (Global)')
                    ->helperText('Default background color for the navigation header.')
                    ->columnSpan(1),

                Components\ColorPicker::make('payload.footer_bg_color')
                    ->label('Footer Background Color (Global)')
                    ->helperText('Default background color for the website footer.')
                    ->columnSpan(1),
            ])
            ->columns(3);
    }

    /* Sub-Section 2: Site Info & Official Contact */
    protected static function getSiteInfoSection(): Section
    {
        return Section::make('Site Information & Corporate Channels')
            ->description('Official organization details, public contact channels, and physical office location.')
            ->icon('heroicon-o-building-office-2')
            ->schema([
                Components\TextInput::make('payload.site_name')
                    ->label('Website / Company Name')
                    ->default('N3 Solutions Limited')
                    ->required(),
                Components\TextInput::make('payload.tagline')
                    ->label('Global Tagline')
                    ->default('Engineering measured, connected and maintainable infrastructure at national scale.'),
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
                    ->rows(2),
                Components\TextInput::make('payload.copyright_text')
                    ->label('Footer Copyright Notice')
                    ->default('© 2026 N3 Solutions Limited. All rights reserved.'),
            ])
            ->columns(2);
    }

    /* Sub-Section 3: Social Links */
    protected static function getSocialLinksSection(): Section
    {
        return Section::make('Social Profiles & Digital Presence')
            ->description('Official corporate social media profiles and source code repositories.')
            ->icon('heroicon-o-share')
            ->schema([
                Components\TextInput::make('payload.social_links.linkedin')
                    ->label('LinkedIn Profile URL')
                    ->url()
                    ->placeholder('https://linkedin.com/company/n3-solutions'),
                Components\TextInput::make('payload.social_links.twitter')
                    ->label('Twitter / X Profile URL')
                    ->url()
                    ->placeholder('https://x.com/n3solutions'),
                Components\TextInput::make('payload.social_links.facebook')
                    ->label('Facebook Page URL')
                    ->url()
                    ->placeholder('https://facebook.com/n3solutions'),
                Components\TextInput::make('payload.social_links.github')
                    ->label('GitHub Organization URL')
                    ->url()
                    ->placeholder('https://github.com/n3solutions'),
            ])
            ->columns(2);
    }

    /* Sub-Section 4: SEO & Meta */
    protected static function getSeoSection(): Section
    {
        return Section::make('Search Engine Optimization (SEO)')
            ->description('Default meta titles, descriptions, and OpenGraph social card previews for web crawlers.')
            ->icon('heroicon-o-magnifying-glass')
            ->schema([
                Components\TextInput::make('payload.default_seo.meta_title')
                    ->label('Default Meta Title')
                    ->default('N3 Solutions Limited — Infrastructure & IoT Engineering')
                    ->helperText('Fallback title when page-specific title is not set.')
                    ->columnSpanFull(),
                Components\Textarea::make('payload.default_seo.meta_description')
                    ->label('Default Meta Description')
                    ->default('N3 Solutions Limited engineers smart water metering, IoT infrastructure and field operations for utilities and public infrastructure at national scale.')
                    ->rows(3)
                    ->helperText('Fallback meta description for search engines and social cards.')
                    ->columnSpanFull(),
                Components\FileUpload::make('payload.default_seo.og_image')
                    ->label('Default Social Share Card (OG Image)  —  [1200x630px]')
                    ->image()
                    ->disk('public')
                    ->directory('settings')
                    ->visibility('public')
                    ->maxSize(5120)
                    ->acceptedFileTypes(['image/svg+xml', 'image/png', 'image/jpeg', 'image/webp'])
                    ->helperText('Recommended 1200x630px JPG, PNG or WEBP (Max 5MB).')
                    ->columnSpanFull(),
            ]);
    }

    /* Sub-Section 5: AEO & AI Search */
    protected static function getAeoSection(): Section
    {
        return Section::make('Answer Engine Optimization (AEO)')
            ->description('Direct knowledge answers and core entities for generative AI engines (ChatGPT, Perplexity, Google AI Overviews).')
            ->icon('heroicon-o-sparkles')
            ->schema([
                Components\Textarea::make('payload.aeo.direct_answer')
                    ->label('AI Direct Answer Snippet')
                    ->default('N3 Solutions Limited is a specialized infrastructure and technology firm in Bangladesh engineering turnkey smart water metering, private LPWAN IoT networks, and SLA-backed utility field operations.')
                    ->rows(3)
                    ->helperText('Concise, factual summary optimized for direct citation in AI answers.')
                    ->columnSpanFull(),
                Components\TagsInput::make('payload.aeo.key_entities')
                    ->label('Core Knowledge Graph Entities')
                    ->placeholder('Add entity and press enter')
                    ->default(['N3 Solutions Limited', 'Smart Water Metering', 'IoT Infrastructure', 'WASA Bangladesh', 'Non-Revenue Water'])
                    ->columnSpanFull(),
            ]);
    }

    /* Sub-Section 6: Google Tag & Analytics */
    protected static function getAnalyticsSection(): Section
    {
        return Section::make('Google Tag & Script Injection')
            ->description('Integrate Google Analytics 4, Tag Manager, or custom tracking pixels.')
            ->icon('heroicon-o-tag')
            ->schema([
                Components\TextInput::make('payload.analytics.google_tag_id')
                    ->label('Google Analytics / GTM ID')
                    ->placeholder('e.g. G-XXXXXXXXXX or GTM-XXXXXXX'),
                Components\Textarea::make('payload.analytics.custom_head_scripts')
                    ->label('Custom Header Scripts (<head>)')
                    ->placeholder('<!-- Custom tracking scripts -->')
                    ->rows(4)
                    ->columnSpanFull(),
            ])
            ->columns(1);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->emptyStateHeading('No configuration areas found')
            ->emptyStateDescription('System website settings will initialize on startup.')
            ->emptyStateIcon('heroicon-o-adjustments-horizontal')
            ->columns([
                Tables\Columns\TextColumn::make('key')
                    ->label('Configuration Area')
                    ->weight('bold')
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'general' => 'Site & Global Settings (Brand, Contact, SEO, AEO)',
                        'header' => 'Header Architecture & Navigation Menu',
                        'footer' => 'Footer Columns & Legal Notice',
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
