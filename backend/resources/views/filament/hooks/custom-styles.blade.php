<style>
    /* ==========================================================================
       N3 SOLUTIONS ADMIN PANEL - PREMIUM SAAS DESIGN SYSTEM
       ========================================================================== */

    /* 1. Global Typography & Base Improvements */
    body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        letter-spacing: -0.011em;
    }

    /* 2. Brand Logo Component */
    .n3-brand-logo {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    .n3-brand-svg {
        width: 1.75rem !important;
        height: 1.75rem !important;
        max-width: 1.75rem !important;
        max-height: 1.75rem !important;
        flex-shrink: 0 !important;
    }

    .dark .n3-brand-path-dark {
        fill: #ffffff !important;
    }

    .n3-brand-text-col {
        display: flex;
        flex-direction: column;
        line-height: 1;
    }

    .n3-brand-title-row {
        display: flex;
        align-items: center;
        gap: 0.375rem;
    }

    .n3-brand-name {
        font-size: 1.05rem;
        font-weight: 700;
        letter-spacing: 0.12em;
        color: #0f172a;
    }

    .dark .n3-brand-name {
        color: #ffffff;
    }

    .n3-brand-badge {
        border-radius: 0.25rem;
        background: rgba(13, 148, 136, 0.12);
        padding: 0.125rem 0.375rem;
        font-size: 0.625rem;
        font-weight: 700;
        color: #0d9488;
        letter-spacing: 0.05em;
    }

    .dark .n3-brand-badge {
        color: #2dd4bf;
    }

    .n3-brand-sub {
        margin-top: 0.25rem;
        font-size: 0.55rem;
        font-weight: 600;
        letter-spacing: 0.24em;
        text-transform: uppercase;
        color: #64748b;
    }

    .dark .n3-brand-sub {
        color: #94a3b8;
    }

    /* 3. Welcome Banner Widget (Custom Scoped Styles) */
    .n3-welcome-banner {
        position: relative;
        overflow: hidden;
        border-radius: 1rem;
        background: linear-gradient(135deg, #0F1F3D 0%, #132A4F 50%, #0F4A42 100%);
        padding: 1.75rem 2rem;
        color: #ffffff;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1);
        margin-bottom: 0.5rem;
    }

    .n3-welcome-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        border-radius: 9999px;
        background: rgba(255, 255, 255, 0.12);
        padding: 0.25rem 0.75rem;
        font-size: 0.75rem;
        font-weight: 500;
        color: #5eead4;
        backdrop-filter: blur(8px);
    }

    .n3-welcome-dot {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 9999px;
        background: #2dd4bf;
        display: inline-block;
    }

    .n3-welcome-title {
        margin-top: 0.75rem;
        font-size: 1.625rem;
        font-weight: 700;
        letter-spacing: -0.02em;
        color: #ffffff;
        line-height: 1.25;
    }

    .n3-welcome-subtitle {
        margin-top: 0.5rem;
        font-size: 0.875rem;
        color: #cbd5e1;
        line-height: 1.5;
        max-width: 42rem;
    }

    .n3-quick-actions-row {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.625rem;
        margin-top: 1.25rem;
    }

    .n3-btn-primary {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        border-radius: 0.625rem;
        background: #0d9488;
        padding: 0.55rem 1rem;
        font-size: 0.8125rem;
        font-weight: 600;
        color: #ffffff !important;
        text-decoration: none;
        transition: all 0.15s ease;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .n3-btn-primary:hover {
        background: #0f766e;
        transform: translateY(-1px);
        box-shadow: 0 4px 6px rgba(13, 148, 136, 0.2);
    }

    .n3-btn-secondary {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        border-radius: 0.625rem;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.15);
        padding: 0.55rem 1rem;
        font-size: 0.8125rem;
        font-weight: 600;
        color: #ffffff !important;
        text-decoration: none;
        backdrop-filter: blur(8px);
        transition: all 0.15s ease;
    }

    .n3-btn-secondary:hover {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.3);
        transform: translateY(-1px);
    }

    .n3-btn-icon {
        width: 1rem !important;
        height: 1rem !important;
        max-width: 1rem !important;
        max-height: 1rem !important;
        flex-shrink: 0 !important;
        display: inline-block !important;
    }

    /* 4. Topbar Website Link */
    .n3-topbar-link {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        border-radius: 0.5rem;
        border: 1px solid #e2e8f0;
        background: #ffffff;
        padding: 0.375rem 0.75rem;
        font-size: 0.75rem;
        font-weight: 600;
        color: #334155;
        text-decoration: none;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
        transition: all 0.15s ease;
    }

    .dark .n3-topbar-link {
        border-color: #1e293b;
        background: #0f172a;
        color: #e2e8f0;
    }

    .n3-topbar-link:hover {
        background: #f8fafc;
        color: #0d9488;
        border-color: #cbd5e1;
    }

    .dark .n3-topbar-link:hover {
        background: #1e293b;
        color: #2dd4bf;
    }

    .n3-topbar-dot {
        width: 0.5rem;
        height: 0.5rem;
        border-radius: 9999px;
        background: #10b981;
        display: inline-block;
        flex-shrink: 0;
    }

    .n3-topbar-icon {
        width: 0.875rem !important;
        height: 0.875rem !important;
        max-width: 0.875rem !important;
        max-height: 0.875rem !important;
        flex-shrink: 0 !important;
        color: #64748b;
    }

    /* 5. Sidebar Navigation Polish */
    .fi-sidebar-nav {
        gap: 0.25rem !important;
        padding-top: 0.5rem !important;
    }

    .fi-sidebar-group-label {
        font-size: 0.6875rem !important;
        font-weight: 700 !important;
        letter-spacing: 0.08em !important;
        text-transform: uppercase !important;
        color: #64748b !important;
        padding-left: 0.75rem !important;
        margin-top: 0.75rem !important;
        margin-bottom: 0.25rem !important;
    }

    .dark .fi-sidebar-group-label {
        color: #94a3b8 !important;
    }

    .fi-sidebar-item-btn {
        border-radius: 0.625rem !important;
        padding: 0.5rem 0.75rem !important;
        font-size: 0.84rem !important;
        font-weight: 500 !important;
        transition: all 0.15s ease-in-out !important;
    }

    /* Sidebar Active State */
    .fi-sidebar-item-btn.fi-active,
    .fi-sidebar-item-active .fi-sidebar-item-btn {
        background: rgba(13, 148, 136, 0.1) !important;
        color: #0f766e !important;
        font-weight: 600 !important;
    }

    .dark .fi-sidebar-item-btn.fi-active,
    .dark .fi-sidebar-item-active .fi-sidebar-item-btn {
        background: rgba(45, 212, 191, 0.12) !important;
        color: #2dd4bf !important;
    }

    .fi-sidebar-item-btn.fi-active svg,
    .fi-sidebar-item-active .fi-sidebar-item-btn svg {
        color: #0d9488 !important;
    }

    .dark .fi-sidebar-item-btn.fi-active svg,
    .dark .fi-sidebar-item-active .fi-sidebar-item-btn svg {
        color: #2dd4bf !important;
    }

    /* 6. Top Header / Topbar Polish */
    .fi-topbar {
        border-bottom: 1px solid #e2e8f0 !important;
        background: rgba(255, 255, 255, 0.85) !important;
        backdrop-filter: blur(12px) !important;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.02) !important;
    }

    .dark .fi-topbar {
        border-bottom-color: #1e293b !important;
        background: rgba(15, 23, 42, 0.85) !important;
    }

    /* 7. Section & Card Styling */
    .fi-section {
        border-radius: 1rem !important;
        border: 1px solid #e2e8f0 !important;
        background: #ffffff !important;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.03), 0 1px 2px -1px rgba(0, 0, 0, 0.03) !important;
        transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out !important;
    }

    .dark .fi-section {
        border-color: #1e293b !important;
        background: #0f172a !important;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2) !important;
    }

    .fi-section-header {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        gap: 1rem !important;
        padding-bottom: 0.875rem !important;
        border-bottom: 1px solid #f1f5f9 !important;
        margin-bottom: 1rem !important;
    }

    .dark .fi-section-header {
        border-bottom-color: #1e293b !important;
    }

    /* Section Header Toggles Polish */
    .fi-hidden,
    [hidden],
    .fi-section-header .fi-hidden {
        display: none !important;
    }

    .fi-section-header .fi-fo-field-label-ctn,
    .fi-section-header .fi-fo-field-label {
        margin: 0 !important;
        display: inline-flex !important;
        align-items: center !important;
        gap: 0.5rem !important;
    }

    /* 8. Inputs, Textareas, Selects Polish */
    .fi-input-wrp {
        border-radius: 0.625rem !important;
        transition: all 0.15s ease-in-out !important;
    }

    .fi-input-wrp:focus-within {
        border-color: #0d9488 !important;
        box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.15) !important;
    }

    /* 9. Vertical Tab Navigation for Edit Forms (Pages, Services, Settings) */
    .vertical-section-tabs,
    .fi-sc-tabs.vertical-section-tabs,
    .fi-tabs.vertical-section-tabs,
    .fi-fo-tabs.vertical-section-tabs {
        background: transparent !important;
        background-color: transparent !important;
        border: none !important;
        box-shadow: none !important;
        padding: 0 !important;
    }

    .dark .vertical-section-tabs,
    .dark .fi-sc-tabs.vertical-section-tabs,
    .dark .fi-tabs.vertical-section-tabs,
    .dark .fi-fo-tabs.vertical-section-tabs {
        background: transparent !important;
        background-color: transparent !important;
        border: none !important;
        box-shadow: none !important;
    }

    @media (min-width: 1024px) {
        .vertical-section-tabs {
            display: grid !important;
            grid-template-columns: 260px minmax(0, 1fr) !important;
            gap: 1.75rem !important;
            align-items: start !important;
        }

        /* Left Section: Distinct, standalone vertical menu container */
        .vertical-section-tabs > nav[role="tablist"],
        .vertical-section-tabs > div > nav[role="tablist"],
        .vertical-section-tabs > .fi-tabs,
        .vertical-section-tabs .fi-tabs-list-ctn,
        .vertical-section-tabs .fi-tabs-list {
            display: flex !important;
            flex-direction: column !important;
            width: 100% !important;
            border-radius: 0.875rem !important;
            background: #ffffff !important;
            padding: 0.625rem !important;
            gap: 0.35rem !important;
            border: 1px solid #e2e8f0 !important;
            position: sticky !important;
            top: 5.5rem !important;
            z-index: 10 !important;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04) !important;
        }

        .dark .vertical-section-tabs > nav[role="tablist"],
        .dark .vertical-section-tabs > div > nav[role="tablist"],
        .dark .vertical-section-tabs > .fi-tabs,
        .dark .vertical-section-tabs .fi-tabs-list-ctn,
        .dark .vertical-section-tabs .fi-tabs-list {
            background: #0f172a !important;
            border-color: #1e293b !important;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2) !important;
        }

        /* Left Section Tabs Items */
        .vertical-section-tabs .fi-tabs-item,
        .vertical-section-tabs button[role="tab"] {
            width: 100% !important;
            justify-content: flex-start !important;
            text-align: left !important;
            padding: 0.65rem 0.875rem !important;
            border-radius: 0.5rem !important;
            font-size: 0.84rem !important;
            font-weight: 500 !important;
            line-height: 1.25rem !important;
            transition: all 0.15s ease-in-out !important;
            display: flex !important;
            align-items: center !important;
            gap: 0.65rem !important;
            border: none !important;
            color: #475569 !important;
            background: transparent !important;
            cursor: pointer !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
        }

        .dark .vertical-section-tabs .fi-tabs-item,
        .dark .vertical-section-tabs button[role="tab"] {
            color: #94a3b8 !important;
        }

        .vertical-section-tabs .fi-tabs-item:hover,
        .vertical-section-tabs button[role="tab"]:hover {
            background: rgba(13, 148, 136, 0.08) !important;
            color: #0d9488 !important;
        }

        .dark .vertical-section-tabs .fi-tabs-item:hover,
        .dark .vertical-section-tabs button[role="tab"]:hover {
            background: rgba(45, 212, 191, 0.1) !important;
            color: #2dd4bf !important;
        }

        /* Active Vertical Menu Item: Text Color ALWAYS #FFFFFF */
        .vertical-section-tabs .fi-tabs-item[aria-selected="true"],
        .vertical-section-tabs button[role="tab"][aria-selected="true"],
        .vertical-section-tabs .fi-tabs-item.fi-active,
        .vertical-section-tabs button[role="tab"].fi-active {
            background: #0d9488 !important;
            color: #ffffff !important;
            font-weight: 600 !important;
            box-shadow: 0 2px 4px rgba(13, 148, 136, 0.25) !important;
        }

        .vertical-section-tabs .fi-tabs-item[aria-selected="true"] *,
        .vertical-section-tabs button[role="tab"][aria-selected="true"] *,
        .vertical-section-tabs .fi-tabs-item.fi-active *,
        .vertical-section-tabs button[role="tab"].fi-active *,
        .dark .vertical-section-tabs .fi-tabs-item[aria-selected="true"] *,
        .dark .vertical-section-tabs button[role="tab"][aria-selected="true"] *,
        .dark .vertical-section-tabs .fi-tabs-item.fi-active *,
        .dark .vertical-section-tabs button[role="tab"].fi-active * {
            color: #ffffff !important;
        }

        .vertical-section-tabs .fi-tabs-item[aria-selected="true"] svg,
        .vertical-section-tabs button[role="tab"][aria-selected="true"] svg,
        .vertical-section-tabs .fi-tabs-item.fi-active svg,
        .vertical-section-tabs button[role="tab"].fi-active svg,
        .dark .vertical-section-tabs .fi-tabs-item[aria-selected="true"] svg,
        .dark .vertical-section-tabs button[role="tab"][aria-selected="true"] svg,
        .dark .vertical-section-tabs .fi-tabs-item.fi-active svg,
        .dark .vertical-section-tabs button[role="tab"].fi-active svg {
            color: #ffffff !important;
            stroke: #ffffff !important;
        }

        .vertical-section-tabs .fi-tabs-item:not([aria-selected="true"]) svg,
        .vertical-section-tabs button[role="tab"]:not([aria-selected="true"]) svg {
            color: #64748b !important;
        }

        .dark .vertical-section-tabs .fi-tabs-item:not([aria-selected="true"]) svg,
        .dark .vertical-section-tabs button[role="tab"]:not([aria-selected="true"]) svg {
            color: #94a3b8 !important;
        }

        /* Right Section: Form Content Area (no wrapper card) */
        .vertical-section-tabs > div:not(nav),
        .vertical-section-tabs .fi-tabs-tab-panel {
            min-width: 0 !important;
            background: transparent !important;
            background-color: transparent !important;
            border: none !important;
            box-shadow: none !important;
            padding: 0 !important;
        }
    }

    /* 10. Tables & Listing Polish */
    .fi-ta-header-cell {
        font-size: 0.72rem !important;
        font-weight: 600 !important;
        text-transform: uppercase !important;
        letter-spacing: 0.06em !important;
        color: #64748b !important;
        padding-top: 0.75rem !important;
        padding-bottom: 0.75rem !important;
        background: #f8fafc !important;
    }

    .dark .fi-ta-header-cell {
        color: #94a3b8 !important;
        background: #0f172a !important;
    }

    .fi-ta-row {
        transition: background-color 0.12s ease-in-out !important;
    }

    .fi-ta-row:hover {
        background-color: rgba(241, 245, 249, 0.6) !important;
    }

    .dark .fi-ta-row:hover {
        background-color: rgba(30, 41, 59, 0.5) !important;
    }

    .fi-ta-empty-state {
        padding: 3.5rem 1.5rem !important;
    }

    /* 11. Badge Styling */
    .fi-badge {
        font-size: 0.72rem !important;
        font-weight: 600 !important;
        letter-spacing: 0.02em !important;
        border-radius: 9999px !important;
        padding: 0.25rem 0.65rem !important;
    }

    /* 12. "Add to ..." / Repeater & Builder Add Buttons Polish */
    .fi-fo-repeater-add .fi-btn,
    .fi-fo-simple-repeater-add .fi-btn,
    .fi-fo-table-repeater-add .fi-btn,
    .fi-fo-builder-block-picker-ctn .fi-btn {
        background: #0f766e !important;
        background-color: #0f766e !important;
        color: #ffffff !important;
        border: 1px solid #0d9488 !important;
        border-radius: 0.625rem !important;
        font-weight: 600 !important;
        font-size: 0.8125rem !important;
        text-transform: none !important;
        padding: 0.5rem 1.125rem !important;
        box-shadow: 0 1px 3px rgba(15, 118, 110, 0.2) !important;
        transition: all 0.15s ease-in-out !important;
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        gap: 0.5rem !important;
        cursor: pointer !important;
    }

    .fi-fo-repeater-add .fi-btn:hover,
    .fi-fo-simple-repeater-add .fi-btn:hover,
    .fi-fo-table-repeater-add .fi-btn:hover,
    .fi-fo-builder-block-picker-ctn .fi-btn:hover {
        background: #0d9488 !important;
        background-color: #0d9488 !important;
        border-color: #14b8a6 !important;
        color: #ffffff !important;
        transform: translateY(-1px) !important;
        box-shadow: 0 4px 6px -1px rgba(13, 148, 136, 0.3) !important;
    }

    .fi-fo-repeater-add .fi-btn:active,
    .fi-fo-simple-repeater-add .fi-btn:active,
    .fi-fo-table-repeater-add .fi-btn:active {
        transform: translateY(0) !important;
    }

    .fi-fo-repeater-add .fi-btn *,
    .fi-fo-simple-repeater-add .fi-btn *,
    .fi-fo-table-repeater-add .fi-btn *,
    .fi-fo-builder-block-picker-ctn .fi-btn * {
        color: #ffffff !important;
    }

    /* Plus icon injection for "Add to ..." repeater buttons */
    .fi-fo-repeater-add .fi-btn::before,
    .fi-fo-simple-repeater-add .fi-btn::before,
    .fi-fo-table-repeater-add .fi-btn::before {
        content: "" !important;
        display: inline-block !important;
        width: 1rem !important;
        height: 1rem !important;
        mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'%3E%3Cpath d='M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z'/%3E%3C/svg%3E") no-repeat center / contain !important;
        -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor'%3E%3Cpath d='M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z'/%3E%3C/svg%3E") no-repeat center / contain !important;
        background-color: #ffffff !important;
        flex-shrink: 0 !important;
    }

    .fi-fo-repeater-add .fi-btn:has(svg) svg,
    .fi-fo-simple-repeater-add .fi-btn:has(svg) svg,
    .fi-fo-table-repeater-add .fi-btn:has(svg) svg {
        display: none !important;
    }

    .dark .fi-fo-repeater-add .fi-btn,
    .dark .fi-fo-simple-repeater-add .fi-btn,
    .dark .fi-fo-table-repeater-add .fi-btn,
    .dark .fi-fo-builder-block-picker-ctn .fi-btn {
        background: #0d9488 !important;
        background-color: #0d9488 !important;
        border-color: #2dd4bf !important;
        color: #ffffff !important;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4) !important;
    }

    .dark .fi-fo-repeater-add .fi-btn:hover,
    .dark .fi-fo-simple-repeater-add .fi-btn:hover,
    .dark .fi-fo-table-repeater-add .fi-btn:hover {
        background: #14b8a6 !important;
        background-color: #14b8a6 !important;
        border-color: #5eead4 !important;
    }

    /* 13. Section Header Actions & Setting Cog Styling */
    .fi-section-header {
        display: flex !important;
        align-items: center !important;
        justify-content: space-between !important;
        gap: 0.75rem !important;
    }

    .fi-section-header-after-ctn {
        display: flex !important;
        align-items: center !important;
        flex-shrink: 0 !important;
        margin-left: auto !important;
    }

    .fi-section-header-after-ctn .fi-sc {
        display: flex !important;
        flex-direction: row !important;
        align-items: center !important;
        gap: 0.75rem !important;
    }

    .fi-section-header-after-ctn .fi-sc-action {
        display: inline-flex !important;
        align-items: center !important;
    }

    .fi-section-header .fi-icon-btn,
    .fi-section-header-after-ctn .fi-icon-btn {
        display: inline-flex !important;
        align-items: center !important;
        justify-content: center !important;
        width: 2.25rem !important;
        height: 2.25rem !important;
        min-width: 2.25rem !important;
        min-height: 2.25rem !important;
        color: #475569 !important;
        background-color: #f1f5f9 !important;
        border: 1px solid #cbd5e1 !important;
        border-radius: 0.5rem !important;
        cursor: pointer !important;
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
    }

    .fi-section-header .fi-icon-btn svg,
    .fi-section-header-after-ctn .fi-icon-btn svg {
        width: 1.25rem !important;
        height: 1.25rem !important;
        color: #475569 !important;
    }

    .fi-section-header .fi-icon-btn:hover,
    .fi-section-header-after-ctn .fi-icon-btn:hover {
        color: #0f766e !important;
        background-color: #ccfbf1 !important;
        border-color: #14b8a6 !important;
        transform: rotate(45deg) !important;
    }

    .fi-section-header .fi-icon-btn:hover svg,
    .fi-section-header-after-ctn .fi-icon-btn:hover svg {
        color: #0f766e !important;
    }

    .dark .fi-section-header .fi-icon-btn,
    .dark .fi-section-header-after-ctn .fi-icon-btn {
        color: #94a3b8 !important;
        background-color: #1e293b !important;
        border-color: #334155 !important;
    }

    .dark .fi-section-header .fi-icon-btn svg,
    .dark .fi-section-header-after-ctn .fi-icon-btn svg {
        color: #94a3b8 !important;
    }

    .dark .fi-section-header .fi-icon-btn:hover,
    .dark .fi-section-header-after-ctn .fi-icon-btn:hover {
        color: #2dd4bf !important;
        background-color: rgba(45, 212, 191, 0.15) !important;
        border-color: #2dd4bf !important;
    }

    .dark .fi-section-header .fi-icon-btn:hover svg,
    .dark .fi-section-header-after-ctn .fi-icon-btn:hover svg {
        color: #2dd4bf !important;
    }
</style>
