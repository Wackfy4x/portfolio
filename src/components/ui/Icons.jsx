/**
 * Icons — bibliothèque d'icônes SVG interne
 * Style Lucide (stroke) pour l'UI + icônes tech colorées pour les skills
 *
 * Usage UI  : <Icon name="github" size={16} />
 * Usage tech: <TechIcon name="React JS" size={28} />
 */

/* ═══════════════════════════════════════════
   ICÔNES UI — stroke style (Lucide-like)
   ═══════════════════════════════════════════ */
const UI_ICONS = {
  github: (
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
  ),
  gitlab: (
    <path d="m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83z"/>
  ),
  linkedin: (
    <>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect width="4" height="12" x="2" y="9"/>
      <circle cx="4" cy="4" r="2"/>
    </>
  ),
  twitter: (
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
  ),
  externalLink: (
    <>
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
      <polyline points="15 3 21 3 21 9"/>
      <line x1="10" x2="21" y1="14" y2="3"/>
    </>
  ),
  x: (
    <>
      <path d="M18 6 6 18"/>
      <path d="m6 6 12 12"/>
    </>
  ),
  chevronLeft:  <polyline points="15 18 9 12 15 6"/>,
  chevronRight: <polyline points="9 18 15 12 9 6"/>,
  chevronDown:  <polyline points="6 9 12 15 18 9"/>,
  chevronUp:    <polyline points="18 15 12 9 6 15"/>,
  arrowUpRight: (
    <>
      <path d="M7 17 17 7"/>
      <path d="M7 7h10v10"/>
    </>
  ),
  menu: (
    <>
      <line x1="4" x2="20" y1="6"  y2="6"/>
      <line x1="4" x2="20" y1="12" y2="12"/>
      <line x1="4" x2="20" y1="18" y2="18"/>
    </>
  ),
  mail: (
    <>
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </>
  ),
  phone: (
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 9.81a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 2 0h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L6.09 7.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 14.92v1z"/>
  ),
  mapPin: (
    <>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
      <circle cx="12" cy="10" r="3"/>
    </>
  ),
  send: (
    <>
      <path d="m22 2-7 20-4-9-9-4Z"/>
      <path d="M22 2 11 13"/>
    </>
  ),
  star: (
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  ),
  trophy: (
    <>
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
      <path d="M4 22h16"/>
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
    </>
  ),
  zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
  images: (
    <>
      <path d="M18 22H4a2 2 0 0 1-2-2V6"/>
      <path d="m22 13-1.296-1.296a2.41 2.41 0 0 0-3.408 0L11 18"/>
      <circle cx="12" cy="8" r="2"/>
      <rect width="16" height="16" x="6" y="2" rx="2"/>
    </>
  ),
  maximize2: (
    <>
      <polyline points="15 3 21 3 21 9"/>
      <polyline points="9 21 3 21 3 15"/>
      <line x1="21" x2="14" y1="3" y2="10"/>
      <line x1="3" x2="10" y1="21" y2="14"/>
    </>
  ),
  layers: (
    <>
      <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83Z"/>
      <path d="m22 17.65-9.17 4.16a2 2 0 0 1-1.66 0L2 17.65"/>
      <path d="m22 12.65-9.17 4.16a2 2 0 0 1-1.66 0L2 12.65"/>
    </>
  ),
  download: (
    <>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" x2="12" y1="15" y2="3"/>
    </>
  ),
  checkCircle: (
    <>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </>
  ),
  calendar: (
    <>
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
      <line x1="16" x2="16" y1="2" y2="6"/>
      <line x1="8"  x2="8"  y1="2" y2="6"/>
      <line x1="3"  x2="21" y1="10" y2="10"/>
    </>
  ),
  briefcase: (
    <>
      <rect width="20" height="14" x="2" y="7" rx="2" ry="2"/>
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="8" r="6"/>
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/>
    </>
  ),
  globe: (
    <>
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" x2="22" y1="12" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </>
  ),
};

