import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import * as XLSX from 'xlsx'
import {
  BarChart3,
  BookOpen,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronDown,
  Clock,
  Columns3,
  ExternalLink,
  FileCheck,
  FileUp,
  FileText,
  FolderPlus,
  HelpCircle,
  ImagePlus,
  LayoutDashboard,
  Layers3,
  LogOut,
  Mail,
  Menu,
  Megaphone,
  Newspaper,
  Package,
  Pencil,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Target,
  Trash2,
  Users,
  Wrench,
  X
} from 'lucide-react'
import './App.css'

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1'
const TOOLS_EXCEL_IMPORT_ENABLED = false
const AD_PLACEMENTS = [
  { value: 'top_leaderboard', label: 'Halaman konten — atas', size: '728 × 90' },
  { value: 'section_separator', label: 'Halaman konten — antar bagian', size: '728 × 90' },
  { value: 'in_feed', label: 'Halaman konten — dalam feed', size: 'Native Ad' },
  { value: 'sidebar_sticky', label: 'Halaman konten — sidebar', size: '300 × 250' },
  { value: 'footer_ads', label: 'Halaman konten — footer', size: '728 × 90' },
  { value: 'article_top', label: 'Artikel — atas', size: '728 × 90' },
  { value: 'article_middle', label: 'Artikel — tengah', size: '728 × 90' },
  { value: 'article_bottom', label: 'Artikel — bawah', size: '728 × 90' },
  { value: 'category_banner', label: 'Kategori — banner', size: '728 × 90' },
] as const
const adPlacementSize = (placement: string) => AD_PLACEMENTS.find((item) => item.value === placement)?.size || 'Banner'
const PORTFOLIO_PILLAR_DEFAULTS:Record<string,string[]> = {
  'MyTravelink': ['Digital Asset', 'Website', 'Digital Growth Team'],
  'Samara Property': ['Digital Asset', 'Website'],
  'Optik Clinic': ['Website', 'Digital Growth Team'],
  'Kulina Rasa': ['Digital Asset', 'Digital Growth Team'],
  'Nisa Konsultan': ['Digital Asset', 'Website'],
  'Graha Cipta': ['Website'],
}
type Portfolio = {
  id: number;
  slug: string;
  name: string;
  client?: string;
  industry?: string;
  category: string;
  location?: string;
  year?: string;
  ringkasan?: string;
  description: string;
  hasil?: string;
  featured?: boolean;
  website_url: string;
  image_url: string | null;
  thumbnail_url?: string;
  pilar?: string[];
  products?: string[];
  galeri?: string[];
  stats?: { label: string; value: string }[];
  process?: { num: string; title: string; desc: string }[];
  tags?: string[];
  documents?: { title: string; type: string; desc: string; url: string }[];
  updated_at?: string;
}
type Admin = { id:number; name:string; email:string; created_at:string }
type User = { id:number; name:string; email:string }
type ContentType = 'service-pillars'|'services'|'packages'|'careers'|'marketing-kits'|'insights'|'tools'|'solution-library'|'solution-library-categories'|'solution-library-explore-categories'|'viralog-content'|'viralog-categories'|'viralog-authors'|'viralog-tags'|'viralog-rss-sources'|'viralog-ad-campaigns'|'evolis-business-dna'|'evolis-products'|'evolis-audiences'|'evolis-objectives'|'evolis-campaigns'|'evolis-assets'|'evolis-publishing'|'evolis-leads'|'evolis-pipeline'|'evolis-analytics'|'evolis-recommendations'|'evolis-automations'|'evolis-governance'|'evolis-briefs'|'evolis-settings'|'site-settings'
type ContentItem = { id:number; type?:ContentType; slug:string; title:string; summary:string|null; image_url:string|null; data:Record<string, unknown>|null; is_published:boolean; updated_at?:string }
type Section = 'portfolio'|'admins'|'viralog'|'evolis'|'settings'|ContentType

const SERVICE_PILLARS = [
  { id: 'website', name: 'Website' },
  { id: 'software', name: 'Software & Sistem Bisnis' },
  { id: 'digital-asset', name: 'Digital Asset' },
  { id: 'digital-growth-team', name: 'Digital Growth Team' },
]

const PACKAGE_PILLARS = [
  { id: 'website', name: 'Website' },
  { id: 'digital-asset', name: 'Digital Asset' },
  { id: 'digital-growth-team', name: 'Digital Growth Team' },
  { id: 'khusus', name: 'Paket Khusus' },
]

const CONTENT_SECTIONS:{id:ContentType;label:string;icon:typeof Package}[] = [
  {id:'service-pillars',label:'Pilar Layanan',icon:Columns3},
  {id:'services',label:'Layanan',icon:BriefcaseBusiness},
  {id:'packages',label:'Paket',icon:Package},
  {id:'careers',label:'Karir',icon:BriefcaseBusiness},
  {id:'marketing-kits',label:'Marketing Kit',icon:ImagePlus},
  {id:'insights',label:'Insight',icon:BookOpen},
  {id:'tools',label:'Tools',icon:Wrench},
  {id:'solution-library',label:'Solution Library',icon:Layers3},
  {id:'viralog-content',label:'Viralog',icon:Newspaper},
  {id:'evolis-leads',label:'Leads Masuk',icon:Users},
  {id:'solution-library-categories',label:'Kategori Solution Library',icon:Columns3},
]
const HIDDEN_CONTENT_SECTIONS:ContentType[] = ['solution-library-categories']
const ADMIN_SETTINGS_ENABLED = false
const EVOLIS_MENU_ENABLED = false
const VIRALOG_SECTIONS:{id:ContentType;label:string}[] = [
  {id:'viralog-content',label:'Konten'}, {id:'viralog-categories',label:'Kategori'}, {id:'viralog-authors',label:'Penulis'}, {id:'viralog-tags',label:'Tag'}, {id:'viralog-rss-sources',label:'RSS Source'}, {id:'viralog-ad-campaigns',label:'Ad Placement'},
]
const EVOLIS_SECTIONS:{id:ContentType;label:string}[] = [
  {id:'evolis-business-dna',label:'Business DNA'}, {id:'evolis-products',label:'Produk'}, {id:'evolis-audiences',label:'Audiens'}, {id:'evolis-objectives',label:'Objective'}, {id:'evolis-campaigns',label:'Campaign'}, {id:'evolis-assets',label:'Asset'}, {id:'evolis-publishing',label:'Publishing'}, {id:'evolis-leads',label:'Leads'}, {id:'evolis-pipeline',label:'Pipeline'}, {id:'evolis-recommendations',label:'Rekomendasi'}, {id:'evolis-automations',label:'Automation'}, {id:'evolis-governance',label:'Governance'}, {id:'evolis-briefs',label:'Brief'}, {id:'evolis-settings',label:'Pengaturan Workspace'},
]

async function request(path:string, options:RequestInit = {}) {
  const token = localStorage.getItem('optibis_token'); const headers = new Headers(options.headers)
  if (!(options.body instanceof FormData)) headers.set('Content-Type','application/json')
  if (token) headers.set('Authorization', `Bearer ${token}`)
  headers.set('Accept', 'application/json')
  try {
    const response = await fetch(`${API}${path}`, {...options, headers})
    const body = await response.json().catch(() => ({}))
    if (!response.ok) {
      if (response.status === 413) throw new Error('Ukuran file/gambar terlalu besar (melebihi batas maksimal server).')
      if (response.status === 405) throw new Error('Metode HTTP tidak diizinkan oleh server.')
      throw new Error(body.message || Object.values(body.errors || {}).flat().join(' ') || `Terjadi kesalahan (HTTP ${response.status}).`)
    }
    return body
  } catch (err) {
    if (err instanceof TypeError && err.message.toLowerCase().includes('fetch')) {
      throw new Error('Gagal terhubung ke API (Network / CORS Error). Pastikan origin diizinkan dan server API online.')
    }
    throw err
  }
}


function Login({onLogin}:{onLogin:(user:User, token:string)=>void}) {
  const [email,setEmail] = useState('admin@optibis.test'), [password,setPassword] = useState('password123'), [error,setError] = useState(''), [busy,setBusy] = useState(false)
  async function submit(e:FormEvent) { e.preventDefault(); setBusy(true); setError(''); try { const data=await request('/auth/login',{method:'POST',body:JSON.stringify({email,password})}); onLogin(data.user,data.token) } catch (err) { setError((err as Error).message) } finally { setBusy(false) } }
  return <main className="login-page"><div className="login-art"><div className="art-orb orb-one"/><div className="art-orb orb-two"/><div className="art-copy"><div className="brand-mark">O</div><p className="eyebrow">OPTIBIS STUDIO</p><h1>Bangun karya yang<br/><em>berkesan.</em></h1><p className="muted-light">Kelola portofolio digital Anda dalam satu ruang yang sederhana dan powerful.</p></div></div><div className="login-panel"><div className="mobile-brand"><div className="brand-mark">O</div><span>optibis</span></div><div className="login-box"><p className="eyebrow pink">ADMIN CONSOLE</p><h2>Selamat datang kembali</h2><p className="subtle">Masuk untuk mengelola portofolio dan tim Anda.</p><form onSubmit={submit}><label>Email<div className="input-wrap"><Mail size={17}/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="nama@perusahaan.com"/></div></label><label>Password<div className="input-wrap"><ShieldCheck size={17}/><input type="password" value={password} onChange={e=>setPassword(e.target.value)} required placeholder="••••••••"/></div></label>{error && <div className="error-box">{error}</div>}<button className="primary full" disabled={busy}>{busy?'Memproses…':'Masuk ke dashboard'} <ChevronDown size={17} className="rotate-270"/></button></form><p className="login-hint"></p></div><div className="login-footer">© 2025 Optibis Studio <span>·</span> Built with intention</div></div></main>
}

function App() {
  const [user,setUser] = useState<User|null>(null), [section,setSection] = useState<Section>('portfolio'), [menu,setMenu] = useState(false)
  useEffect(()=>{ const token=localStorage.getItem('optibis_token'); if(token) request('/auth/me').then(d=>setUser(d.user)).catch(()=>localStorage.removeItem('optibis_token')) },[])
  if(!user) return <Login onLogin={(u,t)=>{localStorage.setItem('optibis_token',t);setUser(u)}}/>
  function logout(){ request('/auth/logout',{method:'POST'}).catch(()=>{}).finally(()=>{localStorage.removeItem('optibis_token');setUser(null)}) }
  const sectionLabel = section === 'portfolio' ? 'Portofolio' : section === 'evolis-analytics' ? 'Analytics' : section === 'admins' ? 'Admin' : section === 'service-pillars' ? 'Pilar Layanan' : section === 'services' ? 'Layanan' : section === 'packages' ? 'Paket' : section === 'viralog' ? 'Viralog' : section === 'viralog-ad-campaigns' ? 'Ad Placement' : section === 'evolis' ? 'Evolis' : section === 'settings' ? 'Setting Admin' : CONTENT_SECTIONS.find(item=>item.id===section)?.label
  return <div className="shell"><aside className={menu?'open':''}><div className="side-brand"><div className="brand-mark">O</div><span>optibis</span></div><div className="workspace"><span className="avatar">{user.name[0]}</span><div><strong>{user.name}</strong><small>Administrator</small></div><ChevronDown size={15}/></div><nav><p className="nav-label">WORKSPACE</p><button className={section==='portfolio'?'active':''} onClick={()=>{setSection('portfolio');setMenu(false)}}><LayoutDashboard size={18}/> Portofolio</button><button className={section==='evolis-analytics'?'active':''} onClick={()=>{setSection('evolis-analytics');setMenu(false)}}><BarChart3 size={18}/> Analytics</button><p className="nav-label">KONTEN FRONTEND</p>{CONTENT_SECTIONS.filter(item=>!HIDDEN_CONTENT_SECTIONS.includes(item.id)).map(item=>{const Icon=item.icon;return <button key={item.id} className={section===item.id?'active':''} onClick={()=>{setSection(item.id);setMenu(false)}}><Icon size={18}/> {item.label}</button>})}<button className={section==='viralog'?'active':''} onClick={()=>{setSection('viralog');setMenu(false)}}><Newspaper size={18}/> Viralog</button><button className={section==='viralog-ad-campaigns'?'active':''} onClick={()=>{setSection('viralog-ad-campaigns');setMenu(false)}}><Megaphone size={18}/> Ad Placement</button>{EVOLIS_MENU_ENABLED&&<button className={section==='evolis'?'active':''} onClick={()=>{setSection('evolis');setMenu(false)}}><Layers3 size={18}/> Evolis</button>}<p className="nav-label">AKSES</p><button className={section==='admins'?'active':''} onClick={()=>{setSection('admins');setMenu(false)}}><Users size={18}/> Admin <span className="nav-dot">•</span></button>{ADMIN_SETTINGS_ENABLED&&<button className={section==='settings'?'active':''} onClick={()=>{setSection('settings');setMenu(false)}}><Users size={18}/> Setting Admin</button>}</nav><div className="sidebar-bottom"><div className="side-tip"><BarChart3 size={18}/><div><b>Keep creating</b><small>Ide bagus selalu layak dibuat.</small></div></div><button className="logout" onClick={logout}><LogOut size={17}/> Keluar</button></div></aside><div className="main"><header><button className="menu-btn" onClick={()=>setMenu(!menu)}><Menu/></button><div className="crumb"><span>Workspace</span><b>/</b><strong>{sectionLabel}</strong></div><div className="header-actions"><span className="status"><i/> Sistem online</span><button className="profile" onClick={logout}><span className="avatar">{user.name[0]}</span><ChevronDown size={15}/></button></div></header>{section==='portfolio'?<PortfolioView/>:section==='admins'?<AdminView currentUser={user}/>:section==='service-pillars'?<ServicePillarsView/>:section==='services'?<ServicesView/>:section==='packages'?<PackagesView/>:section==='viralog'?<ContentHub title="Viralog" sections={VIRALOG_SECTIONS}/>:section==='evolis'?<ContentHub title="Evolis" sections={EVOLIS_SECTIONS}/>:section==='settings'?ADMIN_SETTINGS_ENABLED?<ProfileSettingsView currentUser={user} onUpdated={setUser}/>:null:<ContentView type={section} label={sectionLabel || 'Konten'}/>}</div></div>
}

function PortfolioView() {
  const [items, setItems] = useState<Portfolio[]>([])
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState<Portfolio | null | false>(false)
  const [managingCategories, setManagingCategories] = useState(false)
  const [refresh, setRefresh] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    request('/portfolios').then(setItems).catch((e) => setError(e.message))
  }, [refresh])

  const filtered = items.filter((x) =>
    (x.name + ' ' + (x.client || '') + ' ' + (x.category || '') + ' ' + (x.industry || '') + ' ' + (x.tags || []).join(' '))
      .toLowerCase()
      .includes(query.toLowerCase())
  )

  async function remove(id: number) {
    if (!confirm('Hapus portofolio ini secara permanen?')) return
    try {
      await request('/portfolios/' + id, { method: 'DELETE' })
      setRefresh((x) => x + 1)
    } catch (e) {
      setRefresh((x) => x + 1)
      setError((e as Error).message)
    }
  }

  const featuredCount = items.filter((x) => x.featured).length

  return (
    <section className="content">
      <div className="page-title">
        <div>
          <p className="eyebrow pink">CONTENT LIBRARY</p>
          <h1>Portofolio</h1>
          <p className="subtle">Kelola seluruh proyek portofolio, aset digital, detail teknis, dokumen lampiran, dan hasil pengerjaan.</p>
        </div>
        <div className="page-title-actions" style={{ display: 'flex', gap: '8px' }}>
          <button className="secondary" onClick={() => setManagingCategories(true)}>
            <FolderPlus size={17} /> Kelola Kategori
          </button>
          <button className="primary" onClick={() => setEditing(null)}>
            <Plus size={18} /> Tambah portofolio
          </button>
        </div>
      </div>

      <div className="stats">
        <div>
          <span>Total karya</span>
          <b>{items.length}</b>
          <small>Semua portofolio</small>
        </div>
        <div>
          <span>Kategori & Pilar</span>
          <b>{new Set(items.map((x) => x.category)).size}</b>
          <small>{featuredCount} karya unggulan</small>
        </div>
        <div>
          <span>Terakhir diperbarui</span>
          <b className="date-stat">
            {items[0]?.updated_at
              ? new Date(items[0].updated_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })
              : '—'}
          </b>
          <small>Sinkron dengan database</small>
        </div>
      </div>

      <div className="toolbar">
        <div className="search">
          <Search size={17} />
          <input
            placeholder="Cari nama, klien, industri, tag…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <span className="result-count">{filtered.length} karya ditemukan</span>
      </div>

      {error && <div className="error-box">{error}</div>}

      <div className="portfolio-grid">
        {filtered.map((item) => (
          <article className="portfolio-card" key={item.id}>
            <div className="card-image">
              {item.image_url ? (
                <img
                  src={item.image_url}
                  alt={item.name}
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
              ) : (
                <div className="image-placeholder">
                  <BriefcaseBusiness size={26} />
                  <span>{item.category}</span>
                </div>
              )}
              <span className="category">{item.category}</span>
              {item.featured && (
                <span
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '12px',
                    padding: '4px 8px',
                    background: '#e91e63',
                    color: '#fff',
                    borderRadius: '5px',
                    fontSize: '10px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '3px',
                  }}
                >
                  <Star size={11} fill="#fff" /> Unggulan
                </span>
              )}
              <div className="card-hover">
                <button title="Edit portofolio" onClick={() => setEditing(item)}>
                  <Pencil size={16} />
                </button>
                <button title="Hapus portofolio" onClick={() => remove(item.id)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
            <div className="card-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                <h3>{item.name}</h3>
                {item.year && <small style={{ color: '#999', fontWeight: 600 }}>{item.year}</small>}
              </div>
              {item.client && (
                <div style={{ fontSize: '11px', color: '#666', marginBottom: '4px', fontWeight: 500 }}>
                  {item.client} {item.location ? `• ${item.location}` : ''}
                </div>
              )}
              <p>{item.ringkasan || item.description}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                <a href={item.website_url || '#'} target="_blank" rel="noopener noreferrer">
                  Lihat website <ExternalLink size={13} />
                </a>
                {item.documents && item.documents.length > 0 && (
                  <span style={{ fontSize: '11px', color: '#888', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <FileText size={12} /> {item.documents.length} Dokumen
                  </span>
                )}
              </div>
            </div>
          </article>
        ))}
        {!filtered.length && (
          <div className="empty">
            <BriefcaseBusiness size={30} />
            <p>Belum ada portofolio yang cocok.</p>
          </div>
        )}
      </div>

      {editing !== false && (
        <PortfolioModal
          item={editing}
          onClose={() => setEditing(false)}
          onSaved={() => {
            setEditing(false)
            setRefresh((x) => x + 1)
          }}
        />
      )}

      {managingCategories && (
        <PortfolioCategoryModal
          onClose={() => setManagingCategories(false)}
          onSaved={() => setRefresh((x) => x + 1)}
        />
      )}
    </section>
  )
}

