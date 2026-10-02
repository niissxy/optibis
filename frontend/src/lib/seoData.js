/**
 * SEO Configuration and Schema.org Generator Utilities for OPTIBIS.ID
 */

export const SITE_CONFIG = {
  name: "OPTIBIS.ID",
  legalName: "OPTIBIS Digital Solution Partner",
  url: "https://optibis.id",
  logo: "https://optibis.id/assets/optibis-logo.png",
  logoHorizontal: "https://optibis.id/assets/optibis-logo-horizontal.png",
  favicon: "https://optibis.id/assets/optibis-logo.png",
  defaultOgImage: "https://optibis.id/assets/optibis-logo.png",
  description: "Optibis adalah partner terpercaya untuk branding, pembuatan website profesional, dan pertumbuhan digital bisnis di Indonesia.",
  email: "optibis.id@gmail.com",
  phone: "+6287772577020",
  whatsapp: "https://wa.me/6287772577020",
  address: {
    streetAddress: "Indonesia",
    addressLocality: "Jakarta",
    addressRegion: "DKI Jakarta",
    postalCode: "12000",
    addressCountry: "ID",
  },
  social: {
    instagram: "https://instagram.com/optibis.id",
    youtube: "https://youtube.com/@optibis",
  },
  defaultKeywords: [
    "jasa pembuatan website",
    "branding bisnis profesional",
    "digital marketing indonesia",
    "pengelolaan sosial media",
    "jasa seo indonesia",
    "desain logo bisnis",
    "landing page berkecepatan tinggi",
    "growth team bisnis",
    "konsultan digital umkm",
    "solusi digital terintegrasi",
    "optibis",
    "optibis id"
  ].join(", "),
};

/**
 * Generate Organization & LocalBusiness JSON-LD Schema
 */
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_CONFIG.url}/#organization`,
    "name": SITE_CONFIG.name,
    "legalName": SITE_CONFIG.legalName,
    "url": SITE_CONFIG.url,
    "logo": {
      "@type": "ImageObject",
      "url": SITE_CONFIG.logo,
      "width": "512",
      "height": "512"
    },
    "image": SITE_CONFIG.defaultOgImage,
    "description": SITE_CONFIG.description,
    "telephone": SITE_CONFIG.phone,
    "email": SITE_CONFIG.email,
    "address": {
      "@type": "PostalAddress",
      "addressCountry": SITE_CONFIG.address.addressCountry,
      "addressRegion": SITE_CONFIG.address.addressRegion,
      "addressLocality": SITE_CONFIG.address.addressLocality,
    },
    "sameAs": [
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.youtube
    ],
    "priceRange": "Rp 300.000 - Rp 15.000.000",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ],
    "knowsAbout": [
      "Web Development",
      "Branding & Creative Design",
      "Search Engine Optimization (SEO)",
      "Social Media Management",
      "Digital Marketing Strategy",
      "Conversion Rate Optimization"
    ]
  };
}

/**
 * Generate WebSite Schema with Sitelinks Searchbox
 */
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_CONFIG.url}/#website`,
    "url": SITE_CONFIG.url,
    "name": SITE_CONFIG.name,
    "description": SITE_CONFIG.description,
    "publisher": {
      "@id": `${SITE_CONFIG.url}/#organization`
    },
    "inLanguage": "id-ID",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${SITE_CONFIG.url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

/**
 * Generate BreadcrumbList Schema
 * @param {Array<{ name: string, url: string }>} items 
 */
export function getBreadcrumbSchema(items = []) {
  if (!items.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url.startsWith("http") ? item.url : `${SITE_CONFIG.url}${item.url.startsWith("/") ? "" : "/"}${item.url}`
    }))
  };
}

/**
 * Generate Service / Offer Schema
 */
export function getServiceSchema({ name, description, url, provider = SITE_CONFIG.name, image, price, priceCurrency = "IDR", serviceType }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "url": url ? (url.startsWith("http") ? url : `${SITE_CONFIG.url}${url}`) : SITE_CONFIG.url,
    "provider": {
      "@type": "Organization",
      "name": provider,
      "url": SITE_CONFIG.url
    },
    "areaServed": {
      "@type": "Country",
      "name": "Indonesia"
    }
  };

  if (image) {
    schema.image = image.startsWith("http") ? image : `${SITE_CONFIG.url}${image}`;
  }
  if (serviceType) {
    schema.serviceType = serviceType;
  }
  if (price) {
    schema.offers = {
      "@type": "Offer",
      "price": typeof price === "number" ? price : price.toString().replace(/[^0-9]/g, ""),
      "priceCurrency": priceCurrency,
      "availability": "https://schema.org/InStock",
      "url": url ? (url.startsWith("http") ? url : `${SITE_CONFIG.url}${url}`) : SITE_CONFIG.url
    };
  }

  return schema;
}

/**
 * Generate Article / BlogPosting Schema
 */
export function getArticleSchema({ title, description, url, image, author, datePublished, dateModified, category, tags = [] }) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "url": url ? (url.startsWith("http") ? url : `${SITE_CONFIG.url}${url}`) : SITE_CONFIG.url,
    "image": image ? (image.startsWith("http") ? image : `${SITE_CONFIG.url}${image}`) : SITE_CONFIG.defaultOgImage,
    "datePublished": datePublished || new Date().toISOString(),
    "dateModified": dateModified || datePublished || new Date().toISOString(),
    "author": {
      "@type": "Person",
      "name": author?.name || author || "Tim Redaksi OPTIBIS",
      "url": author?.slug ? `${SITE_CONFIG.url}/author/${author.slug}` : SITE_CONFIG.url
    },
    "publisher": {
      "@type": "Organization",
      "name": SITE_CONFIG.name,
      "logo": {
        "@type": "ImageObject",
        "url": SITE_CONFIG.logo
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url ? (url.startsWith("http") ? url : `${SITE_CONFIG.url}${url}`) : SITE_CONFIG.url
    },
    "articleSection": category || "Digital Marketing",
    "keywords": tags.length ? tags.join(", ") : undefined,
    "inLanguage": "id-ID"
  };
}

/**
 * Generate FAQPage Schema
 * @param {Array<{ question: string, answer: string }>} faqs 
 */
export function getFAQSchema(faqs = []) {
  if (!faqs.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question || faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer || faq.a
      }
    }))
  };
}

/**
 * Generate SoftwareApplication Schema (for Tools)
 */
export function getSoftwareAppSchema({ name, description, applicationCategory = "BusinessApplication", operatingSystem = "Web Browser", url, image }) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "description": description,
    "applicationCategory": applicationCategory,
    "operatingSystem": operatingSystem,
    "url": url ? (url.startsWith("http") ? url : `${SITE_CONFIG.url}${url}`) : SITE_CONFIG.url,
    "image": image ? (image.startsWith("http") ? image : `${SITE_CONFIG.url}${image}`) : SITE_CONFIG.defaultOgImage,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "IDR"
    }
  };
}