/* ═══════════════════════════════════════════
   ICÔNES TECH — SVG filled/colorées
   ═══════════════════════════════════════════ */
const TECH_DEFS = {
  java: {
    color: '#f89820',
    svg: (
      <>
        <path fill="#5382a1" d="M8.851 18.56s-.917.534.653.714c1.902.218 2.874.187 4.969-.211 0 0 .552.346 1.321.646-4.699 2.013-10.633-.118-6.943-1.149M8.276 15.933s-1.028.761.542.924c2.032.209 3.636.227 6.413-.308 0 0 .384.389.987.602-5.679 1.661-12.007.13-7.942-1.218"/>
        <path fill="#e76f00" d="M13.116 11.475c1.158 1.333-.304 2.533-.304 2.533s2.939-1.518 1.589-3.418c-1.261-1.772-2.228-2.652 3.007-5.688 0-.001-8.216 2.051-4.292 6.573"/>
        <path fill="#5382a1" d="M19.33 20.504s.679.559-.747.991c-2.712.822-11.288 1.07-13.669.033-.856-.373.75-.89 1.254-.998.527-.114.828-.093.828-.093-.953-.671-6.156 1.317-2.643 1.887 9.58 1.553 17.462-.7 14.977-1.82M9.292 13.21s-4.362 1.036-1.544 1.412c1.189.159 3.561.123 5.77-.062 1.806-.152 3.618-.477 3.618-.477s-.637.272-1.098.587c-4.429 1.165-12.986.623-10.522-.568 2.082-1.006 3.776-.892 3.776-.892M17.116 17.584c4.503-2.34 2.421-4.589.968-4.285-.355.074-.515.138-.515.138s.132-.207.385-.297c2.875-1.011 5.086 2.981-.928 4.562 0-.001.07-.062.09-.118"/>
        <path fill="#e76f00" d="M14.401 0s2.494 2.494-2.365 6.33c-3.896 3.077-.888 4.832-.001 6.836-2.274-2.053-3.943-3.858-2.824-5.539 1.644-2.469 6.197-3.665 5.19-7.627"/>
        <path fill="#5382a1" d="M9.734 23.924c4.322.277 10.959-.153 11.116-2.19 0 0-.302.775-3.572 1.39-3.688.694-8.239.613-10.937.168 0-.001.553.457 3.393.632"/>
      </>
    ),
  },
  python: {
    color: '#3776ab',
    svg: (
      <>
        <path fill="#3776ab" d="M11.914 0C5.82 0 6.2 2.656 6.2 2.656l.007 2.752h5.814v.826H3.887S0 5.789 0 11.969c0 6.18 3.403 5.96 3.403 5.96h2.031v-2.867s-.109-3.402 3.35-3.402h5.769s3.24.052 3.24-3.13V3.13S18.29 0 11.914 0zm-3.21 1.814a1.054 1.054 0 1 1 0 2.109 1.054 1.054 0 0 1 0-2.109z"/>
        <path fill="#ffd43b" d="M12.086 24c6.094 0 5.714-2.656 5.714-2.656l-.007-2.752h-5.814v-.826h8.134S24 18.211 24 12.031c0-6.18-3.403-5.96-3.403-5.96h-2.031v2.867s.109 3.402-3.35 3.402H9.447s-3.24-.052-3.24 3.13V20.87S5.71 24 12.086 24zm3.21-1.814a1.054 1.054 0 1 1 0-2.109 1.054 1.054 0 0 1 0 2.109z"/>
      </>
    ),
  },
  nodejs: {
    color: '#339933',
    svg: (
      <path fill="#339933" d="M11.998.008a1.333 1.333 0 0 0-.664.176L2.57 5.26A1.333 1.333 0 0 0 1.9 6.408v10.184a1.333 1.333 0 0 0 .668 1.152l8.764 5.076a1.333 1.333 0 0 0 1.332 0l8.764-5.076a1.333 1.333 0 0 0 .668-1.152V6.408a1.333 1.333 0 0 0-.668-1.148L12.662.184A1.333 1.333 0 0 0 11.998.008zm-.004 2.032 7.328 4.236v8.448l-7.328 4.244-7.328-4.244V6.276zM8.884 8.46c-1.636 0-2.58.692-2.58 1.848 0 1.252.96 1.6 2.58 1.756 1.704.16 1.836.4 1.836.72 0 .556-.448.792-1.5.792-1.32 0-1.608-.332-1.704-1h-1.44c.096 1.396.876 1.984 3.144 1.984 1.884 0 2.952-.744 2.952-2.024 0-1.276-.876-1.616-2.724-1.852-1.14-.14-1.692-.236-1.692-.648 0-.38.348-.596 1.128-.596 1.044 0 1.296.356 1.38.908h1.404c-.132-1.272-.908-1.888-2.784-1.888zm4.668.12v5.84h2.676c1.884 0 2.772-.876 2.772-2.94 0-2.04-.9-2.9-2.832-2.9zm1.452 1.168h1.08c1.056 0 1.476.492 1.476 1.748 0 1.284-.408 1.756-1.452 1.756h-1.104z"/>
    ),
  },
  django: {
    color: '#092e20',
    svg: (
      <>
        <rect width="24" height="24" rx="3" fill="#092e20"/>
        <path fill="#fff" d="M11.591 4h2.769v13.8c-1.423.27-2.465.378-3.601.378-3.384 0-5.157-1.53-5.157-4.461 0-2.822 1.881-4.65 4.8-4.65.455 0 .8.035 1.189.143zm0 7.52c-.322-.108-.587-.143-.935-.143-1.413 0-2.227.863-2.227 2.38 0 1.476.775 2.285 2.2 2.285.305 0 .557-.028.962-.09zM17.396 4.961V16.04c0 3.834-2.832 5.264-6.926 5.264-1.449 0-2.76-.2-4.099-.627l.566-2.156c1.143.444 2.167.618 3.416.618 2.578 0 4.274-1.2 4.274-3.492v-.778c-.88.52-1.851.76-2.975.76-2.783 0-4.638-2.107-4.638-5.279 0-3.294 1.944-5.491 4.815-5.491 1.2 0 2.2.346 3.094.988zm-2.769 6.985V7.2a3.2 3.2 0 0 0-1.8-.54c-1.655 0-2.72 1.28-2.72 3.386 0 2.013.985 3.198 2.645 3.198.672 0 1.267-.2 1.875-.698z"/>
      </>
    ),
  },
  flask: {
    color: '#aaaaaa',
    svg: (
      <>
        <path fill="#aaa" d="M14.76 21.47a.86.86 0 0 1-.86.53H10.1a.86.86 0 0 1-.86-.53L3.81 6.97H5.4l5.22 13.96h2.76L18.6 6.97h1.59z"/>
        <circle cx="17" cy="4.67" r="1.24" fill="#aaa"/>
        <circle cx="9.33" cy="3.1" r=".63" fill="#aaa"/>
      </>
    ),
  },
  react: {
    color: '#61dafb',
    svg: (
      <>
        <circle cx="12" cy="12" r="2.05" fill="#61dafb"/>
        <ellipse cx="12" cy="12" rx="10.5" ry="3.8" fill="none" stroke="#61dafb" strokeWidth="1"/>
        <ellipse cx="12" cy="12" rx="10.5" ry="3.8" fill="none" stroke="#61dafb" strokeWidth="1" transform="rotate(60 12 12)"/>
        <ellipse cx="12" cy="12" rx="10.5" ry="3.8" fill="none" stroke="#61dafb" strokeWidth="1" transform="rotate(120 12 12)"/>
      </>
    ),
  },
  angular: {
    color: '#dd0031',
    svg: (
      <>
        <path fill="#dd0031" d="M12 2L2 6.5l1.5 12L12 22l8.5-3.5L22 6.5z"/>
        <path fill="#c3002f" d="M12 2v20l8.5-3.5L22 6.5z"/>
        <path fill="#fff" d="M12 5.5L7 16h1.9l1-2.5h4.2l1 2.5H17zm0 3.3 1.6 3.7H10.4z"/>
      </>
    ),
  },
  typescript: {
    color: '#3178c6',
    svg: (
      <>
        <rect width="24" height="24" rx="3" fill="#3178c6"/>
        <path fill="#fff" d="M9.86 13.36h2.17v5.64h1.94v-5.64h2.17V11.5H9.86zM19.5 14.67c-.48-1.04-1.5-1.27-2.35-1.27-.96 0-2.22.5-2.22 1.72 0 1.04.7 1.55 1.86 1.84l.77.2c.56.13.86.34.86.67 0 .47-.46.73-1.16.73-.7 0-1.2-.3-1.44-.87l-1.53.5c.45 1.19 1.46 1.8 2.97 1.8 1.82 0 3.05-.93 3.05-2.24 0-1.1-.68-1.69-2.12-2.07l-.7-.18c-.55-.14-.74-.33-.74-.63 0-.4.42-.64 1.02-.64.6 0 1 .24 1.2.72z"/>
      </>
    ),
  },
  figma: {
    color: '#f24e1e',
    svg: (
      <>
        <path fill="#f24e1e" d="M8 24c2.21 0 4-1.79 4-4v-4H8c-2.21 0-4 1.79-4 4s1.79 4 4 4z"/>
        <path fill="#ff7262" d="M4 12c0-2.21 1.79-4 4-4h4v8H8c-2.21 0-4-1.79-4-4z"/>
        <path fill="#a259ff" d="M4 4c0-2.21 1.79-4 4-4h4v8H8C5.79 8 4 6.21 4 4z"/>
        <path fill="#1abcfe" d="M12 0h4c2.21 0 4 1.79 4 4s-1.79 4-4 4h-4V0z"/>
        <path fill="#0acf83" d="M20 12c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4z"/>
      </>
    ),
  },
  docker: {
    color: '#2496ed',
    svg: (
      <>
        <path fill="#2496ed" d="M4.5 10.5H6.5V8.5H4.5zM7.5 10.5H9.5V8.5H7.5zM10.5 10.5H12.5V8.5H10.5zM13.5 10.5H15.5V8.5H13.5zM10.5 7.5H12.5V5.5H10.5zM13.5 7.5H15.5V5.5H13.5zM13.5 4.5H15.5V2.5H13.5zM7.5 7.5H9.5V5.5H7.5z"/>
        <path fill="#2496ed" d="M21.65 10.27c-.48-.35-1.6-.48-2.45-.3-.1-.8-.56-1.5-1.33-2.1l-.45-.3-.3.45c-.38.6-.5 1.58-.15 2.23a3 3 0 0 1-1.1.27H2.19a.66.66 0 0 0-.65.65c-.03 1.23.19 2.46.7 3.6.54 1.2 1.34 2.1 2.37 2.67 1.16.63 3.04.99 5.16.99.96 0 1.9-.08 2.78-.26a10.7 10.7 0 0 0 3.53-1.52 9.1 9.1 0 0 0 2.4-2.58h.2c1.33 0 2.14-.53 2.59-1 .3-.3.5-.63.61-.94l.09-.33z"/>
      </>
    ),
  },
  git: {
    color: '#f05032',
    svg: (
      <path fill="#f05032" d="M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.608-.406-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"/>
    ),
  },
  kubernetes: {
    color: '#326ce5',
    svg: (
      <>
        <circle cx="12" cy="12" r="10" fill="none" stroke="#326ce5" strokeWidth="1.5"/>
        <path fill="#326ce5" d="M12 5.5L8 9.5l1 1 2.5-2.5V14h1V8l2.5 2.5 1-1zM6 14l4 2v-1.5L7.5 13zM18 14l-4 2v-1.5L16.5 13zM9.5 17.5l2.5-2 2.5 2-1 1.5h-3z"/>
      </>
    ),
  },
  jenkins: {
    color: '#d24939',
    svg: (
      <>
        <circle cx="12" cy="11" r="8" fill="#f0d6b7" stroke="#d24939" strokeWidth="1"/>
        <circle cx="10" cy="9.5" r="1" fill="#333"/>
        <circle cx="14" cy="9.5" r="1" fill="#333"/>
        <path d="M9.5 13c.8 1 4.2 1 5 0" fill="none" stroke="#333" strokeWidth="1" strokeLinecap="round"/>
        <path d="M8 6c0-2 8-2 8 0" fill="none" stroke="#d24939" strokeWidth="1.2"/>
        <path d="M12 19v3M10 22h4" stroke="#d24939" strokeWidth="1.5" strokeLinecap="round"/>
      </>
    ),
  },
  linux: {
    color: '#fcc624',
    svg: (
      <>
        <path fill="#fcc624" d="M12.5 2C9 2 7 5 7 8c0 2.2.9 3.8 2 5l.5 7h6l.5-7c1.1-1.2 2-2.8 2-5 0-3-2-6-5.5-6z"/>
        <circle cx="10" cy="8" r="1" fill="#333"/>
        <circle cx="14" cy="8" r="1" fill="#333"/>
        <path d="M10 11c.7.7 3.3.7 4 0" fill="none" stroke="#333" strokeWidth=".8" strokeLinecap="round"/>
        <path d="M8 20c-1 0-3 .5-3 1.5S7 23 12 23s7-.5 7-1.5S17 20 16 20" fill="none" stroke="#fcc624" strokeWidth="1.5"/>
      </>
    ),
  },
  azure: {
    color: '#0078d4',
    svg: (
      <path fill="#0078d4" d="M13.05 4.06L6.6 18.75H2L8.4 7.8zM13.6 5.52l3.9 10.5H22l-4.97-5.03 1.42-6.16-4.85.69z"/>
    ),
  },
  github_actions: {
    color: '#2088ff',
    svg: (
      <>
        <path fill="#2088ff" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
        <path fill="#fff" d="M10 8l5 4-5 4V8z"/>
      </>
    ),
  },
  postgresql: {
    color: '#336791',
    svg: (
      <>
        <path fill="#336791" d="M17.45 7.28C16.9 4.47 14.83 2 12.02 2c-2.1 0-3.85 1.13-4.95 2.85C5.69 5.3 4.5 5.8 3.6 6.7 2.6 7.7 2 9.1 2 10.5c0 2.67 2 4.84 4.57 5.11L7 15.67V19c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1h1c2.76 0 5-2.24 5-5 0-2.34-1.6-4.3-3.8-4.8l.25-.92zM13 18h-4v-3.5l-.68.07C6.52 14.3 5 12.58 5 10.5c0-.94.37-1.82 1.03-2.48.53-.53 1.23-.86 1.97-.95l.7-.08.29-.64C9.6 5.34 10.72 4.5 12 4.5c1.87 0 3.4 1.6 3.46 3.52L15.5 9h.5c1.65 0 3 1.35 3 3s-1.35 3-3 3H13V18z"/>
      </>
    ),
  },
  mongodb: {
    color: '#47a248',
    svg: (
      <path fill="#47a248" d="M17.18 9.93C17 6.08 14.44 3.19 12.27 2.06c-.16-.09-.37.04-.36.22.1 1.06-.23 1.9-.9 2.67C9.8 6.57 8 8.18 7.51 10.87c-.5 2.8.54 5.26 2.47 6.87l.22.17v.01l.12 3.51s-.01.55.48.54h.01c.5.01.49-.54.49-.54l.12-3.5.22-.17c1.96-1.57 3.04-4.15 2.54-6.83z"/>
    ),
  },
  firebase: {
    color: '#ffca28',
    svg: (
      <>
        <path fill="#ffa000" d="M5.03 17.08L8.16 2.25l5.56 7.26L5.03 17.08z"/>
        <path fill="#f57f17" d="M15.5 11.74L13 9.02 8.16 2.25 5.03 17.08 15.5 11.74z"/>
        <path fill="#ffca28" d="M18.97 14.47L15.5 4.66l-2.5 4.36 5.97 5.45z"/>
        <path fill="#f57f17" d="M5.03 17.08l10.47-5.34 3.47 2.73L5.03 17.08z"/>
      </>
    ),
  },
  neo4j: {
    color: '#4581c3',
    svg: (
      <>
        <circle cx="7"  cy="7"  r="3.5" fill="none" stroke="#4581c3" strokeWidth="1.5"/>
        <circle cx="17" cy="7"  r="3.5" fill="none" stroke="#4581c3" strokeWidth="1.5"/>
        <circle cx="12" cy="17" r="3.5" fill="none" stroke="#4581c3" strokeWidth="1.5"/>
        <line x1="10.5" y1="7" x2="13.5" y2="7"  stroke="#4581c3" strokeWidth="1.5"/>
        <line x1="9"    y1="10" x2="11"   y2="14" stroke="#4581c3" strokeWidth="1.5"/>
        <line x1="15"   y1="10" x2="13"   y2="14" stroke="#4581c3" strokeWidth="1.5"/>
      </>
    ),
  },
  cassandra: {
    color: '#1287b1',
    svg: (
      <>
        <ellipse cx="12" cy="6"  rx="8" ry="2.5" fill="none" stroke="#1287b1" strokeWidth="1.5"/>
        <ellipse cx="12" cy="12" rx="8" ry="2.5" fill="none" stroke="#1287b1" strokeWidth="1.5"/>
        <ellipse cx="12" cy="18" rx="8" ry="2.5" fill="none" stroke="#1287b1" strokeWidth="1.5"/>
        <line x1="4" y1="6" x2="4" y2="18" stroke="#1287b1" strokeWidth="1.5"/>
        <line x1="20" y1="6" x2="20" y2="18" stroke="#1287b1" strokeWidth="1.5"/>
      </>
    ),
  },
  minio: {
    color: '#c72e49',
    svg: (
      <>
        <path fill="#c72e49" d="M3 3h18v18H3z" rx="2"/>
        <path fill="#fff" d="M7 18V8l5 6 5-6v10"/>
      </>
    ),
  },
  tensorflow: {
    color: '#ff6f00',
    svg: (
      <>
        <path fill="#ff6f00" d="M12 2L4 6.5v11L12 22l8-4.5v-11L12 2z"/>
        <path fill="#fff" d="M10 8.5v7l1.5.75V9.25L10 8.5zm4 0L10 6v2.5l4 2V8.5z"/>
      </>
    ),
  },
  powerbi: {
    color: '#f2c811',
    svg: (
      <>
        <rect width="4.5" height="13" x="1.5" y="9.5" rx="1" fill="#f2c811"/>
        <rect width="4.5" height="17" x="9.75" y="5.5" rx="1" fill="#f2c811"/>
        <rect width="4.5" height="22" x="18" y="0.5" rx="1" fill="#f2c811"/>
      </>
    ),
  },
  ollama: {
    color: '#2563eb',
    svg: (
      <>
        <circle cx="12" cy="12" r="10" fill="none" stroke="#2563eb" strokeWidth="1.5"/>
        <circle cx="9.5"  cy="10.5" r="1.5" fill="#2563eb"/>
        <circle cx="14.5" cy="10.5" r="1.5" fill="#2563eb"/>
        <path d="M8.5 15c1 1.5 2.5 2.2 3.5 2.2s2.5-.7 3.5-2.2" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"/>
      </>
    ),
  },
  yolo: {
    color: '#2563eb',
    svg: (
      <>
        <rect width="20" height="20" x="2" y="2" rx="3" fill="none" stroke="#2563eb" strokeWidth="1.5"/>
        <rect width="8" height="8" x="8" y="8" rx="1.5" fill="none" stroke="#2563eb" strokeWidth="1.5"/>
        <line x1="5.5" y1="5.5" x2="8"   y2="8"   stroke="#2563eb" strokeWidth="1.2"/>
        <line x1="18.5" y1="5.5" x2="16"  y2="8"   stroke="#2563eb" strokeWidth="1.2"/>
        <line x1="5.5"  y1="18.5" x2="8"  y2="16"  stroke="#2563eb" strokeWidth="1.2"/>
        <line x1="18.5" y1="18.5" x2="16" y2="16"  stroke="#2563eb" strokeWidth="1.2"/>
      </>
    ),
  },
};

