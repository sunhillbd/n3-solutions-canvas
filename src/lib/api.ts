import {
  Gauge,
  RadioTower,
  Wrench,
  CircuitBoard,
  Cpu,
  Layers,
  Database,
  ShieldCheck,
  Zap,
  Activity,
  Workflow,
  Sparkles,
  Network,
  Radio,
  FileSpreadsheet,
  AlertTriangle,
  Building2,
  Compass,
  CheckCircle2,
  LucideIcon,
} from "lucide-react";
import { ServiceItem, SERVICES_DATA } from "./servicesData";

export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/v1";

const ICON_MAP: Record<string, LucideIcon> = {
  Gauge,
  RadioTower,
  Wrench,
  CircuitBoard,
  Cpu,
  Layers,
  Database,
  ShieldCheck,
  Zap,
  Activity,
  Workflow,
  Sparkles,
  Network,
  Radio,
  FileSpreadsheet,
  AlertTriangle,
  Building2,
  Compass,
  CheckCircle2,
};

export function getIconComponent(iconName?: string): LucideIcon {
  if (!iconName) return Gauge;
  return ICON_MAP[iconName] || Gauge;
}

export interface ApiServiceListItem {
  id: number;
  title: string;
  slug: string;
  eyebrow: string;
  badge?: string;
  tagline: string;
  short_description: string;
  icon: string;
  featured_image_url?: string;
  metrics: { value: string; label: string; subtext?: string }[];
  sort_order: number;
}

