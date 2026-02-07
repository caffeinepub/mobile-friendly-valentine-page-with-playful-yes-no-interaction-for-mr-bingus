import { useState, useRef, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface Emoji {
  id: number;
  x: number;
  y: number;
}

export default function App() {
  const [answered, setAnswered] = useState(false);
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const noButtonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const emojiIdRef = useRef(0);

  useEffect(() => {
    // Center the No button initially
    if (noButtonRef.current && containerRef.current) {
      const container = containerRef.current.getBoundingClientRect();
      const button = noButtonRef.current.getBoundingClientRect();
      setNoButtonPosition({
        x: (container.width - button.width) / 2,
        y: 0
      });
    }
  }, []);

  const handleNoInteraction = (e: React.PointerEvent | React.MouseEvent) => {
    e.preventDefault();
    
    if (!noButtonRef.current || !containerRef.current) return;

    const container = containerRef.current.getBoundingClientRect();
    const button = noButtonRef.current.getBoundingClientRect();
    
    // Calculate safe bounds for the button
    const maxX = container.width - button.width - 20;
    const maxY = container.height - button.height - 20;
    
    // Generate random position within safe bounds
    const newX = Math.random() * maxX;
    const newY = Math.random() * maxY;
    
    setNoButtonPosition({ x: newX, y: newY });
    
    // Spawn multiple 🥺 emojis at random positions
    const newEmojis: Emoji[] = [];
    for (let i = 0; i < 5; i++) {
      newEmojis.push({
        id: emojiIdRef.current++,
        x: Math.random() * (container.width - 40),
        y: Math.random() * (container.height - 40)
      });
    }
    setEmojis(prev => [...prev, ...newEmojis]);
    
    // Remove emojis after animation
    setTimeout(() => {
      setEmojis(prev => prev.filter(emoji => !newEmojis.find(e => e.id === emoji.id)));
    }, 2000);
  };

  const handleYes = () => {
    setAnswered(true);
  };

  if (answered) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 overflow-hidden">
        <div className="success-card w-full max-w-md text-center space-y-6 animate-fade-in">
          <div className="space-y-4">
            <div className="flex justify-center">
              <Heart className="w-16 h-16 text-valentine-primary animate-pulse-heart" fill="currentColor" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-valentine-primary">
              aww good choice 🥰
            </h1>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl border-4 border-valentine-primary/20">
            <img 
              src="/assets/generated/valentine-yes-meme.dim_1024x1024.png" 
              alt="Cute Valentine meme"
              className="w-full h-auto"
            />
          </div>
          <div className="flex justify-center gap-2">
            <Heart className="w-6 h-6 text-valentine-accent animate-bounce" fill="currentColor" style={{ animationDelay: '0ms' }} />
            <Heart className="w-6 h-6 text-valentine-primary animate-bounce" fill="currentColor" style={{ animationDelay: '150ms' }} />
            <Heart className="w-6 h-6 text-valentine-accent animate-bounce" fill="currentColor" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating hearts background */}
      <div className="hearts-background">
        {[...Array(15)].map((_, i) => (
          <Heart 
            key={i}
            className="floating-heart"
            fill="currentColor"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Emoji pops */}
      {emojis.map(emoji => (
        <div
          key={emoji.id}
          className="emoji-pop"
          style={{
            left: `${emoji.x}px`,
            top: `${emoji.y}px`
          }}
        >
          🥺
        </div>
      ))}

      {/* Main card */}
      <div className="valentine-card w-full max-w-md text-center space-y-8 relative z-10">
        <div className="space-y-4">
          <div className="flex justify-center">
            <Heart className="w-20 h-20 text-valentine-primary animate-pulse-heart" fill="currentColor" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-valentine-primary leading-tight">
            Mr. Bingus,
            <br />
            will you be my Valentine?
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center relative">
          <button
            onClick={handleYes}
            className="valentine-button valentine-button-yes"
          >
            <Heart className="w-5 h-5" fill="currentColor" />
            Yes! 💕
          </button>

          <button
            ref={noButtonRef}
            onPointerEnter={handleNoInteraction}
            onPointerDown={handleNoInteraction}
            onMouseEnter={handleNoInteraction}
            className="valentine-button valentine-button-no"
            style={{
              position: 'absolute',
              left: `${noButtonPosition.x}px`,
              top: `${noButtonPosition.y}px`,
              transition: 'all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55)'
            }}
          >
            No
          </button>
        </div>

        <div className="flex justify-center gap-2 pt-4">
          <Heart className="w-4 h-4 text-valentine-accent" fill="currentColor" />
          <Heart className="w-4 h-4 text-valentine-primary" fill="currentColor" />
          <Heart className="w-4 h-4 text-valentine-accent" fill="currentColor" />
        </div>
      </div>

      {/* Footer */}
      <footer className="absolute bottom-4 left-0 right-0 text-center text-sm text-valentine-muted z-10">
        © 2026. Built with <Heart className="inline w-3 h-3 text-valentine-primary" fill="currentColor" /> using{' '}
        <a href="https://caffeine.ai" target="_blank" rel="noopener noreferrer" className="hover:text-valentine-primary transition-colors">
          caffeine.ai
        </a>
      </footer>
    </div>
  );
}
