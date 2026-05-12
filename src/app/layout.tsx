import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";

import { APP_CONFIG, SEO_CONFIG } from "@/constants/config";
import PageTransition from "@/components/PageTransition";
import ScrollProgress from "@/components/ScrollProgress";
import ScrollToTop from "@/components/ScrollToTop";
import { AccessibilityProvider } from "@/components/AccessibilityProvider";
import AccessibilityControls from "@/components/AccessibilityControls";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const siteJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: APP_CONFIG.name,
  url: APP_CONFIG.url,
  jobTitle: "Frontend Developer",
  email: APP_CONFIG.author.email,
  sameAs: [APP_CONFIG.author.github, APP_CONFIG.author.linkedin],
} as const;

export const metadata: Metadata = {
  metadataBase: new URL(APP_CONFIG.url),
  title: {
    default: SEO_CONFIG.defaultTitle,
    template: SEO_CONFIG.titleTemplate,
  },
  description: SEO_CONFIG.description,
  keywords: [...SEO_CONFIG.keywords],
  authors: [{ name: APP_CONFIG.author.name, url: APP_CONFIG.url }],
  creator: APP_CONFIG.author.name,
  publisher: APP_CONFIG.name,
  openGraph: {
    type: "website",
    locale: SEO_CONFIG.openGraph.locale,
    url: APP_CONFIG.url,
    siteName: SEO_CONFIG.openGraph.siteName,
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.description,
  },
  twitter: {
    card: "summary_large_image",
    title: SEO_CONFIG.defaultTitle,
    description: SEO_CONFIG.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: APP_CONFIG.url,
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#020202" },
    { media: "(prefers-color-scheme: light)", color: "#020202" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} min-h-screen w-full overflow-y-scroll bg-black font-sans antialiased text-white`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(siteJsonLd),
          }}
        />
        <AccessibilityProvider>
          <a
            href="#main-content"
            className="sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:inline-flex focus:h-auto focus:w-auto focus:overflow-visible focus:rounded-md focus:bg-violet-600 focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white focus:not-sr-only"
          >
            Skip to main content
          </a>
          <ScrollProgress />
          <PageTransition>{children}</PageTransition>
          <ScrollToTop />
          <AccessibilityControls />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