export interface ApiServiceDetail extends ApiServiceListItem {
  description: string;
  pillars: {
    number: string;
    title: string;
    subtitle: string;
    description: string;
    features: string[];
    specsSummary?: { label: string; value: string }[];
  }[];
  lifecycle_phases: {
    step: string;
    phase: string;
    timeframe: string;
    detail: string;
    deliverables?: string[];
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  section_toggles?: Record<string, boolean>;
  seo?: {
    meta_title?: string;
    meta_description?: string;
    og_image?: string;
  };
  aeo?: {
    direct_answer?: string;
    key_entities?: string[];
  };
}

export interface ApiPageData {
  id: number;
  title: string;
  slug: string;
  template: string;
  section_toggles: Record<string, boolean>;
  content: Record<string, any>;
  seo?: {
    meta_title?: string;
    meta_description?: string;
    og_image?: string;
  };
  aeo?: {
    direct_answer?: string;
    key_entities?: string[];
  };
}

export interface ApiTeamMember {
  id: number;
  name: string;
  role: string;
  category: "executive" | "functional_lead" | "advisor";
  credential?: string;
  bio?: string;
  initials: string;
  photo_url?: string;
  show_on_home: boolean;
  sort_order: number;
}

export interface ApiPartner {
  id: number;
  name: string;
  category: "utility_authority" | "metrology_oem" | "telecom_iot" | "multilateral_institution";
  collaboration_detail: string;
  logo_url?: string;
  website_url?: string;
  is_featured: boolean;
  sort_order: number;
}

export interface ApiNewsPost {
  id: number;
  title: string;
  slug: string;
  published_date_text: string;
  summary: string;
  content?: string;
  featured_image_url?: string;
  external_link?: string;
  published_at?: string;
}

export interface ApiFaq {
  id: number;
  question: string;
  answer: string;
  placement: string;
  service_id?: number;
  sort_order: number;
}

/**
 * Fetch all published services from the Laravel API.
 */
export async function fetchServices(): Promise<ServiceItem[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/services`, {
      headers: { Accept: "application/json" },
    });

    if (!res.ok) throw new Error(`API error: ${res.statusText}`);

    const json = await res.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      return json.data.map((item: ApiServiceListItem) => {
        const fallback = SERVICES_DATA[item.slug];
        return {
          slug: item.slug,
          icon: getIconComponent(item.icon),
          eyebrow: item.eyebrow,
          title: item.title,
          badge: item.badge || fallback?.badge || "Enterprise Infrastructure",
          tagline: item.tagline,
          description: item.short_description || fallback?.description || "",
          metrics: item.metrics?.length ? item.metrics : fallback?.metrics || [],
          pillars: fallback?.pillars || [],
          lifecycle: fallback?.lifecycle || [],
          faqs: fallback?.faqs || [],
        };
      });
    }
  } catch (err) {
    console.warn("Could not fetch services from API, using fallback data:", err);
  }

  return Object.values(SERVICES_DATA);
}

/**
 * Fetch a single service by slug.
 */
export async function fetchServiceBySlug(slug: string): Promise<ServiceItem | null> {
  const fallback = SERVICES_DATA[slug];

  try {
    const res = await fetch(`${API_BASE_URL}/services/${slug}`, {
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error(`API error: ${res.statusText}`);
    }

    const json = await res.json();
    if (json.success && json.data) {
      const item: ApiServiceDetail = json.data;

      const transformedPillars = (item.pillars || fallback?.pillars || []).map((p, idx) => {
        const fallbackPillar = fallback?.pillars?.[idx];
        return {
          icon: fallbackPillar?.icon || getIconComponent(item.icon),
          number: p.number || `0${idx + 1}`,
          title: p.title,
          subtitle: p.subtitle || "",
          description: p.description,
          engineeringDetails: fallbackPillar?.engineeringDetails || p.description,
          features: p.features || fallbackPillar?.features || [],
          specsSummary: fallbackPillar?.specsSummary || [],
        };
      });

      const transformedLifecycle = (item.lifecycle_phases || fallback?.lifecycle || []).map((l, idx) => {
        const fallbackL = fallback?.lifecycle?.[idx];
        return {
          step: l.step || `0${idx + 1}`,
          phase: l.phase,
          timeframe: l.timeframe || fallbackL?.timeframe || "",
          detail: l.detail,
          deliverables: l.deliverables || fallbackL?.deliverables || [],
        };
      });

      return {
        slug: item.slug,
        icon: getIconComponent(item.icon),
        eyebrow: item.eyebrow,
        title: item.title,
        badge: item.badge || fallback?.badge || "Enterprise Infrastructure",
        tagline: item.tagline,
        description: item.description || fallback?.description || "",
        metrics: item.metrics?.length ? item.metrics : fallback?.metrics || [],
        pillars: transformedPillars,
        lifecycle: transformedLifecycle,
        faqs: item.faqs?.length ? item.faqs : fallback?.faqs || [],
      };
    }
  } catch (err) {
    console.warn(`Could not fetch service "${slug}" from API, using fallback data:`, err);
  }

  return fallback || null;
}

/**
 * Fetch page content by slug (e.g. "about", "partners", "contact", "/").
 */
export async function fetchPage(slug: string): Promise<ApiPageData | null> {
  try {
    const encoded = encodeURIComponent(slug);
    const res = await fetch(`${API_BASE_URL}/pages/${encoded}`, {
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return json.data;
      }
    }
  } catch (err) {
    console.warn(`Could not fetch page "${slug}" from API:`, err);
  }

  return null;
}

/**
 * Fetch team members.
 */
export async function fetchTeamMembers(category?: string, homeOnly?: boolean): Promise<ApiTeamMember[]> {
  try {
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (homeOnly) params.append("home_only", "true");

    const res = await fetch(`${API_BASE_URL}/team-members?${params.toString()}`, {
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return json.data;
      }
    }
  } catch (err) {
    console.warn("Could not fetch team members from API:", err);
  }
  return [];
}

/**
 * Fetch partners.
 */
export async function fetchPartners(category?: string, featuredOnly?: boolean): Promise<ApiPartner[]> {
  try {
    const params = new URLSearchParams();
    if (category) params.append("category", category);
    if (featuredOnly) params.append("featured_only", "true");

    const res = await fetch(`${API_BASE_URL}/partners?${params.toString()}`, {
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return json.data;
      }
    }
  } catch (err) {
    console.warn("Could not fetch partners from API:", err);
  }
  return [];
}

/**
 * Fetch news articles.
 */
export async function fetchNews(limit = 10): Promise<ApiNewsPost[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/news?limit=${limit}`, {
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return json.data;
      }
    }
  } catch (err) {
    console.warn("Could not fetch news from API:", err);
  }
  return [];
}

/**
 * Fetch FAQs.
 */
export async function fetchFaqs(placement = "homepage"): Promise<ApiFaq[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/faqs?placement=${placement}`, {
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && Array.isArray(json.data)) {
        return json.data;
      }
    }
  } catch (err) {
    console.warn("Could not fetch FAQs from API:", err);
  }
  return [];
}

/**
 * Fetch header or footer settings.
 */
export async function fetchSiteSettings(key: "header" | "footer"): Promise<any | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/settings/${key}`, {
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      const json = await res.json();
      if (json.success && json.data) {
        return json.data;
      }
    }
  } catch (err) {
    console.warn(`Could not fetch settings "${key}" from API:`, err);
  }
  return null;
}

/**
 * Submit contact inquiry to Laravel API.
 */
export async function submitContactForm(data: {
  name: string;
  email: string;
  organisation?: string;
  phone?: string;
  message: string;
}): Promise<{ success: boolean; message: string; errors?: Record<string, string[]> }> {
  try {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    return json;
  } catch (err) {
    console.error("Contact submission error:", err);
    return {
      success: false,
      message: "Unable to connect to the server. Please try again or email us directly.",
    };
  }
}

