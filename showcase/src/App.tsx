import { useState, useRef, useCallback } from "react"
import LiquidGlass from "liquid-glass-react"

/* ========== 背景预设 ========== */
const BGS = [
  { id: "mountains", label: "雪山", thumb: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&q=80", full: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80" },
  { id: "lake", label: "湖泊", thumb: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=200&q=80", full: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80" },
  { id: "forest", label: "森林", thumb: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&q=80", full: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80" },
  { id: "autumn", label: "秋色", thumb: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=200&q=80", full: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=1920&q=80" },
  { id: "ocean", label: "海滩", thumb: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=200&q=80", full: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80" },
]

/* ========== 图标 ========== */
const I = {
  Search: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>,
  Home: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  Compass: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>,
  Heart: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>,
  User: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
  Settings: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  Bell: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  Download: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  Mail: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 4-10 8L2 4"/></svg>,
  Sparkle: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 3l1.5 5.5L19 10l-5.5 1.5L12 17l-1.5-5.5L5 10l5.5-1.5z"/><path d="M18 14l.7 2.3L21 17l-2.3.7L18 20l-.7-2.3L15 17l2.3-.7z"/></svg>,
  Chart: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  Wand: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M15 4V2m0 2h2m-2 0h-2m4 14a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><path d="m10.6 2.7-7.9 7.9a2 2 0 0 0 0 2.83l4.91 4.9a2 2 0 0 0 2.83 0l7.9-7.9"/></svg>,
  X: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  Grip: () => <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="9" cy="5" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="19" r="1"/></svg>,
}

/* ========== 工作坊状态 ========== */
interface GlassParams {
  blur: number       // CSS blur px
  opacity: number    // 0-0.25
  saturation: number // 0-300%
  radius: number     // px
  shadow: "light" | "medium" | "heavy"
}

const SHADOWS = {
  light: "0 2px 12px rgba(0,0,0,0.2)",
  medium: "0 4px 24px rgba(0,0,0,0.3)",
  heavy: "0 8px 40px rgba(0,0,0,0.45)",
}

const DEFAULT_PARAMS: GlassParams = { blur: 16, opacity: 0.06, saturation: 160, radius: 24, shadow: "medium" }

