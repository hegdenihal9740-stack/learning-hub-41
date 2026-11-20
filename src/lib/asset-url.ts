// Local Vite has no Lovable asset proxy; use the project's asset-serving origin there.
export function assetUrl(path: string, local = import.meta.env.DEV) {
  return local && path.startsWith('/__l5e/assets-v1/')
    ? `https://id-preview--ea02177b-886a-482a-8774-09f67aae60dc.lovable.app${path}`
    : path;
}