import { PACKAGE_DATA } from "@/data/packages";
import { MARKETING_KIT_ITEMS } from "@/data/marketingKit";
import { TOOLS, getToolImage } from "@/data/tools";
import { VIRALOG_CONTENT } from "@/data/viralog";

function normalize(value = "") {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export function getGlobalSearchItems() {
  const packages = Object.entries(PACKAGE_DATA).map(([slug, pkg]) => ({
    id: `package-${slug}`,
    type: "package",
    title: pkg.name,
    description: pkg.target,
    meta: `${pkg.pillar} - ${pkg.priceShort || pkg.price}`,
    image: pkg.included[0]?.image,
    href: `/paket/${pkg.pillarSlug}/${slug}`,
    keywords: [pkg.pillar, pkg.target, ...pkg.included.map((item) => item.title)],
  }));

  const tools = TOOLS.map((tool, index) => ({
    id: `tool-${index}-${tool.name}`,
    type: "product",
    title: tool.name,
    description: tool.description,
    meta: tool.tagline,
    image: getToolImage(tool),
    href: tool.url,
    external: true,
    keywords: [tool.category, tool.tagline],
  }));

  const marketingProducts = MARKETING_KIT_ITEMS.map((item) => ({
    id: `marketing-${item.slug}`,
    type: "product",
    title: item.nama_asset,
    description: item.deskripsi,
    meta: `${item.kategori} - ${item.format_file}`,
    image: item.thumbnail,
    href: "/marketing-kit",
    keywords: [item.kategori, item.subkategori, item.produk_terkait, item.layanan_terkait],
  }));

  const news = VIRALOG_CONTENT
    .filter((item) => item.status === "published")
    .map((item) => ({
      id: `news-${item.id}`,
      type: "news",
      title: item.title,
      description: item.summary,
      meta: item.category_slug,
      image: item.thumbnail,
      href: `/content/${item.slug}`,
      keywords: [item.subtitle, item.category_slug, ...(item.tags || [])],
    }));

  return [...packages, ...tools, ...marketingProducts, ...news];
}

export function searchGlobal(query, type = "all") {
  const normalizedQuery = normalize(query.trim());
  if (!normalizedQuery) return [];

  return getGlobalSearchItems()
    .filter((item) => type === "all" || item.type === type)
    .filter((item) => {
      const searchable = [item.title, item.description, item.meta, ...(item.keywords || [])]
        .filter(Boolean)
        .map(normalize)
        .join(" ");
      return normalizedQuery.split(/\s+/).every((word) => searchable.includes(word));
    });
}
