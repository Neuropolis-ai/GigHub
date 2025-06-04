export default function CriticalCSS() {
  return (
    <>
      {/* Resource Hints для улучшения производительности */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://media.theresanaiforthat.com" />
      <link rel="preconnect" href="https://f55ed2adb1bb673919f5f8189e32d3a1.cdn.bubble.io" />
      
      {/* DNS prefetch для внешних ресурсов */}
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
      <link rel="dns-prefetch" href="//mc.yandex.ru" />
      
      {/* Critical CSS для above-the-fold контента */}
      <style dangerouslySetInnerHTML={{
        __html: `
          /* Critical styles для первого экрана */
          .text-gradient {
            background: linear-gradient(135deg, #8B5CF6, #3B82F6);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
          }
          
          /* Optimized animations */
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-fade-in-up {
            animation: fadeInUp 0.6s ease-out;
          }
          
          /* Preload hero section styles */
          .hero-gradient {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
          
          /* Optimized card hover effects */
          .service-card {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            will-change: transform;
          }
          
          .service-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          }
          
          /* Skeleton loading */
          .skeleton {
            background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
            background-size: 200% 100%;
            animation: loading 1.5s infinite;
          }
          
          @keyframes loading {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
          
          /* Optimize font loading */
          .font-display-swap {
            font-display: swap;
          }
        `
      }} />
      
      {/* Preload key resources */}
      <link rel="preload" href="/hero-bg.webp" as="image" type="image/webp" />
      <link rel="preload" href="/icon-192x192.png" as="image" type="image/png" />
    </>
  )
} 