/* ========== 参数预设展示组 ========== */
interface Preset extends GlassParams { name: string }
const BLUR_SWEEP: Preset[] = [
  { name: "模糊 0px — 硬边", blur: 0, opacity: 0.06, saturation: 160, radius: 20, shadow: "medium" },
  { name: "模糊 2px — 微痕", blur: 2, opacity: 0.06, saturation: 160, radius: 20, shadow: "medium" },
  { name: "模糊 4px — 轻语", blur: 4, opacity: 0.06, saturation: 160, radius: 20, shadow: "medium" },
  { name: "模糊 8px — 薄霜", blur: 8, opacity: 0.06, saturation: 160, radius: 20, shadow: "medium" },
  { name: "模糊 12px — 柔化", blur: 12, opacity: 0.06, saturation: 160, radius: 20, shadow: "medium" },
  { name: "模糊 16px — 磨砂", blur: 16, opacity: 0.06, saturation: 160, radius: 20, shadow: "medium" },
  { name: "模糊 20px — 标准", blur: 20, opacity: 0.06, saturation: 160, radius: 20, shadow: "medium" },
  { name: "模糊 24px — 深度", blur: 24, opacity: 0.06, saturation: 160, radius: 20, shadow: "medium" },
  { name: "模糊 32px — 浓霜", blur: 32, opacity: 0.06, saturation: 160, radius: 20, shadow: "medium" },
  { name: "模糊 40px — 不透明", blur: 40, opacity: 0.06, saturation: 160, radius: 20, shadow: "medium" },
  { name: "模糊 48px — 完全", blur: 48, opacity: 0.06, saturation: 160, radius: 20, shadow: "medium" },
]
const OPACITY_SWEEP: Preset[] = [
  { name: "透明度 0% — 无形", blur: 4, opacity: 0, saturation: 140, radius: 20, shadow: "medium" },
  { name: "透明度 2% — 极透", blur: 4, opacity: 0.02, saturation: 140, radius: 20, shadow: "medium" },
  { name: "透明度 4% — 清玻", blur: 4, opacity: 0.04, saturation: 140, radius: 20, shadow: "medium" },
  { name: "透明度 6% — 标准", blur: 4, opacity: 0.06, saturation: 140, radius: 20, shadow: "medium" },
  { name: "透明度 8% — 可见", blur: 4, opacity: 0.08, saturation: 140, radius: 20, shadow: "medium" },
  { name: "透明度 10% — 实感", blur: 4, opacity: 0.10, saturation: 140, radius: 20, shadow: "medium" },
  { name: "透明度 15% — 奶玻", blur: 4, opacity: 0.15, saturation: 140, radius: 20, shadow: "medium" },
  { name: "透明度 20% — 厚奶", blur: 4, opacity: 0.20, saturation: 140, radius: 20, shadow: "medium" },
]
const SAT_SWEEP: Preset[] = [
  { name: "饱和度 0% — 黑白", blur: 16, opacity: 0.06, saturation: 0, radius: 20, shadow: "medium" },
  { name: "饱和度 50% — 去艳", blur: 16, opacity: 0.06, saturation: 50, radius: 20, shadow: "medium" },
  { name: "饱和度 100% — 自然", blur: 16, opacity: 0.06, saturation: 100, radius: 20, shadow: "medium" },
  { name: "饱和度 140% — 鲜艳", blur: 16, opacity: 0.06, saturation: 140, radius: 20, shadow: "medium" },
  { name: "饱和度 180% — 浓郁", blur: 16, opacity: 0.06, saturation: 180, radius: 20, shadow: "medium" },
  { name: "饱和度 220% — 超艳", blur: 16, opacity: 0.06, saturation: 220, radius: 20, shadow: "medium" },
  { name: "饱和度 280% — 霓虹", blur: 16, opacity: 0.06, saturation: 280, radius: 20, shadow: "medium" },
]
const RADIUS_SWEEP: Preset[] = [
  { name: "圆角 0px — 直角", blur: 16, opacity: 0.06, saturation: 160, radius: 0, shadow: "medium" },
  { name: "圆角 4px — 微圆", blur: 16, opacity: 0.06, saturation: 160, radius: 4, shadow: "medium" },
  { name: "圆角 8px — 软角", blur: 16, opacity: 0.06, saturation: 160, radius: 8, shadow: "medium" },
  { name: "圆角 16px — 卡片", blur: 16, opacity: 0.06, saturation: 160, radius: 16, shadow: "medium" },
  { name: "圆角 24px — 现代 UI", blur: 16, opacity: 0.06, saturation: 160, radius: 24, shadow: "medium" },
  { name: "圆角 32px — 柔和面板", blur: 16, opacity: 0.06, saturation: 160, radius: 32, shadow: "medium" },
  { name: "圆角 48px — 大圆角", blur: 16, opacity: 0.06, saturation: 160, radius: 48, shadow: "medium" },
  { name: "圆角 999px — 胶囊形", blur: 16, opacity: 0.06, saturation: 160, radius: 999, shadow: "medium" },
]
const MIXED: Preset[] = [
  { name: "水晶透明", blur: 2, opacity: 0.02, saturation: 120, radius: 8, shadow: "light" },
  { name: "iOS 通知", blur: 28, opacity: 0.08, saturation: 200, radius: 36, shadow: "heavy" },
  { name: "macOS 侧栏", blur: 18, opacity: 0.07, saturation: 180, radius: 12, shadow: "medium" },
  { name: "工具栏玻璃", blur: 14, opacity: 0.05, saturation: 150, radius: 20, shadow: "light" },
  { name: "聚焦搜索", blur: 24, opacity: 0.09, saturation: 220, radius: 16, shadow: "heavy" },
  { name: "面板叠加", blur: 10, opacity: 0.04, saturation: 130, radius: 16, shadow: "light" },
  { name: "模态遮罩", blur: 6, opacity: 0.12, saturation: 100, radius: 24, shadow: "heavy" },
  { name: "提示消息", blur: 20, opacity: 0.1, saturation: 160, radius: 32, shadow: "medium" },
  { name: "右键菜单", blur: 22, opacity: 0.08, saturation: 170, radius: 14, shadow: "heavy" },
  { name: "HUD 面板", blur: 30, opacity: 0.06, saturation: 240, radius: 20, shadow: "medium" },
  { name: "小组件卡片", blur: 12, opacity: 0.05, saturation: 140, radius: 22, shadow: "light" },
  { name: "仪表盘卡片", blur: 8, opacity: 0.04, saturation: 120, radius: 12, shadow: "medium" },
  { name: "极透水晶", blur: 1, opacity: 0.01, saturation: 100, radius: 4, shadow: "light" },
  { name: "轻雾玻璃", blur: 3, opacity: 0.02, saturation: 110, radius: 8, shadow: "light" },
  { name: "晨露", blur: 4, opacity: 0.015, saturation: 120, radius: 10, shadow: "light" },
  { name: "薄纱", blur: 2, opacity: 0.025, saturation: 100, radius: 12, shadow: "light" },
  { name: "冰片", blur: 1, opacity: 0.03, saturation: 90, radius: 6, shadow: "light" },
  { name: "空气玻璃", blur: 0.5, opacity: 0.01, saturation: 100, radius: 8, shadow: "light" },
  { name: "毛玻璃(浅)", blur: 6, opacity: 0.03, saturation: 130, radius: 16, shadow: "medium" },
  { name: "磨砂(浅)", blur: 10, opacity: 0.04, saturation: 140, radius: 20, shadow: "medium" },
]

