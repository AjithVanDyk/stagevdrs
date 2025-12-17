import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import { SEOData, generateSEOData } from '../utils/seo';
import { useLanguage } from '../contexts/LanguageContext';

interface SEOProps {
  data: SEOData;
}

const SEO: React.FC<SEOProps> = ({ data }) => {
  const { language } = useLanguage();
  const location = useLocation();
  const seoData = generateSEOData(data, language, location.pathname);
  
  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seoData.title}</title>
      <meta name="title" content={seoData.title} />
      <meta name="description" content={seoData.description} />
      {seoData.keywords && <meta name="keywords" content={seoData.keywords} />}
      <meta name="robots" content="index, follow" />
      <meta name="author" content={seoData.author} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={seoData.type} />
      <meta property="og:url" content={seoData.url} />
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:image" content={seoData.image} />
      <meta property="og:image:alt" content={seoData.title} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Van Dyk Recycling Solutions" />
      <meta property="og:locale" content={language === 'en' ? 'en_US' : language === 'es' ? 'es_US' : 'fr_CA'} />
      {seoData.hreflangUrls && seoData.hreflangUrls.filter(h => h.lang !== 'x-default').map(({ lang, url }) => (
        <meta key={`og-${lang}`} property="og:locale:alternate" content={lang === 'en' ? 'en_US' : lang === 'es' ? 'es_US' : 'fr_CA'} />
      ))}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={seoData.url} />
      <meta name="twitter:title" content={seoData.title} />
      <meta name="twitter:description" content={seoData.description} />
      <meta name="twitter:image" content={seoData.image} />
      <meta name="twitter:image:alt" content={seoData.title} />
      <meta name="twitter:site" content="@vandykrecycling" />
      <meta name="twitter:creator" content="@vandykrecycling" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={seoData.url} />
      
      {/* hreflang Tags for Multi-Language SEO */}
      {seoData.hreflangUrls && seoData.hreflangUrls.map(({ lang, url }) => (
        <link key={lang} rel="alternate" hreflang={lang} href={url} />
      ))}
      
      {/* Additional Meta Tags for Articles */}
      {seoData.type === 'article' && (
        <>
          {seoData.publishedTime && <meta property="article:published_time" content={seoData.publishedTime} />}
          {seoData.modifiedTime && <meta property="article:modified_time" content={seoData.modifiedTime} />}
          {seoData.author && <meta property="article:author" content={seoData.author} />}
          {seoData.section && <meta property="article:section" content={seoData.section} />}
          {seoData.tags && seoData.tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Structured Data - WebPage */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": seoData.type === 'article' ? "Article" : seoData.type === 'product' ? "Product" : "WebPage",
          "headline": seoData.title,
          "name": seoData.title,
          "description": seoData.description,
          "image": seoData.image,
          "url": seoData.url,
          "inLanguage": language === 'en' ? 'en-US' : language === 'es' ? 'es-US' : 'fr-CA',
          "isPartOf": {
            "@type": "WebSite",
            "name": "Van Dyk Recycling Solutions",
            "url": "https://vdrs.com"
          },
          "publisher": {
            "@type": "Organization",
            "name": "Van Dyk Recycling Solutions",
            "logo": {
              "@type": "ImageObject",
              "url": "https://vdrs.com/Images/VDRS-lockup-mod-8-19-22-350.png",
              "width": 350,
              "height": 100
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-203-967-1100",
              "contactType": "customer service",
              "areaServed": [
                {
                  "@type": "Country",
                  "name": "United States"
                },
                {
                  "@type": "Country",
                  "name": "Canada"
                },
                {
                  "@type": "Country",
                  "name": "Mexico"
                }
              ],
              "availableLanguage": ["English", "Spanish", "French"]
            },
            "sameAs": [
              "https://www.facebook.com/vandykrecycling/",
              "https://linkedin.com/company/van-dyk-recycling-solutions",
              "https://twitter.com/vandykrecycling",
              "https://youtube.com/c/vandykrecycling"
            ],
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Recycling Equipment",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Bollegraaf Balers"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "TOMRA Optical Sorters"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Pellenc ST Optical Sorters"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Product",
                    "name": "Lubo Screening Systems"
                  }
                }
              ]
            }
          },
          ...(seoData.type === 'article' && {
            "author": {
              "@type": "Person",
              "name": seoData.author || "Van Dyk Recycling Solutions"
            },
            "datePublished": seoData.publishedTime,
            "dateModified": seoData.modifiedTime || seoData.publishedTime,
            "articleSection": seoData.section,
            "keywords": seoData.tags?.join(', ')
          }),
          ...(seoData.type === 'product' && {
            "brand": {
              "@type": "Brand",
              "name": "Van Dyk Recycling Solutions"
            },
            "manufacturer": {
              "@type": "Organization",
              "name": "Van Dyk Recycling Solutions"
            }
          })
        })}
      </script>
      
      {/* Breadcrumb Structured Data */}
      {location.pathname !== '/' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://vdrs.com"
              },
              ...(location.pathname.split('/').filter(Boolean).map((segment, index) => ({
                "@type": "ListItem",
                "position": index + 2,
                "name": segment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
                "item": `https://vdrs.com/${location.pathname.split('/').slice(0, index + 2).join('/')}`
              })))
            ]
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;









