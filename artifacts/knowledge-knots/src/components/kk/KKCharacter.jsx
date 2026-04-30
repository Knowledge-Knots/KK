// Knowledge Knots character mascots, rendered from PNG assets.
// Available types: blob (blue, reading), square (purple, on books),
// flower (turquoise), star (green star). triangle/heart fall back to star/flower.

const BASE = import.meta.env.BASE_URL;

const characterMap = {
  blob: `${BASE}characters/blob.png`,
  square: `${BASE}characters/square.png`,
  flower: `${BASE}characters/flower.png`,
  star: `${BASE}characters/star.png`,
  // Friendly fallbacks for older usage in the app
  triangle: `${BASE}characters/star.png`,
  heart: `${BASE}characters/flower.png`,
};

const altMap = {
  blob: 'Blue blob mascot reading a book',
  square: 'Purple mascot sitting on a stack of books',
  flower: 'Turquoise flower mascot',
  star: 'Green star mascot winking',
  triangle: 'Green star mascot',
  heart: 'Turquoise flower mascot',
};

export default function KKCharacter({
  type = 'blob',
  size = 60,
  className = '',
  animate = false,
  // `color` is accepted for backward compatibility with old callers but
  // ignored — the PNGs already carry the brand colors.
  // eslint-disable-next-line no-unused-vars
  color,
}) {
  const src = characterMap[type] || characterMap.blob;
  const alt = altMap[type] || 'Knowledge Knots mascot';
  return (
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      style={{ width: size, height: size, objectFit: 'contain' }}
      draggable={false}
      className={`inline-block select-none ${animate ? 'animate-bounce-gentle' : ''} ${className}`}
    />
  );
}
