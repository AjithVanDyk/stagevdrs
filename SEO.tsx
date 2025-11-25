import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEOData, generateSEOData } from '../utils/seo';

interface SEOProps {
  data: SEOData;
}

const SEO: React.FC<SEOProps> = ({ data }) => {
  const seoData = generateSEOData(data);
  
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
      <meta property="og:site_name" content="Van Dyk Recycling Solutions" />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={seoData.url} />
      <meta property="twitter:title" content={seoData.title} />
      <meta property="twitter:description" content={seoData.description} />
      <meta property="twitter:image" content={seoData.image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={seoData.url} />
      
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
      
      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": seoData.type === 'article' ? "Article" : "WebPage",
          "headline": seoData.title,
          "description": seoData.description,
          "image": seoData.image,
          "url": seoData.url,
          "publisher": {
            "@type": "Organization",
            "name": "Van Dyk Recycling Solutions",
            "logo": {
              "@type": "ImageObject",
              "url": "https://vdrs.com/Images/VDRS-lockup-mod-8-19-22-350.png"
            }
          },
          ...(seoData.type === 'article' && {
            "author": {
              "@type": "Person",
              "name": seoData.author
            },
            "datePublished": seoData.publishedTime,
            "dateModified": seoData.modifiedTime
          })
        })}
      </script>
    </Helmet>
  );
};

export default SEO;









