<x-filament-widgets::widget>
    <div class="n3-welcome-banner">
        <div>
            <div class="n3-welcome-badge">
                <span class="n3-welcome-dot"></span>
                <span>N3 Solutions • Infrastructure CMS Console</span>
            </div>

            <h1 class="n3-welcome-title">
                Welcome back, {{ auth()->user()->name ?? 'Administrator' }}
            </h1>

            <p class="n3-welcome-subtitle">
                Manage national-scale utility infrastructure pages, solutions disciplines, news insights, and incoming public inquiries from one centralized console.
            </p>
        </div>

        <div class="n3-quick-actions-row">
            <a href="{{ route('filament.admin.resources.pages.edit', 1) }}" class="n3-btn-primary">
                <svg class="n3-btn-icon" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                <span>Edit Homepage</span>
            </a>

            <a href="{{ route('filament.admin.resources.services.index') }}" class="n3-btn-secondary">
                <svg class="n3-btn-icon" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 19.5V21M12 3v1.5m0 15V21m3.75-18v1.5m0 15V21m-9-1.5h10.5a2.25 2.25 0 002.25-2.25V6.75a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 6.75v10.5a2.25 2.25 0 002.25 2.25z" />
                </svg>
                <span>Manage Solutions</span>
            </a>

            <a href="{{ route('filament.admin.resources.news-posts.create') }}" class="n3-btn-secondary">
                <svg class="n3-btn-icon" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                <span>Add Article</span>
            </a>

            <a href="{{ env('FRONTEND_URL', 'http://localhost:5173/') }}" target="_blank" rel="noopener noreferrer" class="n3-btn-secondary">
                <svg class="n3-btn-icon" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
                <span>Live Website</span>
            </a>
        </div>
    </div>
</x-filament-widgets::widget>