function PortfolioCategoryModal({
  onClose,
  onSaved,
}: {
  onClose: () => void
  onSaved?: () => void
}) {
  const [activeTab, setActiveTab] = useState<'project' | 'digital-asset'>('project')
  const [items, setItems] = useState<ContentItem[]>([])
  const [title, setTitle] = useState('')
  const [icon, setIcon] = useState('Layout')
  const [editing, setEditing] = useState<ContentItem | null>(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const load = () =>
    request('/modules/portfolio-categories')
      .then(setItems)
      .catch((err) => setError(err.message))

  useEffect(() => {
    load()
  }, [])

  const reset = () => {
    setTitle('')
    setIcon(activeTab === 'digital-asset' ? 'Palette' : 'Layout')
    setEditing(null)
  }

  useEffect(() => {
    setIcon(activeTab === 'digital-asset' ? 'Palette' : 'Layout')
  }, [activeTab])

  const projectItems = items.filter((item) => (item.summary || item.data?.type) === 'project')
  const digitalAssetItems = items.filter((item) => (item.summary || item.data?.type) === 'digital-asset')
  const currentItems = activeTab === 'project' ? projectItems : digitalAssetItems

  async function save(event: FormEvent) {
    event.preventDefault()
    if (!title.trim()) return
    setBusy(true)
    setError('')
    try {
      const type = editing?.data?.type || activeTab
      const slug = `portfolio-category-${type}-${title.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
      const body = {
        title: title.trim(),
        slug,
        summary: type,
        image_url: null,
        data: { type, icon: icon || (type === 'digital-asset' ? 'Palette' : 'Layout') },
        is_published: true,
      }

      await request(
        editing ? `/modules/portfolio-categories/${editing.id}` : '/modules/portfolio-categories',
        {
          method: editing ? 'PUT' : 'POST',
          body: JSON.stringify(body),
        }
      )
      reset()
      load()
      onSaved?.()
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  async function remove(item: ContentItem) {
    if (!confirm(`Hapus kategori "${item.title}"?`)) return
    try {
      await request(`/modules/portfolio-categories/${item.id}`, { method: 'DELETE' })
      load()
      onSaved?.()
    } catch (err) {
      setError((err as Error).message)
    }
  }

  const iconOptions =
    activeTab === 'project'
      ? ['Layout', 'Briefcase', 'ShoppingCart', 'Server', 'AppWindow', 'Smartphone', 'Monitor', 'PenTool', 'Layers', 'FileText']
      : ['Palette', 'Sparkles', 'Printer', 'Image', 'Share2', 'PenTool', 'FileText', 'Layers']

  return (
    <div className="modal-backdrop">
      <div className="modal modal-lg">
        <div className="modal-head">
          <div>
            <p className="eyebrow pink">PORTOFOLIO</p>
            <h2>Kelola Kategori Portofolio</h2>
          </div>
          <button type="button" className="icon-btn" onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Tab selector */}
        <div className="modal-tabs">
          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'project' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('project')
              reset()
            }}
          >
            📁 Kategori Proyek ({projectItems.length})
          </button>
          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'digital-asset' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('digital-asset')
              reset()
            }}
          >
            🎨 Kategori Digital Asset ({digitalAssetItems.length})
          </button>
        </div>

        <form className="category-manager-form" onSubmit={save} style={{ marginTop: '16px' }}>
          <select
            className="category-icon-input"
            value={icon}
            onChange={(e) => setIcon(e.target.value)}
            style={{ width: '130px' }}
          >
            {iconOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <input
            placeholder={
              activeTab === 'project'
                ? 'Contoh: Website Edukasi, Aplikasi CRM...'
                : 'Contoh: Logo Brand, Desain Sosial Media, Banner...'
            }
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ flex: 1 }}
          />
          <button className="primary" disabled={busy}>
            {editing
              ? 'Update Kategori'
              : `+ Tambah Kategori ${activeTab === 'project' ? 'Proyek' : 'Digital Asset'}`}
          </button>
          {editing && (
            <button type="button" className="secondary" onClick={reset}>
              Batal
            </button>
          )}
        </form>

        {error && <div className="error-box">{error}</div>}

        <div className="category-manager-list" style={{ maxHeight: '320px', overflowY: 'auto' }}>
          {currentItems.map((item) => (
            <div className="category-manager-item" key={item.id}>
              <span className="category-manager-title">
                <small style={{ color: '#888', marginRight: '6px' }}>[{String(item.data?.icon || 'Layout')}]</small>
                <b>{item.title}</b>
                <span
                  style={{
                    fontSize: '11px',
                    marginLeft: '8px',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    background: activeTab === 'digital-asset' ? '#fce4ec' : '#e3f2fd',
                    color: activeTab === 'digital-asset' ? '#c2185b' : '#1565c0',
                    fontWeight: 'bold',
                  }}
                >
                  {activeTab === 'digital-asset' ? 'Digital Asset' : 'Proyek'}
                </span>
              </span>
              <div className="row-actions">
                <button
                  type="button"
                  title="Edit kategori"
                  onClick={() => {
                    setEditing(item)
                    setTitle(item.title)
                    setIcon(String(item.data?.icon || (activeTab === 'digital-asset' ? 'Palette' : 'Layout')))
                  }}
                >
                  <Pencil size={16} />
                </button>
                <button type="button" title="Hapus kategori" onClick={() => remove(item)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {!currentItems.length && (
            <p className="subtle">Belum ada kategori {activeTab === 'project' ? 'proyek' : 'digital asset'}.</p>
          )}
        </div>
      </div>
    </div>
  )
}

function PortfolioModal({
  item,
  onClose,
  onSaved,
}: {
  item: Portfolio | null
  onClose: () => void
  onSaved: () => void
}) {
  const [tab, setTab] = useState<'info' | 'pilar' | 'desc' | 'media' | 'stats' | 'docs'>('info')
  const [form, setForm] = useState({
    name: item?.name || '',
    slug: item?.slug || '',
    client: item?.client || '',
    category: item?.category || '',
    industry: item?.industry || item?.category || '',
    location: item?.location || 'Jakarta',
    year: item?.year || new Date().getFullYear().toString(),
    pilar: item?.pilar?.length ? item.pilar : PORTFOLIO_PILLAR_DEFAULTS[item?.name || ''] || ['Website'],
    products: (item?.products || []).join(', '),
    tags: (item?.tags || []).join(', '),
    ringkasan: item?.ringkasan || '',
    description: item?.description || '',
    hasil: item?.hasil || '',
    featured: Boolean(item?.featured),
    website_url: item?.website_url || '',
    thumbnail_url: item?.thumbnail_url || '',
    galeri_text: (item?.galeri || []).join('\n'),
  })

  const [stats, setStats] = useState<{ label: string; value: string }[]>(
    item?.stats && item.stats.length > 0
      ? item.stats
      : [
          { label: 'Peningkatan Leads', value: '+150%' },
          { label: 'Durasi Proyek', value: '4 minggu' },
        ]
  )

  const [process, setProcess] = useState<{ num: string; title: string; desc: string }[]>(
    item?.process && item.process.length > 0
      ? item.process
      : [
          { num: '01', title: 'Discovery & Analysis', desc: 'Riset kebutuhan target pasar dan model bisnis klien.' },
          { num: '02', title: 'UI/UX Design', desc: 'Perancangan visual interface yang modern dan responsif.' },
          { num: '03', title: 'Development & Launch', desc: 'Pengembangan sistem, integrasi leads, dan testing performa.' },
        ]
  )

  const [documents, setDocuments] = useState<{ title: string; type: string; desc: string; url: string }[]>(
    item?.documents && item.documents.length > 0 ? item.documents : []
  )

  const [categories, setCategories] = useState<ContentItem[]>([])
  const [categoryModalOpen, setCategoryModalOpen] = useState(false)

  const loadCategories = () => {
    request('/modules/portfolio-categories')
      .then(setCategories)
      .catch(() => {})
  }

  useEffect(() => {
    loadCategories()
  }, [])

  const projectCats = categories.filter((c) => (c.summary || c.data?.type) === 'project')
  const digitalCats = categories.filter((c) => (c.summary || c.data?.type) === 'digital-asset')

  const [image, setImage] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const pillars = ['Digital Asset', 'Website', 'Digital Growth Team']

  async function save(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')

    const data = new FormData()
    data.append('name', form.name)
    data.append('slug', form.slug || form.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'))
    data.append('client', form.client || form.name)
    data.append('category', form.category)
    data.append('industry', form.industry || form.category)
    data.append('location', form.location)
    data.append('year', form.year)
    data.append('ringkasan', form.ringkasan || form.description.slice(0, 160))
    data.append('description', form.description)
    data.append('hasil', form.hasil)
    data.append('featured', form.featured ? '1' : '0')
    data.append('website_url', form.website_url)
    data.append('thumbnail_url', form.thumbnail_url)
    data.append('pilar', JSON.stringify(form.pilar))
    data.append('products', JSON.stringify(form.products.split(',').map((s) => s.trim()).filter(Boolean)))
    data.append('tags', JSON.stringify(form.tags.split(',').map((s) => s.trim()).filter(Boolean)))

    const galeriList = form.galeri_text.split(/\r?\n|,(?=\s*(?:https?:\/\/|\/))/).map((s) => s.trim()).filter(Boolean)
    data.append('galeri', JSON.stringify(galeriList))
    data.append('stats', JSON.stringify(stats.filter((s) => s.label.trim())))
    data.append('process', JSON.stringify(process.filter((p) => p.title.trim())))
    data.append('documents', JSON.stringify(documents.filter((d) => d.title.trim())))

    if (image) data.append('image', image)
    if (item) data.append('_method', 'PUT')

    try {
      await request(item ? `/portfolios/${item.id}` : '/portfolios', {
        method: 'POST',
        headers: item ? { 'X-HTTP-Method-Override': 'PUT' } : {},
        body: data,
      })
      onSaved()
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="modal-backdrop">
      <form className="modal modal-lg" onSubmit={save}>
        <div className="modal-head">
          <div>
            <p className="eyebrow pink">{item ? 'EDIT ENTRY' : 'NEW ENTRY'}</p>
            <h2>{item ? 'Edit Portofolio' : 'Tambah Portofolio'}</h2>
          </div>
          <button type="button" className="icon-btn" onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="modal-tabs">
          <button
            type="button"
            className={`modal-tab-btn ${tab === 'info' ? 'active' : ''}`}
            onClick={() => setTab('info')}
          >
            Info Utama
          </button>
          <button
            type="button"
            className={`modal-tab-btn ${tab === 'pilar' ? 'active' : ''}`}
            onClick={() => setTab('pilar')}
          >
            Pilar & Tags
          </button>
          <button
            type="button"
            className={`modal-tab-btn ${tab === 'desc' ? 'active' : ''}`}
            onClick={() => setTab('desc')}
          >
            Deskripsi & Hasil
          </button>
          <button
            type="button"
            className={`modal-tab-btn ${tab === 'media' ? 'active' : ''}`}
            onClick={() => setTab('media')}
          >
            Gambar & Galeri
          </button>
          <button
            type="button"
            className={`modal-tab-btn ${tab === 'stats' ? 'active' : ''}`}
            onClick={() => setTab('stats')}
          >
            Statistik & Tahapan
          </button>
          <button
            type="button"
            className={`modal-tab-btn ${tab === 'docs' ? 'active' : ''}`}
            onClick={() => setTab('docs')}
          >
            Dokumen ({documents.length})
          </button>
        </div>

        <div className="modal-scroll-area">
          {tab === 'info' && (
            <>
              <label>
                Nama proyek
                <input
                  value={form.name}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      name: e.target.value,
                      slug: form.slug || e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                    })
                  }
                  required
                  placeholder="Contoh: Smart GPS Tracker"
                />
              </label>

              <div className="form-row">
                <label>
                  Slug URL
                  <input
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    placeholder="smart-gps-tracker"
                  />
                </label>
                <label>
                  Klien / Nama Perusahaan
                  <input
                    value={form.client}
                    onChange={(e) => setForm({ ...form, client: e.target.value })}
                    placeholder="PT Indo Tracker Solusi"
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Kategori Portofolio
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <select
                      className="select-input"
                      style={{ flex: 1 }}
                      value={form.category}
                      onChange={(e) => {
                        const val = e.target.value
                        const isDigital = digitalCats.some((c) => c.title === val)
                        const isProject = projectCats.some((c) => c.title === val)
                        let newPilar = [...form.pilar]
                        if (isDigital && !newPilar.includes('Digital Asset')) {
                          newPilar.push('Digital Asset')
                        }
                        if (isProject && !newPilar.includes('Website')) {
                          newPilar.push('Website')
                        }
                        setForm({ ...form, category: val, industry: val, pilar: newPilar })
                      }}
                      required
                    >
                      <option value="">-- Pilih Kategori --</option>
                      {projectCats.length > 0 && (
                        <optgroup label="📁 Kategori Proyek">
                          {projectCats.map((c) => (
                            <option key={c.id} value={c.title}>
                              {c.title}
                            </option>
                          ))}
                        </optgroup>
                      )}
                      {digitalCats.length > 0 && (
                        <optgroup label="🎨 Kategori Digital Asset">
                          {digitalCats.map((c) => (
                            <option key={c.id} value={c.title}>
                              {c.title}
                            </option>
                          ))}
                        </optgroup>
                      )}
                      {form.category && !categories.some((c) => c.title === form.category) && (
                        <option value={form.category}>{form.category} (Kustom)</option>
                      )}
                    </select>
                    <button
                      type="button"
                      className="secondary"
                      style={{ padding: '0 10px', fontSize: '11px', whiteSpace: 'nowrap' }}
                      onClick={() => setCategoryModalOpen(true)}
                      title="Kelola / Tambah Kategori"
                    >
                      <Plus size={14} /> Kategori Baru
                    </button>
                  </div>
                </label>
                <label>
                  Lokasi
                  <input
                    value={form.location}
                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                    placeholder="Jakarta, Bandung, Bali..."
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Tahun Pengerjaan
                  <input
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    placeholder="2024"
                  />
                </label>
                <label>
                  Link Website / Live URL
                  <input
                    type="url"
                    value={form.website_url}
                    onChange={(e) => setForm({ ...form, website_url: e.target.value })}
                    placeholder="https://contoh.com"
                  />
                </label>
              </div>

              <label className="check" style={{ marginTop: '12px' }}>
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                />
                Tandai sebagai Proyek Unggulan (Featured Project)
              </label>
            </>
          )}

          {tab === 'pilar' && (
            <>
              <div className="additional-fields">
                <b>Pilar Layanan Optibis</b>
                <div className="topic-options">
                  {pillars.map((pillar) => (
                    <label className="check" key={pillar}>
                      <input
                        type="checkbox"
                        checked={form.pilar.includes(pillar)}
                        onChange={(event) =>
                          setForm({
                            ...form,
                            pilar: event.target.checked
                              ? [...form.pilar, pillar]
                              : form.pilar.filter((value) => value !== pillar),
                          })
                        }
                      />
                      {pillar}
                    </label>
                  ))}
                </div>
              </div>

              <label>
                Produk / Layanan Terkait
                <input
                  value={form.products}
                  onChange={(e) => setForm({ ...form, products: e.target.value })}
                  placeholder="Contoh: Company Website, Tracking System, SEO (pisahkan koma)"
                />
              </label>

              <label>
                Tags / Kata Kunci
                <input
                  value={form.tags}
                  onChange={(e) => setForm({ ...form, tags: e.target.value })}
                  placeholder="Contoh: IoT, Tracking, B2B, SEO, Company Profile (pisahkan koma)"
                />
              </label>
            </>
          )}

          {tab === 'desc' && (
            <>
              <label>
                Ringkasan Singkat (Lead / Excerpt)
                <textarea
                  rows={2}
                  value={form.ringkasan}
                  onChange={(e) => setForm({ ...form, ringkasan: e.target.value })}
                  placeholder="Ringkasan 1-2 kalimat untuk preview card..."
                />
              </label>

              <label>
                Deskripsi Lengkap Proyek
                <textarea
                  rows={5}
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  required
                  placeholder="Jelaskan latar belakang, tantangan, dan solusi yang dibangun..."
                />
              </label>

              <label>
                Hasil & Dampak (Key Impact)
                <textarea
                  rows={3}
                  value={form.hasil}
                  onChange={(e) => setForm({ ...form, hasil: e.target.value })}
                  placeholder="Contoh: +210% peningkatan qualified leads dalam 3 bulan pertama..."
                />
              </label>
            </>
          )}

          {tab === 'media' && (
            <>
              <label>
                URL Thumbnail Utama (Web URL)
                <input
                  value={form.thumbnail_url}
                  onChange={(e) => setForm({ ...form, thumbnail_url: e.target.value })}
                  placeholder="https://images.unsplash.com/..."
                />
              </label>

              <label className="upload">
                Upload File Gambar Utama
                <span>
                  <ImagePlus size={18} /> {image?.name || 'Pilih gambar dari komputer (maks. 5 MB)'}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                  />
                </span>
              </label>

              <label>
                URL Galeri Tambahan (Satu URL per baris)
                <textarea
                  rows={4}
                  value={form.galeri_text}
                  onChange={(e) => setForm({ ...form, galeri_text: e.target.value })}
                  placeholder="https://images.unsplash.com/...&#10;https://images.unsplash.com/..."
                />
              </label>
            </>
          )}

          {tab === 'stats' && (
            <>
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <b>Statistik / Key Metrics</b>
                  <button
                    type="button"
                    className="secondary"
                    style={{ padding: '6px 12px', fontSize: '11px' }}
                    onClick={() => setStats([...stats, { label: '', value: '' }])}
                  >
                    <Plus size={14} /> Tambah Metrik
                  </button>
                </div>
                {stats.map((st, i) => (
                  <div key={i} className="form-row" style={{ alignItems: 'center', marginBottom: '8px' }}>
                    <input
                      placeholder="Label (contoh: Page Speed)"
                      value={st.label}
                      onChange={(e) => {
                        const next = [...stats]
                        next[i].label = e.target.value
                        setStats(next)
                      }}
                    />
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <input
                        placeholder="Nilai (contoh: 98/100)"
                        value={st.value}
                        onChange={(e) => {
                          const next = [...stats]
                          next[i].value = e.target.value
                          setStats(next)
                        }}
                      />
                      <button
                        type="button"
                        className="icon-btn"
                        onClick={() => setStats(stats.filter((_, idx) => idx !== i))}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <b>Tahapan Pengerjaan (Timeline)</b>
                  <button
                    type="button"
                    className="secondary"
                    style={{ padding: '6px 12px', fontSize: '11px' }}
                    onClick={() =>
                      setProcess([
                        ...process,
                        { num: `0${process.length + 1}`, title: '', desc: '' },
                      ])
                    }
                  >
                    <Plus size={14} /> Tambah Tahap
                  </button>
                </div>
                {process.map((pr, i) => (
                  <div
                    key={i}
                    style={{
                      border: '1px solid #f0eef0',
                      borderRadius: '8px',
                      padding: '10px',
                      marginBottom: '10px',
                      background: '#fcfbfc',
                    }}
                  >
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
                      <input
                        style={{ width: '60px' }}
                        placeholder="No"
                        value={pr.num}
                        onChange={(e) => {
                          const next = [...process]
                          next[i].num = e.target.value
                          setProcess(next)
                        }}
                      />
                      <input
                        style={{ flex: 1 }}
                        placeholder="Judul Tahap (contoh: UI/UX Architecture)"
                        value={pr.title}
                        onChange={(e) => {
                          const next = [...process]
                          next[i].title = e.target.value
                          setProcess(next)
                        }}
                      />
                      <button
                        type="button"
                        className="icon-btn"
                        onClick={() => setProcess(process.filter((_, idx) => idx !== i))}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <textarea
                      rows={2}
                      placeholder="Penjelasan tahapan..."
                      value={pr.desc}
                      onChange={(e) => {
                        const next = [...process]
                        next[i].desc = e.target.value
                        setProcess(next)
                      }}
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          {tab === 'docs' && (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <div>
                  <b>Dokumen & Deliverables Terkait</b>
                  <p style={{ fontSize: '11px', color: '#888', margin: 0 }}>
                    Materi PDF/dokumen yang dapat dipratinjau & diunduh oleh pengunjung di halaman detail.
                  </p>
                </div>
                <button
                  type="button"
                  className="secondary"
                  style={{ padding: '6px 12px', fontSize: '11px' }}
                  onClick={() =>
                    setDocuments([
                      ...documents,
                      { title: '', type: 'PDF', desc: '', url: '' },
                    ])
                  }
                >
                  <Plus size={14} /> Tambah Dokumen
                </button>
              </div>

              {documents.map((doc, i) => (
                <div
                  key={i}
                  style={{
                    border: '1px solid #f0eef0',
                    borderRadius: '9px',
                    padding: '12px',
                    marginBottom: '10px',
                    background: '#fcfbfc',
                  }}
                >
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <input
                      style={{ flex: 2 }}
                      placeholder="Judul Dokumen (contoh: Brand Guideline)"
                      value={doc.title}
                      onChange={(e) => {
                        const next = [...documents]
                        next[i].title = e.target.value
                        setDocuments(next)
                      }}
                    />
                    <input
                      style={{ width: '90px' }}
                      placeholder="Tipe (PDF)"
                      value={doc.type}
                      onChange={(e) => {
                        const next = [...documents]
                        next[i].type = e.target.value
                        setDocuments(next)
                      }}
                    />
                    <button
                      type="button"
                      className="icon-btn"
                      onClick={() => setDocuments(documents.filter((_, idx) => idx !== i))}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <input
                    style={{ width: '100%', marginBottom: '8px' }}
                    placeholder="URL Dokumen / File (https://example.com/docs/...)"
                    value={doc.url}
                    onChange={(e) => {
                      const next = [...documents]
                      next[i].url = e.target.value
                      setDocuments(next)
                    }}
                  />
                  <textarea
                    rows={2}
                    placeholder="Deskripsi singkat isi dokumen..."
                    value={doc.desc}
                    onChange={(e) => {
                      const next = [...documents]
                      next[i].desc = e.target.value
                      setDocuments(next)
                    }}
                  />
                </div>
              ))}

              {!documents.length && (
                <div style={{ textAlign: 'center', padding: '30px', color: '#999', background: '#faf9fa', borderRadius: '8px' }}>
                  <FileText size={24} style={{ margin: '0 auto 8px', display: 'block', opacity: 0.5 }} />
                  Belum ada dokumen lampiran. Klik tombol "Tambah Dokumen" di atas.
                </div>
              )}
            </>
          )}
        </div>

        {error && <div className="error-box">{error}</div>}

        <div className="modal-actions">
          <button type="button" className="secondary" onClick={onClose}>
            Batal
          </button>
          <button className="primary" disabled={busy}>
            {busy ? 'Menyimpan…' : 'Simpan Portofolio'}
          </button>
        </div>
      </form>

      {categoryModalOpen && (
        <PortfolioCategoryModal
          onClose={() => setCategoryModalOpen(false)}
          onSaved={() => {
            loadCategories()
          }}
        />
      )}
    </div>
  )
}

function AdminView({currentUser}:{currentUser:User}){const [items,setItems]=useState<Admin[]>([]), [editing,setEditing]=useState<Admin|null|false>(false), [refresh,setRefresh]=useState(0), [error,setError]=useState('');useEffect(()=>{request('/admins').then(setItems).catch(e=>setError(e.message))},[refresh]);async function remove(id:number){if(!confirm('Hapus admin ini?'))return;try{await request('/admins/'+id,{method:'DELETE'});setRefresh(x=>x+1)}catch(e){setError((e as Error).message)}}return <section className="content"><div className="page-title"><div><p className="eyebrow pink">TEAM ACCESS</p><h1>Admin</h1><p className="subtle">Kelola siapa saja yang punya akses ke workspace.</p></div><button className="primary" onClick={()=>setEditing(null)}><Plus size={18}/> Tambah admin</button></div><div className="admin-table"><div className="table-head"><span>Nama</span><span>Email</span><span>Bergabung</span><span></span></div>{items.map(item=><div className="table-row" key={item.id}><div className="person"><span className="avatar">{item.name[0]}</span><div><b>{item.name}</b>{item.id===currentUser.id&&<small>Anda</small>}</div></div><span>{item.email}</span><span>{new Date(item.created_at).toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'})}</span><div className="row-actions"><button onClick={()=>setEditing(item)}><Pencil size={16}/></button><button onClick={()=>remove(item.id)}><Trash2 size={16}/></button></div></div>)}{!items.length&&<div className="empty">Belum ada admin.</div>}</div>{error&&<div className="error-box">{error}</div>}{editing!==false&&<AdminModal item={editing} onClose={()=>setEditing(false)} onSaved={()=>{setEditing(false);setRefresh(x=>x+1)}}/>}</section>}
function AdminModal({item,onClose,onSaved}:{item:Admin|null,onClose:()=>void,onSaved:()=>void}){const [form,setForm]=useState({name:item?.name||'',email:item?.email||'',password:''}), [error,setError]=useState(''), [busy,setBusy]=useState(false);async function save(e:FormEvent){e.preventDefault();setBusy(true);try{const body={...form};if(!body.password)delete (body as Partial<typeof body>).password;await request(item?`/admins/${item.id}`:'/admins',{method:item?'PUT':'POST',body:JSON.stringify(body)});onSaved()}catch(err){setError((err as Error).message)}finally{setBusy(false)}}return <div className="modal-backdrop"><form className="modal small-modal" onSubmit={save}><div className="modal-head"><div><p className="eyebrow pink">{item?'EDIT ADMIN':'TEAM ACCESS'}</p><h2>{item?'Edit admin':'Tambah admin'}</h2></div><button type="button" className="icon-btn" onClick={onClose}><X/></button></div><label>Nama lengkap<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/></label><label>Email<input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/></label><label>Password<input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder={item?'Kosongkan jika tidak berubah':'Min. 8 karakter'} required={!item}/></label>{error&&<div className="error-box">{error}</div>}<div className="modal-actions"><button type="button" className="secondary" onClick={onClose}>Batal</button><button className="primary" disabled={busy}>{busy?'Menyimpan…':'Simpan admin'}</button></div></form></div>}

function ProfileSettingsView({currentUser,onUpdated}:{currentUser:User;onUpdated:(user:User)=>void}){const [form,setForm]=useState({name:currentUser.name,email:currentUser.email,password:''}),[error,setError]=useState(''),[success,setSuccess]=useState(''),[busy,setBusy]=useState(false);async function save(event:FormEvent){event.preventDefault();setBusy(true);setError('');setSuccess('');try{const body={...form};if(!body.password)delete (body as Partial<typeof body>).password;const updated=await request(`/admins/${currentUser.id}`,{method:'PUT',body:JSON.stringify(body)});onUpdated(updated);setForm({...form,password:''});setSuccess('Setting admin berhasil diperbarui.')}catch(err){setError((err as Error).message)}finally{setBusy(false)}}return <section className="content"><div className="page-title"><div><p className="eyebrow pink">SETTING ADMIN</p><h1>Setting Admin Page</h1><p className="subtle">Kelola informasi dan keamanan akun admin.</p></div></div><form className="modal" onSubmit={save}><label>Nama lengkap<input value={form.name} onChange={event=>setForm({...form,name:event.target.value})} required/></label><label>Email<input type="email" value={form.email} onChange={event=>setForm({...form,email:event.target.value})} required/></label><label>Password baru<input type="password" value={form.password} onChange={event=>setForm({...form,password:event.target.value})} placeholder="Kosongkan jika tidak ingin mengubah password"/></label>{error&&<div className="error-box">{error}</div>}{success&&<div className="success-box">{success}</div>}<div className="modal-actions"><button className="primary" disabled={busy}>{busy?'Menyimpan…':'Simpan perubahan'}</button></div></form></section>}

function ContentHub({title,sections}:{title:string;sections:{id:ContentType;label:string}[]}){const [active,setActive]=useState<ContentType>(sections[0].id);const label=sections.find(item=>item.id===active)?.label||'';return <><section className="content"><div className="page-title"><div><p className="eyebrow pink">CONTENT HUB</p><h1>{title}</h1><p className="subtle">Kelola seluruh data {title} dari satu menu.</p></div></div><div className={`toolbar${title==='Viralog'?' viralog-selector':''}`}>{sections.map(item=><button key={item.id} className={active===item.id?'primary':'secondary'} onClick={()=>setActive(item.id)}>{item.label}</button>)}</div></section><ContentView type={active} label={`${title}: ${label}`}/></>}

const FLYER_PRESETS = [
  { label: 'Flyer Paket Siap Usaha (Digital Asset)', value: '/assets/paket-digital-asset/siap-usaha.jpg' },
  { label: 'Flyer Paket Citra Usaha (Digital Asset)', value: '/assets/paket-digital-asset/citra-usaha.jpg' },
  { label: 'Flyer Paket Bisnis Profesional (Digital Asset)', value: '/assets/paket-digital-asset/bisnis.png' },
  { label: 'Flyer Paket Landing Page (Website)', value: '/assets/paket-website/landing-page.png' },
  { label: 'Flyer Paket Multi Page (Website)', value: '/assets/paket-website/multi-page.png' },
  { label: 'Flyer Paket Toko Online (Website)', value: '/assets/paket-website/toko-online.png' },
  { label: 'Flyer Paket Admin Digital / Growth Team', value: '/assets/paket-growth/admin-digital.png' },
]

function ServicePillarsView() {
  const [items, setItems] = useState<ContentItem[]>([])
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState<ContentItem | null | false>(false)
  const [refresh, setRefresh] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    request('/modules/service-pillars').then(setItems).catch(e => setError(e.message))
  }, [refresh])

  const filtered = items.filter(item => {
    const data = (item.data || {}) as Record<string, any>
    const highlights = Array.isArray(data.highlights) ? data.highlights.join(' ') : ''
    const headline = (data.headline || '').toString()
    const tag = (data.tag || '').toString()
    return `${item.title} ${item.slug} ${item.summary || ''} ${tag} ${headline} ${highlights}`
      .toLowerCase()
      .includes(query.toLowerCase())
  })

  const totalHighlights = items.reduce((acc, item) => {
    const data = (item.data || {}) as Record<string, any>
    return acc + (Array.isArray(data.highlights) ? data.highlights.length : 0)
  }, 0)

  async function remove(id: number, title: string) {
    if (!confirm(`Hapus pilar layanan "${title}" ini?`)) return
    try {
      await request(`/modules/service-pillars/${id}`, { method: 'DELETE' })
      setRefresh(v => v + 1)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <section className="content">
      <div className="page-title">
        <div>
          <p className="eyebrow pink">SERVICE PILLARS MANAGEMENT</p>
          <h1>Pilar Layanan</h1>
          <p className="subtle">Kelola 3 pilar utama solusi Optibis, headline, highlight layanan, dan tautan navigasi.</p>
        </div>
        <button className="primary" onClick={() => setEditing(null)}>
          <Plus size={18} /> Tambah Pilar
        </button>
      </div>

      <div className="stats">
        <div>
          <span>Total Pilar</span>
          <b>{items.length}</b>
          <small>Pilar solusi utama</small>
        </div>
        <div>
          <span>Total Highlight / Sub-layanan</span>
          <b>{totalHighlights}</b>
          <small>Poin keunggulan pilar</small>
        </div>
        <div>
          <span>Terakhir Diperbarui</span>
          <b className="date-stat">
            {items[0]?.updated_at ? new Date(items[0].updated_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }) : '—'}
          </b>
          <small>Update terkini</small>
        </div>
      </div>

      <div className="toolbar">
        <div className="search">
          <Search size={17} />
          <input
            placeholder="Cari pilar, headline, atau highlight…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <span className="result-count">{filtered.length} pilar</span>
      </div>

      {error && <div className="error-box">{error}</div>}

      <div className="admin-table pillars-table">
        <div className="table-head">
          <span>Pilar Solusi</span>
          <span>Tema & Urutan</span>
          <span>Highlight Layanan</span>
          <span>Link Halaman</span>
          <span>Status</span>
          <span></span>
        </div>

        {filtered.map(item => {
          const data = (item.data || {}) as Record<string, any>
          const highlights: string[] = Array.isArray(data.highlights) ? data.highlights : []
          const tag = data.tag || `PILAR ${data.order || ''}`
          const theme = data.color || data.theme || 'magenta'

          return (
            <div className="table-row" key={item.id}>
              <div className="person">
                {item.image_url ? (
                  <img className="avatar avatar-pillar" src={item.image_url} alt="" />
                ) : (
                  <span className="avatar"><Columns3 size={15} /></span>
                )}
                <div>
                  <b>{item.title}</b>
                  <span className="pillar-headline">{data.headline || item.summary}</span>
                </div>
              </div>

              <div>
                <span className={`pillar-tag pillar-${theme}`}>
                  {tag}
                </span>
                <span className="color-label">Tema: {theme}</span>
              </div>

              <div className="features-preview-cell">
                <span className="features-badge">
                  <Check size={12} /> {highlights.length} highlight
                </span>
                {highlights.length > 0 && (
                  <div className="features-preview-list">
                    {highlights.slice(0, 3).map((h, i) => (
                      <span key={i} className="feature-snippet">• {h}</span>
                    ))}
                    {highlights.length > 3 && (
                      <span className="feature-snippet-more">+{highlights.length - 3} lainnya</span>
                    )}
                  </div>
                )}
              </div>

              <span className="slug-cell">{data.link || `/${item.slug}`}</span>

              <div>
                <span className={`status-tag ${item.is_published ? 'published' : 'draft'}`}>
                  {item.is_published ? 'Published' : 'Draft'}
                </span>
              </div>

              <div className="row-actions">
                <button title="Edit Pilar" onClick={() => setEditing(item)}>
                  <Pencil size={16} />
                </button>
                <button title="Hapus Pilar" onClick={() => remove(item.id, item.title)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          )
        })}

        {!filtered.length && (
          <div className="empty">
            <Columns3 size={32} style={{ margin: '0 auto 10px', opacity: 0.5 }} />
            <p>Belum ada data pilar layanan.</p>
          </div>
        )}
      </div>

      {editing !== false && (
        <ServicePillarModal
          item={editing}
          onClose={() => setEditing(false)}
          onSaved={() => {
            setEditing(false)
            setRefresh(v => v + 1)
          }}
        />
      )}
    </section>
  )
}

function ServicePillarModal({
  item,
  onClose,
  onSaved
}: {
  item: ContentItem | null
  onClose: () => void
  onSaved: () => void
}) {
  const existingData = (item?.data || {}) as Record<string, any>
  const initialHighlights: string[] = Array.isArray(existingData.highlights) ? existingData.highlights : []

  const [form, setForm] = useState({
    title: item?.title || '',
    slug: item?.slug || '',
    summary: item?.summary || existingData.desc || '',
    image_url: item?.image_url || '',
    is_published: item?.is_published ?? true,
    tag: existingData.tag || 'PILAR 1',
    order: existingData.order || 1,
    headline: existingData.headline || '',
    color: existingData.color || existingData.theme || 'magenta',
    link: existingData.link || (item?.slug ? `/${item.slug}` : ''),
    button_text: existingData.button_text || 'Lihat Layanan',
    badge: existingData.badge || '',
    title_prefix: existingData.title_prefix || '',
    title_highlight: existingData.title_highlight || '',
    icon: existingData.icon || 'Columns3'
  })

  const [highlights, setHighlights] = useState<string[]>(initialHighlights)
  const [newHighlightText, setNewHighlightText] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  function handleTitleChange(val: string) {
    const prevSlug = form.slug
    const autoPrevSlug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const newSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    if (!item && (prevSlug === '' || prevSlug === autoPrevSlug)) {
      setForm(prev => ({ ...prev, title: val, slug: newSlug, link: `/${newSlug}` }))
    } else {
      setForm(prev => ({ ...prev, title: val }))
    }
  }

  function addHighlight() {
    const trimmed = newHighlightText.trim()
    if (!trimmed) return
    setHighlights(prev => [...prev, trimmed])
    setNewHighlightText('')
  }

  function updateHighlight(index: number, val: string) {
    setHighlights(prev => {
      const updated = [...prev]
      updated[index] = val
      return updated
    })
  }

  function removeHighlight(index: number) {
    setHighlights(prev => prev.filter((_, i) => i !== index))
  }

  function moveHighlight(index: number, direction: 'up' | 'down') {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === highlights.length - 1)) return
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    setHighlights(prev => {
      const list = [...prev]
      const temp = list[index]
      list[index] = list[targetIndex]
      list[targetIndex] = temp
      return list
    })
  }

  async function save(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')

    const cleanHighlights = highlights.map(h => h.trim()).filter(Boolean)

    const payloadData: Record<string, any> = {
      ...existingData,
      tag: form.tag,
      order: Number(form.order) || 1,
      headline: form.headline,
      desc: form.summary,
      highlights: cleanHighlights,
      link: form.link,
      color: form.color,
      theme: form.color,
      button_text: form.button_text,
      badge: form.badge || `${form.tag} — ${form.title.toUpperCase()}`,
      title_prefix: form.title_prefix,
      title_highlight: form.title_highlight,
      icon: form.icon
    }

    const payload = {
      title: form.title,
      slug: form.slug.trim(),
      summary: form.summary,
      image_url: form.image_url.trim() || null,
      is_published: form.is_published,
      data: payloadData
    }

    try {
      await request(item ? `/modules/service-pillars/${item.id}` : '/modules/service-pillars', {
        method: item ? 'PUT' : 'POST',
        body: JSON.stringify(payload)
      })
      onSaved()
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="modal-backdrop">
      <form className="modal modal-lg" onSubmit={save}>
        <div className="modal-head">
          <div>
            <p className="eyebrow pink">{item ? 'EDIT PILAR LAYANAN' : 'PILAR LAYANAN BARU'}</p>
            <h2>{item ? `Edit Pilar: ${item.title}` : 'Tambah Pilar Layanan Baru'}</h2>
          </div>
          <button type="button" className="icon-btn" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="modal-scroll-area">
          <div className="form-row">
            <label>
              Nama Pilar
              <input
                value={form.title}
                onChange={e => handleTitleChange(e.target.value)}
                placeholder="Contoh: Digital Asset"
                required
              />
            </label>

            <label>
              Tag / Label Pilar
              <input
                value={form.tag}
                onChange={e => setForm({ ...form, tag: e.target.value })}
                placeholder="Contoh: PILAR 1"
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Slug URL
              <input
                value={form.slug}
                onChange={e => setForm({ ...form, slug: e.target.value })}
                placeholder="digital-asset"
                required
              />
            </label>

            <label>
              Tema Warna
              <select
                value={form.color}
                onChange={e => setForm({ ...form, color: e.target.value })}
                className="select-input"
              >
                <option value="magenta">Magenta / Pink (Pilar 1)</option>
                <option value="amethyst">Amethyst / Ungu (Pilar 2)</option>
                <option value="navy">Navy / Biru (Pilar 3)</option>
              </select>
            </label>
          </div>

          <div className="form-row">
            <label>
              Headline / Subtitle Utama
              <input
                value={form.headline}
                onChange={e => setForm({ ...form, headline: e.target.value })}
                placeholder="Contoh: Bangun citra bisnis yang profesional"
                required
              />
            </label>

            <label>
              Urutan Tampil (Order)
              <input
                type="number"
                value={form.order}
                onChange={e => setForm({ ...form, order: Number(e.target.value) })}
                required
              />
            </label>
          </div>

          <label>
            Deskripsi / Ringkasan Pilar
            <textarea
              rows={3}
              value={form.summary}
              onChange={e => setForm({ ...form, summary: e.target.value })}
              placeholder="Jelaskan deskripsi atau nilai dari pilar layanan ini..."
              required
            />
          </label>

          <div className="form-row">
            <label>
              URL Link Halaman
              <input
                value={form.link}
                onChange={e => setForm({ ...form, link: e.target.value })}
                placeholder="/digital-asset"
                required
              />
            </label>

            <label>
              Teks Tombol CTA
              <input
                value={form.button_text}
                onChange={e => setForm({ ...form, button_text: e.target.value })}
                placeholder="Lihat Digital Asset"
                required
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Pilih Flyer Banner (Frontend)
              <select
                value={FLYER_PRESETS.some(f => f.value === form.image_url) ? form.image_url : 'custom'}
                onChange={e => {
                  if (e.target.value !== 'custom') {
                    setForm({ ...form, image_url: e.target.value })
                  }
                }}
                className="select-input"
              >
                <option value="" disabled>-- Pilih Preset Flyer Frontend --</option>
                {FLYER_PRESETS.map((f, i) => (
                  <option key={i} value={f.value}>{f.label}</option>
                ))}
                <option value="custom">-- Kustom / URL Gambar Lainnya --</option>
              </select>
            </label>

            <label>
              Path / URL Gambar Flyer
              <input
                type="text"
                value={form.image_url}
                onChange={e => setForm({ ...form, image_url: e.target.value })}
                placeholder="/assets/paket-digital-asset/siap-usaha.jpg"
                required
              />
            </label>
          </div>

          {form.image_url && (
            <div className="flyer-preview-card">
              <img
                src={form.image_url}
                alt="Preview Flyer"
                className="flyer-preview-img"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.opacity = '0.3'
                }}
              />
              <div>
                <b style={{ fontSize: '13px', display: 'block', color: 'var(--ink)' }}>Preview Flyer Pilar Layanan</b>
                <small style={{ color: 'var(--muted)', fontSize: '11px', display: 'block', marginTop: '3px' }}>{form.image_url}</small>
                <span style={{ fontSize: '11px', color: 'var(--pink)', fontWeight: 600, marginTop: '5px', display: 'inline-block' }}>
                  ✓ Flyer aktif ditampilkan di halaman beranda & halaman detail pilar
                </span>
              </div>
            </div>
          )}

          <div className="form-row">
            <label>
              Badge Header Detail (Opsional)
              <input
                value={form.badge}
                onChange={e => setForm({ ...form, badge: e.target.value })}
                placeholder="PILAR 1 — DIGITAL ASSET"
              />
            </label>

            <label>
              Awalan Judul Detail (Title Prefix)
              <input
                value={form.title_prefix}
                onChange={e => setForm({ ...form, title_prefix: e.target.value })}
                placeholder="Bangun Citra Bisnis yang "
              />
            </label>
          </div>

          <div className="form-row">
            <label>
              Sorotan Judul Detail (Title Highlight)
              <input
                value={form.title_highlight}
                onChange={e => setForm({ ...form, title_highlight: e.target.value })}
                placeholder="Profesional"
              />
            </label>

            <label>
              Ikon Pilar
              <input
                value={form.icon}
                onChange={e => setForm({ ...form, icon: e.target.value })}
                placeholder="Palette / Globe / Users"
              />
            </label>
          </div>

          {/* HIGHLIGHTS BUILDER */}
          <div className="features-section">
            <div className="features-section-header">
              <div>
                <h3 className="features-section-title">
                  <CheckCircle2 size={18} className="icon-pink" />
                  Highlight Layanan (Sub-layanan)
                </h3>
                <p className="features-section-sub">
                  Daftar layanan atau deliverables utama yang tercakup dalam pilar ini.
                </p>
              </div>
              <span className="features-count-pill">
                {highlights.length} Poin
              </span>
            </div>

            {/* Quick Add Bar */}
            <div className="feature-add-box">
              <input
                type="text"
                className="feature-add-input"
                placeholder="Ketik highlight layanan (misal: Logo & Brand Guideline, Company Profile)..."
                value={newHighlightText}
                onChange={e => setNewHighlightText(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    addHighlight()
                  }
                }}
              />
              <button
                type="button"
                className="primary feature-add-btn"
                onClick={addHighlight}
                disabled={!newHighlightText.trim()}
              >
                <Plus size={16} /> Tambah
              </button>
            </div>

            {/* Highlights List */}
            <div className="feature-list-container">
              {highlights.length > 0 ? (
                <div className="feature-items-list">
                  {highlights.map((item, idx) => (
                    <div className="feature-item-row" key={idx}>
                      <span className="feature-check-icon">
                        <Check size={15} />
                      </span>
                      <span className="feature-index-badge">{idx + 1}</span>
                      <input
                        type="text"
                        className="feature-text-input"
                        value={item}
                        onChange={e => updateHighlight(idx, e.target.value)}
                        placeholder="Nama highlight layanan"
                        required
                      />
                      <div className="feature-item-actions">
                        <button
                          type="button"
                          className="icon-mini-btn"
                          title="Pindah ke atas"
                          disabled={idx === 0}
                          onClick={() => moveHighlight(idx, 'up')}
                        >
                          <ChevronDown size={14} style={{ transform: 'rotate(180deg)' }} />
                        </button>
                        <button
                          type="button"
                          className="icon-mini-btn"
                          title="Pindah ke bawah"
                          disabled={idx === highlights.length - 1}
                          onClick={() => moveHighlight(idx, 'down')}
                        >
                          <ChevronDown size={14} />
                        </button>
                        <button
                          type="button"
                          className="icon-mini-btn delete"
                          title="Hapus poin ini"
                          onClick={() => removeHighlight(idx)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="feature-empty-state">
                  <p>Belum ada highlight layanan yang ditambahkan.</p>
                  <small>Ketik highlight di kolom atas lalu klik tombol <strong>Tambah</strong> atau tekan <strong>Enter</strong>.</small>
                </div>
              )}
            </div>
          </div>

          <label className="check" style={{ marginTop: '16px' }}>
            <input
              type="checkbox"
              checked={form.is_published}
              onChange={e => setForm({ ...form, is_published: e.target.checked })}
            />
            Tampilkan di frontend (Published)
          </label>
        </div>

        {error && <div className="error-box">{error}</div>}

        <div className="modal-actions">
          <button type="button" className="secondary" onClick={onClose}>
            Batal
          </button>
          <button className="primary" disabled={busy}>
            {busy ? 'Menyimpan…' : 'Simpan Pilar'}
          </button>
        </div>
      </form>
    </div>
  )
}

function ServicesView() {
  const [items, setItems] = useState<ContentItem[]>([])
  const [query, setQuery] = useState('')
  const [pillarFilter, setPillarFilter] = useState<string>('all')
  const [editing, setEditing] = useState<ContentItem | null | false>(false)
  const [refresh, setRefresh] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    request('/modules/services').then(setItems).catch(e => setError(e.message))
  }, [refresh])

  const filtered = items.filter(item => {
    const data = (item.data || {}) as Record<string, any>
    const rawPillar = (data.pillar_slug || data.pillar || '').toString().trim().toLowerCase()
    const pillar = SERVICE_PILLARS.find(p => p.id === rawPillar || p.name.toLowerCase() === rawPillar)?.id || rawPillar
    const features = Array.isArray(data.features) ? data.features.join(' ') : ''
    const highlights = Array.isArray(data.highlights) ? data.highlights.map((h: any) => `${h.title || h} ${h.desc || ''}`).join(' ') : ''
    const included = Array.isArray(data.included) ? data.included.map((inc: any) => `${inc.title || inc} ${inc.desc || ''}`).join(' ') : ''
    const faqs = Array.isArray(data.faqs) ? data.faqs.map((f: any) => `${f.q || f.question || ''} ${f.a || f.answer || ''}`).join(' ') : ''
    const target = (data.target || '').toString()
    const timeline = (data.timeline || '').toString()
    const price = (data.price || '').toString()
    const matchQuery = `${item.title} ${item.slug} ${item.summary || ''} ${pillar} ${features} ${highlights} ${included} ${faqs} ${target} ${timeline} ${price}`.toLowerCase().includes(query.toLowerCase())
    const matchPillar = pillarFilter === 'all' || pillar === pillarFilter
    return matchQuery && matchPillar
  })

  const totalFeatures = items.reduce((acc, item) => {
    const data = (item.data || {}) as Record<string, any>
    return acc + (Array.isArray(data.features) ? data.features.length : 0)
  }, 0)

  async function remove(id: number, title: string) {
    if (!confirm(`Hapus layanan "${title}" ini?`)) return
    try {
      await request(`/modules/services/${id}`, { method: 'DELETE' })
      setRefresh(v => v + 1)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <section className="content">
      <div className="page-title">
        <div>
          <p className="eyebrow pink">SERVICES MANAGEMENT</p>
          <h1>Layanan</h1>
          <p className="subtle">Kelola seluruh layanan, pilar, alasan memilih, detail layanan, cakupan, dan FAQ.</p>
        </div>
        <button className="primary" onClick={() => setEditing(null)}>
          <Plus size={18} /> Tambah Layanan
        </button>
      </div>

      <div className="stats">
        <div>
          <span>Total Layanan</span>
          <b>{items.length}</b>
          <small>Semua pilar aktif</small>
        </div>
        <div>
          <span>Total Cakupan / Fitur</span>
          <b>{totalFeatures}</b>
          <small>Poin "Yang Termasuk"</small>
        </div>
        <div>
          <span>Terakhir Diperbarui</span>
          <b className="date-stat">
            {items[0]?.updated_at ? new Date(items[0].updated_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }) : '—'}
          </b>
          <small>Update terkini</small>
        </div>
      </div>

      <div className="toolbar" style={{ flexWrap: 'wrap', gap: '12px' }}>
        <div className="search">
          <Search size={17} />
          <input
            placeholder="Cari layanan, cakupan, harga, target…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <button
            className={pillarFilter === 'all' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setPillarFilter('all')}
          >
            Semua Pilar
          </button>
          {SERVICE_PILLARS.map(p => (
            <button
              key={p.id}
              className={pillarFilter === p.id ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setPillarFilter(p.id)}
            >
              {p.name}
            </button>
          ))}
        </div>
        <span className="result-count">{filtered.length} layanan</span>
      </div>

      {error && <div className="error-box">{error}</div>}

      <div className="admin-table services-table">
        <div className="table-head">
          <span>Layanan</span>
          <span>Pilar & Harga</span>
          <span>Cakupan & Detail</span>
          <span>Slug</span>
          <span>Status</span>
          <span></span>
        </div>

        {filtered.map(item => {
          const data = (item.data || {}) as Record<string, any>
          const features: string[] = Array.isArray(data.features) ? data.features : []
          const highlights: any[] = Array.isArray(data.highlights) ? data.highlights : []
          const included: any[] = Array.isArray(data.included) ? data.included : []
          const faqs: any[] = Array.isArray(data.faqs) ? data.faqs : []
          const pillar = data.pillar_slug || data.pillar || 'website'
          const pillarObj = SERVICE_PILLARS.find(p => p.id === pillar) || { name: pillar || 'Website' }
          const flyer = item.image_url || data.image || data.heroImage || data.flyer_image

          return (
            <div className="table-row" key={item.id}>
              <div className="person">
                {flyer ? (
                  <img className="avatar avatar-pillar" src={flyer} alt="" />
                ) : (
                  <span className="avatar"><BriefcaseBusiness size={15} /></span>
                )}
                <div>
                  <b>{item.title}</b>
                  {item.summary && <small>{item.summary}</small>}
                </div>
              </div>

              <div>
                <span className={`pillar-tag pillar-${pillar}`}>
                  {pillarObj.name}
                </span>
                {data.price && (
                  <div style={{ marginTop: '4px' }}>
                    <span className="package-price-main">{data.price}</span>
                    {(data.price_note || data.price_period) && <span className="package-price-note">{data.price_note || data.price_period}</span>}
                  </div>
                )}
              </div>

              <div className="features-preview-cell">
                <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '4px' }}>
                  <span className="features-badge">
                    <Check size={12} /> {features.length} cakupan
                  </span>
                  {highlights.length > 0 && (
                    <span className="features-badge" style={{ background: '#fce7f3', color: '#be185d' }}>
                      <Sparkles size={11} /> {highlights.length} alasan
                    </span>
                  )}
                  {included.length > 0 && (
                    <span className="features-badge" style={{ background: '#e0f2fe', color: '#0369a1' }}>
                      <Package size={11} /> {included.length} detail
                    </span>
                  )}
                  {faqs.length > 0 && (
                    <span className="features-badge" style={{ background: '#f3e8ff', color: '#7e22ce' }}>
                      <HelpCircle size={11} /> {faqs.length} faq
                    </span>
                  )}
                </div>
                {features.length > 0 && (
                  <div className="features-preview-list">
                    {features.slice(0, 2).map((f, i) => (
                      <span key={i} className="feature-snippet">• {f}</span>
                    ))}
                    {features.length > 2 && (
                      <span className="feature-snippet-more">+{features.length - 2} lainnya</span>
                    )}
                  </div>
                )}
              </div>

              <span className="slug-cell">{item.slug}</span>

              <div>
                <span className={`status-tag ${item.is_published ? 'published' : 'draft'}`}>
                  {item.is_published ? 'Published' : 'Draft'}
                </span>
              </div>

              <div className="row-actions">
                <button title="Edit Layanan" onClick={() => setEditing(item)}>
                  <Pencil size={16} />
                </button>
                <button title="Hapus Layanan" onClick={() => remove(item.id, item.title)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          )
        })}

        {!filtered.length && (
          <div className="empty">
            <BriefcaseBusiness size={32} style={{ margin: '0 auto 10px', opacity: 0.5 }} />
            <p>Belum ada data layanan yang sesuai.</p>
          </div>
        )}
      </div>

      {editing !== false && (
        <ServiceModal
          item={editing}
          onClose={() => setEditing(false)}
          onSaved={() => {
            setEditing(false)
            setRefresh(v => v + 1)
          }}
        />
      )}
    </section>
  )
}

type HighlightItem = { title: string; desc: string }
type IncludedItem = { title: string; desc: string; image?: string }
type FaqItem = { q: string; a: string }

function ServiceModal({
  item,
  onClose,
  onSaved
}: {
  item: ContentItem | null
  onClose: () => void
  onSaved: () => void
}) {
  const existingData = (item?.data || {}) as Record<string, any>
  const initialFeatures: string[] = Array.isArray(existingData.features) ? existingData.features : []
  const initialHighlights: HighlightItem[] = Array.isArray(existingData.highlights)
    ? existingData.highlights.map((h: any) => typeof h === 'string' ? { title: h, desc: '' } : { title: h.title || '', desc: h.desc || '' })
    : []
  const initialIncluded: IncludedItem[] = Array.isArray(existingData.included)
    ? existingData.included.map((inc: any) => typeof inc === 'string' ? { title: inc, desc: '', image: '' } : { title: inc.title || '', desc: inc.desc || '', image: inc.image || '' })
    : []
  const initialFaqs: FaqItem[] = Array.isArray(existingData.faqs)
    ? existingData.faqs.map((f: any) => ({ q: f.q || f.question || '', a: f.a || f.answer || '' }))
    : []
  const initialPillar = existingData.pillar_slug || existingData.pillar || 'website'

  const [activeTab, setActiveTab] = useState<'info' | 'features' | 'highlights' | 'included' | 'faqs' | 'packages'>('info')

  const [form, setForm] = useState({
    title: item?.title || '',
    slug: item?.slug || '',
    pillar: initialPillar,
    summary: item?.summary || existingData.desc || '',
    image_url: item?.image_url || existingData.image || existingData.flyer_image || '',
    price: existingData.price || '',
    price_note: existingData.price_note || existingData.price_period || '',
    target: existingData.target || '',
    timeline: existingData.timeline || '',
    display_order: String(existingData.display_order ?? ''),
    is_published: item?.is_published ?? true
  })

  // Features state
  const [features, setFeatures] = useState<string[]>(initialFeatures)
  const [newFeatureText, setNewFeatureText] = useState('')

  // Highlights state ("Mengapa Memilih Layanan Ini")
  const [highlights, setHighlights] = useState<HighlightItem[]>(initialHighlights)
  const [newHlTitle, setNewHlTitle] = useState('')
  const [newHlDesc, setNewHlDesc] = useState('')

  // Included state ("Detail Layanan / Yang Didapatkan")
  const [included, setIncluded] = useState<IncludedItem[]>(initialIncluded)
  const [newIncTitle, setNewIncTitle] = useState('')
  const [newIncDesc, setNewIncDesc] = useState('')
  const [newIncImage, setNewIncImage] = useState('')

  // FAQ state ("Pertanyaan Umum")
  const [faqs, setFaqs] = useState<FaqItem[]>(initialFaqs)
  const [newFaqQ, setNewFaqQ] = useState('')
  const [newFaqA, setNewFaqA] = useState('')

  // Packages state ("Paket Layanan")
  const initialPackages: any[] = Array.isArray(existingData.packages) ? existingData.packages : []
  const [packages, setPackages] = useState<any[]>(initialPackages)
  const [packagesTitle, setPackagesTitle] = useState<string>(existingData.packages_title || '')
  const [packagesSubtitle, setPackagesSubtitle] = useState<string>(existingData.packages_subtitle || '')
  const [newPkgFeatureText, setNewPkgFeatureText] = useState<{ [pkgIdx: number]: string }>({})

  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  function handleTitleChange(val: string) {
    const prevSlug = form.slug
    const autoPrevSlug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const newSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    if (!item && (prevSlug === '' || prevSlug === autoPrevSlug)) {
      setForm(prev => ({ ...prev, title: val, slug: newSlug }))
    } else {
      setForm(prev => ({ ...prev, title: val }))
    }
  }

  // Feature handlers
  function addFeature() {
    const trimmed = newFeatureText.trim()
    if (!trimmed) return
    setFeatures(prev => [...prev, trimmed])
    setNewFeatureText('')
  }
  function updateFeature(index: number, val: string) {
    setFeatures(prev => {
      const updated = [...prev]
      updated[index] = val
      return updated
    })
  }
  function removeFeature(index: number) {
    setFeatures(prev => prev.filter((_, i) => i !== index))
  }
  function moveFeature(index: number, direction: 'up' | 'down') {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === features.length - 1)) return
    const targetIndex = direction === 'up' ? index - 1 : index + 1
    setFeatures(prev => {
      const list = [...prev]
      const temp = list[index]
      list[index] = list[targetIndex]
      list[targetIndex] = temp
      return list
    })
  }

  // Highlight handlers
  function addHighlight() {
    if (!newHlTitle.trim()) return
    setHighlights(prev => [...prev, { title: newHlTitle.trim(), desc: newHlDesc.trim() }])
    setNewHlTitle('')
    setNewHlDesc('')
  }
  function updateHighlight(index: number, field: 'title' | 'desc', val: string) {
    setHighlights(prev => {
      const copy = [...prev]
      copy[index] = { ...copy[index], [field]: val }
      return copy
    })
  }
  function removeHighlight(index: number) {
    setHighlights(prev => prev.filter((_, i) => i !== index))
  }
  function moveHighlight(index: number, direction: 'up' | 'down') {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === highlights.length - 1)) return
    const targetIdx = direction === 'up' ? index - 1 : index + 1
    setHighlights(prev => {
      const list = [...prev]
      const temp = list[index]
      list[index] = list[targetIdx]
      list[targetIdx] = temp
      return list
    })
  }

  // Included handlers
  function addIncluded() {
    if (!newIncTitle.trim()) return
    setIncluded(prev => [...prev, { title: newIncTitle.trim(), desc: newIncDesc.trim(), image: newIncImage.trim() || undefined }])
    setNewIncTitle('')
    setNewIncDesc('')
    setNewIncImage('')
  }
  function updateIncluded(index: number, field: 'title' | 'desc' | 'image', val: string) {
    setIncluded(prev => {
      const copy = [...prev]
      copy[index] = { ...copy[index], [field]: val }
      return copy
    })
  }
  function removeIncluded(index: number) {
    setIncluded(prev => prev.filter((_, i) => i !== index))
  }
  function moveIncluded(index: number, direction: 'up' | 'down') {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === included.length - 1)) return
    const targetIdx = direction === 'up' ? index - 1 : index + 1
    setIncluded(prev => {
      const list = [...prev]
      const temp = list[index]
      list[index] = list[targetIdx]
      list[targetIdx] = temp
      return list
    })
  }

  // FAQ handlers
  function addFaq() {
    if (!newFaqQ.trim()) return
    setFaqs(prev => [...prev, { q: newFaqQ.trim(), a: newFaqA.trim() }])
    setNewFaqQ('')
    setNewFaqA('')
  }
  function updateFaq(index: number, field: 'q' | 'a', val: string) {
    setFaqs(prev => {
      const copy = [...prev]
      copy[index] = { ...copy[index], [field]: val }
      return copy
    })
  }
  function removeFaq(index: number) {
    setFaqs(prev => prev.filter((_, i) => i !== index))
  }
  function moveFaq(index: number, direction: 'up' | 'down') {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === faqs.length - 1)) return
    const targetIdx = direction === 'up' ? index - 1 : index + 1
    setFaqs(prev => {
      const list = [...prev]
      const temp = list[index]
      list[index] = list[targetIdx]
      list[targetIdx] = temp
      return list
    })
  }

  // Package handlers
  function addPackage() {
    const pkgIndex = packages.length + 1
    const pkgName = `Paket ${pkgIndex}`
    const svcSlug = form.slug || 'layanan'
    const newPkg = {
      slug: `${svcSlug}-paket-${pkgIndex}`,
      name: pkgName,
      price: 'Rp 1.000.000',
      original_price: '',
      discount: '',
      renewal: '',
      target: 'Target pengguna paket',
      popular: false,
      badge: '',
      features: [
        { text: 'Fitur unggulan 1', included: true },
        { text: 'Fitur unggulan 2', included: true }
      ]
    }
    setPackages(prev => [...prev, newPkg])
  }
  function updatePackage(index: number, field: string, val: any) {
    setPackages(prev => {
      const copy = [...prev]
      const oldName = copy[index].name
      copy[index] = { ...copy[index], [field]: val }
      if (field === 'name' && form.slug) {
        const autoOldSlug = `${form.slug}-${(oldName || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`
        if (!copy[index].slug || copy[index].slug === autoOldSlug || copy[index].slug.startsWith(`${form.slug}-paket-`)) {
          const cleanName = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
          if (cleanName) {
            copy[index].slug = `${form.slug}-${cleanName}`
          }
        }
      }
      return copy
    })
  }
  function removePackage(index: number) {
    setPackages(prev => prev.filter((_, i) => i !== index))
  }
  function addPackageFeature(pkgIdx: number) {
    const text = (newPkgFeatureText[pkgIdx] || '').trim()
    if (!text) return
    setPackages(prev => {
      const copy = [...prev]
      const curFeats = Array.isArray(copy[pkgIdx].features) ? [...copy[pkgIdx].features] : []
      curFeats.push({ text, included: true })
      copy[pkgIdx] = { ...copy[pkgIdx], features: curFeats }
      return copy
    })
    setNewPkgFeatureText(prev => ({ ...prev, [pkgIdx]: '' }))
  }
  function updatePackageFeature(pkgIdx: number, featIdx: number, field: 'text' | 'included', val: any) {
    setPackages(prev => {
      const copy = [...prev]
      const curFeats = Array.isArray(copy[pkgIdx].features) ? [...copy[pkgIdx].features] : []
      const cur = curFeats[featIdx]
      const curObj = typeof cur === 'string' ? { text: cur, included: true } : { ...cur }
      curObj[field] = val
      curFeats[featIdx] = curObj
      copy[pkgIdx] = { ...copy[pkgIdx], features: curFeats }
      return copy
    })
  }
  function removePackageFeature(pkgIdx: number, featIdx: number) {
    setPackages(prev => {
      const copy = [...prev]
      const curFeats = Array.isArray(copy[pkgIdx].features) ? [...copy[pkgIdx].features] : []
      curFeats.splice(featIdx, 1)
      copy[pkgIdx] = { ...copy[pkgIdx], features: curFeats }
      return copy
    })
  }

  async function save(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')

    const cleanFeatures = features.map(f => f.trim()).filter(Boolean)
    const cleanHighlights = highlights.filter(h => h.title.trim())
    const cleanIncluded = included.filter(inc => inc.title.trim())
    const cleanFaqs = faqs.filter(f => f.q.trim())

    const payloadData: Record<string, any> = {
      ...existingData,
      name: form.title,
      desc: form.summary,
      pillar: form.pillar,
      pillar_slug: form.pillar,
      pillar_name: SERVICE_PILLARS.find(p => p.id === form.pillar)?.name || form.pillar,
      image: form.image_url.trim() || null,
      price: form.price.trim(),
      price_note: form.price_note.trim(),
      target: form.target.trim(),
      timeline: form.timeline.trim(),
      display_order: form.display_order === '' ? null : Number(form.display_order),
      features: cleanFeatures,
      highlights: cleanHighlights,
      included: cleanIncluded,
      faqs: cleanFaqs,
      packages: packages,
      packages_title: packagesTitle.trim() || undefined,
      packages_subtitle: packagesSubtitle.trim() || undefined
    }

    const payload = {
      title: form.title,
      slug: form.slug.trim(),
      summary: form.summary,
      image_url: form.image_url.trim() || null,
      is_published: form.is_published,
      data: payloadData
    }

    try {
      await request(item ? `/modules/services/${item.id}` : '/modules/services', {
        method: item ? 'PUT' : 'POST',
        body: JSON.stringify(payload)
      })
      onSaved()
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="modal-backdrop">
      <form className="modal modal-lg" onSubmit={save}>
        <div className="modal-head">
          <div>
            <p className="eyebrow pink">{item ? 'EDIT LAYANAN' : 'LAYANAN BARU'}</p>
            <h2>{item ? `Edit Layanan: ${item.title}` : 'Tambah Layanan Baru'}</h2>
          </div>
          <button type="button" className="icon-btn" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="modal-tabs">
          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'info' ? 'active' : ''}`}
            onClick={() => setActiveTab('info')}
          >
            <BriefcaseBusiness size={14} /> Informasi Dasar
          </button>
          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'features' ? 'active' : ''}`}
            onClick={() => setActiveTab('features')}
          >
            <CheckCircle2 size={14} /> Cakupan ({features.length})
          </button>
          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'highlights' ? 'active' : ''}`}
            onClick={() => setActiveTab('highlights')}
          >
            <Sparkles size={14} /> Mengapa Memilih ({highlights.length})
          </button>
          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'included' ? 'active' : ''}`}
            onClick={() => setActiveTab('included')}
          >
            <Package size={14} /> Detail Layanan ({included.length})
          </button>
          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'faqs' ? 'active' : ''}`}
            onClick={() => setActiveTab('faqs')}
          >
            <HelpCircle size={14} /> FAQ ({faqs.length})
          </button>
          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'packages' ? 'active' : ''}`}
            onClick={() => setActiveTab('packages')}
          >
            <Package size={14} /> Paket Layanan ({packages.length})
          </button>
        </div>

        <div className="modal-scroll-area">
          {/* TAB 1: INFORMASI DASAR */}
          {activeTab === 'info' && (
            <>
              <div className="form-row">
                <label>
                  Nama Layanan
                  <input
                    value={form.title}
                    onChange={e => handleTitleChange(e.target.value)}
                    placeholder="Contoh: Landing Page"
                    required
                  />
                </label>

                <label>
                  Pilar Layanan
                  <select
                    value={form.pillar}
                    onChange={e => setForm({ ...form, pillar: e.target.value })}
                    required
                    className="select-input"
                  >
                    {SERVICE_PILLARS.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="form-row">
                <label>
                  Slug URL
                  <input
                    value={form.slug}
                    onChange={e => setForm({ ...form, slug: e.target.value })}
                    placeholder="landing-page"
                    required
                  />
                </label>

                <label>
                  URL Gambar Banner / Flyer
                  <input
                    type="text"
                    value={form.image_url}
                    onChange={e => setForm({ ...form, image_url: e.target.value })}
                    placeholder="https://images.unsplash.com/... atau /assets/paket-website/landing-page.png"
                  />
                </label>
              </div>

              <label>
                Urutan Tampil
                <input
                  type="number"
                  min="1"
                  value={form.display_order}
                  onChange={e => setForm({ ...form, display_order: e.target.value })}
                  placeholder="Contoh: 1"
                />
              </label>

              {form.image_url && (
                <div className="flyer-preview-card">
                  <img
                    src={form.image_url}
                    alt="Preview Banner/Flyer"
                    className="flyer-preview-img"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.opacity = '0.3'
                    }}
                  />
                  <div>
                    <b style={{ fontSize: '13px', display: 'block', color: 'var(--ink)' }}>Preview Gambar Layanan</b>
                    <small style={{ color: 'var(--muted)', fontSize: '11px', display: 'block', marginTop: '3px' }}>{form.image_url}</small>
                  </div>
                </div>
              )}

              <label>
                Ringkasan / Deskripsi Layanan
                <textarea
                  rows={3}
                  value={form.summary}
                  onChange={e => setForm({ ...form, summary: e.target.value })}
                  placeholder="Jelaskan deskripsi singkat atau fungsi dari layanan ini..."
                  required
                />
              </label>

              <div className="form-row">
                <label>
                  Estimasi Harga
                  <input
                    value={form.price}
                    onChange={e => setForm({ ...form, price: e.target.value })}
                    placeholder="Contoh: Rp 3.500.000 atau Sesuai Kebutuhan"
                  />
                </label>

                <label>
                  Periode / Keterangan Harga
                  <input
                    value={form.price_note}
                    onChange={e => setForm({ ...form, price_note: e.target.value })}
                    placeholder="Contoh: Sekali bayar / /bulan"
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Target Audiens (Cocok untuk Siapa)
                  <textarea
                    rows={2}
                    value={form.target}
                    onChange={e => setForm({ ...form, target: e.target.value })}
                    placeholder="Contoh: Promosi & campaign, UMKM, perusahaan baru..."
                  />
                </label>

                <label>
                  Estimasi Lama Pengerjaan (Timeline)
                  <input
                    value={form.timeline}
                    onChange={e => setForm({ ...form, timeline: e.target.value })}
                    placeholder="Contoh: 5–7 hari kerja"
                  />
                </label>
              </div>

              <label className="check" style={{ marginTop: '16px' }}>
                <input
                  type="checkbox"
                  checked={form.is_published}
                  onChange={e => setForm({ ...form, is_published: e.target.checked })}
                />
                Tampilkan di frontend (Published)
              </label>
            </>
          )}

          {/* TAB 2: CAKUPAN LAYANAN */}
          {activeTab === 'features' && (
            <div className="features-section">
              <div className="features-section-header">
                <div>
                  <h3 className="features-section-title">
                    <CheckCircle2 size={18} className="icon-pink" />
                    Yang Termasuk dalam Layanan
                  </h3>
                  <p className="features-section-sub">
                    Cakupan utama dan poin yang akan didapatkan klien dari layanan ini.
                  </p>
                </div>
                <span className="features-count-pill">
                  {features.length} Poin
                </span>
              </div>

              <div className="feature-add-box">
                <input
                  type="text"
                  className="feature-add-input"
                  placeholder="Ketik cakupan layanan (misal: 1 halaman responsif, Form inquiry & WhatsApp)..."
                  value={newFeatureText}
                  onChange={e => setNewFeatureText(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addFeature()
                    }
                  }}
                />
                <button
                  type="button"
                  className="primary feature-add-btn"
                  onClick={addFeature}
                  disabled={!newFeatureText.trim()}
                >
                  <Plus size={16} /> Tambah
                </button>
              </div>

              <div className="feature-list-container">
                {features.length > 0 ? (
                  <div className="feature-items-list">
                    {features.map((feat, idx) => (
                      <div className="feature-item-row" key={idx}>
                        <span className="feature-check-icon">
                          <Check size={15} />
                        </span>
                        <span className="feature-index-badge">{idx + 1}</span>
                        <input
                          type="text"
                          className="feature-text-input"
                          value={feat}
                          onChange={e => updateFeature(idx, e.target.value)}
                          placeholder="Deskripsi cakupan layanan"
                          required
                        />
                        <div className="feature-item-actions">
                          <button
                            type="button"
                            className="icon-mini-btn"
                            title="Pindah ke atas"
                            disabled={idx === 0}
                            onClick={() => moveFeature(idx, 'up')}
                          >
                            <ChevronDown size={14} style={{ transform: 'rotate(180deg)' }} />
                          </button>
                          <button
                            type="button"
                            className="icon-mini-btn"
                            title="Pindah ke bawah"
                            disabled={idx === features.length - 1}
                            onClick={() => moveFeature(idx, 'down')}
                          >
                            <ChevronDown size={14} />
                          </button>
                          <button
                            type="button"
                            className="icon-mini-btn delete"
                            title="Hapus poin ini"
                            onClick={() => removeFeature(idx)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="feature-empty-state">
                    <p>Belum ada poin cakupan yang ditambahkan.</p>
                    <small>Ketik cakupan di kolom atas lalu klik tombol <strong>Tambah</strong> atau tekan <strong>Enter</strong>.</small>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: MENGAPA MEMILIH LAYANAN INI */}
          {activeTab === 'highlights' && (
            <div className="features-section">
              <div className="features-section-header">
                <div>
                  <h3 className="features-section-title">
                    <Sparkles size={18} className="icon-pink" />
                    Mengapa Memilih Layanan Ini?
                  </h3>
                  <p className="features-section-sub">
                    Poin-poin keunggulan atau alasan utama mengapa klien memilih layanan ini.
                  </p>
                </div>
                <span className="features-count-pill">
                  {highlights.length} Poin Alasan
                </span>
              </div>

              <div style={{ background: '#fff', border: '1px solid #ebdbe2', borderRadius: '10px', padding: '12px', marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input
                  type="text"
                  className="feature-add-input"
                  placeholder="Judul alasan (misal: Fokus Konversi, Loading Cepat)…"
                  value={newHlTitle}
                  onChange={e => setNewHlTitle(e.target.value)}
                />
                <textarea
                  rows={2}
                  className="feature-add-input"
                  placeholder="Deskripsi penjelasan alasan…"
                  value={newHlDesc}
                  onChange={e => setNewHlDesc(e.target.value)}
                />
                <button
                  type="button"
                  className="primary"
                  style={{ alignSelf: 'flex-end', height: '36px', padding: '0 16px' }}
                  onClick={addHighlight}
                  disabled={!newHlTitle.trim()}
                >
                  <Plus size={15} /> Tambah Alasan
                </button>
              </div>

              <div className="feature-items-list">
                {highlights.map((item, idx) => (
                  <div className="item-card-row" key={idx}>
                    <div className="item-card-header">
                      <strong>
                        <span className="feature-index-badge">{idx + 1}</span>
                        <Sparkles size={14} style={{ color: 'var(--pink)' }} />
                        Alasan #{idx + 1}
                      </strong>
                      <div className="item-card-actions">
                        <button
                          type="button"
                          className="icon-mini-btn"
                          title="Pindah ke atas"
                          disabled={idx === 0}
                          onClick={() => moveHighlight(idx, 'up')}
                        >
                          <ChevronDown size={14} style={{ transform: 'rotate(180deg)' }} />
                        </button>
                        <button
                          type="button"
                          className="icon-mini-btn"
                          title="Pindah ke bawah"
                          disabled={idx === highlights.length - 1}
                          onClick={() => moveHighlight(idx, 'down')}
                        >
                          <ChevronDown size={14} />
                        </button>
                        <button
                          type="button"
                          className="icon-mini-btn delete"
                          title="Hapus"
                          onClick={() => removeHighlight(idx)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <input
                      type="text"
                      value={item.title}
                      onChange={e => updateHighlight(idx, 'title', e.target.value)}
                      placeholder="Judul alasan"
                      required
                      style={{ fontWeight: 600 }}
                    />
                    <textarea
                      rows={2}
                      value={item.desc}
                      onChange={e => updateHighlight(idx, 'desc', e.target.value)}
                      placeholder="Deskripsi penjelasan alasan"
                    />
                  </div>
                ))}
                {!highlights.length && (
                  <div className="feature-empty-state">
                    <p>Belum ada alasan "Mengapa Memilih Layanan Ini" yang ditambahkan.</p>
                    <small>Gunakan form di atas untuk menambahkan alasan.</small>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: DETAIL LAYANAN / YANG DIDAPATKAN */}
          {activeTab === 'included' && (
            <div className="features-section">
              <div className="features-section-header">
                <div>
                  <h3 className="features-section-title">
                    <Package size={18} className="icon-pink" />
                    Detail Layanan (Yang Anda Dapatkan)
                  </h3>
                  <p className="features-section-sub">
                    Rincian deliverables atau fitur utama lengkap dengan judul, deskripsi, dan gambar pendukung.
                  </p>
                </div>
                <span className="features-count-pill">
                  {included.length} Detail Layanan
                </span>
              </div>

              <div style={{ background: '#fff', border: '1px solid #ebdbe2', borderRadius: '10px', padding: '12px', marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input
                  type="text"
                  className="feature-add-input"
                  placeholder="Nama detail layanan (misal: 1 Halaman Landing Page, Mobile Responsive)…"
                  value={newIncTitle}
                  onChange={e => setNewIncTitle(e.target.value)}
                />
                <textarea
                  rows={2}
                  className="feature-add-input"
                  placeholder="Deskripsi rincian…"
                  value={newIncDesc}
                  onChange={e => setNewIncDesc(e.target.value)}
                />
                <input
                  type="text"
                  className="feature-add-input"
                  placeholder="URL / Path Gambar (opsional)…"
                  value={newIncImage}
                  onChange={e => setNewIncImage(e.target.value)}
                />
                <button
                  type="button"
                  className="primary"
                  style={{ alignSelf: 'flex-end', height: '36px', padding: '0 16px' }}
                  onClick={addIncluded}
                  disabled={!newIncTitle.trim()}
                >
                  <Plus size={15} /> Tambah Detail Layanan
                </button>
              </div>

              <div className="feature-items-list">
                {included.map((item, idx) => (
                  <div className="item-card-row" key={idx}>
                    <div className="item-card-header">
                      <strong>
                        <span className="feature-index-badge">{idx + 1}</span>
                        <Package size={14} style={{ color: '#0284c7' }} />
                        Detail #{idx + 1}
                      </strong>
                      <div className="item-card-actions">
                        <button
                          type="button"
                          className="icon-mini-btn"
                          title="Pindah ke atas"
                          disabled={idx === 0}
                          onClick={() => moveIncluded(idx, 'up')}
                        >
                          <ChevronDown size={14} style={{ transform: 'rotate(180deg)' }} />
                        </button>
                        <button
                          type="button"
                          className="icon-mini-btn"
                          title="Pindah ke bawah"
                          disabled={idx === included.length - 1}
                          onClick={() => moveIncluded(idx, 'down')}
                        >
                          <ChevronDown size={14} />
                        </button>
                        <button
                          type="button"
                          className="icon-mini-btn delete"
                          title="Hapus"
                          onClick={() => removeIncluded(idx)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <input
                      type="text"
                      value={item.title}
                      onChange={e => updateIncluded(idx, 'title', e.target.value)}
                      placeholder="Nama detail layanan"
                      required
                      style={{ fontWeight: 600 }}
                    />
                    <textarea
                      rows={2}
                      value={item.desc}
                      onChange={e => updateIncluded(idx, 'desc', e.target.value)}
                      placeholder="Deskripsi rincian"
                    />
                    <input
                      type="text"
                      value={item.image || ''}
                      onChange={e => updateIncluded(idx, 'image', e.target.value)}
                      placeholder="URL / Path Gambar (opsional)"
                    />
                  </div>
                ))}
                {!included.length && (
                  <div className="feature-empty-state">
                    <p>Belum ada detail layanan yang ditambahkan.</p>
                    <small>Gunakan form di atas untuk menambahkan rincian.</small>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: PERTANYAAN UMUM (FAQ) */}
          {activeTab === 'faqs' && (
            <div className="features-section">
              <div className="features-section-header">
                <div>
                  <h3 className="features-section-title">
                    <HelpCircle size={18} className="icon-pink" />
                    Pertanyaan Umum (FAQ)
                  </h3>
                  <p className="features-section-sub">
                    Pertanyaan yang sering diajukan klien beserta jawabannya untuk layanan ini.
                  </p>
                </div>
                <span className="features-count-pill">
                  {faqs.length} FAQ
                </span>
              </div>

              <div style={{ background: '#fff', border: '1px solid #ebdbe2', borderRadius: '10px', padding: '12px', marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input
                  type="text"
                  className="feature-add-input"
                  placeholder="Pertanyaan (misal: Apakah domain sudah termasuk?)…"
                  value={newFaqQ}
                  onChange={e => setNewFaqQ(e.target.value)}
                />
                <textarea
                  rows={2}
                  className="feature-add-input"
                  placeholder="Jawaban pertanyaan…"
                  value={newFaqA}
                  onChange={e => setNewFaqA(e.target.value)}
                />
                <button
                  type="button"
                  className="primary"
                  style={{ alignSelf: 'flex-end', height: '36px', padding: '0 16px' }}
                  onClick={addFaq}
                  disabled={!newFaqQ.trim()}
                >
                  <Plus size={15} /> Tambah FAQ
                </button>
              </div>

              <div className="feature-items-list">
                {faqs.map((item, idx) => (
                  <div className="item-card-row" key={idx}>
                    <div className="item-card-header">
                      <strong>
                        <span className="feature-index-badge">{idx + 1}</span>
                        <HelpCircle size={14} style={{ color: '#7c3aed' }} />
                        FAQ #{idx + 1}
                      </strong>
                      <div className="item-card-actions">
                        <button
                          type="button"
                          className="icon-mini-btn"
                          title="Pindah ke atas"
                          disabled={idx === 0}
                          onClick={() => moveFaq(idx, 'up')}
                        >
                          <ChevronDown size={14} style={{ transform: 'rotate(180deg)' }} />
                        </button>
                        <button
                          type="button"
                          className="icon-mini-btn"
                          title="Pindah ke bawah"
                          disabled={idx === faqs.length - 1}
                          onClick={() => moveFaq(idx, 'down')}
                        >
                          <ChevronDown size={14} />
                        </button>
                        <button
                          type="button"
                          className="icon-mini-btn delete"
                          title="Hapus"
                          onClick={() => removeFaq(idx)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <input
                      type="text"
                      value={item.q}
                      onChange={e => updateFaq(idx, 'q', e.target.value)}
                      placeholder="Pertanyaan"
                      required
                      style={{ fontWeight: 600 }}
                    />
                    <textarea
                      rows={2}
                      value={item.a}
                      onChange={e => updateFaq(idx, 'a', e.target.value)}
                      placeholder="Jawaban"
                      required
                    />
                  </div>
                ))}
                {!faqs.length && (
                  <div className="feature-empty-state">
                    <p>Belum ada FAQ yang ditambahkan.</p>
                    <small>Gunakan form di atas untuk menambahkan FAQ.</small>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 6: PAKET LAYANAN */}
          {activeTab === 'packages' && (
            <div className="features-section">
              <div className="features-section-header">
                <div>
                  <h3 className="features-section-title">
                    <Package size={18} className="icon-pink" />
                    Paket Penawaran Layanan
                  </h3>
                  <p className="features-section-sub">
                    Daftar paket harga (misal: Ekonomis, Standard, Premium) yang tampil di halaman layanan ini.
                  </p>
                </div>
                <button
                  type="button"
                  className="primary"
                  style={{ height: '34px', padding: '0 14px', fontSize: '13px' }}
                  onClick={addPackage}
                >
                  <Plus size={14} /> Tambah Paket
                </button>
              </div>

              <div className="form-row" style={{ marginBottom: '16px' }}>
                <label>
                  Judul Bagian Paket (Opsional)
                  <input
                    type="text"
                    value={packagesTitle}
                    onChange={e => setPackagesTitle(e.target.value)}
                    placeholder={`Default: Pilihan Paket ${form.title || 'Layanan'}`}
                  />
                  <small style={{ color: '#64748b', fontSize: '11px', marginTop: '4px' }}>
                    Otomatis menggunakan "Pilihan Paket {form.title || 'Layanan'}" jika dikosongkan.
                  </small>
                </label>

                <label>
                  Subjudul Bagian Paket (Opsional)
                  <input
                    type="text"
                    value={packagesSubtitle}
                    onChange={e => setPackagesSubtitle(e.target.value)}
                    placeholder={`Default: Pilih paket ${(form.title || 'layanan').toLowerCase()} yang sesuai...`}
                  />
                  <small style={{ color: '#64748b', fontSize: '11px', marginTop: '4px' }}>
                    Otomatis menggunakan deskripsi default jika dikosongkan.
                  </small>
                </label>
              </div>

              <div className="feature-items-list" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {packages.map((pkg, pIdx) => {
                  const feats = Array.isArray(pkg.features) ? pkg.features : []
                  return (
                    <div
                      key={pIdx}
                      style={{
                        background: '#ffffff',
                        border: pkg.popular ? '2px solid #e11d48' : '1px solid #e2e8f0',
                        borderRadius: '12px',
                        padding: '16px',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', borderBottom: '1px solid #f1f5f9', paddingBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span className="feature-index-badge">{pIdx + 1}</span>
                          <strong style={{ fontSize: '15px' }}>{pkg.name || `Paket #${pIdx + 1}`}</strong>
                          {pkg.popular && (
                            <span style={{ background: '#fce7f3', color: '#be185d', fontSize: '11px', fontWeight: 700, padding: '2px 8px', borderRadius: '999px' }}>
                              Populer / Terlaris
                            </span>
                          )}
                        </div>
                        <button
                          type="button"
                          className="icon-mini-btn delete"
                          title="Hapus Paket"
                          onClick={() => removePackage(pIdx)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>

                      <div className="form-row" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px' }}>
                        <label>
                          Nama Paket
                          <input
                            type="text"
                            value={pkg.name || ''}
                            onChange={e => updatePackage(pIdx, 'name', e.target.value)}
                            placeholder="Ekonomis / Standard / Premium"
                            required
                          />
                        </label>

                        <label>
                          Slug Paket (ID Database)
                          <input
                            type="text"
                            value={pkg.slug || ''}
                            onChange={e => updatePackage(pIdx, 'slug', e.target.value)}
                            placeholder="seo-basic / landing-page-ekonomis"
                            required
                          />
                        </label>

                        <label>
                          Harga Paket
                          <input
                            type="text"
                            value={pkg.price || ''}
                            onChange={e => updatePackage(pIdx, 'price', e.target.value)}
                            placeholder="Rp 990RB / Rp 1.4JT"
                            required
                          />
                        </label>

                        <label>
                          Harga Asal / Coret
                          <input
                            type="text"
                            value={pkg.original_price || ''}
                            onChange={e => updatePackage(pIdx, 'original_price', e.target.value)}
                            placeholder="Rp 1.4JT / Rp 2.0JT"
                          />
                        </label>

                        <label>
                          Badge Diskon
                          <input
                            type="text"
                            value={pkg.discount || ''}
                            onChange={e => updatePackage(pIdx, 'discount', e.target.value)}
                            placeholder="Diskon 410RB"
                          />
                        </label>
                      </div>

                      <div className="form-row" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginTop: '8px' }}>
                        <label>
                          Target Pengguna
                          <input
                            type="text"
                            value={pkg.target || ''}
                            onChange={e => updatePackage(pIdx, 'target', e.target.value)}
                            placeholder="UMKM & promosi cepat"
                          />
                        </label>

                        <label>
                          Keterangan / Biaya Perpanjang
                          <input
                            type="text"
                            value={pkg.renewal || pkg.price_note || ''}
                            onChange={e => updatePackage(pIdx, 'renewal', e.target.value)}
                            placeholder="Perpanjang Rp. 650.000 / Tahun"
                          />
                        </label>

                        <label>
                          Badge Khusus
                          <input
                            type="text"
                            value={pkg.badge || ''}
                            onChange={e => updatePackage(pIdx, 'badge', e.target.value)}
                            placeholder="PAKET TERLARIS"
                          />
                        </label>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', paddingTop: '20px' }}>
                          <input
                            type="checkbox"
                            id={`pkg-pop-${pIdx}`}
                            checked={!!pkg.popular}
                            onChange={e => updatePackage(pIdx, 'popular', e.target.checked)}
                            style={{ width: 'auto', margin: 0 }}
                          />
                          <label htmlFor={`pkg-pop-${pIdx}`} style={{ margin: 0, cursor: 'pointer', fontWeight: 600 }}>
                            Tandai Populer (Border Merah & Badge)
                          </label>
                        </div>
                      </div>

                      {/* Package Features List */}
                      <div style={{ marginTop: '14px', background: '#f8fafc', borderRadius: '8px', padding: '12px' }}>
                        <strong style={{ fontSize: '13px', display: 'block', marginBottom: '8px' }}>
                          Fitur / Checklist Paket ({feats.length})
                        </strong>

                        <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                          <input
                            type="text"
                            className="feature-add-input"
                            placeholder="Tambah fitur paket (misal: Include Domain .com, Tanpa Source Code)…"
                            value={newPkgFeatureText[pIdx] || ''}
                            onChange={e => setNewPkgFeatureText(prev => ({ ...prev, [pIdx]: e.target.value }))}
                            onKeyDown={e => {
                              if (e.key === 'Enter') {
                                e.preventDefault()
                                addPackageFeature(pIdx)
                              }
                            }}
                          />
                          <button
                            type="button"
                            className="primary"
                            style={{ height: '36px', padding: '0 12px' }}
                            onClick={() => addPackageFeature(pIdx)}
                          >
                            <Plus size={14} /> Tambah
                          </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {feats.map((feat: any, fIdx: number) => {
                            const featText = typeof feat === 'string' ? feat : feat.text
                            const featIncluded = typeof feat === 'string' ? !feat.toLowerCase().startsWith('tanpa ') : feat.included !== false
                            return (
                              <div
                                key={fIdx}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                  background: '#fff',
                                  padding: '6px 10px',
                                  borderRadius: '6px',
                                  border: '1px solid #e2e8f0'
                                }}
                              >
                                <button
                                  type="button"
                                  onClick={() => updatePackageFeature(pIdx, fIdx, 'included', !featIncluded)}
                                  title={featIncluded ? 'Termasuk (Centang)' : 'Tidak Termasuk (Silang)'}
                                  style={{
                                    border: 'none',
                                    background: featIncluded ? '#dcfce7' : '#fee2e2',
                                    color: featIncluded ? '#15803d' : '#b91c1c',
                                    borderRadius: '4px',
                                    width: '24px',
                                    height: '24px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                    fontSize: '12px'
                                  }}
                                >
                                  {featIncluded ? '✓' : '✕'}
                                </button>
                                <input
                                  type="text"
                                  value={featText}
                                  onChange={e => updatePackageFeature(pIdx, fIdx, 'text', e.target.value)}
                                  style={{ flex: 1, border: 'none', background: 'transparent', fontSize: '13px', outline: 'none' }}
                                />
                                <button
                                  type="button"
                                  className="icon-mini-btn delete"
                                  onClick={() => removePackageFeature(pIdx, fIdx)}
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                  )
                })}

                {!packages.length && (
                  <div className="feature-empty-state">
                    <p>Belum ada paket yang dikonfigurasi untuk layanan ini.</p>
                    <small>Klik "Tambah Paket" untuk membuat paket penawaran seperti di flyer.</small>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {error && <div className="error-box">{error}</div>}

        <div className="modal-actions">
          <button type="button" className="secondary" onClick={onClose}>
            Batal
          </button>
          <button className="primary" disabled={busy}>
            {busy ? 'Menyimpan…' : 'Simpan Layanan'}
          </button>
        </div>
      </form>
    </div>
  )
}

