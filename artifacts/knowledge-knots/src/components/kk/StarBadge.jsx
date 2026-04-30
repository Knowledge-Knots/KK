export default function StarBadge({ count, size = 'md' }) {
  const sizes = { sm: 'text-sm px-2 py-1', md: 'text-base px-3 py-1.5', lg: 'text-xl px-4 py-2' };
  return (
    <div className={`inline-flex items-center gap-1.5 bg-kk-yellow rounded-full font-fredoka font-bold text-gray-800 ${sizes[size]}`}>
      ⭐ {count}
    </div>
  );
}