/* ========== 玻璃卡片组件 (CSS backdrop-filter + 涟漪) ========== */
function GlassCard({ p, style, className, children, onClick }: {
  p: GlassParams; style?: React.CSSProperties; className?: string; children: React.ReactNode; onClick?: () => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty("--rx", `${((e.clientX - r.left) / r.width) * 100}%`)
    el.style.setProperty("--ry", `${((e.clientY - r.top) / r.height) * 100}%`)
  }
  const handleLeave = () => {
    ref.current?.style.removeProperty("--rx")
    ref.current?.style.removeProperty("--ry")
  }
  return (
    <div
      ref={ref}
      className={`glass ${className ?? ""}`}
      style={{
        backdropFilter: `blur(${p.blur}px) saturate(${p.saturation}%)`,
        WebkitBackdropFilter: `blur(${p.blur}px) saturate(${p.saturation}%)`,
        background: `rgba(255, 255, 255, ${p.opacity})`,
        borderRadius: `${p.radius}px`,
        boxShadow: SHADOWS[p.shadow],
        ...style,
      }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onClick={onClick}
    >
      <div className="glass-ripple" />
      {children}
    </div>
  )
}

/* ========== 代码生成 ========== */
function genCSS(p: GlassParams): string {
  return `.glass-card {
  backdrop-filter: blur(${p.blur}px) saturate(${p.saturation}%);
  -webkit-backdrop-filter: blur(${p.blur}px) saturate(${p.saturation}%);
  background: rgba(255, 255, 255, ${p.opacity});
  border-radius: ${p.radius}px;
  box-shadow: ${SHADOWS[p.shadow]};
}`
}
function genTailwind(p: GlassParams): string {
  const sw = p.shadow === "light" ? "shadow-md" : p.shadow === "medium" ? "shadow-lg" : "shadow-2xl"
  return `<div class="backdrop-blur-[${p.blur}px] backdrop-saturate-[${p.saturation}%] bg-white/[${Math.round(p.opacity * 100)}%] rounded-[${p.radius}px] ${sw}">
  ...
</div>`
}
function genReact(p: GlassParams): string {
  return `<div style={{
  backdropFilter: 'blur(${p.blur}px) saturate(${p.saturation}%)',
  WebkitBackdropFilter: 'blur(${p.blur}px) saturate(${p.saturation}%)',
  background: 'rgba(255, 255, 255, ${p.opacity})',
  borderRadius: '${p.radius}px',
  boxShadow: '${SHADOWS[p.shadow]}',
}}>
  ...
</div>`
}

const GEN: Record<string, (p: GlassParams) => string> = { css: genCSS, tailwind: genTailwind, react: genReact }
const FMT: Record<string, string> = { css: "CSS", tailwind: "Tailwind", react: "React" }

/* ========== 背景场景 ========== */
function BgScene({ photo, dim }: { photo: string; dim: boolean }) {
  return (
    <>
      <div className="bg-photo" style={photo ? { backgroundImage: `url(${photo})` } : undefined} />
      <div style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none" }} className={dim ? "bg-scene--dimmed" : ""}>
        <div className="bg-orb bg-orb--1" /><div className="bg-orb bg-orb--2" />
        <div className="bg-orb bg-orb--3" /><div className="bg-orb bg-orb--4" />
        <div className="bg-grid" />
      </div>
    </>
  )
}

/* ========== 工坊面板 ========== */
function Workshop({ p, onChange, open, onClose }: {
  p: GlassParams; onChange: (s: GlassParams) => void; open: boolean; onClose: () => void
}) {
  const [fmt, setFmt] = useState("css")
  const [copied, setCopied] = useState(false)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const dr = useRef({ on: false, sx: 0, sy: 0, px: 0, py: 0 })

  const set = <K extends keyof GlassParams>(k: K, v: GlassParams[K]) => onChange({ ...p, [k]: v })
  const code = GEN[fmt](p)

  const copy = useCallback(async () => {
    try { await navigator.clipboard.writeText(code) } catch { /* ok */ }
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }, [code])

  const dragStart = (e: React.MouseEvent) => {
    dr.current = { on: true, sx: e.clientX, sy: e.clientY, px: pos.x, py: pos.y }
    const mv = (ev: MouseEvent) => { if (!dr.current.on) return; setPos({ x: dr.current.px + ev.clientX - dr.current.sx, y: dr.current.py + ev.clientY - dr.current.sy }) }
    const up = () => { dr.current.on = false; document.removeEventListener("mousemove", mv); document.removeEventListener("mouseup", up) }
    document.addEventListener("mousemove", mv); document.addEventListener("mouseup", up)
  }

  return (
    <div className={`ws-panel ${open ? "open" : ""}`} style={open ? {
      backdropFilter: `blur(${p.blur}px) saturate(${p.saturation}%)`,
      WebkitBackdropFilter: `blur(${p.blur}px) saturate(${p.saturation}%)`,
      background: `rgba(255, 255, 255, ${p.opacity})`,
      borderRadius: `${Math.min(p.radius, 32)}px`,
      boxShadow: SHADOWS[p.shadow],
      transform: `translate(${pos.x}px, ${pos.y}px)`,
    } : undefined}>
      <div className="ws-head" onMouseDown={dragStart}>
        <h2><I.Wand /> 卡片工坊</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: ".6rem", color: "rgba(255,255,255,.2)" }}>拖拽移动</span>
          <I.Grip />
          <button className="ws-close" onClick={onClose}><I.X /></button>
        </div>
      </div>

      <div className="ws-body">
        <div className="ws-section">模糊程度</div>
        <div className="ws-group"><label><span className="name">背景模糊 (blur)</span><span className="val">{p.blur}px</span></label><input className="ws-slider" type="range" min={0} max={48} step={1} value={p.blur} onChange={e => set("blur", +e.target.value)} /></div>

        <div className="ws-section">透明度</div>
        <div className="ws-group"><label><span className="name">玻璃透明度 (opacity)</span><span className="val">{Math.round(p.opacity * 100)}%</span></label><input className="ws-slider" type="range" min={0} max={25} step={1} value={Math.round(p.opacity * 100)} onChange={e => set("opacity", +e.target.value / 100)} /></div>

        <div className="ws-section">色彩</div>
        <div className="ws-group"><label><span className="name">饱和度 (saturation)</span><span className="val">{p.saturation}%</span></label><input className="ws-slider" type="range" min={0} max={300} step={10} value={p.saturation} onChange={e => set("saturation", +e.target.value)} /></div>

        <div className="ws-section">形状</div>
        <div className="ws-group"><label><span className="name">圆角 (radius)</span><span className="val">{p.radius >= 999 ? "胶囊" : `${p.radius}px`}</span></label><input className="ws-slider" type="range" min={0} max={100} step={1} value={Math.min(p.radius, 100)} onChange={e => { const v = +e.target.value; set("radius", v === 100 ? 999 : v) }} /></div>

        <div className="ws-group"><label><span className="name">阴影深度</span><span className="val">{p.shadow}</span></label>
          <div className="ws-radios">
            {(["light", "medium", "heavy"] as const).map(s => (
              <div key={s} className={`ws-radio ${p.shadow === s ? "sel" : ""}`} onClick={() => set("shadow", s)}>
                {s === "light" ? "浅" : s === "medium" ? "中" : "深"}
              </div>
            ))}
          </div>
        </div>

        <div className="ws-section" style={{ marginTop: 8 }}>导出代码</div>
        <div className="ws-tabs">
          {Object.keys(FMT).map(f => <button key={f} className={`ws-tab ${fmt === f ? "sel" : ""}`} onClick={() => setFmt(f)}>{FMT[f]}</button>)}
        </div>
        <div className="ws-code">
          <button className={`ws-copy ${copied ? "done" : ""}`} onClick={copy}>{copied ? "✓ 已复制" : "复制"}</button>
          {code}
        </div>
      </div>
    </div>
  )
}

