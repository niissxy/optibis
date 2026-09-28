import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
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
  HelpCircle,
  ImagePlus,
  LayoutDashboard,
  Layers3,
  LogOut,
  Mail,
  Menu,
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
type Portfolio = { id:number; name:string; category:string; description:string; website_url:string; image_url:string|null; updated_at?:string }
type Admin = { id:number; name:string; email:string; created_at:string }
type User = { id:number; name:string; email:string }
type ContentType = 'service-pillars'|'services'|'packages'|'marketing-kits'|'insights'|'tools'|'solution-library'|'viralog-content'|'viralog-categories'|'viralog-authors'|'viralog-tags'|'viralog-rss-sources'|'viralog-ad-campaigns'|'evolis-business-dna'|'evolis-products'|'evolis-audiences'|'evolis-objectives'|'evolis-campaigns'|'evolis-assets'|'evolis-publishing'|'evolis-leads'|'evolis-pipeline'|'evolis-analytics'|'evolis-recommendations'|'evolis-automations'|'evolis-governance'|'evolis-briefs'|'evolis-settings'|'site-settings'
type ContentItem = { id:number; type?:ContentType; slug:string; title:string; summary:string|null; image_url:string|null; data:Record<string, unknown>|null; is_published:boolean; updated_at?:string }
type Section = 'portfolio'|'admins'|'viralog'|'evolis'|'settings'|ContentType

const SERVICE_PILLARS = [
  { id: 'website', name: 'Website' },
  { id: 'digital-asset', name: 'Digital Asset' },
  { id: 'digital-growth-team', name: 'Digital Growth Team' },
]

const CONTENT_SECTIONS:{id:ContentType;label:string;icon:typeof Package}[] = [
  {id:'service-pillars',label:'Pilar Layanan',icon:Columns3},
  {id:'services',label:'Layanan',icon:BriefcaseBusiness},
  {id:'packages',label:'Paket',icon:Package},
  {id:'marketing-kits',label:'Marketing Kit',icon:ImagePlus},
  {id:'insights',label:'Insight',icon:BookOpen},
  {id:'tools',label:'Tools',icon:Wrench},
  {id:'solution-library',label:'Solution Library',icon:Layers3},
]
const VIRALOG_SECTIONS:{id:ContentType;label:string}[] = [
  {id:'viralog-content',label:'Konten'}, {id:'viralog-categories',label:'Kategori'}, {id:'viralog-authors',label:'Penulis'}, {id:'viralog-tags',label:'Tag'}, {id:'viralog-rss-sources',label:'RSS Source'}, {id:'viralog-ad-campaigns',label:'Iklan'},
]
const EVOLIS_SECTIONS:{id:ContentType;label:string}[] = [
  {id:'evolis-business-dna',label:'Business DNA'}, {id:'evolis-products',label:'Produk'}, {id:'evolis-audiences',label:'Audiens'}, {id:'evolis-objectives',label:'Objective'}, {id:'evolis-campaigns',label:'Campaign'}, {id:'evolis-assets',label:'Asset'}, {id:'evolis-publishing',label:'Publishing'}, {id:'evolis-leads',label:'Leads'}, {id:'evolis-pipeline',label:'Pipeline'}, {id:'evolis-analytics',label:'Analytics'}, {id:'evolis-recommendations',label:'Rekomendasi'}, {id:'evolis-automations',label:'Automation'}, {id:'evolis-governance',label:'Governance'}, {id:'evolis-briefs',label:'Brief'}, {id:'evolis-settings',label:'Pengaturan Workspace'},
]

async function request(path:string, options:RequestInit = {}) {
  const token = localStorage.getItem('optibis_token'); const headers = new Headers(options.headers)
  if (!(options.body instanceof FormData)) headers.set('Content-Type','application/json')
  if (token) headers.set('Authorization', `Bearer ${token}`)
  const response = await fetch(`${API}${path}`, {...options, headers}); const body = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(body.message || Object.values(body.errors || {}).flat().join(' ') || 'Terjadi kesalahan.')
  return body
}

