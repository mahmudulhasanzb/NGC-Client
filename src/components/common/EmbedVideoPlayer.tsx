'use client';

import React, { useMemo } from 'react';

interface EmbedVideoPlayerProps {
  embedCode: string;
  autoplay?: boolean;
  className?: string;
}

export const EmbedVideoPlayer: React.FC<EmbedVideoPlayerProps> = ({
  embedCode,
  autoplay = false,
  className = '',
}) => {
  const processedHtml = useMemo(() => {
    if (!embedCode || !embedCode.trim()) return '';
    let code = embedCode.trim();

    // 1. If it's a full <iframe> embed tag (from YouTube, Facebook, Vimeo, etc.)
    if (code.toLowerCase().includes('<iframe')) {
      // Ensure proper media permissions exist
      if (!code.includes('allow=')) {
        code = code.replace(
          /<iframe/i,
          '<iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen',
        );
      }

      // If autoplay on modal open is enabled, inject autoplay parameter into the src
      if (autoplay) {
        code = code.replace(/src=["']([^"']+)["']/i, (match, src) => {
          if (src.includes('autoplay=')) return match;
          const sep = src.includes('?') ? '&' : '?';
          if (src.includes('facebook.com')) {
            return `src="${src}${sep}autoplay=true"`;
          }
          return `src="${src}${sep}autoplay=1"`;
        });
      }
      return code;
    }

    // 2. If user pasted a direct embed URL instead of full <iframe> tag
    const sep = code.includes('?') ? '&' : '?';
    const finalSrc =
      autoplay && !code.includes('autoplay=')
        ? `${code}${sep}autoplay=1`
        : code;

    return `<iframe src="${finalSrc}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen class="w-full h-full border-0"></iframe>`;
  }, [embedCode, autoplay]);

  if (!processedHtml) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-black text-xs text-white/60">
        No video embed code provided
      </div>
    );
  }

  return (
    <div
      className={`relative h-full w-full overflow-hidden [&_iframe]:h-full [&_iframe]:w-full [&_iframe]:border-0 ${className}`}
      dangerouslySetInnerHTML={{ __html: processedHtml }}
    />
  );
};