function PackagesView() {
  const [items, setItems] = useState<ContentItem[]>([])
  const [query, setQuery] = useState('')
  const [pillarFilter, setPillarFilter] = useState<string>('all')
  const [editing, setEditing] = useState<ContentItem | null | false>(false)
  const [refresh, setRefresh] = useState(0)
  const [error, setError] = useState('')

  useEffect(() => {
    request('/modules/packages').then(setItems).catch(e => setError(e.message))
  }, [refresh])

  const filtered = items.filter(item => {
    const data = (item.data || {}) as Record<string, any>
    const rawPillar = (data.pillar_slug || data.pillar || '').toString().trim().toLowerCase()
    const pillar = PACKAGE_PILLARS.find(p => p.id === rawPillar || p.name.toLowerCase() === rawPillar)?.id || rawPillar
    const target = (data.target || '').toString().toLowerCase()
    const timeline = (data.timeline || '').toString().toLowerCase()
    const price = (data.price || '').toString().toLowerCase()
    const highlights = Array.isArray(data.highlights) ? data.highlights.map((h: any) => `${h.title || h} ${h.desc || ''}`).join(' ') : ''
    const included = Array.isArray(data.included) ? data.included.map((inc: any) => `${inc.title || inc} ${inc.desc || ''}`).join(' ') : ''
    const deliverables = Array.isArray(data.deliverables) ? data.deliverables.join(' ') : ''
    const faqs = Array.isArray(data.faqs) ? data.faqs.map((f: any) => `${f.q || f.question || ''} ${f.a || f.answer || ''}`).join(' ') : ''

    const matchQuery = `${item.title} ${item.slug} ${item.summary || ''} ${pillar} ${target} ${timeline} ${price} ${highlights} ${included} ${deliverables} ${faqs}`
      .toLowerCase()
      .includes(query.toLowerCase())
    const matchPillar = pillarFilter === 'all' || pillar === pillarFilter
    return matchQuery && matchPillar
  })

  const totalIncluded = items.reduce((acc, item) => {
    const data = (item.data || {}) as Record<string, any>
    return acc + (Array.isArray(data.included) ? data.included.length : 0)
  }, 0)

  async function remove(id: number, title: string) {
    if (!confirm(`Hapus paket "${title}" ini?`)) return
    try {
      await request(`/modules/packages/${id}`, { method: 'DELETE' })
      setRefresh(v => v + 1)
    } catch (err) {
      setError((err as Error).message)
    }
  }

  return (
    <section className="content">
      <div className="page-title">
        <div>
          <p className="eyebrow pink">PACKAGES MANAGEMENT</p>
          <h1>Paket Layanan</h1>
          <p className="subtle">Kelola seluruh paket lengkap dengan target bisnis, lama pengerjaan, flyer frontend, alasan memilih, detail layanan, deliverables, dan FAQ.</p>
        </div>
        <button className="primary" onClick={() => setEditing(null)}>
          <Plus size={18} /> Tambah Paket
        </button>
      </div>

      <div className="stats">
        <div>
          <span>Total Paket</span>
          <b>{items.length}</b>
          <small>Semua paket penawaran</small>
        </div>
        <div>
          <span>Total Layanan Tercakup</span>
          <b>{totalIncluded}</b>
          <small>Poin detail layanan paket</small>
        </div>
        <div>
          <span>Terakhir Diperbarui</span>
          <b className="date-stat">
            {items[0]?.updated_at ? new Date(items[0].updated_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' }) : '—'}
          </b>
          <small>Update terkini</small>
        </div>
      </div>

      <div className="toolbar" style={{ flexWrap: 'wrap', gap: '12px' }}>
        <div className="search">
          <Search size={17} />
          <input
            placeholder="Cari paket, target, timeline, atau isi…"
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <button
            className={pillarFilter === 'all' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setPillarFilter('all')}
          >
            Semua Pilar
          </button>
          {PACKAGE_PILLARS.map(p => (
            <button
              key={p.id}
              className={pillarFilter === p.id ? 'filter-btn active' : 'filter-btn'}
              onClick={() => setPillarFilter(p.id)}
            >
              {p.name}
            </button>
          ))}
        </div>
        <span className="result-count">{filtered.length} paket</span>
      </div>

      {error && <div className="error-box">{error}</div>}

      <div className="admin-table packages-table">
        <div className="table-head">
          <span>Paket</span>
          <span>Pilar & Harga</span>
          <span>Target & Lama Pengerjaan</span>
          <span>Kelengkapan Konten</span>
          <span>Status</span>
          <span></span>
        </div>

        {filtered.map(item => {
          const data = (item.data || {}) as Record<string, any>
          const pillar = data.pillar_slug || data.pillar || 'digital-asset'
          const pillarObj = PACKAGE_PILLARS.find(p => p.id === pillar || p.name.toLowerCase() === String(pillar).toLowerCase()) || { name: pillar || 'Digital Asset' }
          const highlights = Array.isArray(data.highlights) ? data.highlights : []
          const included = Array.isArray(data.included) ? data.included : []
          const deliverables = Array.isArray(data.deliverables) ? data.deliverables : []
          const faqs = Array.isArray(data.faqs) ? data.faqs : []
          const flyer = item.image_url || data.heroImage || data.flyer_image

          return (
            <div className="table-row" key={item.id}>
              <div className="person">
                {flyer ? (
                  <img className="avatar avatar-pillar" src={flyer} alt="" />
                ) : (
                  <span className="avatar"><Package size={15} /></span>
                )}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <b>{item.title}</b>
                    {(data.popular || data.badge) && (
                      <span className="package-popular-badge">
                        <Star size={10} /> {data.badge || 'Popular'}
                      </span>
                    )}
                  </div>
                  {item.summary && <small style={{ color: 'var(--muted)', fontSize: '11px' }}>{item.summary}</small>}
                </div>
              </div>

              <div>
                <span className={`pillar-tag pillar-${pillar}`}>
                  {pillarObj.name}
                </span>
                {(data.service_name || data.service_slug) && (
                  <small style={{ display: 'block', color: 'var(--muted)', fontSize: '11px', marginTop: '2px' }}>
                    {data.service_name || data.service_slug}
                  </small>
                )}
                <div style={{ marginTop: '4px' }}>
                  <span className="package-price-main">{data.price || '—'}</span>
                  {data.price_period && <span className="package-price-note">{data.price_period}</span>}
                </div>
              </div>

              <div>
                {data.target && (
                  <span className="package-target" title={data.target}>
                    <Target size={12} style={{ flexShrink: 0, color: 'var(--pink)' }} />
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '180px' }}>
                      {data.target}
                    </span>
                  </span>
                )}
                {data.timeline && (
                  <span className="package-timeline">
                    <Clock size={11} /> {data.timeline}
                  </span>
                )}
              </div>

              <div>
                <div className="package-metrics">
                  <span className="package-metric-pill" title="Mengapa Memilih (Highlights)">
                    <Sparkles size={11} style={{ color: '#e11d48' }} /> {highlights.length} Alasan
                  </span>
                  <span className="package-metric-pill" title="Detail Layanan (Included)">
                    <BriefcaseBusiness size={11} style={{ color: '#0284c7' }} /> {included.length} Detail
                  </span>
                  <span className="package-metric-pill" title="Deliverables">
                    <FileCheck size={11} style={{ color: '#059669' }} /> {deliverables.length} File
                  </span>
                  <span className="package-metric-pill" title="FAQ">
                    <HelpCircle size={11} style={{ color: '#7c3aed' }} /> {faqs.length} FAQ
                  </span>
                </div>
              </div>

              <div>
                <span className={`status-tag ${item.is_published ? 'published' : 'draft'}`}>
                  {item.is_published ? 'Published' : 'Draft'}
                </span>
              </div>

              <div className="row-actions">
                <button title="Edit Paket" onClick={() => setEditing(item)}>
                  <Pencil size={16} />
                </button>
                <button title="Hapus Paket" onClick={() => remove(item.id, item.title)}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          )
        })}

        {!filtered.length && (
          <div className="empty">
            <Package size={32} style={{ margin: '0 auto 10px', opacity: 0.5 }} />
            <p>Belum ada paket layanan yang sesuai.</p>
          </div>
        )}
      </div>

      {editing !== false && (
        <PackageModal
          item={editing}
          packages={items}
          onClose={() => setEditing(false)}
          onSaved={() => {
            setEditing(false)
            setRefresh(v => v + 1)
          }}
        />
      )}
    </section>
  )
}