function Login({onLogin}:{onLogin:(user:User, token:string)=>void}) {
  const [email,setEmail] = useState('admin@optibis.test'), [password,setPassword] = useState('password123'), [error,setError] = useState(''), [busy,setBusy] = useState(false)
  async function submit(e:FormEvent) { e.preventDefault(); setBusy(true); setError(''); try { const data=await request('/auth/login',{method:'POST',body:JSON.stringify({email,password})}); onLogin(data.user,data.token) } catch (err) { setError((err as Error).message) } finally { setBusy(false) } }
  return <main className="login-page"><div className="login-art"><div className="art-orb orb-one"/><div className="art-orb orb-two"/><div className="art-copy"><div className="brand-mark">O</div><p className="eyebrow">OPTIBIS STUDIO</p><h1>Bangun karya yang<br/><em>berkesan.</em></h1><p className="muted-light">Kelola portofolio digital Anda dalam satu ruang yang sederhana dan powerful.</p></div></div><div className="login-panel"><div className="mobile-brand"><div className="brand-mark">O</div><span>optibis</span></div><div className="login-box"><p className="eyebrow pink">ADMIN CONSOLE</p><h2>Selamat datang kembali</h2><p className="subtle">Masuk untuk mengelola portofolio dan tim Anda.</p><form onSubmit={submit}><label>Email<div className="input-wrap"><Mail size={17}/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} required placeholder="nama@perusahaan.com"/></div></label><label>Password<div className="input-wrap"><ShieldCheck size={17}/><input type="password" value={password} onChange={e=>setPassword(e.target.value)} required placeholder="••••••••"/></div></label>{error && <div className="error-box">{error}</div>}<button className="primary full" disabled={busy}>{busy?'Memproses…':'Masuk ke dashboard'} <ChevronDown size={17} className="rotate-270"/></button></form><p className="login-hint">Demo: admin@optibis.test · password123</p></div><div className="login-footer">© 2025 Optibis Studio <span>·</span> Built with intention</div></div></main>
}

function App() {
  const [user,setUser] = useState<User|null>(null), [section,setSection] = useState<Section>('portfolio'), [menu,setMenu] = useState(false)
  useEffect(()=>{ const token=localStorage.getItem('optibis_token'); if(token) request('/auth/me').then(d=>setUser(d.user)).catch(()=>localStorage.removeItem('optibis_token')) },[])
  if(!user) return <Login onLogin={(u,t)=>{localStorage.setItem('optibis_token',t);setUser(u)}}/>
  function logout(){ request('/auth/logout',{method:'POST'}).catch(()=>{}).finally(()=>{localStorage.removeItem('optibis_token');setUser(null)}) }
  const sectionLabel = section === 'portfolio' ? 'Portofolio' : section === 'admins' ? 'Admin' : section === 'service-pillars' ? 'Pilar Layanan' : section === 'services' ? 'Layanan' : section === 'packages' ? 'Paket' : section === 'viralog' ? 'Viralog' : section === 'evolis' ? 'Evolis' : section === 'settings' ? 'Pengaturan Website' : CONTENT_SECTIONS.find(item=>item.id===section)?.label
  return <div className="shell"><aside className={menu?'open':''}><div className="side-brand"><div className="brand-mark">O</div><span>optibis</span></div><div className="workspace"><span className="avatar">{user.name[0]}</span><div><strong>{user.name}</strong><small>Administrator</small></div><ChevronDown size={15}/></div><nav><p className="nav-label">WORKSPACE</p><button className={section==='portfolio'?'active':''} onClick={()=>{setSection('portfolio');setMenu(false)}}><LayoutDashboard size={18}/> Portofolio</button><p className="nav-label">KONTEN FRONTEND</p>{CONTENT_SECTIONS.map(item=>{const Icon=item.icon;return <button key={item.id} className={section===item.id?'active':''} onClick={()=>{setSection(item.id);setMenu(false)}}><Icon size={18}/> {item.label}</button>})}<button className={section==='viralog'?'active':''} onClick={()=>{setSection('viralog');setMenu(false)}}><Newspaper size={18}/> Viralog</button><button className={section==='evolis'?'active':''} onClick={()=>{setSection('evolis');setMenu(false)}}><Layers3 size={18}/> Evolis</button><p className="nav-label">AKSES</p><button className={section==='admins'?'active':''} onClick={()=>{setSection('admins');setMenu(false)}}><Users size={18}/> Admin <span className="nav-dot">•</span></button><button className={section==='settings'?'active':''} onClick={()=>{setSection('settings');setMenu(false)}}><Wrench size={18}/> Pengaturan Website</button></nav><div className="sidebar-bottom"><div className="side-tip"><BarChart3 size={18}/><div><b>Keep creating</b><small>Ide bagus selalu layak dibuat.</small></div></div><button className="logout" onClick={logout}><LogOut size={17}/> Keluar</button></div></aside><div className="main"><header><button className="menu-btn" onClick={()=>setMenu(!menu)}><Menu/></button><div className="crumb"><span>Workspace</span><b>/</b><strong>{sectionLabel}</strong></div><div className="header-actions"><span className="status"><i/> Sistem online</span><button className="profile" onClick={logout}><span className="avatar">{user.name[0]}</span><ChevronDown size={15}/></button></div></header>{section==='portfolio'?<PortfolioView/>:section==='admins'?<AdminView currentUser={user}/>:section==='service-pillars'?<ServicePillarsView/>:section==='services'?<ServicesView/>:section==='packages'?<PackagesView/>:section==='viralog'?<ContentHub title="Viralog" sections={VIRALOG_SECTIONS}/>:section==='evolis'?<ContentHub title="Evolis" sections={EVOLIS_SECTIONS}/>:section==='settings'?<ContentView type="site-settings" label="Pengaturan Website"/>:<ContentView type={section} label={sectionLabel || 'Konten'}/>}</div></div>
}

