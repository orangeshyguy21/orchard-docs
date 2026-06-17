import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import tailwindcss from '@tailwindcss/vite';
import icon from 'astro-icon';

// Production URL — drives canonical links, the auto-generated sitemap, and the
// absolute OG image URL below. Cloudflare Pages serves the built `dist/` from
// the edge; this is a fully static site (no SSR/adapter).
const site = 'https://docs.orchard.space';

export default defineConfig({
  site,
  integrations: [
    starlight({
      title: 'Orchard Docs',
      description:
        'Documentation for Orchard — the all-in-one Cashu mint manager. Guides for setting up and running your own sovereign bank in cyberspace.',
      // i18n is intentionally OFF while the docs are still being authored:
      // English is the single source of truth, served from the root. Locales and
      // translations get re-introduced in one pass once content is frozen — see
      // AGENTS.md "Localization (deferred)". Don't re-add `locales` without the
      // translated pages, or non-English routes fall back to English silently.
      logo: {
        src: './src/assets/orchard-logo.svg',
        alt: 'Orchard',
      },
      favicon: '/favicon.ico',
      // Carries over the marketing site's palette, fonts, and warm dark theme.
      customCss: ['./src/styles/orchard.css'],
      // Custom header chrome: the official "ORCHARD DOCS" wordmark in place of
      // the text title, and Orchard's own "nostrich" mark for the Nostr link.
      components: {
        SiteTitle: './src/components/SiteTitle.astro',
        SocialIcons: './src/components/SocialIcons.astro',
      },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/cashubtc/orchard' },
        {
          icon: 'nostr',
          label: 'Nostr',
          href: 'https://primal.net/p/npub10rchardds5s08quj9rlpfc2a5dkdqtmcwwyxnyn32wgqrpzglxsssjyujv',
        },
        { icon: 'x.com', label: 'X', href: 'https://x.com/CashuOrchard' },
      ],
      // Surfaced by Starlight's built-in (Pagefind) search and a11y tooling.
      // 'index' is the root Overview page. When locales return, restore the
      // per-item `translations` labels here (see AGENTS.md "Localization").
      sidebar: [
        { label: 'Overview', slug: 'index' },
        {
          label: 'New Mint',
          items: [
            { label: 'Overview', slug: 'new-mint' },
            { label: 'Bitcoin Node', slug: 'new-mint/bitcoin-node' },
            { label: 'Lightning Node', slug: 'new-mint/lightning-node' },
            { label: 'Cashu Mint', slug: 'new-mint/mint' },
            { label: 'Orchard', slug: 'new-mint/orchard' },
          ],
        },
        {
          label: 'Existing Mint',
          items: [
            { label: 'Overview', slug: 'existing-mint' },
            { label: 'Bitcoin Core', slug: 'existing-mint/bitcoin-core' },
            { label: 'Lightning: LND or CLN', slug: 'existing-mint/lightning' },
            { label: 'Mint: Nutshell or CDK', slug: 'existing-mint/mint' },
          ],
        },
        {
          label: 'Using Orchard',
          items: [
            { label: 'Overview', slug: 'orchard' },
            { label: 'The Dashboard', slug: 'orchard/dashboard' },
            { label: 'Monitoring & Health', slug: 'orchard/monitoring' },
            { label: 'Configuration', slug: 'orchard/configuration' },
          ],
        },
      ],
      // Starlight emits canonical, og:title/description/type and twitter:card
      // automatically; it does not generate an OG image — supply ours here.
      head: [
        {
          tag: 'meta',
          attrs: { property: 'og:image', content: `${site}/og-image.png` },
        },
        {
          tag: 'meta',
          attrs: { name: 'twitter:image', content: `${site}/og-image.png` },
        },
        // Preload above-the-fold fonts so they fetch in parallel with the
        // document instead of after CSS parses — keeps them off the LCP chain.
        // (Bold stays lazy: it's only used below the fold.)
        ...['/fonts/bai-jamjuree/BaiJamjuree-Regular.woff2', '/fonts/bai-jamjuree/BaiJamjuree-SemiBold.woff2', '/fonts/tarotheque/Tarotheque.woff2'].map(
          (href) => ({
            tag: 'link',
            attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href, crossorigin: 'anonymous' },
          }),
        ),
      ],
      lastUpdated: true,
    }),
    icon(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