/* ========== 可拖拽预览卡片 ========== */
function DraggablePreview({ p, visible }: { p: GlassParams; visible: boolean }) {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const cardRef = useRef<HTMLDivElement>(null)
  const dr = useRef({ on: false, sx: 0, sy: 0, px: 0, py: 0 })

  const onStart = (e: React.MouseEvent) => {
    e.stopPropagation()
    dr.current = { on: true, sx: e.clientX, sy: e.clientY, px: pos.x, py: pos.y }
    const mv = (ev: MouseEvent) => { if (!dr.current.on) return; setPos({ x: dr.current.px + ev.clientX - dr.current.sx, y: dr.current.py + ev.clientY - dr.current.sy }) }
    const up = () => { dr.current.on = false; document.removeEventListener("mousemove", mv); document.removeEventListener("mouseup", up) }
    document.addEventListener("mousemove", mv); document.addEventListener("mouseup", up)
  }

  // Center initially, then apply drag offset
  const baseX = typeof window !== "undefined" ? window.innerWidth / 2 : 500
  const baseY = typeof window !== "undefined" ? window.innerHeight / 2 : 400

  return (
    <div
      ref={cardRef}
      className={`preview-card ${visible ? "on" : ""}`}
      style={{
        left: baseX + pos.x,
        top: baseY + pos.y,
        transform: `translate(-50%, -50%)`,
      }}
      onMouseDown={onStart}
    >
      <GlassCard p={p}>
        <div className="preview-inner">
          <h3>✨ 实时预览</h3>
          <p>模糊 {p.blur}px · α {Math.round(p.opacity * 100)}% · 饱和度 {p.saturation}% · 圆角 {p.radius}px</p>
          <p style={{ fontSize: ".7rem", color: "rgba(255,255,255,.25)", marginTop: 4 }}>拖拽可移动</p>
        </div>
      </GlassCard>
    </div>
  )
}