function PortfolioView(){ const [items,setItems]=useState<Portfolio[]>([]), [query,setQuery]=useState(''), [editing,setEditing]=useState<Portfolio|null|false>(false), [refresh,setRefresh]=useState(0), [error,setError]=useState(''); useEffect(()=>{request('/portfolios').then(setItems).catch(e=>setError(e.message))},[refresh]); const filtered=items.filter(x=>(x.name+x.category).toLowerCase().includes(query.toLowerCase())); async function remove(id:number){if(!confirm('Hapus portofolio ini?'))return; try{await request('/portfolios/'+id,{method:'DELETE'});setRefresh(x=>x+1)}catch(e){setError((e as Error).message)}} return <section className="content"><div className="page-title"><div><p className="eyebrow pink">CONTENT LIBRARY</p><h1>Portofolio</h1><p className="subtle">Tampilkan karya terbaik dan kisah di baliknya.</p></div><button className="primary" onClick={()=>setEditing(null)}><Plus size={18}/> Tambah portofolio</button></div><div className="stats"><div><span>Total karya</span><b>{items.length}</b><small>Semua portofolio</small></div><div><span>Kategori</span><b>{new Set(items.map(x=>x.category)).size}</b><small>Jenis layanan</small></div><div><span>Terakhir diperbarui</span><b className="date-stat">{items[0]?.updated_at?new Date(items[0].updated_at).toLocaleDateString('id-ID',{day:'2-digit',month:'short'}):'—'}</b><small>Update terbaru</small></div></div><div className="toolbar"><div className="search"><Search size={17}/><input placeholder="Cari portofolio…" value={query} onChange={e=>setQuery(e.target.value)}/></div><span className="result-count">{filtered.length} karya</span></div>{error&&<div className="error-box">{error}</div>}<div className="portfolio-grid">{filtered.map(item=><article className="portfolio-card" key={item.id}><div className="card-image">{item.image_url?<img src={item.image_url} alt=""/>:<div className="image-placeholder"><BriefcaseBusiness size={26}/><span>{item.category}</span></div>}<span className="category">{item.category}</span><div className="card-hover"><button onClick={()=>setEditing(item)}><Pencil size={16}/></button><button onClick={()=>remove(item.id)}><Trash2 size={16}/></button></div></div><div className="card-body"><h3>{item.name}</h3><p>{item.description}</p><a href={item.website_url} target="_blank">Lihat website <ExternalLink size={14}/></a></div></article>)}{!filtered.length&&<div className="empty"><BriefcaseBusiness size={30}/><p>Belum ada portofolio.</p></div>}</div>{editing!==false&&<PortfolioModal item={editing} onClose={()=>setEditing(false)} onSaved={()=>{setEditing(false);setRefresh(x=>x+1)}}/>}</section> }

