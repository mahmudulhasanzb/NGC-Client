/**
 * Normalizes and extracts clean embed src URLs from raw inputs
 * Supports:
 * - Direct iframe code snippets (<iframe src="..."></iframe>)
 * - YouTube watch links (youtube.com/watch?v=..., youtu.be/...)
 * - Facebook video embed links & direct video URLs
 * - Vimeo, Dailymotion, or custom embed URLs
 */
export function formatEmbedUrl(input: string, autoplay: boolean = false): string {
  if (!input) return '';
  const trimmed = input.trim();
  let url = trimmed;

  // 1. If user pasted a complete <iframe> tag
  const iframeMatch = trimmed.match(/src=["']([^"']+)["']/i);
  if (iframeMatch && iframeMatch[1]) {
    url = iframeMatch[1];
  } else {
    // 2. If standard YouTube watch URL or youtu.be short link
    const ytWatchMatch = trimmed.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([\w-]{11})/,
    );
    if (ytWatchMatch && ytWatchMatch[1]) {
      url = `https://www.youtube.com/embed/${ytWatchMatch[1]}`;
    } else if (
      trimmed.includes('facebook.com') &&
      !trimmed.includes('facebook.com/plugins/video.php')
    ) {
      // 3. If Facebook video URL
      url = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
        trimmed,
      )}&show_text=0`;
    } else if (trimmed.match(/(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\d+)/)) {
      // 4. If Vimeo standard URL
      const vimeoMatch = trimmed.match(/(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\d+)/);
      if (vimeoMatch && vimeoMatch[1]) {
        url = `https://player.vimeo.com/video/${vimeoMatch[1]}`;
      }
    }
  }

  // Handle Autoplay parameter if requested
  if (autoplay && url) {
    if (url.includes('youtube.com/embed/')) {
      const sep = url.includes('?') ? '&' : '?';
      if (!url.includes('autoplay=')) {
        url = `${url}${sep}autoplay=1`;
      }
    } else if (url.includes('facebook.com/plugins/video.php')) {
      const sep = url.includes('?') ? '&' : '?';
      if (!url.includes('autoplay=')) {
        url = `${url}${sep}autoplay=true`;
      }
    } else if (url.includes('vimeo.com/video/')) {
      const sep = url.includes('?') ? '&' : '?';
      if (!url.includes('autoplay=')) {
        url = `${url}${sep}autoplay=1`;
      }
    }
  }

  return url;
}