/* ─── Mapping nom JSON (lowercase) → clé TECH_DEFS ─── */
const SKILL_MAP = {
  'java / spring boot':        'java',
  'java':                      'java',
  'spring boot':               'java',
  'python':                    'python',
  'node.js / express js':      'nodejs',
  'node.js / express':         'nodejs',
  'nodejs':                    'nodejs',
  'express':                   'nodejs',
  'django / flask':            'django',
  'django':                    'django',
  'flask':                     'flask',
  'react js':                  'react',
  'react':                     'react',
  'react native':              'react',
  'angular':                   'angular',
  'typescript':                'typescript',
  'figma':                     'figma',
  'figma / chart.js':          'figma',
  'docker':                    'docker',
  'git':                       'git',
  'gitlab ci':                 'git',
  'git / gitlab ci':           'git',
  'github action':             'github_actions',
  'github actions':            'github_actions',
  'azure / gcp':               'azure',
  'azure':                     'azure',
  'gcp':                       'gcp',
  'kubernetes':                'kubernetes',
  'jenkins':                   'jenkins',
  'linux':                     'linux',
  'postgresql':                'postgresql',
  'mongodb':                   'mongodb',
  'mongodb / nosql':           'mongodb',
  'firebase':                  'firebase',
  'neo4j':                     'neo4j',
  'cassandra db':              'cassandra',
  'minio':                     'minio',
  'ia / llm / ollama':         'ollama',
  'ollama':                    'ollama',
  'yolov9 / computer vision':  'yolo',
  'yolov9':                    'yolo',
  'yolo':                      'yolo',
  'tensorflow':                'tensorflow',
  'big data / bi':             'powerbi',
  'power bi':                  'powerbi',
  'nlp / réseaux de neurones': 'tensorflow',
};

