// Inline SVG characters based on the Knowledge Knots character sheet
// These are simplified SVG representations of the blob characters

const characters = {
  star: (size = 60) => (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <polygon points="30,5 36,22 54,22 40,33 45,50 30,40 15,50 20,33 6,22 24,22" fill="#FFD54F"/>
      <circle cx="25" cy="28" r="4" fill="#1a1a1a"/>
      <circle cx="35" cy="28" r="4" fill="#1a1a1a"/>
      <path d="M25 36 Q30 40 35 36" stroke="#1a1a1a" strokeWidth="2" fill="none"/>
    </svg>
  ),
  blob: (color = '#64B5F6', size = 60) => (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <ellipse cx="30" cy="33" rx="22" ry="20" fill={color}/>
      <ellipse cx="30" cy="20" rx="18" ry="16" fill={color}/>
      <circle cx="24" cy="23" r="4" fill="white"/>
      <circle cx="36" cy="23" r="4" fill="white"/>
      <circle cx="25" cy="23" r="2" fill="#1a1a1a"/>
      <circle cx="37" cy="23" r="2" fill="#1a1a1a"/>
      <path d="M25 30 Q30 34 35 30" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  heart: (size = 60) => (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <path d="M30 48 C10 35 5 20 12 13 C17 8 24 9 30 15 C36 9 43 8 48 13 C55 20 50 35 30 48Z" fill="#F06292"/>
      <circle cx="24" cy="27" r="4" fill="white"/>
      <circle cx="36" cy="27" r="4" fill="white"/>
      <circle cx="25" cy="27" r="2" fill="#1a1a1a"/>
      <circle cx="37" cy="27" r="2" fill="#1a1a1a"/>
      <path d="M25 35 Q30 39 35 35" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  square: (color = '#3CB371', size = 60) => (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <rect x="8" y="8" width="44" height="44" rx="8" fill={color}/>
      <circle cx="23" cy="27" r="5" fill="white"/>
      <circle cx="37" cy="27" r="5" fill="white"/>
      <circle cx="24" cy="27" r="2.5" fill="#1a1a1a"/>
      <circle cx="38" cy="27" r="2.5" fill="#1a1a1a"/>
      <path d="M24 36 Q30 40 36 36" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  triangle: (size = 60) => (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <polygon points="30,5 56,52 4,52" fill="#FFD54F"/>
      <circle cx="23" cy="35" r="4.5" fill="white"/>
      <circle cx="37" cy="35" r="4.5" fill="white"/>
      <circle cx="24" cy="35" r="2.5" fill="#1a1a1a"/>
      <circle cx="38" cy="35" r="2.5" fill="#1a1a1a"/>
      <path d="M24 44 Q30 48 36 44" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  ),
  flower: (size = 60) => (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none">
      <circle cx="30" cy="20" r="10" fill="#F06292"/>
      <circle cx="40" cy="28" r="10" fill="#F06292"/>
      <circle cx="20" cy="28" r="10" fill="#F06292"/>
      <circle cx="30" cy="38" r="10" fill="#F06292"/>
      <circle cx="30" cy="28" r="14" fill="#F06292"/>
      <circle cx="25" cy="26" r="4" fill="white"/>
      <circle cx="35" cy="26" r="4" fill="white"/>
      <circle cx="26" cy="26" r="2" fill="#1a1a1a"/>
      <circle cx="36" cy="26" r="2" fill="#1a1a1a"/>
      <path d="M25 33 Q30 37 35 33" stroke="#1a1a1a" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
    </svg>
  ),
};

export default function KKCharacter({ type = 'blob', color, size = 60, className = '', animate = false }) {
  const charFn = characters[type] || characters.blob;
  const acceptsColor = type === 'blob' || type === 'square';
  const char = acceptsColor ? charFn(color, size) : charFn(size);
  return (
    <div className={`inline-block select-none ${animate ? 'animate-bounce-gentle' : ''} ${className}`}>
      {char}
    </div>
  );
}

export { characters };