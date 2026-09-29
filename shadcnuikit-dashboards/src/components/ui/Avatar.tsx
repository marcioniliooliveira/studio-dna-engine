import * as React from "react";

export function Avatar({ src, alt, fallback, className = "" }: { src?: string; alt?: string; fallback: string; className?: string }) {
  const [error, setError] = React.useState(false);
  return (
    <div className={`relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full border border-border/50 bg-muted items-center justify-center font-medium text-xs text-muted-foreground ${className}`}>
      {src && !error ? (
        <img src={src} alt={alt || "Avatar"} onError={() => setError(true)} className="aspect-square h-full w-full object-cover" />
      ) : (
        <span>{fallback}</span>
      )}
    </div>
  );
}