/* ═══════════════════════════════════════
   Composant Icon — UI (stroke style)
   ═══════════════════════════════════════ */
export function Icon({
  name,
  size = 18,
  color = 'currentColor',
  strokeWidth = 1.75,
  style = {},
  className = '',
}) {
  const paths = UI_ICONS[name];
  if (!paths) return null;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      className={className}
      aria-hidden="true"
    >
      {paths}
    </svg>
  );
}

/* ═══════════════════════════════════════
   Composant TechIcon — tech (filled/colored)
   Résout automatiquement depuis le nom JSON
   ═══════════════════════════════════════ */
export function TechIcon({ name, size = 28, className = '' }) {
  const key  = (name || '').toLowerCase().trim();
  const tech = TECH_DEFS[SKILL_MAP[key]];

  if (!tech) {
    /* Fallback : hexagone avec initiales */
    const word     = name.split(/[\s/]/)[0] || name;
    const initials = word.slice(0, 2).toUpperCase();
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        aria-hidden="true"
        className={className}
      >
        <polygon
          points="12,2 20.7,7 20.7,17 12,22 3.3,17 3.3,7"
          fill="var(--bg-raised)"
          stroke="var(--border)"
          strokeWidth="1"
        />
        <text
          x="12" y="15.5"
          textAnchor="middle"
          fontSize="7"
          fontFamily="var(--font-display)"
          fontWeight="700"
          fill="var(--accent)"
        >
          {initials}
        </text>
      </svg>
    );
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
    >
      {tech.svg}
    </svg>
  );
}

export default Icon;
