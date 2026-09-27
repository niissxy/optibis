export function getServiceSlug(name) {
  return name
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getServicePath(pillarSlug, serviceName) {
  return `/layanan/${pillarSlug}/${getServiceSlug(serviceName)}`;
}