function PortfolioModal({item,onClose,onSaved}:{item:Portfolio|null,onClose:()=>void,onSaved:()=>void}){const [form,setForm]=useState({name:item?.name||'',category:item?.category||'',description:item?.description||'',website_url:item?.website_url||''}), [image,setImage]=useState<File|null>(null), [error,setError]=useState(''), [busy,setBusy]=useState(false);async function save(e:FormEvent){e.preventDefault();setBusy(true);const data=new FormData();Object.entries(form).forEach(([k,v])=>data.append(k,v));if(image)data.append('image',image);if(item)data.append('_method','PUT');try{await request(item?`/portfolios/${item.id}`:'/portfolios',{method:'POST',body:data});onSaved()}catch(err){setError((err as Error).message)}finally{setBusy(false)}}return <div className="modal-backdrop"><form className="modal" onSubmit={save}><div className="modal-head"><div><p className="eyebrow pink">{item?'EDIT':'NEW ENTRY'}</p><h2>{item?'Edit portofolio':'Tambah portofolio'}</h2></div><button type="button" className="icon-btn" onClick={onClose}><X/></button></div><label>Nama website<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/></label><div className="form-row"><label>Kategori<input value={form.category} onChange={e=>setForm({...form,category:e.target.value})} required/></label><label>Link website<input type="url" value={form.website_url} onChange={e=>setForm({...form,website_url:e.target.value})} required/></label></div><label>Deskripsi<textarea rows={4} value={form.description} onChange={e=>setForm({...form,description:e.target.value})} required/></label><label className="upload">Gambar <span><ImagePlus size={18}/> {image?.name||'Pilih gambar (maks. 5 MB)'}<input type="file" accept="image/*" onChange={e=>setImage(e.target.files?.[0]||null)}/></span></label>{error&&<div className="error-box">{error}</div>}<div className="modal-actions"><button type="button" className="secondary" onClick={onClose}>Batal</button><button className="primary" disabled={busy}>{busy?'Menyimpan…':'Simpan portofolio'}</button></div></form></div>}

function AdminView({currentUser}:{currentUser:User}){const [items,setItems]=useState<Admin[]>([]), [editing,setEditing]=useState<Admin|null|false>(false), [refresh,setRefresh]=useState(0), [error,setError]=useState('');useEffect(()=>{request('/admins').then(setItems).catch(e=>setError(e.message))},[refresh]);async function remove(id:number){if(!confirm('Hapus admin ini?'))return;try{await request('/admins/'+id,{method:'DELETE'});setRefresh(x=>x+1)}catch(e){setError((e as Error).message)}}return <section className="content"><div className="page-title"><div><p className="eyebrow pink">TEAM ACCESS</p><h1>Admin</h1><p className="subtle">Kelola siapa saja yang punya akses ke workspace.</p></div><button className="primary" onClick={()=>setEditing(null)}><Plus size={18}/> Tambah admin</button></div><div className="admin-table"><div className="table-head"><span>Nama</span><span>Email</span><span>Bergabung</span><span></span></div>{items.map(item=><div className="table-row" key={item.id}><div className="person"><span className="avatar">{item.name[0]}</span><div><b>{item.name}</b>{item.id===currentUser.id&&<small>Anda</small>}</div></div><span>{item.email}</span><span>{new Date(item.created_at).toLocaleDateString('id-ID',{day:'numeric',month:'short',year:'numeric'})}</span><div className="row-actions"><button onClick={()=>setEditing(item)}><Pencil size={16}/></button><button onClick={()=>remove(item.id)}><Trash2 size={16}/></button></div></div>)}{!items.length&&<div className="empty">Belum ada admin.</div>}</div>{error&&<div className="error-box">{error}</div>}{editing!==false&&<AdminModal item={editing} onClose={()=>setEditing(false)} onSaved={()=>{setEditing(false);setRefresh(x=>x+1)}}/>}</section>}
function AdminModal({item,onClose,onSaved}:{item:Admin|null,onClose:()=>void,onSaved:()=>void}){const [form,setForm]=useState({name:item?.name||'',email:item?.email||'',password:''}), [error,setError]=useState(''), [busy,setBusy]=useState(false);async function save(e:FormEvent){e.preventDefault();setBusy(true);try{const body={...form};if(!body.password)delete (body as Partial<typeof body>).password;await request(item?`/admins/${item.id}`:'/admins',{method:item?'PUT':'POST',body:JSON.stringify(body)});onSaved()}catch(err){setError((err as Error).message)}finally{setBusy(false)}}return <div className="modal-backdrop"><form className="modal small-modal" onSubmit={save}><div className="modal-head"><div><p className="eyebrow pink">{item?'EDIT ADMIN':'TEAM ACCESS'}</p><h2>{item?'Edit admin':'Tambah admin'}</h2></div><button type="button" className="icon-btn" onClick={onClose}><X/></button></div><label>Nama lengkap<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/></label><label>Email<input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/></label><label>Password<input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder={item?'Kosongkan jika tidak berubah':'Min. 8 karakter'} required={!item}/></label>{error&&<div className="error-box">{error}</div>}<div className="modal-actions"><button type="button" className="secondary" onClick={onClose}>Batal</button><button className="primary" disabled={busy}>{busy?'Menyimpan…':'Simpan admin'}</button></div></form></div>}

