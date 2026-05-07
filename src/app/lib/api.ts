const API_BASE = import.meta.env.VITE_API_URL || "";

export type Project = {
  id?: string;
  title: string;
  description: string;
  tags: string[];
  gradient: string;
  accentColor: string;
  url?: string | null;
  imageUrl?: string | null;
  isFeatured?: boolean;
  sortOrder?: number;
};

export type Skill = {
  id?: string;
  name: string;
  level: number;
  sortOrder?: number;
};

export type SkillCategory = {
  id?: string;
  name: string;
  icon?: string;
  sortOrder?: number;
  skills: Skill[];
};

export type Profile = {
  fullName: string;
  headline: string;
  subheadline: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  githubUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
};

export type SiteData = {
  profile: Profile | null;
  projects: Project[];
  skills: SkillCategory[];
};

export type Message = {
  id: string;
  name: string;
  email: string;
  subject?: string | null;
  message: string;
  status: "unread" | "read" | string;
  createdAt: string;
};

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const { headers, ...rest } = options;
  const response = await fetch(`${API_BASE}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
  });

  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.error || "Сервертэй холбогдоход алдаа гарлаа.");
  }

  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}

export function getSiteData() {
  return request<SiteData>("/api/site");
}

export function sendContactMessage(payload: {
  name: string;
  email: string;
  subject?: string;
  message: string;
}) {
  return request<{ ok: boolean; message: string; id: string }>("/api/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function adminLogin(password: string) {
  return request<{ token: string }>("/api/admin/login", {
    method: "POST",
    body: JSON.stringify({ password }),
  });
}

export function adminRequest<T>(token: string, path: string, options: RequestInit = {}) {
  return request<T>(path, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });
}
