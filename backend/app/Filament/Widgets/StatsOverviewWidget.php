<?php

namespace App\Filament\Widgets;

use App\Models\ContactInquiry;
use App\Models\NewsPost;
use App\Models\Page;
use App\Models\Partner;
use App\Models\Service;
use App\Models\TeamMember;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverviewWidget extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $publishedPages = Page::where('is_published', true)->count();
        $activeServices = Service::where('is_published', true)->count();
        $activePartners = Partner::where('is_active', true)->count();
        $publishedNews = NewsPost::where('is_published', true)->count();
        $activeTeam = TeamMember::where('is_active', true)->count();
        $newInquiries = ContactInquiry::where('status', 'new')->count();

        return [
            Stat::make('Published Pages', $publishedPages)
                ->description('Live website page routes')
                ->descriptionIcon('heroicon-m-document-text')
                ->color('teal'),

            Stat::make('Engineering Solutions', $activeServices)
                ->description('Active utility disciplines')
                ->descriptionIcon('heroicon-m-cpu-chip')
                ->color('teal'),

            Stat::make('Ecosystem Partners', $activePartners)
                ->description('Active utilities, OEMs & banks')
                ->descriptionIcon('heroicon-m-building-office-2')
                ->color('info'),

            Stat::make('News & Insights', $publishedNews)
                ->description('Published technical articles')
                ->descriptionIcon('heroicon-m-newspaper')
                ->color('primary'),

            Stat::make('Team & Leadership', $activeTeam)
                ->description('Executive & discipline heads')
                ->descriptionIcon('heroicon-m-user-group')
                ->color('gray'),

            Stat::make('New Inquiries', $newInquiries)
                ->description($newInquiries > 0 ? 'Pending staff review' : 'All inquiries reviewed')
                ->descriptionIcon('heroicon-m-envelope')
                ->color($newInquiries > 0 ? 'warning' : 'success'),
        ];
    }
}
