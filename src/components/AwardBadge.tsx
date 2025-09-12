interface AwardBadgeProps {
  title: string;
  color?: string;
  size?: 'small' | 'medium' | 'large';
}

const getContrastColor = (hexColor: string): string => {
  const color = hexColor.replace('#', '');
  const r = parseInt(color.substr(0, 2), 16);
  const g = parseInt(color.substr(2, 2), 16);
  const b = parseInt(color.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128 ? '#000000' : '#FFFFFF';
};

const AwardBadge = ({ title, color = '#FFD700', size = 'medium' }: AwardBadgeProps) => {
  const sizeClasses = {
    small: 'text-xs px-2 py-0.5',
    medium: 'text-base px-4 py-1.5',
    large: 'text-xl px-6 py-2.5',
  };

  const darkerColor = (hexColor: string): string => {
    const color = hexColor.replace('#', '');
    const r = Math.max(0, parseInt(color.substr(0, 2), 16) - 30);
    const g = Math.max(0, parseInt(color.substr(2, 2), 16) - 30);
    const b = Math.max(0, parseInt(color.substr(4, 2), 16) - 30);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };

  const fontWeight = size === 'small' ? 'font-semibold' : size === 'medium' ? 'font-bold' : 'font-extrabold';
  const shadowSize = size === 'small' ? '0 2px 4px' : size === 'medium' ? '0 3px 8px' : '0 4px 12px';
  
  return (
    <div
      className={`inline-flex items-center ${sizeClasses[size]} ${fontWeight} relative`}
      style={{ 
        background: `linear-gradient(135deg, ${color} 0%, ${darkerColor(color)} 100%)`,
        color: getContrastColor(color),
        borderRadius: size === 'small' ? '4px 12px 4px 12px' : size === 'medium' ? '6px 20px 6px 20px' : '8px 24px 8px 24px',
        boxShadow: `${shadowSize} rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)`,
        letterSpacing: size === 'small' ? '0.02em' : size === 'medium' ? '0.03em' : '0.04em',
        textShadow: '0 1px 2px rgba(0,0,0,0.2)',
        border: `1px solid ${darkerColor(color)}`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <span style={{ position: 'relative', zIndex: 2 }}>{title}</span>
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-10%',
        width: '40%',
        height: '200%',
        background: 'rgba(255,255,255,0.1)',
        transform: 'rotate(35deg)',
        pointerEvents: 'none'
      }} />
    </div>
  );
};

export default AwardBadge;