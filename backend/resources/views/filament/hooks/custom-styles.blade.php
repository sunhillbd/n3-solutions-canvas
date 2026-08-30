<style>
    /* 1. Vertical Tab Navigation for Multi-Option Forms (Pages, Services, Settings) */
    @media (min-width: 1024px) {
        .vertical-section-tabs {
            display: grid !important;
            grid-template-columns: 260px minmax(0, 1fr) !important;
            gap: 1.75rem !important;
            align-items: start !important;
        }

        .vertical-section-tabs > nav[role="tablist"],
        .vertical-section-tabs > div > nav[role="tablist"],
        .vertical-section-tabs > .fi-tabs,
        .vertical-section-tabs .fi-tabs-list-ctn,
        .vertical-section-tabs .fi-tabs-list {
            display: flex !important;
            flex-direction: column !important;
            width: 100% !important;
            border-radius: 0.875rem !important;
            background: #f8fafc !important;
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

        .vertical-section-tabs .fi-tabs-item[aria-selected="true"],
        .vertical-section-tabs button[role="tab"][aria-selected="true"],
        .vertical-section-tabs .fi-tabs-item.fi-active,
        .vertical-section-tabs button[role="tab"].fi-active {
            background: #0d9488 !important;
            color: #ffffff !important;
            font-weight: 600 !important;
            box-shadow: 0 2px 4px rgba(13, 148, 136, 0.25) !important;
        }

        .vertical-section-tabs .fi-tabs-item[aria-selected="true"] svg,
        .vertical-section-tabs button[role="tab"][aria-selected="true"] svg {
            color: #ffffff !important;
        }

        .vertical-section-tabs .fi-tabs-item:not([aria-selected="true"]) svg,
        .vertical-section-tabs button[role="tab"]:not([aria-selected="true"]) svg {
            color: #64748b !important;
        }

        .dark .vertical-section-tabs .fi-tabs-item:not([aria-selected="true"]) svg,
        .dark .vertical-section-tabs button[role="tab"]:not([aria-selected="true"]) svg {
            color: #94a3b8 !important;
        }

        .vertical-section-tabs > div:not(nav) {
            min-width: 0 !important;
        }
    }

    /* 2. Horizontal Filter Pills for Settings Categories */
    .settings-pill-tabs > nav[role="tablist"],
    .settings-pill-tabs .fi-tabs,
    .settings-pill-tabs .fi-tabs-list-ctn,
    .settings-pill-tabs .fi-tabs-list {
        display: flex !important;
        flex-wrap: wrap !important;
        gap: 0.5rem !important;
        background: transparent !important;
        border: none !important;
        padding: 0 !important;
        margin-bottom: 1.5rem !important;
    }

    .settings-pill-tabs .fi-tabs-item,
    .settings-pill-tabs button[role="tab"] {
        border-radius: 9999px !important;
        padding: 0.5rem 1rem !important;
        font-size: 0.8125rem !important;
        font-weight: 500 !important;
        border: 1px solid #e2e8f0 !important;
        background: #ffffff !important;
        color: #475569 !important;
        transition: all 0.2s ease !important;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03) !important;
    }

    .dark .settings-pill-tabs .fi-tabs-item,
    .dark .settings-pill-tabs button[role="tab"] {
        border-color: #1e293b !important;
        background: #0f172a !important;
        color: #94a3b8 !important;
    }

    .settings-pill-tabs .fi-tabs-item:hover,
    .settings-pill-tabs button[role="tab"]:hover {
        border-color: #0d9488 !important;
        color: #0d9488 !important;
        background: rgba(13, 148, 136, 0.04) !important;
    }

    .dark .settings-pill-tabs .fi-tabs-item:hover,
    .dark .settings-pill-tabs button[role="tab"]:hover {
        border-color: #2dd4bf !important;
        color: #2dd4bf !important;
        background: rgba(45, 212, 191, 0.08) !important;
    }

    .settings-pill-tabs .fi-tabs-item[aria-selected="true"],
    .settings-pill-tabs button[role="tab"][aria-selected="true"] {
        background: #0d9488 !important;
        border-color: #0d9488 !important;
        color: #ffffff !important;
        font-weight: 600 !important;
        box-shadow: 0 2px 4px rgba(13, 148, 136, 0.25) !important;
    }

    .settings-pill-tabs .fi-tabs-item[aria-selected="true"] svg,
    .settings-pill-tabs button[role="tab"][aria-selected="true"] svg {
        color: #ffffff !important;
    }

    /* 3. Section Container and Card Styling */
    .settings-section-card {
        border-radius: 1rem !important;
        border: 1px solid #e2e8f0 !important;
        background: #ffffff !important;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03) !important;
        padding: 1.5rem !important;
        margin-bottom: 1.5rem !important;
    }

    .dark .settings-section-card {
        border-color: #1e293b !important;
        background: #0f172a !important;
    }

    /* 4. Global SVG and Layout Safety Guard */
    .fi-main svg {
        max-width: 100%;
    }
</style>
