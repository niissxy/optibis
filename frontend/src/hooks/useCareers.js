import { useEffect, useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1";

const DEFAULT_CAREERS = [
  { id: "it-fulltime", slug: "it-fulltime", title: "IT", employmentType: "fulltime", summary: "", formUrl: "", whatsappUrl: "", applicationNote: "" },
  { id: "admin-digital-fulltime", slug: "admin-digital-fulltime", title: "Admin Digital", employmentType: "fulltime", summary: "", formUrl: "", whatsappUrl: "", applicationNote: "" },
  { id: "it-magang", slug: "it-magang", title: "IT", employmentType: "internship", summary: "", formUrl: "", whatsappUrl: "", applicationNote: "" },
  { id: "admin-digital-magang", slug: "admin-digital-magang", title: "Admin Digital", employmentType: "internship", summary: "", formUrl: "", whatsappUrl: "", applicationNote: "" },
];

export function useCareers() {
  const [careers, setCareers] = useState(DEFAULT_CAREERS);

  useEffect(() => {
    fetch(`${API}/modules/careers`)
      .then((response) => (response.ok ? response.json() : []))
      .then((items) => {
        if (!Array.isArray(items) || items.length === 0) return;
        setCareers(items
          .filter((item) => item.is_published !== false)
          .map((item) => ({
            id: item.id,
            slug: item.slug,
            title: item.title,
            summary: item.summary || "",
            employmentType: item.data?.employment_type === "internship" ? "internship" : "fulltime",
            formUrl: item.data?.form_url || "",
            whatsappUrl: item.data?.whatsapp_url || "",
            applicationNote: item.data?.application_note || "",
          })));
      })
      .catch(() => {});
  }, []);

  return { careers };
}