/* ========== 参数展示区 ========== */
function ParamBadge({ p: preset }: { p: Preset }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 10 }}>
      <span style={tagStyle}>模糊:{preset.blur}px</span>
      <span style={tagStyle}>α:{Math.round(preset.opacity * 100)}%</span>
      <span style={tagStyle}>饱和度:{preset.saturation}%</span>
      <span style={tagStyle}>圆角:{preset.radius}px</span>
    </div>
  )
}
const tagStyle: React.CSSProperties = {
  fontSize: ".62rem", fontWeight: 600, padding: "2px 7px", borderRadius: 10,
  background: "rgba(255,255,255,.08)", color: "rgba(255,255,255,.45)", fontFamily: "monospace",
}

function ParamSection({ label, presets }: { label: string; presets: Preset[] }) {
  return (
    <>
      <div className="sec-label">{label}</div>
      <div className="grid-dense">
        {presets.map(p => (
          <GlassCard key={p.name} p={p}>
            <div className="glass-inner" style={{ padding: "20px 22px" }}>
              <div style={{ fontSize: ".85rem", fontWeight: 600, color: "#fff", textShadow: "0 1px 3px rgba(0,0,0,.3)" }}>{p.name}</div>
              <ParamBadge p={p} />
            </div>
          </GlassCard>
        ))}
      </div>
    </>
  )
}

