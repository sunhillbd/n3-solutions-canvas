<?php

namespace App\Filament\Resources;

use App\Filament\Resources\PageResource\Pages;
use App\Models\Page;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
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

class PageResource extends Resource
{
    protected static ?string $model = Page::class;

    protected static string | BackedEnum | null $navigationIcon = 'heroicon-o-document-duplicate';

    protected static string | UnitEnum | null $navigationGroup = 'Site Content';

    protected static ?int $navigationSort = 1;

    public static function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Page Sections Management')
                    ->tabs([
                        // 1. GENERAL IDENTITY & TEMPLATE
                        Tabs\Tab::make('General')
                            ->icon('heroicon-o-cog-6-tooth')
                            ->schema([
                                Section::make('Page Identity & Routing')
                                    ->description('Basic page title, URL routing slug, and layout template.')
                                    ->schema([
                                        Components\TextInput::make('title')
                                            ->label('PAGE TITLE')
                                            ->required()
                                            ->maxLength(255)
                                            ->live(onBlur: true)
                                            ->afterStateUpdated(function (string $operation, $state, $set) {
                                                if ($operation === 'create') {
                                                    $set('slug', \Illuminate\Support\Str::slug($state));
                                                }
                                            }),
                                        Components\TextInput::make('slug')
                                            ->label('URL SLUG / ROUTE PATH')
                                            ->required()
                                            ->unique(Page::class, 'slug', ignoreRecord: true)
                                            ->helperText('e.g. "about", "partners", "contact", or "/" for homepage.'),
                                        Components\Select::make('template')
                                            ->label('PAGE TEMPLATE')
                                            ->options([
                                                'home' => 'Homepage Layout',
                                                'about' => 'About Us Overview',
                                                'mission_vision' => 'Mission & Vision',
                                                'team' => 'Our Team & Leadership',
                                                'partners' => 'Partner Ecosystem',
                                                'contact' => 'Contact Us Page',
                                                'custom' => 'Custom Landing Page',
                                            ])
                                            ->required()
                                            ->live()
                                            ->default('custom'),
                                        Components\Toggle::make('is_published')
                                            ->label('Published & Publicly Visible')
                                            ->default(true)
                                            ->inline(false),
                                        Components\TextInput::make('sort_order')
                                            ->label('SORT ORDER')
                                            ->numeric()
                                            ->default(0),
                                    ])->columns(2),
                            ]),

                        // 2. SEO & AEO
                        Tabs\Tab::make('SEO & AEO')
                            ->icon('heroicon-o-magnifying-glass')
                            ->schema([
                                Section::make('SEO & AEO')
                                    ->description('Search engine and AI answer engine settings for this page.')
                                    ->schema([
                                        Components\Toggle::make('section_toggles.show_seo_aeo')
                                            ->label('On the page')
                                            ->default(true)
                                            ->inline(false)
                                            ->helperText('Enable customized SEO meta tags and AEO citations for this page.'),
                                        Components\TextInput::make('seo.meta_title')
                                            ->label('PAGE TITLE')
                                            ->helperText('Shown in the browser tab and search results. Leave blank to use the site-wide default.'),
                                        Components\Textarea::make('seo.meta_description')
                                            ->label('META DESCRIPTION')
                                            ->rows(3)
                                            ->helperText('Around 150–160 characters work best for search result snippets. Leave blank to use the site-wide default.'),
                                        Components\TagsInput::make('seo.meta_keywords')
                                            ->label('META KEYWORDS')
                                            ->placeholder('Add keywords (comma separated)')
                                            ->helperText('Leave blank to use the site-wide default.'),
                                        Components\FileUpload::make('seo.og_image')
                                            ->label('SOCIAL SHARE IMAGE')
                                            ->image()
                                            ->disk('public')
                                            ->directory('seo')
                                            ->visibility('public')
                                            ->maxSize(5120)
                                            ->imageResizeMode('cover')
                                            ->imageCropAspectRatio('1200:630')
                                            ->helperText('Click or drag image here to upload. SVG, PNG, JPG or GIF (max. 5MB).'),
                                        Components\TextInput::make('seo.canonical_url')
                                            ->label('CUSTOM CANONICAL URL')
                                            ->url()
                                            ->helperText('Optional canonical URL link.'),
                                        Components\Textarea::make('aeo.direct_answer')
                                            ->label('AI DIRECT ANSWER SNIPPET (TL;DR)')
                                            ->rows(2)
                                            ->helperText('Concise 1–2 sentence factual summary optimized for direct quote extraction by Perplexity, ChatGPT, and AI Overviews.'),
                                        Components\TagsInput::make('aeo.key_entities')
                                            ->label('KNOWLEDGE GRAPH ENTITIES')
                                            ->placeholder('Add entity (e.g. Smart Water Metering, Dhaka WASA, LoRaWAN)'),
                                        Components\Repeater::make('aeo.facts_keypoints')
                                            ->label('FACTUAL Q&A RETRIEVAL KEYPOINTS')
                                            ->schema([
                                                Components\TextInput::make('fact_question')->label('Fact Question')->required(),
                                                Components\Textarea::make('fact_answer')->label('Factual Direct Answer')->rows(2)->required(),
                                            ])->columns(2)->collapsible(),
                                    ])->columns(1),
                            ]),

                        // 3. ANNOUNCEMENT & NAVIGATION BAR
                        Tabs\Tab::make('Header & Announcement')
                            ->icon('heroicon-o-bars-3')
                            ->schema([
                                Section::make('Announcement Bar')
                                    ->description('The thin banner strip above the navigation.')
                                    ->schema([
                                        Components\Toggle::make('section_toggles.show_announcement_bar')
                                            ->label('On the page')
                                            ->default(false)
                                            ->inline(false),
                                        Components\TextInput::make('content.announcement_text')
                                            ->label('ANNOUNCEMENT TEXT')
                                            ->placeholder('e.g. Now expanding smart metering across Dhaka WASA zones'),
                                        Components\TextInput::make('content.announcement_link')
                                            ->label('ANNOUNCEMENT LINK URL')
                                            ->placeholder('e.g. /services/smart-water-metering'),
                                    ])->columns(2),

                                Section::make('Navigation Header CTA')
                                    ->description('The sticky header menu links and primary header action button.')
                                    ->schema([
                                        Components\Toggle::make('section_toggles.show_navigation')
                                            ->label('On the page')
                                            ->default(true)
                                            ->inline(false),
                                        Components\TextInput::make('content.nav_cta_text')
                                            ->label('HEADER CTA BUTTON TEXT')
                                            ->placeholder('Get in touch'),
                                        Components\TextInput::make('content.nav_cta_link')
                                            ->label('HEADER CTA BUTTON LINK')
                                            ->placeholder('/contact'),
                                    ])->columns(2),
                            ]),

                        // 4. HERO SECTION
                        Tabs\Tab::make('Hero')
                            ->icon('heroicon-o-sparkles')
                            ->schema([
                                Section::make('Hero')
                                    ->description('The first screen: rotating headline, intro copy, buttons and visual telemetry.')
                                    ->schema([
                                        Components\Toggle::make('section_toggles.show_hero')
                                            ->label('On the page')
                                            ->default(true)
                                            ->inline(false),
                                        Components\TextInput::make('content.hero_eyebrow')
                                            ->label('EYEBROW BADGE / CATEGORY')
                                            ->placeholder('e.g. N3 Solutions Limited or Contact Us'),
                                        Components\TextInput::make('content.hero_title')
                                            ->label('MAIN HEADLINE')
                                            ->placeholder('Engineering the infrastructure behind smarter cities')
                                            ->required(),
                                        Components\Textarea::make('content.hero_subtitle')
                                            ->label('SUBTITLE / SUMMARY COPY')
                                            ->rows(3)
                                            ->placeholder('We design, deploy and maintain metering and IoT infrastructure for utilities...'),
                                        Components\TextInput::make('content.hero_cta_text')
                                            ->label('PRIMARY BUTTON LABEL')
                                            ->placeholder('Start a conversation'),
                                        Components\TextInput::make('content.hero_cta_link')
                                            ->label('PRIMARY BUTTON LINK')
                                            ->placeholder('/contact'),
                                        Components\TextInput::make('content.hero_secondary_cta_text')
                                            ->label('SECONDARY LINK TEXT')
                                            ->placeholder('Explore our capabilities'),
                                        Components\TextInput::make('content.hero_secondary_cta_link')
                                            ->label('SECONDARY LINK TARGET')
                                            ->placeholder('#capabilities'),
                                    ])->columns(2),
                            ]),

                        // 5. CONTACT & INQUIRY FORM (for Contact template or any page)
                        Tabs\Tab::make('Contact Details & Form')
                            ->icon('heroicon-o-envelope')
                            ->visible(fn ($get) => in_array($get('template'), ['contact', 'home', 'custom']))
                            ->schema([
                                Section::make('Contact Information Block')
                                    ->description('Office location, direct email, telephone, and working hours.')
                                    ->schema([
                                        Components\Toggle::make('section_toggles.show_contact_details')
                                            ->label('On the page')
                                            ->default(true)
                                            ->inline(false),
                                        Components\TextInput::make('content.office_address')
                                            ->label('OFFICE ADDRESS')
                                            ->placeholder('Gulshan Avenue, Dhaka 1212, Bangladesh'),
                                        Components\TextInput::make('content.contact_email')
                                            ->label('DIRECT INQUIRY EMAIL')
                                            ->email()
                                            ->placeholder('contact@n3solutions.com'),
                                        Components\TextInput::make('content.contact_phone')
                                            ->label('TELEPHONE NUMBER')
                                            ->placeholder('+880 2 000 0000'),
                                        Components\TextInput::make('content.office_hours')
                                            ->label('OFFICE HOURS')
                                            ->placeholder('Sunday – Thursday: 09:00 – 18:00 (BST)'),
                                        Components\Repeater::make('content.details_list')
                                            ->label('CUSTOM CONTACT CARDS')
                                            ->schema([
                                                Components\TextInput::make('label')->label('Card Label (e.g. Metrology Lab)')->required(),
                                                Components\TextInput::make('value')->label('Card Value / Details')->required(),
                                                Components\TextInput::make('icon')->label('Lucide Icon Name')->default('MapPin'),
                                            ])->columns(3)->collapsible(),
                                    ])->columns(2),

                                Section::make('Inquiry Form Block')
                                    ->description('Direct engineering contact form settings.')
                                    ->schema([
                                        Components\Toggle::make('section_toggles.show_contact_form')
                                            ->label('On the page')
                                            ->default(true)
                                            ->inline(false),
                                        Components\TextInput::make('content.form_title')
                                            ->label('FORM HEADING')
                                            ->placeholder('Start a conversation with our engineers.'),
                                        Components\TextInput::make('content.form_subtitle')
                                            ->label('FORM SUBTITLE')
                                            ->placeholder('Tell us about your infrastructure objectives.'),
                                        Components\TextInput::make('content.form_button_text')
                                            ->label('SUBMIT BUTTON TEXT')
                                            ->placeholder('Send enquiry'),
                                        Components\TextInput::make('content.form_success_message')
                                            ->label('SUCCESS CONFIRMATION MESSAGE')
                                            ->placeholder('Thank you. Your inquiry has been received. Our engineering team will review and respond shortly.'),
                                    ])->columns(2),
                            ]),

                        // 6. STATS & SCALE BAR
                        Tabs\Tab::make('Stats & Scale')
                            ->icon('heroicon-o-chart-bar')
                            ->schema([
                                Section::make('Stats Bar')
                                    ->description('Key trust, scale and verification metrics.')
                                    ->schema([
                                        Components\Toggle::make('section_toggles.show_stats_bar')
                                            ->label('On the page')
                                            ->default(true)
                                            ->inline(false),
                                        Components\Repeater::make('content.stats')
                                            ->label('STATISTICS CARDS')
                                            ->schema([
                                                Components\TextInput::make('value')->label('Metric Value (e.g. 860,000+)')->required(),
                                                Components\TextInput::make('label')->label('Metric Label (e.g. Addressable endpoints)')->required(),
                                                Components\TextInput::make('subtext')->label('Subtext (Optional)'),
                                            ])
                                            ->columns(3)
                                            ->collapsible()
                                            ->reorderableWithButtons(),
                                    ]),
                            ]),

                        // 7. CONTENT BLOCKS (Template specific)
                        Tabs\Tab::make('Main Content Blocks')
                            ->icon('heroicon-o-squares-2x2')
                            ->schema([
                                // A. Homepage specific blocks
                                Section::make('Capabilities Section (Homepage)')
                                    ->visible(fn ($get) => $get('template') === 'home')
                                    ->description('Four disciplines, one delivery model.')
                                    ->schema([
                                        Components\Toggle::make('section_toggles.show_capabilities')
                                            ->label('On the page')
                                            ->default(true)
                                            ->inline(false),
                                        Components\TextInput::make('content.capabilities_eyebrow')
                                            ->label('EYEBROW')
                                            ->placeholder('Capabilities'),
                                        Components\TextInput::make('content.capabilities_title')
                                            ->label('HEADING')
                                            ->placeholder('Four disciplines, one delivery model'),
                                    ])->columns(2),

                                Section::make('About Teaser Section (Homepage)')
                                    ->visible(fn ($get) => $get('template') === 'home')
                                    ->description('National metering upgrade story with stats.')
                                    ->schema([
                                        Components\Toggle::make('section_toggles.show_about_teaser')
                                            ->label('On the page')
                                            ->default(true)
                                            ->inline(false),
                                        Components\TextInput::make('content.about_eyebrow')
                                            ->label('EYEBROW')
                                            ->placeholder('About N3 Solutions'),
                                        Components\TextInput::make('content.about_title')
                                            ->label('HEADING')
                                            ->placeholder('A national metering upgrade, delivered zone by zone'),
                                        Components\Textarea::make('content.about_text')
                                            ->label('DESCRIPTION')
                                            ->rows(3),
                                        Components\Repeater::make('content.about_stats')
                                            ->label('ABOUT STATS HIGHLIGHTS')
                                            ->schema([
                                                Components\TextInput::make('v')->label('Value (e.g. 32%)')->required(),
                                                Components\TextInput::make('l')->label('Label (e.g. Non-revenue water)')->required(),
                                            ])->columns(2)->collapsible(),
                                    ])->columns(2),

                                // B. About page specific blocks
                                Section::make('Who We Are & Operating Principles (About Us)')
                                    ->visible(fn ($get) => $get('template') === 'about')
                                    ->description('Company identity, mission focus, and core principles cards.')
                                    ->schema([
                                        Components\Toggle::make('section_toggles.show_who_we_are')
                                            ->label('On the page')
                                            ->default(true)
                                            ->inline(false),
                                        Components\TextInput::make('content.who_we_are_eyebrow')
                                            ->label('EYEBROW')
                                            ->placeholder('Identity & Focus'),
                                        Components\TextInput::make('content.who_we_are_title')
                                            ->label('HEADING')
                                            ->placeholder('Built for the long term, measured by reliability'),
                                        Components\Textarea::make('content.who_we_are_text_1')
                                            ->label('PARAGRAPH 1')
                                            ->rows(3),
                                        Components\Textarea::make('content.who_we_are_text_2')
                                            ->label('PARAGRAPH 2')
                                            ->rows(3),
                                        Components\Repeater::make('content.principles')
                                            ->label('CORE PRINCIPLES CARDS')
                                            ->schema([
                                                Components\TextInput::make('title')->label('Principle Title')->required(),
                                                Components\Textarea::make('body')->label('Description')->rows(2)->required(),
                                                Components\TextInput::make('icon')->label('Lucide Icon')->default('Compass'),
                                            ])->columns(3)->collapsible(),
                                    ])->columns(2),

                                Section::make('Trajectory & Milestones Timeline (About Us)')
                                    ->visible(fn ($get) => $get('template') === 'about')
                                    ->description('Company trajectory and historical milestones.')
                                    ->schema([
                                        Components\Toggle::make('section_toggles.show_timeline')
                                            ->label('On the page')
                                            ->default(true)
                                            ->inline(false),
                                        Components\TextInput::make('content.timeline_eyebrow')
                                            ->label('EYEBROW')
                                            ->placeholder('Company Trajectory'),
                                        Components\TextInput::make('content.timeline_title')
                                            ->label('HEADING')
                                            ->placeholder('A measured, disciplined expansion'),
                                        Components\Repeater::make('content.milestones')
                                            ->label('MILESTONES TIMELINE')
                                            ->schema([
                                                Components\TextInput::make('year')->label('Year (e.g. 2019)')->required(),
                                                Components\TextInput::make('event')->label('Milestone Event Summary')->required(),
                                            ])->columns(2)->collapsible(),
                                    ])->columns(2),

                                // C. Mission & Vision specific blocks
                                Section::make('Mission & Vision Statements')
                                    ->visible(fn ($get) => $get('template') === 'mission_vision')
                                    ->description('Twin pillars: core purpose mission and long-term vision.')
                                    ->schema([
                                        Components\Toggle::make('section_toggles.show_mission_vision_boxes')
                                            ->label('On the page')
                                            ->default(true)
                                            ->inline(false),
                                        Components\TextInput::make('content.mission_title')
                                            ->label('MISSION TITLE')
                                            ->placeholder('Our Mission'),
                                        Components\Textarea::make('content.mission_text')
                                            ->label('MISSION STATEMENT')
                                            ->rows(3),
                                        Components\TextInput::make('content.vision_title')
                                            ->label('VISION TITLE')
                                            ->placeholder('Our Vision'),
                                        Components\Textarea::make('content.vision_text')
                                            ->label('VISION STATEMENT')
                                            ->rows(3),
                                    ])->columns(2),

                                Section::make('Core Operating Values Grid')
                                    ->visible(fn ($get) => $get('template') === 'mission_vision')
                                    ->description('Operating values that govern engineering delivery.')
                                    ->schema([
                                        Components\Toggle::make('section_toggles.show_values_grid')
                                            ->label('On the page')
                                            ->default(true)
                                            ->inline(false),
                                        Components\TextInput::make('content.values_eyebrow')
                                            ->label('EYEBROW')
                                            ->placeholder('Operating Principles'),
                                        Components\TextInput::make('content.values_title')
                                            ->label('HEADING')
                                            ->placeholder('The values that govern our delivery'),
                                        Components\Repeater::make('content.values')
                                            ->label('CORE VALUES CARDS')
                                            ->schema([
                                                Components\TextInput::make('title')->label('Value Title')->required(),
                                                Components\Textarea::make('description')->label('Description')->rows(2)->required(),
                                                Components\TextInput::make('icon')->label('Lucide Icon')->default('Droplets'),
                                            ])->columns(3)->collapsible(),
                                    ])->columns(2),

                                // D. Team specific blocks
                                Section::make('Leadership & Functional Leads (Team)')
                                    ->visible(fn ($get) => in_array($get('template'), ['home', 'team']))
                                    ->description('Leadership roster and functional engineering leads.')
                                    ->schema([
                                        Components\Toggle::make('section_toggles.show_team_teaser')
                                            ->label('On the page')
                                            ->default(true)
                                            ->inline(false),
                                        Components\TextInput::make('content.team_eyebrow')
                                            ->label('EYEBROW')
                                            ->placeholder('Leadership'),
                                        Components\TextInput::make('content.team_title')
                                            ->label('HEADING')
                                            ->placeholder('Founding partners'),
                                    ])->columns(2),

                                // E. Newsroom block
                                Section::make('Newsroom Teaser')
                                    ->visible(fn ($get) => in_array($get('template'), ['home']))
                                    ->description('Latest press releases and technical articles.')
                                    ->schema([
                                        Components\Toggle::make('section_toggles.show_newsroom')
                                            ->label('On the page')
                                            ->default(true)
                                            ->inline(false),
                                        Components\TextInput::make('content.news_eyebrow')
                                            ->label('EYEBROW')
                                            ->placeholder('Newsroom'),
                                        Components\TextInput::make('content.news_title')
                                            ->label('HEADING')
                                            ->placeholder('Latest updates'),
                                    ])->columns(2),

                                // F. Custom page content
                                Section::make('Custom Page Content')
                                    ->visible(fn ($get) => $get('template') === 'custom')
                                    ->schema([
                                        Components\MarkdownEditor::make('content.body_content')
                                            ->label('PAGE CONTENT BODY'),
                                    ]),
                            ]),

                        // 8. FAQ SECTION
                        Tabs\Tab::make('FAQs')
                            ->icon('heroicon-o-question-mark-circle')
                            ->schema([
                                Section::make('Frequently Asked Questions')
                                    ->description('Collapsible questions and answers on delivery models and technology.')
                                    ->schema([
                                        Components\Toggle::make('section_toggles.show_faqs')
                                            ->label('On the page')
                                            ->default(true)
                                            ->inline(false),
                                        Components\TextInput::make('content.faq_eyebrow')
                                            ->label('EYEBROW')
                                            ->placeholder('Frequently Asked Questions'),
                                        Components\TextInput::make('content.faq_title')
                                            ->label('HEADING')
                                            ->placeholder('Utility infrastructure & delivery'),
                                        Components\Textarea::make('content.faq_subtitle')
                                            ->label('SUBTITLE')
                                            ->rows(2)
                                            ->placeholder('Key questions on our deployment models, technology specifications, and regional operational capacity.'),
                                        Components\Repeater::make('content.page_faqs')
                                            ->label('PAGE-SPECIFIC FAQS (Overrides global FAQs if provided)')
                                            ->schema([
                                                Components\TextInput::make('question')->label('Question')->required(),
                                                Components\Textarea::make('answer')->label('Answer')->rows(2)->required(),
                                            ])->columns(2)->collapsible(),
                                    ])->columns(2),
                            ]),

                        // 9. CALL TO ACTION (CTA)
                        Tabs\Tab::make('Call To Action')
                            ->icon('heroicon-o-arrow-right-circle')
                            ->schema([
                                Section::make('Call To Action (CTA)')
                                    ->description('Bottom banner prompt to get in touch or start a conversation.')
                                    ->schema([
                                        Components\Toggle::make('section_toggles.show_cta')
                                            ->label('On the page')
                                            ->default(true)
                                            ->inline(false),
                                        Components\TextInput::make('content.cta_title')
                                            ->label('CTA HEADLINE')
                                            ->placeholder("Let's build the infrastructure Bangladesh needs"),
                                        Components\Textarea::make('content.cta_subtitle')
                                            ->label('CTA SUBTITLE')
                                            ->rows(2)
                                            ->placeholder('Speak with our team about metering programmes, network deployment and long-term operations.'),
                                        Components\TextInput::make('content.cta_button_text')
                                            ->label('BUTTON LABEL')
                                            ->placeholder('Get in touch'),
                                        Components\TextInput::make('content.cta_button_link')
                                            ->label('BUTTON LINK')
                                            ->placeholder('/contact'),
                                    ])->columns(2),
                            ]),
                    ])->columnSpanFull(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->label('Page Title')
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                Tables\Columns\TextColumn::make('slug')
                    ->label('Route / Slug')
                    ->badge()
                    ->color('gray')
                    ->searchable(),
                Tables\Columns\TextColumn::make('template')
                    ->label('Template')
                    ->badge()
                    ->color('info')
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_published')
                    ->label('Live')
                    ->boolean()
                    ->sortable(),
                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Last Modified')
                    ->dateTime('M d, Y H:i')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('template')
                    ->options([
                        'home' => 'Homepage',
                        'about' => 'About Us',
                        'mission_vision' => 'Mission & Vision',
                        'team' => 'Team',
                        'partners' => 'Partners',
                        'contact' => 'Contact',
                        'custom' => 'Custom',
                    ]),
                Tables\Filters\TernaryFilter::make('is_published')
                    ->label('Published Status'),
            ])
            ->actions([
                EditAction::make(),
                Action::make('duplicate')
                    ->label('Duplicate')
                    ->icon('heroicon-o-document-duplicate')
                    ->color('warning')
                    ->requiresConfirmation()
                    ->modalHeading('Duplicate Page')
                    ->modalDescription('Create an exact copy of this page with all sections, toggles, SEO, and AEO data.')
                    ->form([
                        Components\TextInput::make('new_title')
                            ->label('New Page Title')
                            ->required()
                            ->default(fn (Page $record) => $record->title . ' (Copy)'),
                        Components\TextInput::make('new_slug')
                            ->label('New URL Slug')
                            ->required()
                            ->default(fn (Page $record) => $record->slug === '/' ? '/home-copy' : $record->slug . '-copy')
                            ->unique(Page::class, 'slug'),
                    ])
                    ->action(function (Page $record, array $data): void {
                        $clone = $record->replicate();
                        $clone->title = $data['new_title'];
                        $clone->slug = $data['new_slug'];
                        $clone->save();
                    }),
                DeleteAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListPages::route('/'),
            'create' => Pages\CreatePage::route('/create'),
            'edit' => Pages\EditPage::route('/{record}/edit'),
        ];
    }
}
