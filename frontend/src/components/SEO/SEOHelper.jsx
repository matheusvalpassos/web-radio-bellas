import React from 'react';
import { Helmet } from 'react-helmet-async';

/**
 * Componente dinâmico que injeta tags de SEO no Head do App React.
 * Projetado para conversar com a view de SeoMetadataViewSet do DRF.
 */
export default function SEOHelper({ title, description, ogImage, keywords, twitterCard = "summary_large_image" }) {
    const siteName = "Radio Bellas";
    const finalTitle = title ? `${title} | ${siteName}` : siteName;

    return (
        <Helmet>
            <title>{finalTitle}</title>
            <meta name="description" content={description || "Plataforma de gestão inteligente para lojas."} />
            <meta name="keywords" content={keywords || "radio, marketing, lojas"} />
            
            {/* Open Graph Tags para Social Media Sharing */}
            <meta property="og:title" content={finalTitle} />
            <meta property="og:description" content={description} />
            {ogImage && <meta property="og:image" content={ogImage} />}
            <meta property="og:type" content="website" />
            <meta property="og:site_name" content={siteName} />

            {/* Twitter Tags */}
            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:title" content={finalTitle} />
            <meta name="twitter:description" content={description} />
            {ogImage && <meta name="twitter:image" content={ogImage} />}
        </Helmet>
    );
}
