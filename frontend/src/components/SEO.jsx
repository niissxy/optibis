import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_CONFIG } from '@/lib/seoData';

/**
 * Update or create a <meta> element in <head>
 */
function setMetaTag(attrName, attrVal, content) {
  if (!content && content !== '') return;
  let element = document.head.querySelector(`meta[${attrName}="${attrVal}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attrName, attrVal);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
}

/**
 * Update or create a <link> element in <head>
 */
function setLinkTag(rel, href) {
  if (!href) return;
  let element = document.head.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
}

/**
 * Manage JSON-LD script tag in <head>
 */
function setJsonLd(id, data) {
  let element = document.getElementById(id);
  if (!data) {
    if (element) element.remove();
    return;
  }
  if (!element) {
    element = document.createElement('script');
    element.setAttribute('type', 'application/ld+json');
    element.setAttribute('id', id);
    document.head.appendChild(element);
  }
  element.textContent = JSON.stringify(data);
}

export default function SEO({
  title,
  description,
  keywords,
  image,
  type = 'website',
  canonicalUrl,
  noindex = false,
  structuredData = null,
  publishedTime,
  modifiedTime,
  author,
  section,
}) {
  const location = useLocation();

  const formattedTitle = title
    ? title.startsWith(SITE_CONFIG.name)
      ? title
      : `${SITE_CONFIG.name} — ${title}`
    : `${SITE_CONFIG.name} — Satu Partner untuk Branding, Website, dan Pertumbuhan Digital Bisnis Anda`;

  const metaDescription = description || SITE_CONFIG.description;
  const metaKeywords = keywords || SITE_CONFIG.defaultKeywords;
  const currentUrl = canonicalUrl || `${SITE_CONFIG.url}${location.pathname}${location.search}`;
  const ogImage = image
    ? image.startsWith('http')
      ? image
      : `${SITE_CONFIG.url}${image.startsWith('/') ? '' : '/'}${image}`
    : SITE_CONFIG.defaultOgImage;

  useEffect(() => {
    // 1. Page Title
    document.title = formattedTitle;

    // 2. Standard Meta Tags
    setMetaTag('name', 'description', metaDescription);
    setMetaTag('name', 'keywords', metaKeywords);
    setMetaTag('name', 'author', author || SITE_CONFIG.name);
    setMetaTag(
      'name',
      'robots',
      noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
    );

    // 3. Canonical URL
    setLinkTag('canonical', currentUrl);

    // 4. Open Graph Tags
    setMetaTag('property', 'og:title', formattedTitle);
    setMetaTag('property', 'og:description', metaDescription);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:url', currentUrl);
    setMetaTag('property', 'og:image', ogImage);
    setMetaTag('property', 'og:site_name', SITE_CONFIG.name);
    setMetaTag('property', 'og:locale', 'id_ID');

    if (publishedTime) {
      setMetaTag('property', 'article:published_time', publishedTime);
    }
    if (modifiedTime) {
      setMetaTag('property', 'article:modified_time', modifiedTime);
    }
    if (section) {
      setMetaTag('property', 'article:section', section);
    }

    // 5. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', formattedTitle);
    setMetaTag('name', 'twitter:description', metaDescription);
    setMetaTag('name', 'twitter:image', ogImage);
    setMetaTag('name', 'twitter:site', '@optibis');
    setMetaTag('name', 'twitter:creator', '@optibis');

    // 6. JSON-LD Structured Data
    if (structuredData) {
      const dataPayload = Array.isArray(structuredData)
        ? {
            '@context': 'https://schema.org',
            '@graph': structuredData,
          }
        : structuredData;
      setJsonLd('page-structured-data', dataPayload);
    } else {
      setJsonLd('page-structured-data', null);
    }

    return () => {
      // Optional cleanup on unmount
    };
  }, [
    formattedTitle,
    metaDescription,
    metaKeywords,
    currentUrl,
    ogImage,
    type,
    noindex,
    structuredData,
    publishedTime,
    modifiedTime,
    author,
    section,
  ]);

  return null;
}
