/** Snowflake mark as a standalone SVG string - shared by OG + apple-icon image routes. */
export function markSvg(px = 200): string {
  const arms = [0, 60, 120, 180, 240, 300]
    .map(
      (d) =>
        `<g transform="rotate(${d} 24 24)"><line x1="24" y1="24" x2="24" y2="9.5"/><line x1="24" y1="13.5" x2="27.6" y2="10.2"/><line x1="24" y1="13.5" x2="20.4" y2="10.2"/></g>`,
    )
    .join("");
  return `<svg width="${px}" height="${px}" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="g" x1="6" y1="4" x2="42" y2="44" gradientUnits="userSpaceOnUse"><stop stop-color="#1593d6"/><stop offset="1" stop-color="#0e3a5c"/></linearGradient></defs><rect x="2" y="2" width="44" height="44" rx="13" fill="url(#g)"/><g stroke="#fff" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round">${arms}</g><circle cx="24" cy="24" r="2.6" fill="#33c9e0"/></svg>`;
}

export function markDataUri(px = 200): string {
  return `data:image/svg+xml;base64,${Buffer.from(markSvg(px)).toString("base64")}`;
}