function ContentHub({title,sections}:{title:string;sections:{id:ContentType;label:string}[]}){const [active,setActive]=useState<ContentType>(sections[0].id);const label=sections.find(item=>item.id===active)?.label||'';return <><section className="content"><div className="page-title"><div><p className="eyebrow pink">CONTENT HUB</p><h1>{title}</h1><p className="subtle">Kelola seluruh data {title} dari satu menu.</p></div></div><div className="toolbar">{sections.map(item=><button key={item.id} className={active===item.id?'primary':'secondary'} onClick={()=>setActive(item.id)}>{item.label}</button>)}</div></section><ContentView type={active} label={`${title}: ${label}`}/></>}

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
    const pillar = (data.pillar || '').toString().toLowerCase()
    const features = Array.isArray(data.features) ? data.features.join(' ') : ''
    const matchQuery = `${item.title} ${item.slug} ${item.summary || ''} ${pillar} ${features}`.toLowerCase().includes(query.toLowerCase())
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
          <p className="subtle">Kelola seluruh layanan, pilar, dan poin <strong>"Yang Termasuk dalam Layanan"</strong>.</p>
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
            placeholder="Cari layanan atau fitur…"
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
          <span>Pilar</span>
          <span>Yang Termasuk dalam Layanan</span>
          <span>Slug</span>
          <span>Status</span>
          <span></span>
        </div>

        {filtered.map(item => {
          const data = (item.data || {}) as Record<string, any>
          const features: string[] = Array.isArray(data.features) ? data.features : []
          const pillar = data.pillar || 'website'
          const pillarObj = SERVICE_PILLARS.find(p => p.id === pillar) || { name: pillar || 'Website' }

          return (
            <div className="table-row" key={item.id}>
              <div className="person">
                {item.image_url ? (
                  <img className="avatar" src={item.image_url} alt="" />
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
              </div>

              <div className="features-preview-cell">
                <span className="features-badge">
                  <Check size={12} /> {features.length} cakupan
                </span>
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
  const initialPillar = existingData.pillar || 'website'

  const [form, setForm] = useState({
    title: item?.title || '',
    slug: item?.slug || '',
    pillar: initialPillar,
    summary: item?.summary || existingData.desc || '',
    image_url: item?.image_url || existingData.image || '',
    is_published: item?.is_published ?? true
  })

  const [features, setFeatures] = useState<string[]>(initialFeatures)
  const [newFeatureText, setNewFeatureText] = useState('')
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

  async function save(e: FormEvent) {
    e.preventDefault()
    setBusy(true)
    setError('')

    const cleanFeatures = features.map(f => f.trim()).filter(Boolean)

    const payloadData: Record<string, any> = {
      ...existingData,
      name: form.title,
      desc: form.summary,
      pillar: form.pillar,
      pillar_name: SERVICE_PILLARS.find(p => p.id === form.pillar)?.name || form.pillar,
      image: form.image_url.trim() || null,
      features: cleanFeatures
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

        <div className="modal-scroll-area">
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
              URL Gambar Banner
              <input
                type="url"
                value={form.image_url}
                onChange={e => setForm({ ...form, image_url: e.target.value })}
                placeholder="https://images.unsplash.com/..."
              />
            </label>
          </div>

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

          {/* BAGIAN YANG TERMASUK DALAM LAYANAN */}
          <div className="features-section">
            <div className="features-section-header">
              <div>
                <h3 className="features-section-title">
                  <CheckCircle2 size={18} className="icon-pink" />
                  Yang Termasuk dalam Layanan
                </h3>
                <p className="features-section-sub">
                  Cakupan utama dan deliverables yang akan didapatkan klien dari layanan ini.
                </p>
              </div>
              <span className="features-count-pill">
                {features.length} Poin
              </span>
            </div>

            {/* Quick Add Bar */}
            <div className="feature-add-box">
              <input
                type="text"
                className="feature-add-input"
                placeholder="Ketik cakupan layanan (misal: 1 halaman responsif, Form inquiry & WhatsApp, SEO dasar)..."
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

            {/* Feature List */}
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
    const pillar = (data.pillar || '').toString().toLowerCase()
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
          const pillar = data.pillar || 'website'
          const pillarObj = SERVICE_PILLARS.find(p => p.id === pillar) || { name: pillar || 'Website' }
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

function PackageModal({
  item,
  onClose,
  onSaved
}: {
  item: ContentItem | null
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

  const [activeTab, setActiveTab] = useState<'info' | 'highlights' | 'included' | 'deliverables' | 'faqs'>('info')

  const [form, setForm] = useState({
    title: item?.title || '',
    slug: item?.slug || '',
    summary: item?.summary || existingData.tagline || '',
    pillar: existingData.pillar || 'website',
    tagline: existingData.tagline || '',
    badge: existingData.badge || '',
    popular: !!existingData.popular,
    price: existingData.price || 'Rp 2.900.000',
    price_period: existingData.price_period || 'sekali bayar',
    timeline: existingData.timeline || '5-7 hari kerja',
    target: existingData.target || '',
    image_url: item?.image_url || existingData.heroImage || existingData.flyer_image || '',
    cta_text: existingData.cta_text || 'Pesan Paket Ini',
    consultation_text: existingData.consultation_text || 'Konsultasi Dulu',
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

    const payloadData: Record<string, any> = {
      ...existingData,
      name: form.title,
      pillar: form.pillar,
      pillar_name: SERVICE_PILLARS.find(p => p.id === form.pillar)?.name || form.pillar,
      tagline: form.tagline || form.summary,
      badge: form.badge || (form.popular ? 'Paling Populer' : ''),
      popular: form.popular,
      price: form.price,
      price_period: form.price_period,
      timeline: form.timeline,
      target: form.target,
      heroImage: form.image_url.trim() || null,
      flyer_image: form.image_url.trim() || null,
      highlights: cleanHighlights,
      included: cleanIncluded,
      deliverables: cleanDeliverables,
      faqs: cleanFaqs,
      cta_text: form.cta_text,
      consultation_text: form.consultation_text
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
                    placeholder="Contoh: Rp 2.900.000 atau Rp 3.500.000"
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

function ContentView({type,label}:{type:ContentType;label:string}){
  if (type === 'service-pillars') {
    return <ServicePillarsView />
  }
  if (type === 'services') {
    return <ServicesView />
  }
  if (type === 'packages') {
    return <PackagesView />
  }

  const [items,setItems]=useState<ContentItem[]>([]),[query,setQuery]=useState(''),[editing,setEditing]=useState<ContentItem|null|false>(false),[refresh,setRefresh]=useState(0),[error,setError]=useState('');useEffect(()=>{request(`/modules/${type}`).then(setItems).catch(e=>setError(e.message))},[type,refresh]);const filtered=items.filter(item=>`${item.title} ${item.slug} ${item.summary||''}`.toLowerCase().includes(query.toLowerCase()));async function remove(id:number){if(!confirm(`Hapus ${label.toLowerCase()} ini?`))return;try{await request(`/modules/${type}/${id}`,{method:'DELETE'});setRefresh(value=>value+1)}catch(err){setError((err as Error).message)}}return <section className="content"><div className="page-title"><div><p className="eyebrow pink">CONTENT LIBRARY</p><h1>{label}</h1><p className="subtle">Kelola konten {label.toLowerCase()} yang ditampilkan di frontend.</p></div><button className="primary" onClick={()=>setEditing(null)}><Plus size={18}/> Tambah {label}</button></div><div className="toolbar"><div className="search"><Search size={17}/><input placeholder={`Cari ${label.toLowerCase()}…`} value={query} onChange={event=>setQuery(event.target.value)}/></div><span className="result-count">{filtered.length} konten</span></div>{error&&<div className="error-box">{error}</div>}<div className="admin-table"><div className="table-head"><span>Konten</span><span>Slug</span><span>Status</span><span></span></div>{filtered.map(item=><div className="table-row" key={item.id}><div className="person">{item.image_url?<img className="avatar" src={item.image_url} alt=""/>:<span className="avatar">{item.title[0]}</span>}<div><b>{item.title}</b>{item.summary&&<small>{item.summary}</small>}</div></div><span>{item.slug}</span><span>{item.is_published?'Published':'Draft'}</span><div className="row-actions"><button onClick={()=>setEditing(item)}><Pencil size={16}/></button><button onClick={()=>remove(item.id)}><Trash2 size={16}/></button></div></div>)}{!filtered.length&&<div className="empty">Belum ada konten {label.toLowerCase()}.</div>}</div>{editing!==false&&<ContentModal type={type} label={label} item={editing} onClose={()=>setEditing(false)} onSaved={()=>{setEditing(false);setRefresh(value=>value+1)}}/>}</section>}

function ContentModal({type,label,item,onClose,onSaved}:{type:ContentType;label:string;item:ContentItem|null;onClose:()=>void;onSaved:()=>void}){const [form,setForm]=useState({title:item?.title||'',slug:item?.slug||'',summary:item?.summary||'',image_url:item?.image_url||'',data:JSON.stringify(item?.data||{},null,2),is_published:item?.is_published??true}),[error,setError]=useState(''),[busy,setBusy]=useState(false);async function save(event:FormEvent){event.preventDefault();setBusy(true);setError('');try{let data:Record<string,unknown>={};if(form.data.trim())data=JSON.parse(form.data);await request(item?`/modules/${type}/${item.id}`:`/modules/${type}`,{method:item?'PUT':'POST',body:JSON.stringify({...form,data})});onSaved()}catch(err){setError(err instanceof SyntaxError?'Data tambahan harus berupa JSON yang valid.':(err as Error).message)}finally{setBusy(false)}}return <div className="modal-backdrop"><form className="modal" onSubmit={save}><div className="modal-head"><div><p className="eyebrow pink">{item?'EDIT KONTEN':'KONTEN BARU'}</p><h2>{item?`Edit ${label}`:`Tambah ${label}`}</h2></div><button type="button" className="icon-btn" onClick={onClose}><X/></button></div><label>Judul<input value={form.title} onChange={event=>setForm({...form,title:event.target.value})} required/></label><label>Slug<input value={form.slug} onChange={event=>setForm({...form,slug:event.target.value})} required/></label><label>Ringkasan<textarea rows={3} value={form.summary} onChange={event=>setForm({...form,summary:event.target.value})}/></label><label>URL gambar<input type="url" value={form.image_url} onChange={event=>setForm({...form,image_url:event.target.value})}/></label><label>Data tambahan (JSON)<textarea rows={7} value={form.data} onChange={event=>setForm({...form,data:event.target.value})}/></label><label className="check"><input type="checkbox" checked={form.is_published} onChange={event=>setForm({...form,is_published:event.target.checked})}/> Tampilkan di frontend</label>{error&&<div className="error-box">{error}</div>}<div className="modal-actions"><button type="button" className="secondary" onClick={onClose}>Batal</button><button className="primary" disabled={busy}>{busy?'Menyimpan…':'Simpan konten'}</button></div></form></div>}

export default App