/* ========== 主应用 ========== */
export default function App() {
  const pageRef = useRef<HTMLDivElement>(null)
  const [bg, setBg] = useState("mountains")
  const [wsOpen, setWsOpen] = useState(false)
  const [p, setP] = useState<GlassParams>(DEFAULT_PARAMS)
  const photo = BGS.find(b => b.id === bg)?.full ?? ""

  // 预设参数组用于页面上的展示卡片
  const pSearch: GlassParams = { blur: 16, opacity: 0.04, saturation: 150, radius: 24, shadow: "medium" }
  const pBtn: GlassParams = { blur: 12, opacity: 0.05, saturation: 130, radius: 100, shadow: "medium" }
  const pStat: GlassParams = { blur: 14, opacity: 0.06, saturation: 145, radius: 24, shadow: "light" }
  const pCard: GlassParams = { blur: 18, opacity: 0.05, saturation: 145, radius: 28, shadow: "medium" }
  const pUser: GlassParams = { blur: 14, opacity: 0.05, saturation: 140, radius: 22, shadow: "light" }

  return (
    <>
      <BgScene photo={photo} dim={bg !== ""} />

      {/* ---- 工坊实时预览卡 (可拖拽) ---- */}
      <DraggablePreview p={p} visible={wsOpen} />

      {/* ---- 工坊开关 ---- */}
      <button className={`ws-toggle ${wsOpen ? "on" : ""}`} onClick={() => setWsOpen(!wsOpen)} title="卡片工坊"><I.Wand /></button>

      {/* ---- 工坊面板 ---- */}
      <Workshop p={p} onChange={setP} open={wsOpen} onClose={() => setWsOpen(false)} />

      {/* ========== 页面内容 ========== */}
      <div className="page" ref={pageRef}>
        <header className="header">
          <h1>液态玻璃</h1>
          <p>Apple 风格的磨砂玻璃效果 — 使用 CSS backdrop-filter 实现，跨浏览器兼容。点击右下角 🔮 打开卡片工坊，拖动滑块调节参数，一键导出代码。</p>
        </header>

        {/* 背景切换 */}
        <div className="bg-sw">
          <button className={bg === "" ? "active" : ""} style={{ background: "linear-gradient(135deg, #1a0a2e, #0d1b3e)" }} onClick={() => setBg("")}><span>默认</span></button>
          {BGS.map(b => <button key={b.id} className={bg === b.id ? "active" : ""} style={{ backgroundImage: `url(${b.thumb})` }} onClick={() => setBg(b.id)}><span>{b.label}</span></button>)}
        </div>

        {/* 搜索框 */}
        <div className="sec-label">搜索</div>
        <div className="search-wrap">
          <GlassCard p={pSearch}>
            <div className="glass-inner" style={{ padding: "16px 24px" }}>
              <div className="s-row"><I.Search /><input type="text" placeholder="搜索任何内容…" spellCheck={false} /><span className="s-kbd">⌘K</span></div>
            </div>
          </GlassCard>
        </div>

        {/* 按钮 */}
        <div className="sec-label">按钮</div>
        <div className="btn-row">
          {[["开始使用", <I.Sparkle key="s" />], ["下载", <I.Download key="d" />], ["订阅", <I.Bell key="b" />], ["联系我们", <I.Mail key="m" />]].map(([label, icon]) => (
            <GlassCard key={label as string} p={pBtn} className="glass-btn">
              <div className="glass-inner" style={{ padding: "10px 22px" }}><span className="btn-inner">{icon} {label}</span></div>
            </GlassCard>
          ))}
        </div>

        {/* 统计 */}
        <div className="sec-label">数据统计</div>
        <div className="grid4">
          {[["12.4k", "活跃用户"], ["98.7%", "在线率"], ["¥20.3M", "年收入"], ["4.9 ★", "用户评分"]].map(([val, lbl]) => (
            <GlassCard key={lbl} p={pStat}>
              <div className="glass-inner" style={{ padding: "24px 28px" }}>
                <span className="cc-stat-val">{val}</span><span className="cc-stat-lbl">{lbl}</span>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* 功能特性 */}
        <div className="sec-label">功能特性</div>
        <div className="grid2">
          {[
            ["🚀", "purple", "极速响应", "边缘计算覆盖全球 300+ 节点，毫秒级响应速度。"],
            ["🔒", "blue", "安全默认", "端到端加密、零信任架构，SOC 2 Type II 合规认证。"],
            ["🎨", "pink", "精美设计", "每个像素、每次交互、每个动效都精心打磨。"],
            ["⚡", "teal", "实时同步", "变更即时同步到所有设备，无需手动刷新。"],
            ["📊", "amber", "深度分析", "AI 驱动的可定制仪表盘，洞察关键数据。"],
            ["🧩", "emerald", "开放 API", "GraphQL + REST 双接口，200+ 预置连接器。"],
          ].map(([emoji, ic, title, text]) => (
            <GlassCard key={title as string} p={pCard}>
              <div className="glass-inner" style={{ padding: "28px 28px" }}>
                <span className={`cc-icon ${ic}`}>{emoji}</span>
                <div className="cc-title">{title}</div>
                <div className="cc-text">{text}</div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* 团队成员 */}
        <div className="sec-label">团队成员</div>
        <div className="grid4">
          {[
            ["小水", "av-purple", "小水", "设计主管"],
            ["球球", "av-pink", "球球", "产品经理"],
          ].map(([inits, av, name, role]) => (
            <GlassCard key={name as string} p={pUser}>
              <div className="glass-inner" style={{ padding: "20px 24px" }}>
                <div className="cc-row">
                  <span className={`cc-av ${av}`}>{inits}</span>
                  <div><div className="cc-uname">{name}</div><div className="cc-urole">{role}</div></div>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>

        {/* ====== 参数展示区 ====== */}
        <ParamSection label="参数展示 — 模糊程度渐变" presets={BLUR_SWEEP} />
        <ParamSection label="参数展示 — 透明度渐变" presets={OPACITY_SWEEP} />
        <ParamSection label="参数展示 — 饱和度渐变" presets={SAT_SWEEP} />
        <ParamSection label="参数展示 — 圆角渐变" presets={RADIUS_SWEEP} />
        <ParamSection label="参数展示 — 混合场景组合" presets={MIXED} />
      </div>

      {/* ---- 悬浮底栏 (LiquidGlass 组件) ---- */}
      <div className="float-bar">
        <LiquidGlass displacementScale={45} blurAmount={0.1} saturation={155} aberrationIntensity={2} elasticity={0.12} cornerRadius={100} mouseContainer={pageRef} padding="6px 8px">
          <div className="bar-inner">
            <div className="bar-item active"><I.Home /></div>
            <div className="bar-item"><I.Compass /></div>
            <div className="bar-item"><I.Chart /></div>
            <div className="bar-sep" />
            <div className="bar-item"><I.Heart /></div>
            <div className="bar-item"><I.User /></div>
            <div className="bar-sep" />
            <div className="bar-item"><I.Settings /></div>
          </div>
        </LiquidGlass>
      </div>
    </>
  )
}