function PackageModal({
  item,
  packages,
  onClose,
  onSaved
}: {
  item: ContentItem | null
  packages: ContentItem[]
  onClose: () => void
  onSaved: () => void
}) {
  const existingData = (item?.data || {}) as Record<string, any>

  const initialHighlights: HighlightItem[] = Array.isArray(existingData.highlights)
    ? existingData.highlights.map((h: any) => typeof h === 'string' ? { title: h, desc: '' } : { title: h.title || '', desc: h.desc || '' })
    : []

  const initialIncluded: IncludedItem[] = Array.isArray(existingData.included)
    ? existingData.included.map((inc: any) => typeof inc === 'string' ? { title: inc, desc: '', image: '' } : { title: inc.title || '', desc: inc.desc || '', image: inc.image || '' })
    : []

  const initialDeliverables: string[] = Array.isArray(existingData.deliverables)
    ? existingData.deliverables.map((d: any) => typeof d === 'string' ? d : d.title || '')
    : []

  const initialFaqs: FaqItem[] = Array.isArray(existingData.faqs)
    ? existingData.faqs.map((f: any) => ({ q: f.q || f.question || '', a: f.a || f.answer || '' }))
    : []
  const initialPillar = PACKAGE_PILLARS.find(p => p.id === existingData.pillar_slug || p.id === existingData.pillar || p.name.toLowerCase() === String(existingData.pillar || '').toLowerCase())?.id || 'digital-asset'

  const [activeTab, setActiveTab] = useState<'info' | 'highlights' | 'included' | 'deliverables' | 'faqs' | 'recommendations'>('info')

  const [servicesList, setServicesList] = useState<ContentItem[]>([])
  useEffect(() => {
    request('/modules/services').then(items => {
      if (Array.isArray(items)) setServicesList(items)
    }).catch(() => {})
  }, [])

  const [form, setForm] = useState({
    title: item?.title || '',
    slug: item?.slug || '',
    service_slug: existingData.service_slug || existingData.service || '',
    summary: item?.summary || existingData.tagline || '',
    pillar: initialPillar,
    tagline: existingData.tagline || '',
    badge: existingData.badge || '',
    popular: !!existingData.popular,
    price: existingData.price || 'Rp 2.900.000',
    original_price: existingData.original_price || '',
    discount: existingData.discount || '',
    renewal: existingData.renewal || '',
    price_period: existingData.price_period || 'sekali bayar',
    timeline: existingData.timeline || '5-7 hari kerja',
    target: existingData.target || '',
    image_url: item?.image_url || existingData.heroImage || existingData.flyer_image || '',
    cta_text: existingData.cta_text || 'Pesan Paket Ini',
    consultation_text: existingData.consultation_text || 'Konsultasi Dulu',
    display_order: String(existingData.display_order ?? ''),
    is_published: item?.is_published ?? true
  })

  // Sub-items states
  const [highlights, setHighlights] = useState<HighlightItem[]>(initialHighlights)
  const [newHlTitle, setNewHlTitle] = useState('')
  const [newHlDesc, setNewHlDesc] = useState('')

  const [included, setIncluded] = useState<IncludedItem[]>(initialIncluded)
  const [newIncTitle, setNewIncTitle] = useState('')
  const [newIncDesc, setNewIncDesc] = useState('')
  const [newIncImage, setNewIncImage] = useState('')

  const [deliverables, setDeliverables] = useState<string[]>(initialDeliverables)
  const [newDelivText, setNewDelivText] = useState('')

  const [faqs, setFaqs] = useState<FaqItem[]>(initialFaqs)
  const [newFaqQ, setNewFaqQ] = useState('')
  const [newFaqA, setNewFaqA] = useState('')
  const savedRecommendations = Array.isArray(existingData.recommended_packages) ? existingData.recommended_packages : []
  const packagePillar = existingData.pillar_slug || existingData.pillar
  const automaticRecommendations = packages
    .filter(pkg => pkg.slug !== item?.slug && (pkg.data?.pillar_slug || pkg.data?.pillar) === packagePillar)
    .map(pkg => pkg.slug)
    .slice(0, 3)
  const initialRecommendations = Array.from(new Set([
    ...savedRecommendations,
    ...(existingData.recommendations_configured ? [] : automaticRecommendations)
  ]))
  const [recommendations, setRecommendations] = useState<string[]>(initialRecommendations)
  const recommendationPageTargets = [
    { slug: 'page:website', label: 'Halaman Pilar: Website' },
    { slug: 'page:digital-asset', label: 'Halaman Pilar: Digital Asset' },
    { slug: 'page:digital-growth-team', label: 'Halaman Pilar: Digital Growth Team' },
    { slug: 'page:marketing-kit', label: 'Halaman: Marketing Kit' },
    { slug: 'page:tools', label: 'Halaman: Tools' },
    { slug: 'solution-library', label: 'Halaman: Solution Library' },
    { slug: 'page:content', label: 'Halaman: Konten' },
    { slug: 'page:insight', label: 'Halaman: Insight' },
    { slug: 'page:portofolio', label: 'Halaman: Portofolio' },
    { slug: 'page:tentang', label: 'Halaman: Tentang' },
    { slug: 'page:viralog', label: 'Halaman: Viralog' },
    ...servicesList.map(s => ({
      slug: `service:${s.slug}`,
      label: `Layanan: ${s.title}`
    }))
  ]

  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  function handleTitleChange(val: string) {
    const prevSlug = form.slug
    const autoPrevSlug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    const newSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

    if (!item && (prevSlug === '' || prevSlug === autoPrevSlug)) {
      setForm(prev => ({ ...prev, title: val, slug: newSlug }))
    } else {
      setForm(prev => ({ ...prev, title: val }))
    }
  }

  // Highlights handlers
  function addHighlight() {
    if (!newHlTitle.trim()) return
    setHighlights(prev => [...prev, { title: newHlTitle.trim(), desc: newHlDesc.trim() }])
    setNewHlTitle('')
    setNewHlDesc('')
  }
  function updateHighlight(index: number, field: 'title' | 'desc', val: string) {
    setHighlights(prev => {
      const copy = [...prev]
      copy[index] = { ...copy[index], [field]: val }
      return copy
    })
  }
  function removeHighlight(index: number) {
    setHighlights(prev => prev.filter((_, i) => i !== index))
  }
  function moveHighlight(index: number, direction: 'up' | 'down') {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === highlights.length - 1)) return
    const targetIdx = direction === 'up' ? index - 1 : index + 1
    setHighlights(prev => {
      const list = [...prev]
      const temp = list[index]
      list[index] = list[targetIdx]
      list[targetIdx] = temp
      return list
    })
  }

  // Included handlers
  function addIncluded() {
    if (!newIncTitle.trim()) return
    setIncluded(prev => [...prev, { title: newIncTitle.trim(), desc: newIncDesc.trim(), image: newIncImage.trim() || undefined }])
    setNewIncTitle('')
    setNewIncDesc('')
    setNewIncImage('')
  }
  function updateIncluded(index: number, field: 'title' | 'desc' | 'image', val: string) {
    setIncluded(prev => {
      const copy = [...prev]
      copy[index] = { ...copy[index], [field]: val }
      return copy
    })
  }
  function removeIncluded(index: number) {
    setIncluded(prev => prev.filter((_, i) => i !== index))
  }
  function moveIncluded(index: number, direction: 'up' | 'down') {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === included.length - 1)) return
    const targetIdx = direction === 'up' ? index - 1 : index + 1
    setIncluded(prev => {
      const list = [...prev]
      const temp = list[index]
      list[index] = list[targetIdx]
      list[targetIdx] = temp
      return list
    })
  }

  // Deliverables handlers
  function addDeliverable() {
    if (!newDelivText.trim()) return
    setDeliverables(prev => [...prev, newDelivText.trim()])
    setNewDelivText('')
  }
  function updateDeliverable(index: number, val: string) {
    setDeliverables(prev => {
      const copy = [...prev]
      copy[index] = val
      return copy
    })
  }
  function removeDeliverable(index: number) {
    setDeliverables(prev => prev.filter((_, i) => i !== index))
  }
  function moveDeliverable(index: number, direction: 'up' | 'down') {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === deliverables.length - 1)) return
    const targetIdx = direction === 'up' ? index - 1 : index + 1
    setDeliverables(prev => {
      const list = [...prev]
      const temp = list[index]
      list[index] = list[targetIdx]
      list[targetIdx] = temp
      return list
    })
  }

  // FAQ handlers
  function addFaq() {
    if (!newFaqQ.trim()) return
    setFaqs(prev => [...prev, { q: newFaqQ.trim(), a: newFaqA.trim() }])
    setNewFaqQ('')
    setNewFaqA('')
  }
  function updateFaq(index: number, field: 'q' | 'a', val: string) {
    setFaqs(prev => {
      const copy = [...prev]
      copy[index] = { ...copy[index], [field]: val }
      return copy
    })
  }
  function removeFaq(index: number) {
    setFaqs(prev => prev.filter((_, i) => i !== index))
  }
  function moveFaq(index: number, direction: 'up' | 'down') {
    if ((direction === 'up' && index === 0) || (direction === 'down' && index === faqs.length - 1)) return
    const targetIdx = direction === 'up' ? index - 1 : index + 1
    setFaqs(prev => {
      const list = [...prev]
      const temp = list[index]
      list[index] = list[targetIdx]
      list[targetIdx] = temp
      return list
    })
  }

  async function save(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')

    const cleanHighlights = highlights.filter(h => h.title.trim())
    const cleanIncluded = included.filter(inc => inc.title.trim())
    const cleanDeliverables = deliverables.map(d => d.trim()).filter(Boolean)
    const cleanFaqs = faqs.filter(f => f.q.trim())

    const matchedService = servicesList.find(s => s.slug === form.service_slug)
    const payloadData: Record<string, any> = {
      ...existingData,
      name: form.title,
      service: form.service_slug || undefined,
      service_slug: form.service_slug || undefined,
      service_name: matchedService?.title || undefined,
      pillar: PACKAGE_PILLARS.find(p => p.id === form.pillar)?.name || form.pillar,
      pillar_slug: form.pillar,
      pillar_name: PACKAGE_PILLARS.find(p => p.id === form.pillar)?.name || form.pillar,
      tagline: form.tagline || form.summary,
      badge: form.badge || (form.popular ? 'Paling Populer' : ''),
      popular: form.popular,
      price: form.price,
      price_short: form.price,
      original_price: form.original_price,
      discount: form.discount,
      renewal: form.renewal,
      price_period: form.price_period,
      price_note: form.renewal || form.price_period,
      timeline: form.timeline,
      target: form.target,
      heroImage: form.image_url.trim() || null,
      flyer_image: form.image_url.trim() || null,
      highlights: cleanHighlights,
      included: cleanIncluded,
      deliverables: cleanDeliverables,
      faqs: cleanFaqs,
      recommended_packages: recommendations,
      recommendations_configured: true,
      cta_text: form.cta_text,
      consultation_text: form.consultation_text,
      display_order: form.display_order === '' ? null : Number(form.display_order)
    }

    const payload = {
      title: form.title,
      slug: form.slug.trim(),
      summary: form.summary || form.tagline,
      image_url: form.image_url.trim() || null,
      is_published: form.is_published,
      data: payloadData
    }

    try {
      await request(item ? `/modules/packages/${item.id}` : '/modules/packages', {
        method: item ? 'PUT' : 'POST',
        body: JSON.stringify(payload)
      })
      onSaved()
    } catch (err) {
      setError((err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="modal-backdrop">
      <form className="modal modal-lg" onSubmit={save}>
        <div className="modal-head">
          <div>
            <p className="eyebrow pink">{item ? 'EDIT PAKET' : 'PAKET BARU'}</p>
            <h2>{item ? `Edit Paket: ${item.title}` : 'Tambah Paket Baru'}</h2>
          </div>
          <button type="button" className="icon-btn" onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="modal-tabs">
          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'info' ? 'active' : ''}`}
            onClick={() => setActiveTab('info')}
          >
            <Package size={14} /> Informasi & Flyer
          </button>
          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'highlights' ? 'active' : ''}`}
            onClick={() => setActiveTab('highlights')}
          >
            <Sparkles size={14} /> Mengapa Memilih ({highlights.length})
          </button>
          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'included' ? 'active' : ''}`}
            onClick={() => setActiveTab('included')}
          >
            <BriefcaseBusiness size={14} /> Detail Layanan ({included.length})
          </button>
          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'deliverables' ? 'active' : ''}`}
            onClick={() => setActiveTab('deliverables')}
          >
            <FileCheck size={14} /> Deliverables ({deliverables.length})
          </button>
          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'faqs' ? 'active' : ''}`}
            onClick={() => setActiveTab('faqs')}
          >
            <HelpCircle size={14} /> FAQ ({faqs.length})
          </button>
          <button
            type="button"
            className={`modal-tab-btn ${activeTab === 'recommendations' ? 'active' : ''}`}
            onClick={() => setActiveTab('recommendations')}
          >
            <Sparkles size={14} /> Rekomendasi ({recommendations.length})
          </button>
        </div>

        <div className="modal-scroll-area">
          {/* TAB 1: INFORMASI & FLYER */}
          {activeTab === 'info' && (
            <>
              <div className="form-row">
                <label>
                  Nama Paket
                  <input
                    value={form.title}
                    onChange={e => handleTitleChange(e.target.value)}
                    placeholder="Contoh: Paket Siap Usaha"
                    required
                  />
                </label>

                <label>
                  Layanan Terkait (Opsional)
                  <select
                    value={form.service_slug}
                    onChange={e => {
                      const selSlug = e.target.value
                      const selSvc = servicesList.find(s => s.slug === selSlug)
                      const svcPillar = (selSvc?.data?.pillar_slug || selSvc?.data?.pillar || '') as string
                      setForm(prev => ({
                        ...prev,
                        service_slug: selSlug,
                        pillar: svcPillar || prev.pillar
                      }))
                    }}
                    className="select-input"
                  >
                    <option value="">— Umum / Tidak Terikat Layanan —</option>
                    {servicesList.map(s => (
                      <option key={s.id} value={s.slug}>
                        {s.title} ({String(s.data?.pillar_name || s.data?.pillar || 'Layanan')})
                      </option>
                    ))}
                  </select>
                </label>

                <label>
                  Pilar Layanan
                  <select
                    value={form.pillar}
                    onChange={e => setForm({ ...form, pillar: e.target.value })}
                    required
                    className="select-input"
                  >
                    {PACKAGE_PILLARS.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <label>
                Urutan Tampil
                <input
                  type="number"
                  min="1"
                  value={form.display_order}
                  onChange={e => setForm({ ...form, display_order: e.target.value })}
                  placeholder="Contoh: 1"
                />
              </label>

              <div className="form-row">
                <label>
                  Slug URL
                  <input
                    value={form.slug}
                    onChange={e => setForm({ ...form, slug: e.target.value })}
                    placeholder="siap-usaha"
                    required
                  />
                </label>

                <label>
                  Tagline Paket
                  <input
                    value={form.tagline}
                    onChange={e => setForm({ ...form, tagline: e.target.value })}
                    placeholder="Contoh: Fondasi visual untuk bisnis baru"
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Harga Paket
                  <input
                    value={form.price}
                    onChange={e => setForm({ ...form, price: e.target.value })}
                    placeholder="Contoh: Rp 990RB atau Rp 2.900.000"
                    required
                  />
                </label>

                <label>
                  Periode / Keterangan Harga
                  <input
                    value={form.price_period}
                    onChange={e => setForm({ ...form, price_period: e.target.value })}
                    placeholder="sekali bayar / /bulan"
                    required
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Harga Asal / Coret (Opsional)
                  <input
                    value={form.original_price}
                    onChange={e => setForm({ ...form, original_price: e.target.value })}
                    placeholder="Contoh: Rp 1.4JT"
                  />
                </label>

                <label>
                  Diskon / Promo Badge (Opsional)
                  <input
                    value={form.discount}
                    onChange={e => setForm({ ...form, discount: e.target.value })}
                    placeholder="Contoh: Diskon 410RB"
                  />
                </label>

                <label>
                  Biaya Perpanjang (Opsional)
                  <input
                    value={form.renewal}
                    onChange={e => setForm({ ...form, renewal: e.target.value })}
                    placeholder="Contoh: Perpanjang Rp. 650.000 / Tahun"
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Target Bisnis (Cocok untuk Siapa)
                  <textarea
                    rows={2}
                    value={form.target}
                    onChange={e => setForm({ ...form, target: e.target.value })}
                    placeholder="Contoh: UMKM, startup baru, bisnis rumahan yang butuh identitas brand profesional..."
                    required
                  />
                </label>

                <label>
                  Lama Pengerjaan (Timeline)
                  <input
                    value={form.timeline}
                    onChange={e => setForm({ ...form, timeline: e.target.value })}
                    placeholder="Contoh: 5-7 hari kerja, 10-14 hari kerja"
                    required
                  />
                </label>
              </div>

              <div className="form-row">
                <label>
                  Pilih Flyer Banner Frontend
                  <select
                    value={FLYER_PRESETS.some(f => f.value === form.image_url) ? form.image_url : 'custom'}
                    onChange={e => {
                      if (e.target.value !== 'custom') {
                        setForm({ ...form, image_url: e.target.value })
                      }
                    }}
                    className="select-input"
                  >
                    <option value="" disabled>-- Pilih Flyer dari Frontend --</option>
                    {FLYER_PRESETS.map((f, i) => (
                      <option key={i} value={f.value}>{f.label}</option>
                    ))}
                    <option value="custom">-- Kustom / URL Lainnya --</option>
                  </select>
                </label>

                <label>
                  Path / URL Gambar Flyer
                  <input
                    type="text"
                    value={form.image_url}
                    onChange={e => setForm({ ...form, image_url: e.target.value })}
                    placeholder="/assets/paket-digital-asset/siap-usaha.jpg"
                    required
                  />
                </label>
              </div>

              {form.image_url && (
                <div className="flyer-preview-card">
                  <img
                    src={form.image_url}
                    alt="Preview Flyer"
                    className="flyer-preview-img"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.opacity = '0.3'
                    }}
                  />
                  <div>
                    <b style={{ fontSize: '13px', display: 'block', color: 'var(--ink)' }}>Preview Flyer Paket</b>
                    <small style={{ color: 'var(--muted)', fontSize: '11px', display: 'block', marginTop: '3px' }}>{form.image_url}</small>
                    <span style={{ fontSize: '11px', color: 'var(--pink)', fontWeight: 600, marginTop: '5px', display: 'inline-block' }}>
                      ✓ Flyer aktif ditampilkan di frontend (Hero & Modal Paket)
                    </span>
                  </div>
                </div>
              )}

              <label>
                Ringkasan / Deskripsi Lengkap
                <textarea
                  rows={3}
                  value={form.summary}
                  onChange={e => setForm({ ...form, summary: e.target.value })}
                  placeholder="Jelaskan ringkasan value proposition dari paket ini..."
                  required
                />
              </label>

              <div className="form-row">
                <label>
                  Badge Khusus (Opsional)
                  <input
                    value={form.badge}
                    onChange={e => setForm({ ...form, badge: e.target.value })}
                    placeholder="Paling Populer / Recommended"
                  />
                </label>

                <label className="check" style={{ marginTop: '28px' }}>
                  <input
                    type="checkbox"
                    checked={form.popular}
                    onChange={e => setForm({ ...form, popular: e.target.checked })}
                  />
                  Tandai sebagai Paket Populer (Highlight)
                </label>
              </div>

              <div className="form-row">
                <label>
                  Teks Tombol Order CTA
                  <input
                    value={form.cta_text}
                    onChange={e => setForm({ ...form, cta_text: e.target.value })}
                    placeholder="Pesan Paket Ini"
                  />
                </label>

                <label>
                  Teks Tombol Konsultasi
                  <input
                    value={form.consultation_text}
                    onChange={e => setForm({ ...form, consultation_text: e.target.value })}
                    placeholder="Konsultasi Dulu"
                  />
                </label>
              </div>
            </>
          )}

          {/* TAB 2: MENGAPA MEMILIH PAKET INI? */}
          {activeTab === 'highlights' && (
            <div className="features-section">
              <div className="features-section-header">
                <div>
                  <h3 className="features-section-title">
                    <Sparkles size={18} className="icon-pink" />
                    Mengapa Memilih Paket Ini?
                  </h3>
                  <p className="features-section-sub">
                    Poin-poin alasan utama atau keunggulan spesifik yang didapat klien jika memilih paket ini.
                  </p>
                </div>
                <span className="features-count-pill">
                  {highlights.length} Poin Alasan
                </span>
              </div>

              {/* Add form */}
              <div style={{ background: '#fff', border: '1px solid #ebdbe2', borderRadius: '10px', padding: '12px', marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input
                  type="text"
                  className="feature-add-input"
                  placeholder="Judul alasan (misal: Cepat & Tepat Waktu, Identitas Konsisten)…"
                  value={newHlTitle}
                  onChange={e => setNewHlTitle(e.target.value)}
                />
                <textarea
                  rows={2}
                  className="feature-add-input"
                  placeholder="Deskripsi penjelasan alasan…"
                  value={newHlDesc}
                  onChange={e => setNewHlDesc(e.target.value)}
                />
                <button
                  type="button"
                  className="primary"
                  style={{ alignSelf: 'flex-end', height: '36px', padding: '0 16px' }}
                  onClick={addHighlight}
                  disabled={!newHlTitle.trim()}
                >
                  <Plus size={15} /> Tambah Alasan
                </button>
              </div>

              {/* List */}
              <div className="feature-items-list">
                {highlights.map((item, idx) => (
                  <div className="item-card-row" key={idx}>
                    <div className="item-card-header">
                      <strong>
                        <span className="feature-index-badge">{idx + 1}</span>
                        <Sparkles size={14} style={{ color: 'var(--pink)' }} />
                        Alasan #{idx + 1}
                      </strong>
                      <div className="item-card-actions">
                        <button
                          type="button"
                          className="icon-mini-btn"
                          title="Pindah ke atas"
                          disabled={idx === 0}
                          onClick={() => moveHighlight(idx, 'up')}
                        >
                          <ChevronDown size={14} style={{ transform: 'rotate(180deg)' }} />
                        </button>
                        <button
                          type="button"
                          className="icon-mini-btn"
                          title="Pindah ke bawah"
                          disabled={idx === highlights.length - 1}
                          onClick={() => moveHighlight(idx, 'down')}
                        >
                          <ChevronDown size={14} />
                        </button>
                        <button
                          type="button"
                          className="icon-mini-btn delete"
                          title="Hapus"
                          onClick={() => removeHighlight(idx)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <input
                      type="text"
                      value={item.title}
                      onChange={e => updateHighlight(idx, 'title', e.target.value)}
                      placeholder="Judul alasan"
                      required
                      style={{ fontWeight: 600 }}
                    />
                    <textarea
                      rows={2}
                      value={item.desc}
                      onChange={e => updateHighlight(idx, 'desc', e.target.value)}
                      placeholder="Deskripsi penjelasan alasan"
                    />
                  </div>
                ))}
                {!highlights.length && (
                  <div className="feature-empty-state">
                    <p>Belum ada alasan "Mengapa Memilih" yang ditambahkan.</p>
                    <small>Gunakan form di atas untuk menambahkan alasan.</small>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: DETAIL LAYANAN DALAM PAKET */}
          {activeTab === 'included' && (
            <div className="features-section">
              <div className="features-section-header">
                <div>
                  <h3 className="features-section-title">
                    <BriefcaseBusiness size={18} className="icon-pink" />
                    Detail Layanan dalam Paket
                  </h3>
                  <p className="features-section-sub">
                    Rincian sub-layanan atau fitur utama lengkap dengan judul, deskripsi, dan gambar referensi (opsional).
                  </p>
                </div>
                <span className="features-count-pill">
                  {included.length} Detail Layanan
                </span>
              </div>

              {/* Add form */}
              <div style={{ background: '#fff', border: '1px solid #ebdbe2', borderRadius: '10px', padding: '12px', marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input
                  type="text"
                  className="feature-add-input"
                  placeholder="Nama sub-layanan (misal: Desain Logo Utama & Alternatif, Desain Feed & Story)…"
                  value={newIncTitle}
                  onChange={e => setNewIncTitle(e.target.value)}
                />
                <textarea
                  rows={2}
                  className="feature-add-input"
                  placeholder="Deskripsi rincian sub-layanan…"
                  value={newIncDesc}
                  onChange={e => setNewIncDesc(e.target.value)}
                />
                <input
                  type="text"
                  className="feature-add-input"
                  placeholder="URL / Path Gambar (opsional, misal: /assets/paket-digital-asset/logo.jpg)…"
                  value={newIncImage}
                  onChange={e => setNewIncImage(e.target.value)}
                />
                <button
                  type="button"
                  className="primary"
                  style={{ alignSelf: 'flex-end', height: '36px', padding: '0 16px' }}
                  onClick={addIncluded}
                  disabled={!newIncTitle.trim()}
                >
                  <Plus size={15} /> Tambah Detail Layanan
                </button>
              </div>

              {/* List */}
              <div className="feature-items-list">
                {included.map((item, idx) => (
                  <div className="item-card-row" key={idx}>
                    <div className="item-card-header">
                      <strong>
                        <span className="feature-index-badge">{idx + 1}</span>
                        <BriefcaseBusiness size={14} style={{ color: '#0284c7' }} />
                        Layanan #{idx + 1}
                      </strong>
                      <div className="item-card-actions">
                        <button
                          type="button"
                          className="icon-mini-btn"
                          title="Pindah ke atas"
                          disabled={idx === 0}
                          onClick={() => moveIncluded(idx, 'up')}
                        >
                          <ChevronDown size={14} style={{ transform: 'rotate(180deg)' }} />
                        </button>
                        <button
                          type="button"
                          className="icon-mini-btn"
                          title="Pindah ke bawah"
                          disabled={idx === included.length - 1}
                          onClick={() => moveIncluded(idx, 'down')}
                        >
                          <ChevronDown size={14} />
                        </button>
                        <button
                          type="button"
                          className="icon-mini-btn delete"
                          title="Hapus"
                          onClick={() => removeIncluded(idx)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <input
                      type="text"
                      value={item.title}
                      onChange={e => updateIncluded(idx, 'title', e.target.value)}
                      placeholder="Nama sub-layanan"
                      required
                      style={{ fontWeight: 600 }}
                    />
                    <textarea
                      rows={2}
                      value={item.desc}
                      onChange={e => updateIncluded(idx, 'desc', e.target.value)}
                      placeholder="Deskripsi rincian sub-layanan"
                    />
                    <input
                      type="text"
                      value={item.image || ''}
                      onChange={e => updateIncluded(idx, 'image', e.target.value)}
                      placeholder="Path Gambar (opsional)"
                    />
                  </div>
                ))}
                {!included.length && (
                  <div className="feature-empty-state">
                    <p>Belum ada detail layanan yang ditambahkan.</p>
                    <small>Gunakan form di atas untuk menambahkan rincian sub-layanan.</small>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: FILE & DELIVERABLES */}
          {activeTab === 'deliverables' && (
            <div className="features-section">
              <div className="features-section-header">
                <div>
                  <h3 className="features-section-title">
                    <FileCheck size={18} className="icon-pink" />
                    File & Deliverables
                  </h3>
                  <p className="features-section-sub">
                    Daftar format file mentah, lisensi, dokumentasi, dan hasil akhir yang diserahkan ke klien.
                  </p>
                </div>
                <span className="features-count-pill">
                  {deliverables.length} Deliverables
                </span>
              </div>

              {/* Quick Add Bar */}
              <div className="feature-add-box">
                <input
                  type="text"
                  className="feature-add-input"
                  placeholder="Ketik deliverable (misal: Master File AI, EPS, SVG, PDF Print Ready, PDF Guideline)…"
                  value={newDelivText}
                  onChange={e => setNewDelivText(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addDeliverable()
                    }
                  }}
                />
                <button
                  type="button"
                  className="primary feature-add-btn"
                  onClick={addDeliverable}
                  disabled={!newDelivText.trim()}
                >
                  <Plus size={16} /> Tambah
                </button>
              </div>

              {/* List */}
              <div className="feature-list-container">
                {deliverables.length > 0 ? (
                  <div className="feature-items-list">
                    {deliverables.map((item, idx) => (
                      <div className="feature-item-row" key={idx}>
                        <span className="feature-check-icon">
                          <Check size={15} />
                        </span>
                        <span className="feature-index-badge">{idx + 1}</span>
                        <input
                          type="text"
                          className="feature-text-input"
                          value={item}
                          onChange={e => updateDeliverable(idx, e.target.value)}
                          placeholder="Nama file / deliverable"
                          required
                        />
                        <div className="feature-item-actions">
                          <button
                            type="button"
                            className="icon-mini-btn"
                            title="Pindah ke atas"
                            disabled={idx === 0}
                            onClick={() => moveDeliverable(idx, 'up')}
                          >
                            <ChevronDown size={14} style={{ transform: 'rotate(180deg)' }} />
                          </button>
                          <button
                            type="button"
                            className="icon-mini-btn"
                            title="Pindah ke bawah"
                            disabled={idx === deliverables.length - 1}
                            onClick={() => moveDeliverable(idx, 'down')}
                          >
                            <ChevronDown size={14} />
                          </button>
                          <button
                            type="button"
                            className="icon-mini-btn delete"
                            title="Hapus deliverable ini"
                            onClick={() => removeDeliverable(idx)}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="feature-empty-state">
                    <p>Belum ada deliverables yang ditambahkan.</p>
                    <small>Ketik deliverable di kolom atas lalu klik tombol <strong>Tambah</strong> atau tekan <strong>Enter</strong>.</small>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: PERTANYAAN UMUM (FAQ) */}
          {activeTab === 'faqs' && (
            <div className="features-section">
              <div className="features-section-header">
                <div>
                  <h3 className="features-section-title">
                    <HelpCircle size={18} className="icon-pink" />
                    Pertanyaan Umum (FAQ)
                  </h3>
                  <p className="features-section-sub">
                    Pertanyaan yang sering diajukan klien beserta jawabannya untuk paket ini.
                  </p>
                </div>
                <span className="features-count-pill">
                  {faqs.length} FAQ
                </span>
              </div>

              {/* Add form */}
              <div style={{ background: '#fff', border: '1px solid #ebdbe2', borderRadius: '10px', padding: '12px', marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input
                  type="text"
                  className="feature-add-input"
                  placeholder="Pertanyaan (misal: Berapa kali revisi yang didapatkan?)…"
                  value={newFaqQ}
                  onChange={e => setNewFaqQ(e.target.value)}
                />
                <textarea
                  rows={2}
                  className="feature-add-input"
                  placeholder="Jawaban pertanyaan…"
                  value={newFaqA}
                  onChange={e => setNewFaqA(e.target.value)}
                />
                <button
                  type="button"
                  className="primary"
                  style={{ alignSelf: 'flex-end', height: '36px', padding: '0 16px' }}
                  onClick={addFaq}
                  disabled={!newFaqQ.trim()}
                >
                  <Plus size={15} /> Tambah FAQ
                </button>
              </div>

              {/* List */}
              <div className="feature-items-list">
                {faqs.map((item, idx) => (
                  <div className="item-card-row" key={idx}>
                    <div className="item-card-header">
                      <strong>
                        <span className="feature-index-badge">{idx + 1}</span>
                        <HelpCircle size={14} style={{ color: '#7c3aed' }} />
                        FAQ #{idx + 1}
                      </strong>
                      <div className="item-card-actions">
                        <button
                          type="button"
                          className="icon-mini-btn"
                          title="Pindah ke atas"
                          disabled={idx === 0}
                          onClick={() => moveFaq(idx, 'up')}
                        >
                          <ChevronDown size={14} style={{ transform: 'rotate(180deg)' }} />
                        </button>
                        <button
                          type="button"
                          className="icon-mini-btn"
                          title="Pindah ke bawah"
                          disabled={idx === faqs.length - 1}
                          onClick={() => moveFaq(idx, 'down')}
                        >
                          <ChevronDown size={14} />
                        </button>
                        <button
                          type="button"
                          className="icon-mini-btn delete"
                          title="Hapus"
                          onClick={() => removeFaq(idx)}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <input
                      type="text"
                      value={item.q}
                      onChange={e => updateFaq(idx, 'q', e.target.value)}
                      placeholder="Pertanyaan"
                      required
                      style={{ fontWeight: 600 }}
                    />
                    <textarea
                      rows={2}
                      value={item.a}
                      onChange={e => updateFaq(idx, 'a', e.target.value)}
                      placeholder="Jawaban"
                      required
                    />
                  </div>
                ))}
                {!faqs.length && (
                  <div className="feature-empty-state">
                    <p>Belum ada pertanyaan umum yang ditambahkan.</p>
                    <small>Gunakan form di atas untuk menambahkan FAQ.</small>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'recommendations' && (
            <div className="features-section">
              <div className="features-section-header">
                <div>
                  <h3 className="features-section-title"><Sparkles size={16} className="icon-pink" /> Rekomendasi Paket Lainnya</h3>
                  <p className="features-section-sub">Pilih halaman yang akan menampilkan paket ini sebagai rekomendasi.</p>
                </div>
                <span className="features-count-pill">{recommendations.length} Paket</span>
              </div>
              <div className="feature-items-list">
                {recommendationPageTargets.map(target => {
                  const selected = recommendations.includes(target.slug)
                  return <label className="feature-item-row check" key={target.slug}>
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => setRecommendations(prev => selected ? prev.filter(slug => slug !== target.slug) : [...prev, target.slug])}
                    />
                    <span className="feature-text-input">{target.label}</span>
                  </label>
                })}
                {packages.filter(pkg => pkg.slug !== item?.slug).map(pkg => {
                  const selected = recommendations.includes(pkg.slug)
                  const rawP = String(pkg.data?.pillar_slug || pkg.data?.pillar || '')
                  const pName = PACKAGE_PILLARS.find(p => p.id === rawP || p.name.toLowerCase() === rawP.toLowerCase())?.name || rawP || 'Website'
                  return <label className="feature-item-row check" key={pkg.id}>
                    <input
                      type="checkbox"
                      checked={selected}
                      onChange={() => setRecommendations(prev => selected ? prev.filter(slug => slug !== pkg.slug) : [...prev, pkg.slug])}
                    />
                    <span className="feature-text-input">
                      {pkg.title} <span style={{ opacity: 0.6, fontSize: '11px', marginLeft: 6 }}>({String(pName)})</span>
                    </span>
                  </label>
                })}
                {!packages.filter(pkg => pkg.slug !== item?.slug).length && <div className="feature-empty-state"><p>Belum ada paket lain yang tersedia.</p></div>}
              </div>
            </div>
          )}

          <label className="check" style={{ marginTop: '16px' }}>
            <input
              type="checkbox"
              checked={form.is_published}
              onChange={e => setForm({ ...form, is_published: e.target.checked })}
            />
            Tampilkan di frontend (Published)
          </label>
        </div>

        {error && <div className="error-box">{error}</div>}

        <div className="modal-actions">
          <button type="button" className="secondary" onClick={onClose}>
            Batal
          </button>
          <button className="primary" disabled={busy}>
            {busy ? 'Menyimpan…' : 'Simpan Paket'}
          </button>
        </div>
      </form>
    </div>
  )
}

function DashboardAnalyticsView(){
  return <ContentAndVisitorDashboard/>
}

function ContentAndVisitorDashboard(){
  const [data,setData]=useState<any>(null),[period,setPeriod]=useState(7)
  useEffect(()=>{setData(null);request(`/dashboard-analytics?period=${period}`).then(setData).catch(()=>{})},[period])
  const days=data?.visitor_by_day||[]
  const chartDays:any[]=period===365?Object.values(days.reduce((months:Record<string,{date:string;visits:number;visitors:number}>,day:any)=>{const key=day.date.slice(0,7);if(!months[key])months[key]={date:`${key}-01`,visits:0,visitors:0};months[key].visits+=day.visits;months[key].visitors+=day.visitors;return months},{})):days
  const max=Math.max(...chartDays.map((day:any)=>day.visits),1)
  const hasVisitData=chartDays.some((day:any)=>day.visits>0)
  const showLabel=(index:number)=>period===7||period===365||index===0||index===chartDays.length-1||index%5===0
  const formatDate=(date:string)=>new Date(`${date}T00:00:00`).toLocaleDateString('id-ID',period===365?{month:'short'}:{day:'numeric',month:'short'})
  const systemMetrics=[['Portofolio','portfolios'],['Konten terbit','published_content'],['Artikel RSS','rss_articles'],['Sumber RSS aktif','active_rss_sources'],['Iklan aktif','active_ads']] as const
  const periodLabel=period===365?'1 tahun':`${period} hari terakhir`
  return <section className="content analytics-dashboard"><div className="page-title"><div><p className="eyebrow pink">AKTIVITAS PENGUNJUNG</p><h1>Dashboard Analitik</h1><p className="subtle">Data aktual website dan konten terbaru.</p></div></div>{!data?<div className="empty">Memuat data analitik…</div>:<><div className="stats analytics-stats"><div><span>Pengunjung</span><b>{data.metrics.visitors||0}</b><small>{periodLabel}</small></div><div><span>Page view</span><b>{data.metrics.pageviews||0}</b><small>{periodLabel}</small></div><div><span>Leads masuk</span><b>{data.metrics.leads||0}</b><small>Data tersimpan</small></div></div><div className="analytics-panel" style={{marginTop:20}}><div className="analytics-panel-head"><div><b>Ringkasan konten & sistem</b><small>Data aktual yang tersedia di dashboard.</small></div></div><div className="stats analytics-stats" style={{marginBottom:0}}>{systemMetrics.map(([label,key])=><div key={key}><span>{label}</span><b>{data.metrics[key]||0}</b><small>Data tersimpan</small></div>)}</div></div><div className="analytics-layout"><div className="analytics-panel"><div className="analytics-panel-head"><div><b>Kunjungan {periodLabel}</b><small>Aktivitas pengunjung per hari.</small></div><div className="page-title-actions">{[7,30,365].map(value=><button key={value} className={period===value?'primary':'secondary'} onClick={()=>setPeriod(value)}>{value===365?'1 Tahun':`${value} Hari`}</button>)}</div></div><div className="analytics-chart">{!hasVisitData?<div className="analytics-empty-chart">Belum ada data kunjungan pada periode ini.</div>:chartDays.map((day:any,index:number)=><div className="analytics-bar" key={day.date}><div className="analytics-bar-value">{day.visits}</div><i style={{height:`${Math.max(day.visits/max*100,4)}%`}}/><small>{showLabel(index)?formatDate(day.date):''}</small></div>)}</div></div><div className="analytics-panel"><div className="analytics-panel-head"><div><b>Aktivitas terbaru</b><small>Halaman terakhir dikunjungi.</small></div></div><div className="analytics-recent">{data.recent_visitor_activity.map((item:any,index:number)=><div key={`${item.path}-${index}`}><span className="analytics-status live">{item.device==='mobile'?'Mobile':'Desktop'}</span><b>{item.path}</b><small>{new Date(item.visited_at).toLocaleString('id-ID')}</small></div>)}</div></div></div><div className="analytics-panel" style={{marginTop:20}}><div className="analytics-panel-head"><div><b>Konten terbaru</b><small>Artikel terakhir yang disimpan di Viralog.</small></div></div><div className="analytics-recent">{data.recent_content.map((item:any)=><div key={item.id}><span className={item.is_published?'analytics-status live':'analytics-status'}>{item.is_published?'Terbit':'Draft'}</span><b>{item.title}</b><small>{new Date(item.created_at).toLocaleDateString('id-ID',{dateStyle:'medium'})}</small></div>)}</div></div></>}</section>
}

export function VisitorAnalyticsDashboard(){
  const [data,setData]=useState<any>(null),[error,setError]=useState('')
  const load=()=>request('/dashboard-analytics').then(setData).catch(err=>setError(err.message))
  useEffect(()=>{load()},[])
  const visitorDays=data?.visitor_last_7_days||[]
  const max=Math.max(...visitorDays.map((item:any)=>item.visits),1)
  const metrics=[['Pengunjung (7 hari)','visitors_last_7_days'],['Tampilan halaman','pageviews_last_7_days'],['Konten terbit','published_content'],['Portofolio','portfolios'],['Iklan aktif','active_ads'],['Leads','leads']] as const
  return <section className="content analytics-dashboard"><div className="page-title"><div><p className="eyebrow pink">AKTIVITAS PENGUNJUNG</p><h1>Dashboard Analitik</h1><p className="subtle">Data kunjungan website yang tercatat secara langsung.</p></div><button className="secondary" onClick={load}><BarChart3 size={17}/> Perbarui data</button></div>{error&&<div className="error-box">{error}</div>}{!data?<div className="empty">Memuat data analitik…</div>:<><div className="stats analytics-stats">{metrics.map(([label,key])=><div key={key}><span>{label}</span><b>{data.metrics[key]||0}</b><small>7 hari terakhir</small></div>)}</div><div className="analytics-layout"><div className="analytics-panel"><div className="analytics-panel-head"><div><b>Kunjungan website 7 hari terakhir</b><small>Page view dan pengunjung unik per hari.</small></div><span>{data.metrics.pageviews_last_7_days||0} kunjungan</span></div><div className="analytics-chart">{visitorDays.map((item:any)=><div className="analytics-bar" key={item.date}><div className="analytics-bar-value">{item.visits}</div><i style={{height:`${Math.max((item.visits/max)*100,4)}%`}}/><small>{new Date(`${item.date}T00:00:00`).toLocaleDateString('id-ID',{day:'numeric',month:'short'})}</small></div>)}</div></div><div className="analytics-panel"><div className="analytics-panel-head"><div><b>Aktivitas terbaru</b><small>Halaman yang baru saja dikunjungi.</small></div></div><div className="analytics-recent">{data.recent_visitor_activity.map((item:any,index:number)=><div key={`${item.path}-${item.visited_at}-${index}`}><span className="analytics-status live">{item.device==='mobile'?'Mobile':'Desktop'}</span><b>{item.path}</b><small>{new Date(item.visited_at).toLocaleString('id-ID',{dateStyle:'short',timeStyle:'short'})}{item.referrer?` · ${item.referrer}`:''}</small></div>)}{!data.recent_visitor_activity.length&&<p className="subtle">Belum ada aktivitas pengunjung.</p>}</div></div></div><div className="analytics-panel" style={{marginTop:20}}><div className="analytics-panel-head"><div><b>Halaman terpopuler</b><small>Halaman dengan kunjungan terbanyak dalam 7 hari terakhir.</small></div></div><div className="analytics-recent">{data.popular_pages.map((item:any)=><div key={item.path}><span className="analytics-status">{item.total} view</span><b>{item.path}</b></div>)}{!data.popular_pages.length&&<p className="subtle">Belum ada data halaman populer.</p>}</div></div></>}</section>
}

export function LegacyDashboardAnalyticsView(){
  const [data,setData]=useState<{metrics:Record<string,number>;content_last_7_days:{date:string;total:number}[];recent_content:{id:number;title:string;is_published:boolean;created_at:string}[]}|null>(null),[error,setError]=useState('')
  const load=()=>request('/dashboard-analytics').then(setData).catch(err=>setError(err.message))
  useEffect(()=>{load()},[])
  const metrics=[['Portofolio','portfolios'],['Konten terbit','published_content'],['Artikel RSS','rss_articles'],['Sumber RSS aktif','active_rss_sources'],['Iklan aktif','active_ads'],['Leads','leads']] as const
  const max=Math.max(...(data?.content_last_7_days.map(item=>item.total)||[0]),1)
  return <section className="content analytics-dashboard"><div className="page-title"><div><p className="eyebrow pink">DATA REAL-TIME</p><h1>Dashboard Analitik</h1><p className="subtle">Ringkasan data aktual yang tersimpan di sistem.</p></div><button className="secondary" onClick={load}><BarChart3 size={17}/> Perbarui data</button></div>{error&&<div className="error-box">{error}</div>}{!data?<div className="empty">Memuat data analitik…</div>:<><div className="stats analytics-stats">{metrics.map(([label,key])=><div key={key}><span>{label}</span><b>{data.metrics[key]||0}</b><small>Data tersimpan</small></div>)}</div><div className="analytics-layout"><div className="analytics-panel"><div className="analytics-panel-head"><div><b>Konten dibuat 7 hari terakhir</b><small>Artikel yang masuk ke Viralog per hari.</small></div><span>{data.content_last_7_days.reduce((total,item)=>total+item.total,0)} konten</span></div><div className="analytics-chart">{data.content_last_7_days.map(item=><div className="analytics-bar" key={item.date}><div className="analytics-bar-value">{item.total}</div><i style={{height:`${Math.max((item.total/max)*100,4)}%`}}/><small>{new Date(`${item.date}T00:00:00`).toLocaleDateString('id-ID',{day:'numeric',month:'short'})}</small></div>)}</div></div><div className="analytics-panel"><div className="analytics-panel-head"><div><b>Konten terbaru</b><small>Aktivitas konten yang terakhir disimpan.</small></div></div><div className="analytics-recent">{data.recent_content.map(item=><div key={item.id}><span className={item.is_published?'analytics-status live':'analytics-status'}>{item.is_published?'Terbit':'Draft'}</span><b>{item.title}</b><small>{new Date(item.created_at).toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'})}</small></div>)}{!data.recent_content.length&&<p className="subtle">Belum ada konten yang tersimpan.</p>}</div></div></div></>}</section>
}

function ContentView({type,label}:{type:ContentType;label:string}){
  if (type === 'service-pillars') return <ServicePillarsView />
  if (type === 'services') return <ServicesView />
  if (type === 'packages') return <PackagesView />
  if (type === 'evolis-analytics') return <DashboardAnalyticsView />
  if (type === 'evolis-leads') return <LeadsManagementView />

  const [items,setItems]=useState<ContentItem[]>([])
  const [query,setQuery]=useState('')
  const [editing,setEditing]=useState<ContentItem|null|false>(false)
  const [refresh,setRefresh]=useState(0)
  const [error,setError]=useState('')
  const [importMessage,setImportMessage]=useState('')
  const [importing,setImporting]=useState(false)
  const [managingCategories,setManagingCategories]=useState(false)
  const [managingExploreCategories,setManagingExploreCategories]=useState(false)
  const importInputRef=useRef<HTMLInputElement>(null)

  useEffect(()=>{request(`/modules/${type}`).then(setItems).catch(e=>setError(e.message))},[type,refresh])

  const filtered=items.filter(item=>`${item.title} ${item.slug} ${item.summary||''}`.toLowerCase().includes(query.toLowerCase()))

  async function remove(id:number){
    if(!confirm(`Hapus ${label.toLowerCase()} ini?`))return
    try{await request(`/modules/${type}/${id}`,{method:'DELETE'});setRefresh(value=>value+1)}catch(err){setError((err as Error).message)}
  }

  async function importTools(event:ChangeEvent<HTMLInputElement>){
    const file=event.target.files?.[0]
    event.target.value=''
    if(!file)return

    setError('')
    setImportMessage('')
    setImporting(true)
    try{
      const workbook=XLSX.read(await file.arrayBuffer(),{type:'array'})
      const sheet=workbook.Sheets[workbook.SheetNames[0]]
      const rows=XLSX.utils.sheet_to_json<Record<string,unknown>>(sheet,{defval:''})
      const processedSlugs=new Set<string>()
      const existingBySlug=new Map(items.map(item=>[item.slug,item]))
      let created=0, updated=0, skipped=0

      for(const row of rows){
        const values=Object.fromEntries(Object.entries(row).map(([key,value])=>[key.toLowerCase().replace(/[^a-z0-9]+/g,''),String(value??'').trim()])) as Record<string,string>
        const value=(...keys:string[])=>keys.map(key=>values[key]).find(Boolean)||''
        const title=value('title','judul','name','nama')
        if(!title){skipped++;continue}

        const slug=(value('slug')||title).toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')
        if(!slug||processedSlugs.has(slug)){skipped++;continue}
        processedSlugs.add(slug)

        const order=value('displayorder','urutan','order')
        const published=value('ispublished','published','status').toLowerCase()
        const isPublished=!['0','false','draft','no','tidak'].includes(published)
        const body={
          title,
          slug,
          summary:value('summary','ringkasan','description','deskripsi')||null,
          image_url:value('imageurl','image','gambar','thumbnail','thumbnailurl')||null,
          is_published:isPublished,
          data:{
            url:value('url','toolurl','link'),
            category:value('category','kategori'),
            tagline:value('tagline','tagline'),
            display_order:order===''?null:Number(order)
          }
        }
        const existing=existingBySlug.get(slug)
        await request(existing?`/modules/tools/${existing.id}`:'/modules/tools',{
          method:existing?'PUT':'POST',
          body:JSON.stringify(body)
        })
        if(existing)updated++;else created++
      }

      setImportMessage(`Impor selesai: ${created} ditambahkan, ${updated} diperbarui${skipped?`, ${skipped} dilewati`:''}.`)
      setRefresh(value=>value+1)
    }catch(err){setError((err as Error).message||'File Excel tidak dapat diimpor.')}
    finally{setImporting(false)}
  }

  return <section className="content">
    <div className="page-title">
      <div><p className="eyebrow pink">CONTENT LIBRARY</p><h1>{label}</h1><p className="subtle">Kelola konten {label.toLowerCase()} yang ditampilkan di frontend.</p></div>
      <div className="page-title-actions">
        {type==='solution-library'&&<><button className="secondary" onClick={()=>setManagingCategories(true)}><Columns3 size={17}/> Atur kategori filter</button><button className="secondary" onClick={()=>setManagingExploreCategories(true)}><Columns3 size={17}/> Atur Jelajahi Topik</button></>}
        {type==='tools'&&TOOLS_EXCEL_IMPORT_ENABLED&&<><input ref={importInputRef} type="file" accept=".xlsx,.xls,.csv" onChange={importTools} hidden/><button className="secondary" type="button" onClick={()=>importInputRef.current?.click()} disabled={importing}><FileUp size={17}/> {importing?'Mengimpor…':'Import Excel'}</button></>}
        <button className="primary" onClick={()=>setEditing(null)}><Plus size={18}/> Tambah {label}</button>
      </div>
    </div>
    <div className="toolbar"><div className="search"><Search size={17}/><input placeholder={`Cari ${label.toLowerCase()}…`} value={query} onChange={event=>setQuery(event.target.value)}/></div><span className="result-count">{filtered.length} konten</span></div>
    {type==='tools'&&TOOLS_EXCEL_IMPORT_ENABLED&&<p className="subtle">Kolom Excel: Judul, Slug, Ringkasan, URL, Kategori, Tagline, URL Gambar, Urutan, Status.</p>}
    {error&&<div className="error-box">{error}</div>}
    {importMessage&&<div className="success-box">{importMessage}</div>}
    <div className="admin-table"><div className="table-head"><span>Konten</span><span>Slug</span><span>Status</span><span></span></div>{filtered.map(item=><div className="table-row" key={item.id}><div className="person">{item.image_url?<img className="avatar" src={item.image_url} alt=""/>:<span className="avatar">{item.title[0]}</span>}<div><b>{item.title}</b>{item.summary&&<small>{item.summary}</small>}</div></div><span>{item.slug}</span><span>{item.is_published?'Published':'Draft'}</span><div className="row-actions"><button onClick={()=>setEditing(item)}><Pencil size={16}/></button><button onClick={()=>remove(item.id)}><Trash2 size={16}/></button></div></div>)}{!filtered.length&&<div className="empty">Belum ada konten {label.toLowerCase()}.</div>}</div>
    {editing!==false&&<ContentModal type={type} label={label} item={editing} onClose={()=>setEditing(false)} onSaved={()=>{setEditing(false);setRefresh(value=>value+1)}}/>}
    {managingCategories&&<SolutionLibraryCategoryManager onClose={()=>setManagingCategories(false)} onChanged={()=>setRefresh(value=>value+1)}/>}
    {managingExploreCategories&&<SolutionLibraryExploreCategoryManager onClose={()=>setManagingExploreCategories(false)}/>}
  </section>
}

function SolutionLibraryExploreCategoryManager({onClose}:{onClose:()=>void}){
  const [items,setItems]=useState<ContentItem[]>([]),[title,setTitle]=useState(''),[icon,setIcon]=useState('📁'),[editing,setEditing]=useState<ContentItem|null>(null),[error,setError]=useState(''),[busy,setBusy]=useState(false)
  const load=()=>request('/modules/solution-library-explore-categories').then(setItems).catch(err=>setError(err.message))
  useEffect(()=>{load()},[])
  const reset=()=>{setTitle('');setIcon('📁');setEditing(null)}
  async function save(event:FormEvent){event.preventDefault();if(!title.trim())return;setBusy(true);setError('');try{await request(editing?`/modules/solution-library-explore-categories/${editing.id}`:'/modules/solution-library-explore-categories',{method:editing?'PUT':'POST',body:JSON.stringify({title:title.trim(),slug:`solution-library-explore-category-${title.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,'-')}`,summary:null,image_url:null,data:{icon:icon.trim()||'📁'},is_published:true})});reset();load()}catch(err){setError((err as Error).message)}finally{setBusy(false)}}
  async function remove(item:ContentItem){if(!confirm(`Hapus kategori ${item.title}?`))return;try{await request(`/modules/solution-library-explore-categories/${item.id}`,{method:'DELETE'});load()}catch(err){setError((err as Error).message)}}
  return <div className="modal-backdrop"><div className="modal modal-lg"><div className="modal-head"><div><p className="eyebrow pink">SOLUTION LIBRARY</p><h2>Atur Jelajahi Topik</h2></div><button type="button" className="icon-btn" onClick={onClose}><X/></button></div><form className="category-manager-form" onSubmit={save}><input className="category-icon-input" aria-label="Ikon topik" placeholder="Ikon" value={icon} onChange={event=>setIcon(event.target.value)}/><input placeholder="Nama topik" value={title} onChange={event=>setTitle(event.target.value)} required/><button className="primary" disabled={busy}>{editing?'Update topik':'Tambah topik'}</button>{editing&&<button type="button" className="secondary" onClick={reset}>Batal</button>}</form>{error&&<div className="error-box">{error}</div>}<div className="category-manager-list">{items.map(item=><div className="category-manager-item" key={item.id}><span className="category-manager-title"><i>{String(item.data?.icon||'📁')}</i><b>{item.title}</b></span><div className="row-actions"><button type="button" onClick={()=>{setEditing(item);setTitle(item.title);setIcon(String(item.data?.icon||'📁'))}}><Pencil size={16}/></button><button type="button" onClick={()=>remove(item)}><Trash2 size={16}/></button></div></div>)}{!items.length&&<p className="subtle">Belum ada topik. Tambahkan topik sesuai kartu di frontend.</p>}</div></div></div>
}

function SolutionLibraryCategoryManager({onClose,onChanged}:{onClose:()=>void;onChanged:()=>void}){
  const [items,setItems]=useState<ContentItem[]>([]),[title,setTitle]=useState(''),[editing,setEditing]=useState<ContentItem|null>(null),[error,setError]=useState(''),[busy,setBusy]=useState(false)
  const load=()=>request('/modules/solution-library-categories').then(setItems).catch(err=>setError(err.message))
  useEffect(()=>{load()},[])
  const reset=()=>{setTitle('');setEditing(null)}
  async function save(event:FormEvent){event.preventDefault();if(!title.trim())return;setBusy(true);setError('');try{await request(editing?`/modules/solution-library-categories/${editing.id}`:'/modules/solution-library-categories',{method:editing?'PUT':'POST',body:JSON.stringify({title:title.trim(),slug:`solution-library-category-${title.trim().toLowerCase().replaceAll(/[^a-z0-9]+/g,'-')}`,summary:null,image_url:null,data:editing?.data||{},is_published:true})});reset();load();onChanged()}catch(err){setError((err as Error).message)}finally{setBusy(false)}}
  async function remove(item:ContentItem){if(!confirm(`Hapus kategori ${item.title}?`))return;try{await request(`/modules/solution-library-categories/${item.id}`,{method:'DELETE'});load();onChanged()}catch(err){setError((err as Error).message)}}
  return <div className="modal-backdrop"><div className="modal modal-lg"><div className="modal-head"><div><p className="eyebrow pink">SOLUTION LIBRARY</p><h2>Atur kategori</h2></div><button type="button" className="icon-btn" onClick={onClose}><X/></button></div><form className="category-manager-form" onSubmit={save}><input placeholder="Nama kategori" value={title} onChange={event=>setTitle(event.target.value)} required/><button className="primary" disabled={busy}>{editing?'Update kategori':'Tambah kategori'}</button>{editing&&<button type="button" className="secondary" onClick={reset}>Batal</button>}</form>{error&&<div className="error-box">{error}</div>}<div className="category-manager-list">{items.map(item=><div className="category-manager-item" key={item.id}><b>{item.title}</b><div className="row-actions"><button type="button" onClick={()=>{setEditing(item);setTitle(item.title)}}><Pencil size={16}/></button><button type="button" onClick={()=>remove(item)}><Trash2 size={16}/></button></div></div>)}{!items.length&&<p className="subtle">Belum ada kategori.</p>}</div></div></div>
}

function LeadModal({item,onClose,onSaved}:{item:ContentItem|null;onClose:()=>void;onSaved:()=>void}){
  const source=(item?.data||{}) as Record<string,any>
  const [form,setForm]=useState({nama:item?.title||String(source.nama||''),email:item?.summary||String(source.email||''),whatsapp:String(source.whatsapp||''),perusahaan:String(source.perusahaan||source.nama_bisnis||''),jabatan:String(source.jabatan||''),kota:String(source.kota||source.city||''),industri:String(source.industri||''),tujuan:String(source.tujuan||source.kebutuhan||''),asset:String(source.asset||source.asset_download||''),consent:source.consent===undefined?true:Boolean(source.consent),is_published:item?.is_published??true})
  const [error,setError]=useState(''),[busy,setBusy]=useState(false)
  const update=(key:keyof typeof form,value:string|boolean)=>setForm({...form,[key]:value})
  async function save(event:FormEvent){event.preventDefault();setBusy(true);setError('');try{const slug=item?.slug||`lead-${Date.now()}-${form.nama.toLowerCase().trim().replace(/[^a-z0-9]+/g,'-')}`;const data={nama:form.nama,email:form.email,whatsapp:form.whatsapp,perusahaan:form.perusahaan,jabatan:form.jabatan,kota:form.kota,industri:form.industri,tujuan:form.tujuan,asset:form.asset,consent:form.consent,sumber:item?String(source.sumber||'Marketing Kit Download'):'Input Manual Admin',lead_status:String(source.lead_status||'new')};await request(item?`/modules/evolis-leads/${item.id}`:'/modules/evolis-leads',{method:item?'PUT':'POST',body:JSON.stringify({title:form.nama,slug,summary:form.email,image_url:null,is_published:form.is_published,data})});onSaved()}catch(err){setError((err as Error).message)}finally{setBusy(false)}}
  return <div className="modal-backdrop"><form className="modal modal-lg" onSubmit={save}><div className="modal-head"><div><p className="eyebrow pink">{item?'EDIT LEAD':'LEAD BARU'}</p><h2>{item?'Edit Lead':'Tambah Lead'}</h2></div><button type="button" className="icon-btn" onClick={onClose}><X/></button></div><div className="modal-scroll-area"><div className="form-row"><label>Nama lengkap<input value={form.nama} onChange={event=>update('nama',event.target.value)} required/></label><label>Email<input type="email" value={form.email} onChange={event=>update('email',event.target.value)} required/></label></div><label>Nomor WhatsApp<input value={form.whatsapp} onChange={event=>update('whatsapp',event.target.value)} required/></label><div className="form-row"><label>Perusahaan<input value={form.perusahaan} onChange={event=>update('perusahaan',event.target.value)}/></label><label>Jabatan<input value={form.jabatan} onChange={event=>update('jabatan',event.target.value)}/></label></div><div className="form-row"><label>Kota<input value={form.kota} onChange={event=>update('kota',event.target.value)}/></label><label>Industri<input value={form.industri} onChange={event=>update('industri',event.target.value)}/></label></div><label>Tujuan download<textarea rows={3} value={form.tujuan} onChange={event=>update('tujuan',event.target.value)}/></label><label>Asset yang diunduh<input value={form.asset} onChange={event=>update('asset',event.target.value)} placeholder="Kosongkan untuk input manual"/></label><label className="check"><input type="checkbox" checked={form.consent} onChange={event=>update('consent',event.target.checked)}/> Bersedia dihubungi tim Optibis</label><label className="check"><input type="checkbox" checked={form.is_published} onChange={event=>update('is_published',event.target.checked)}/> Tampilkan di frontend</label></div>{error&&<div className="error-box">{error}</div>}<div className="modal-actions"><button type="button" className="secondary" onClick={onClose}>Batal</button><button className="primary" disabled={busy}>{busy?'Menyimpan…':'Simpan lead'}</button></div></form></div>
}

function LeadsManagementView(){
  const [items,setItems]=useState<ContentItem[]>([]),[query,setQuery]=useState(''),[editing,setEditing]=useState<ContentItem|null|false>(false),[refresh,setRefresh]=useState(0),[error,setError]=useState('')
  useEffect(()=>{request('/modules/evolis-leads').then(setItems).catch(err=>setError(err.message))},[refresh])
  const filtered=items.filter(item=>{const lead=(item.data||{}) as Record<string,unknown>;return `${item.title} ${item.summary||''} ${lead.whatsapp||''} ${lead.perusahaan||lead.nama_bisnis||''}`.toLowerCase().includes(query.toLowerCase())})
  async function remove(id:number){if(!confirm('Hapus lead ini?'))return;try{await request(`/modules/evolis-leads/${id}`,{method:'DELETE'});setRefresh(value=>value+1)}catch(err){setError((err as Error).message)}}
  return <section className="content"><div className="page-title"><div><p className="eyebrow pink">MARKETING KIT</p><h1>Leads Masuk</h1><p className="subtle">Lead dari form download Marketing Kit dan input manual admin.</p></div><button className="primary" onClick={()=>setEditing(null)}><Plus size={18}/> Tambah lead</button></div><div className="toolbar"><div className="search"><Search size={17}/><input placeholder="Cari nama, email, WhatsApp…" value={query} onChange={event=>setQuery(event.target.value)}/></div><span className="result-count">{filtered.length} lead</span></div>{error&&<div className="error-box">{error}</div>}<div className="admin-table leads-table"><div className="table-head"><span>Lead</span><span>Kontak</span><span>Perusahaan</span><span>Tujuan</span><span>Sumber</span><span></span></div>{filtered.map(item=>{const lead=(item.data||{}) as Record<string,unknown>;return <div className="table-row" key={item.id}><div className="person"><span className="avatar">{item.title?.[0]||'?'}</span><div><b>{item.title}</b><small>{String(lead.industri||'—')}</small></div></div><div><b>{item.summary||'—'}</b><small className="lead-contact">{String(lead.whatsapp||'—')}</small></div><span>{String(lead.perusahaan||lead.nama_bisnis||'—')}</span><span>{String(lead.tujuan||lead.kebutuhan||'—')}</span><span className="lead-source">{String(lead.sumber||'Input Manual Admin')}</span><div className="row-actions"><button onClick={()=>setEditing(item)} aria-label="Edit lead"><Pencil size={16}/></button><button onClick={()=>remove(item.id)} aria-label="Hapus lead"><Trash2 size={16}/></button></div></div>})}{!filtered.length&&<div className="empty">Belum ada lead. Lead dari form Marketing Kit akan tampil di sini.</div>}</div>{editing!==false&&<LeadModal item={editing} onClose={()=>setEditing(false)} onSaved={()=>{setEditing(false);setRefresh(value=>value+1)}}/>}</section>
}

function ContentModal({type,label,item,onClose,onSaved}:{type:ContentType;label:string;item:ContentItem|null;onClose:()=>void;onSaved:()=>void}){
  if(type==='solution-library')return <SolutionLibraryModal item={item} label={label} onClose={onClose} onSaved={onSaved}/>
  if(type==='evolis-leads')return <LeadModal item={item} onClose={onClose} onSaved={onSaved}/>
  if(type==='careers')return <CareerModal item={item} onClose={onClose} onSaved={onSaved}/>
  const itemData=item?.data||{}
  const [form,setForm]=useState({title:item?.title||'',slug:item?.slug||'',summary:item?.summary||'',image_url:item?.image_url||'',display_order:String(itemData.display_order??''),is_published:item?.is_published??true})
  const [marketingKit,setMarketingKit]=useState({
    kategori:String(itemData.kategori||''),subkategori:String(itemData.subkategori||''),format_file:String(itemData.format_file||''),ukuran_file:String(itemData.ukuran_file||''),file_url:String(itemData.file_url||''),thumbnail:String(itemData.thumbnail||''),preview_url:String(itemData.preview_url||''),akses_tipe:String(itemData.akses_tipe||''),badge:String(itemData.badge||''),industri:String(itemData.industri||''),produk_terkait:String(itemData.produk_terkait||''),layanan_terkait:String(itemData.layanan_terkait||''),bahasa:String(itemData.bahasa||''),download_count:String(itemData.download_count??''),featured:Boolean(itemData.featured)
  })
  const [insight,setInsight]=useState({category:String(itemData.category||''),format:String(itemData.format||''),price:String(itemData.price??'')})
  const [tool,setTool]=useState({url:String(itemData.url||''),category:String(itemData.category||''),tagline:String(itemData.tagline||'')})
  const [adPlacement,setAdPlacement]=useState({placement:String(itemData.placement||'top_leaderboard'),ad_size:String(itemData.ad_size||adPlacementSize(String(itemData.placement||'top_leaderboard'))),destination_url:String(itemData.destination_url||''),button_label:String(itemData.button_label||'Pelajari selengkapnya'),start_at:String(itemData.start_at||''),end_at:String(itemData.end_at||''),priority:String(itemData.priority??'0'),new_tab:itemData.new_tab!==false})
  const [viralog,setViralog]=useState({id:String(itemData.id||''),subtitle:String(itemData.subtitle||''),body:String(itemData.body||''),thumbnail:String(itemData.thumbnail||''),content_type:String(itemData.content_type||'article'),source_type:String(itemData.source_type||'internal'),category_slug:String(itemData.category_slug||''),tags:Array.isArray(itemData.tags)?itemData.tags.join(', '):String(itemData.tags||''),author_name:String(itemData.author_name||''),author_slug:String(itemData.author_slug||''),status:String(itemData.status||'published'),publish_date:String(itemData.publish_date||''),featured:Boolean(itemData.featured),sponsored:Boolean(itemData.sponsored),cta_type:String(itemData.cta_type||''),cta_label:String(itemData.cta_label||''),cta_url:String(itemData.cta_url||''),read_time_minutes:String(itemData.read_time_minutes??''),views:String(itemData.views??''),shares:String(itemData.shares??''),bookmarks:String(itemData.bookmarks??''),viral_score:String(itemData.viral_score??''),seo_score:String(itemData.seo_score??''),engagement_score:String(itemData.engagement_score??''),freshness_score:String(itemData.freshness_score??''),credibility_score:String(itemData.credibility_score??''),monetization_score:String(itemData.monetization_score??'')})
  const [additionalFields,setAdditionalFields]=useState(()=>Object.entries(itemData).map(([key,value])=>({key,value:Array.isArray(value)?value.join(', '):String(value??''),isList:Array.isArray(value)})))
  const [error,setError]=useState(''),[busy,setBusy]=useState(false)
  const updateAdditionalField=(index:number,patch:Partial<{key:string;value:string;isList:boolean}>)=>setAdditionalFields(fields=>fields.map((field,fieldIndex)=>fieldIndex===index?{...field,...patch}:field))
  async function save(event:FormEvent){event.preventDefault();setBusy(true);setError('');try{let data:Record<string,unknown>={};if(type==='marketing-kits'){data={...itemData,...marketingKit,slug:form.slug,download_count:marketingKit.download_count===''?0:Number(marketingKit.download_count)}}else if(type==='insights'){data={...itemData,...insight,id:form.slug,title:form.title,desc:form.summary,image:form.image_url,price:insight.price===''?0:Number(insight.price)}}else if(type==='tools'){data={...itemData,...tool,name:form.title,description:form.summary}}else if(type==='viralog-content'){const numberKeys=['read_time_minutes','views','shares','bookmarks','viral_score','seo_score','engagement_score','freshness_score','credibility_score','monetization_score'] as const;data={...itemData,...viralog,id:viralog.id||form.slug,thumbnail:form.image_url||viralog.thumbnail,tags:viralog.tags.split(',').map(tag=>tag.trim()).filter(Boolean),...Object.fromEntries(numberKeys.map(key=>[key,viralog[key]===''?0:Number(viralog[key])]))}}else if(type==='viralog-ad-campaigns'){data={...itemData,...adPlacement,priority:adPlacement.priority===''?0:Number(adPlacement.priority)}}else{data=Object.fromEntries(additionalFields.filter(field=>field.key.trim()).map(field=>[field.key.trim(),field.isList?field.value.split(',').map(value=>value.trim()).filter(Boolean):field.value]));}data={...data,display_order:form.display_order===''?null:Number(form.display_order)};await request(item?`/modules/${type}/${item.id}`:`/modules/${type}`,{method:item?'PUT':'POST',body:JSON.stringify({...form,data})});onSaved()}catch(err){setError((err as Error).message)}finally{setBusy(false)}}
  const input=(label:string,key:Exclude<keyof typeof marketingKit,'featured'>,type='text')=><label>{label}<input type={type} value={marketingKit[key]} onChange={event=>setMarketingKit({...marketingKit,[key]:event.target.value})}/></label>
  const viralogInput=(label:string,key:Exclude<keyof typeof viralog,'featured'|'sponsored'>,type='text')=><label>{label}<input type={type} value={viralog[key]} onChange={event=>setViralog({...viralog,[key]:event.target.value})}/></label>
  const basicFields=<><label>Judul<input value={form.title} onChange={event=>setForm({...form,title:event.target.value})} required/></label><label>Slug<input value={form.slug} onChange={event=>setForm({...form,slug:event.target.value})} required/></label><label>Urutan tampil<input type="number" min="1" value={form.display_order} onChange={event=>setForm({...form,display_order:event.target.value})} placeholder="Contoh: 1"/></label><label>Ringkasan<textarea rows={3} value={form.summary} onChange={event=>setForm({...form,summary:event.target.value})}/></label>{type!=='viralog-ad-campaigns'&&<label>URL gambar<input type="url" value={form.image_url} onChange={event=>setForm({...form,image_url:event.target.value})}/></label>}</>
  const publishedField=<label className="check"><input type="checkbox" checked={form.is_published} onChange={event=>setForm({...form,is_published:event.target.checked})}/> Tampilkan di frontend</label>
  const adPlacementEditor=<div className="ad-placement-fields"><div className="form-row"><label>Posisi iklan<select className="select-input" value={adPlacement.placement} onChange={event=>setAdPlacement({...adPlacement,placement:event.target.value,ad_size:adPlacementSize(event.target.value)})}>{AD_PLACEMENTS.map((placement)=><option key={placement.value} value={placement.value}>{placement.label}</option>)}</select></label><label>Ukuran tampil<input value={adPlacement.ad_size} readOnly/></label><label>Prioritas<input type="number" min="0" value={adPlacement.priority} onChange={event=>setAdPlacement({...adPlacement,priority:event.target.value})}/></label></div><label>Link banner<input type="url" value={form.image_url} onChange={event=>setForm({...form,image_url:event.target.value})} placeholder="https://..."/></label><label>URL tujuan<input type="url" value={adPlacement.destination_url} onChange={event=>setAdPlacement({...adPlacement,destination_url:event.target.value})} placeholder="https://..."/></label><div className="form-row"><label>Label tombol<input value={adPlacement.button_label} onChange={event=>setAdPlacement({...adPlacement,button_label:event.target.value})}/></label><label className="check"><input type="checkbox" checked={adPlacement.new_tab} onChange={event=>setAdPlacement({...adPlacement,new_tab:event.target.checked})}/> Buka di tab baru</label></div><div className="form-row"><label>Mulai tayang<input type="date" value={adPlacement.start_at} onChange={event=>setAdPlacement({...adPlacement,start_at:event.target.value})}/></label><label>Selesai tayang<input type="date" value={adPlacement.end_at} onChange={event=>setAdPlacement({...adPlacement,end_at:event.target.value})}/></label></div></div>
  const additionalFieldsEditor=type==='viralog-content'?<div className="viralog-form-fields"><div className="form-row">{viralogInput('ID konten','id')}{viralogInput('Subjudul','subtitle')}</div><label>Isi artikel<textarea rows={12} value={viralog.body} onChange={event=>setViralog({...viralog,body:event.target.value})}/></label><div className="form-row">{viralogInput('URL thumbnail','thumbnail','url')}{viralogInput('Tipe konten','content_type')}</div><div className="form-row">{viralogInput('Sumber konten','source_type')}{viralogInput('Slug kategori','category_slug')}</div><div className="form-row">{viralogInput('Tag (pisahkan dengan koma)','tags')}{viralogInput('Tanggal publikasi','publish_date','date')}</div><div className="form-row">{viralogInput('Nama penulis','author_name')}{viralogInput('Slug penulis','author_slug')}</div><div className="form-row">{viralogInput('Status','status')}{viralogInput('Waktu baca (menit)','read_time_minutes','number')}</div><div className="form-row">{viralogInput('Tipe CTA','cta_type')}{viralogInput('Label CTA','cta_label')}</div>{viralogInput('URL CTA','cta_url','url')}<div className="form-row"><label className="check"><input type="checkbox" checked={viralog.featured} onChange={event=>setViralog({...viralog,featured:event.target.checked})}/> Konten unggulan</label><label className="check"><input type="checkbox" checked={viralog.sponsored} onChange={event=>setViralog({...viralog,sponsored:event.target.checked})}/> Konten bersponsor</label></div><div className="viralog-metrics"><b>Metrik konten</b><div className="form-row">{viralogInput('Dilihat','views','number')}{viralogInput('Dibagikan','shares','number')}</div><div className="form-row">{viralogInput('Disimpan','bookmarks','number')}{viralogInput('Skor viral','viral_score','number')}</div><div className="form-row">{viralogInput('Skor SEO','seo_score','number')}{viralogInput('Skor engagement','engagement_score','number')}</div><div className="form-row">{viralogInput('Skor kebaruan','freshness_score','number')}{viralogInput('Skor kredibilitas','credibility_score','number')}</div>{viralogInput('Skor monetisasi','monetization_score','number')}</div></div>:type==='viralog-ad-campaigns'?adPlacementEditor:<div className="additional-fields"><div className="additional-fields-head"><b>Data tambahan</b><button type="button" className="secondary" onClick={()=>setAdditionalFields([...additionalFields,{key:'',value:'',isList:false}])}><Plus size={15}/> Tambah field</button></div>{additionalFields.map((field,index)=><div className="additional-field" key={`${field.key}-${index}`}><input aria-label="Nama field" placeholder="Nama field" value={field.key} onChange={event=>updateAdditionalField(index,{key:event.target.value})}/><input aria-label="Nilai field" placeholder={field.isList?'Pisahkan item dengan koma':'Nilai'} value={field.value} onChange={event=>updateAdditionalField(index,{value:event.target.value})}/><label className="check compact"><input type="checkbox" checked={field.isList} onChange={event=>updateAdditionalField(index,{isList:event.target.checked})}/> Daftar</label><button type="button" className="icon-btn" aria-label="Hapus field" onClick={()=>setAdditionalFields(fields=>fields.filter((_,fieldIndex)=>fieldIndex!==index))}><Trash2 size={15}/></button></div>)}{!additionalFields.length&&<p className="subtle">Belum ada data tambahan.</p>}</div>
  return <div className="modal-backdrop"><form className={`modal ${type==='marketing-kits'||type==='insights'||type==='viralog-ad-campaigns'?'modal-lg':''}`} onSubmit={save}><div className="modal-head"><div><p className="eyebrow pink">{item?'EDIT KONTEN':'KONTEN BARU'}</p><h2>{item?`Edit ${label}`:`Tambah ${label}`}</h2></div><button type="button" className="icon-btn" onClick={onClose}><X/></button></div>{type==='marketing-kits'?<div className="modal-scroll-area">{basicFields}<div className="form-row">{input('Kategori','kategori')}{input('Subkategori','subkategori')}</div><div className="form-row">{input('Format file','format_file')}{input('Ukuran file','ukuran_file')}</div>{input('URL file (opsional)','file_url','url')}{input('URL thumbnail','thumbnail','url')}{input('URL preview','preview_url','url')}<div className="form-row">{input('Tipe akses','akses_tipe')}{input('Badge','badge')}</div><div className="form-row">{input('Industri','industri')}{input('Bahasa','bahasa')}</div><div className="form-row">{input('Produk terkait','produk_terkait')}{input('Layanan terkait','layanan_terkait')}</div>{input('Total download','download_count','number')}<label className="check"><input type="checkbox" checked={marketingKit.featured} onChange={event=>setMarketingKit({...marketingKit,featured:event.target.checked})}/> Tampilkan sebagai unggulan</label>{publishedField}</div>:type==='insights'?<div className="modal-scroll-area">{basicFields}<div className="form-row"><label>Kategori<input value={insight.category} onChange={event=>setInsight({...insight,category:event.target.value})}/></label><label>Format<input value={insight.format} onChange={event=>setInsight({...insight,format:event.target.value})}/></label></div><label>Harga<input type="number" min="0" value={insight.price} onChange={event=>setInsight({...insight,price:event.target.value})}/></label>{publishedField}</div>:type==='tools'?<>{basicFields}<label>URL Tools<input type="url" value={tool.url} onChange={event=>setTool({...tool,url:event.target.value})}/></label><div className="form-row"><label>Kategori<input value={tool.category} onChange={event=>setTool({...tool,category:event.target.value})}/></label><label>Tagline<input value={tool.tagline} onChange={event=>setTool({...tool,tagline:event.target.value})}/></label></div>{publishedField}</>:type==='solution-library-categories'?<>{basicFields}{publishedField}</>:<div className="modal-scroll-area">{basicFields}{additionalFieldsEditor}{publishedField}</div>}{error&&<div className="error-box">{error}</div>}<div className="modal-actions"><button type="button" className="secondary" onClick={onClose}>Batal</button><button className="primary" disabled={busy}>{busy?'Menyimpan…':type==='viralog-ad-campaigns'?'Simpan placement':'Simpan konten'}</button></div></form></div>
}

function CareerModal({item,onClose,onSaved}:{item:ContentItem|null;onClose:()=>void;onSaved:()=>void}){
  const source=(item?.data||{}) as Record<string,any>
  const [form,setForm]=useState({title:item?.title||'',slug:item?.slug||'',summary:item?.summary||'',employment_type:String(source.employment_type||'fulltime'),form_url:String(source.form_url||''),whatsapp_url:String(source.whatsapp_url||''),application_note:String(source.application_note||''),display_order:String(source.display_order??''),is_published:item?.is_published??true})
  const [error,setError]=useState(''),[busy,setBusy]=useState(false)
  function update<K extends keyof typeof form>(key:K,value:(typeof form)[K]){setForm({...form,[key]:value})}
  function updateTitle(value:string){const autoSlug=form.title.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');const slug=value.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');setForm({...form,title:value,slug:!item&&(form.slug===''||form.slug===autoSlug)?slug:form.slug})}
  async function save(event:FormEvent){event.preventDefault();setBusy(true);setError('');try{await request(item?`/modules/careers/${item.id}`:'/modules/careers',{method:item?'PUT':'POST',body:JSON.stringify({title:form.title,slug:form.slug,summary:form.summary,image_url:null,is_published:form.is_published,data:{...source,employment_type:form.employment_type,form_url:form.form_url,whatsapp_url:form.whatsapp_url,application_note:form.application_note,display_order:form.display_order===''?null:Number(form.display_order)}})});onSaved()}catch(err){setError((err as Error).message)}finally{setBusy(false)}}
  return <div className="modal-backdrop"><form className="modal modal-lg" onSubmit={save}><div className="modal-head"><div><p className="eyebrow pink">{item?'EDIT LOWONGAN':'LOWONGAN BARU'}</p><h2>{item?'Edit Posisi Karir':'Tambah Posisi Karir'}</h2></div><button type="button" className="icon-btn" onClick={onClose}><X/></button></div><div className="modal-scroll-area"><div className="form-row"><label>Nama posisi<input value={form.title} onChange={event=>updateTitle(event.target.value)} required placeholder="Contoh: IT Support"/></label><label>Jenis kerja<select className="select-input" value={form.employment_type} onChange={event=>update('employment_type',event.target.value)}><option value="fulltime">Full Time</option><option value="internship">PKL / Magang</option></select></label></div><label>Slug<input value={form.slug} onChange={event=>update('slug',event.target.value)} required placeholder="it-support"/></label><label>Deskripsi singkat<textarea rows={4} value={form.summary} onChange={event=>update('summary',event.target.value)} placeholder="Ringkasan posisi dan kualifikasi."/></label><label>Link formulir pendaftaran<input type="url" value={form.form_url} onChange={event=>update('form_url',event.target.value)} placeholder="https://forms.gle/..."/></label><label>Link WhatsApp pendaftaran<input value={form.whatsapp_url} onChange={event=>update('whatsapp_url',event.target.value)} placeholder="https://wa.me/628... atau nomor WhatsApp"/></label><label>Catatan pendaftaran<textarea rows={3} value={form.application_note} onChange={event=>update('application_note',event.target.value)} placeholder="Contoh: Sertakan CV dan portofolio terbaru."/></label><label>Urutan tampil<input type="number" min="1" value={form.display_order} onChange={event=>update('display_order',event.target.value)} placeholder="Contoh: 1"/></label><label className="check"><input type="checkbox" checked={form.is_published} onChange={event=>update('is_published',event.target.checked)}/> Tampilkan di frontend</label></div>{error&&<div className="error-box">{error}</div>}<div className="modal-actions"><button type="button" className="secondary" onClick={onClose}>Batal</button><button className="primary" disabled={busy}>{busy?'Menyimpan…':'Simpan posisi'}</button></div></form></div>
}

function SolutionLibraryModal({item,label,onClose,onSaved}:{item:ContentItem|null;label:string;onClose:()=>void;onSaved:()=>void}){
  const source=(item?.data||{}) as Record<string,any>
  const [form,setForm]=useState({title:item?.title||source.nama_awam||'',slug:item?.slug||source.slug||'',summary:item?.summary||source.fungsi||'',image_url:item?.image_url||source.image||'',technical:source.technical||source.nama_teknis||'',category:source.category||source.kategori||'',subcategory:source.subkategori||'',level:source.level||'basic',businessGoal:source.tujuan_bisnis||'',howItWorks:source.cara_kerja||'',input:source.input||'',output:source.output||'',development:source.estimasi_development||'',cost:source.estimasi_biaya||'',plainExplanation:source.penjelasan_awam||'',technicalExplanation:source.penjelasan_teknis||'',icon:source.icon||'',difficulty:String(source.tingkat_kesulitan??''),is_published:item?.is_published??true})
  const listKeys=['komponen','digunakan_pada','integrasi','contoh','fitur_terkait','diagram','business_flow','manfaat','contoh_nyata','ketergantungan','rekomendasi_fitur'] as const
  const [lists,setLists]=useState<Record<string,string>>(()=>Object.fromEntries(listKeys.map(key=>[key,Array.isArray(source[key])?source[key].join(', '):''])))
  const [selectedTopics,setSelectedTopics]=useState<string[]>(()=>Array.isArray(source.topics||source.topik)?[...(source.topics||source.topik)]:[])
  const [error,setError]=useState(''),[busy,setBusy]=useState(false)
  const [categories,setCategories]=useState(['Website','Frontend','Backend','Database','UI','UX','Security','Cloud','AI','Integration','Business','Mobile'])
  const [availableTopics,setAvailableTopics]=useState<string[]>([])
  useEffect(()=>{request('/modules/solution-library-categories').then(items=>{const saved=items.filter((entry:ContentItem)=>entry.is_published).map((entry:ContentItem)=>entry.title);if(saved.length)setCategories(saved)}).catch(()=>{})},[])
  useEffect(()=>{request('/modules/solution-library-explore-categories').then(items=>setAvailableTopics(items.filter((entry:ContentItem)=>entry.is_published).map((entry:ContentItem)=>entry.title))).catch(()=>{})},[])
  useEffect(()=>{if(selectedTopics.length||!availableTopics.length)return;const values=[source.nama_awam,source.nama_teknis,source.fungsi,...(Array.isArray(source.digunakan_pada)?source.digunakan_pada:[])].map(value=>String(value||'').toLowerCase());setSelectedTopics(availableTopics.filter(topic=>values.some(value=>value.includes(topic.toLowerCase()))))},[availableTopics])
  const field=(label:string,key:Exclude<keyof typeof form,'is_published'>,multiline=false)=>key==='category'?<label>{label}<select className="select-input" value={form.category} onChange={event=>setForm({...form,category:event.target.value})}><option value="">Pilih kategori</option>{categories.map(category=><option key={category} value={category}>{category}</option>)}</select></label>:<label>{label}{multiline?<textarea rows={3} value={String(form[key])} onChange={event=>setForm({...form,[key]:event.target.value})}/>:<input value={String(form[key])} onChange={event=>setForm({...form,[key]:event.target.value})}/>}</label>
  async function save(event:FormEvent){event.preventDefault();setBusy(true);setError('');try{const data={...source,nama_awam:form.title,nama_teknis:form.technical,slug:form.slug,kategori:form.category,category:form.category,subkategori:form.subcategory,level:form.level,topik:selectedTopics,topics:selectedTopics,fungsi:form.summary,tujuan_bisnis:form.businessGoal,cara_kerja:form.howItWorks,input:form.input,output:form.output,estimasi_development:form.development,estimasi_biaya:form.cost,penjelasan_awam:form.plainExplanation,penjelasan_teknis:form.technicalExplanation,icon:form.icon,tingkat_kesulitan:form.difficulty===''?null:Number(form.difficulty),...Object.fromEntries(listKeys.map(key=>[key,lists[key].split(',').map(value=>value.trim()).filter(Boolean)]))};await request(item?`/modules/solution-library/${item.id}`:'/modules/solution-library',{method:item?'PUT':'POST',body:JSON.stringify({title:form.title,slug:form.slug,summary:form.summary,image_url:form.image_url,is_published:form.is_published,data})});onSaved()}catch(err){setError((err as Error).message)}finally{setBusy(false)}}
  return <div className="modal-backdrop"><form className="modal modal-lg" onSubmit={save}><div className="modal-head"><div><p className="eyebrow pink">{item?'EDIT SOLUSI':'SOLUSI BARU'}</p><h2>{item?`Edit ${label}`:`Tambah ${label}`}</h2></div><button type="button" className="icon-btn" onClick={onClose}><X/></button></div><div className="modal-scroll-area"><div className="form-row">{field('Nama awam','title')}{field('Nama teknis','technical')}</div><div className="form-row">{field('Slug','slug')}{field('Kategori','category')}</div><div className="solution-topics"><b>Topik Jelajahi</b><small>Pilih topik yang relevan untuk solusi ini.</small><div className="topic-options">{availableTopics.map(topic=><label className="check" key={topic}><input type="checkbox" checked={selectedTopics.includes(topic)} onChange={event=>setSelectedTopics(event.target.checked?[...selectedTopics,topic]:selectedTopics.filter(value=>value!==topic))}/>{topic}</label>)}</div>{!availableTopics.length&&<p className="subtle">Tambahkan topik melalui tombol Atur Jelajahi Topik.</p>}</div><div className="form-row">{field('Subkategori','subcategory')}{field('Level','level')}</div><div className="form-row">{field('Icon','icon')}{field('Tingkat kesulitan','difficulty')}</div>{field('Fungsi','summary',true)}{field('Tujuan bisnis','businessGoal',true)}{field('Cara kerja','howItWorks',true)}<div className="form-row">{field('Input','input')}{field('Output','output')}</div><div className="form-row">{field('Estimasi development','development')}{field('Estimasi biaya','cost')}</div>{field('URL gambar','image_url')} {field('Penjelasan awam','plainExplanation',true)}{field('Penjelasan teknis','technicalExplanation',true)}{listKeys.map(key=><label key={key}>{key.replaceAll('_',' ')}<input value={lists[key]} onChange={event=>setLists({...lists,[key]:event.target.value})} placeholder="Pisahkan setiap item dengan koma"/></label>)}<label className="check"><input type="checkbox" checked={form.is_published} onChange={event=>setForm({...form,is_published:event.target.checked})}/> Tampilkan di frontend</label></div>{error&&<div className="error-box">{error}</div>}<div className="modal-actions"><button type="button" className="secondary" onClick={onClose}>Batal</button><button className="primary" disabled={busy}>{busy?'Menyimpan…':'Simpan solusi'}</button></div></form></div>
}

export default App
