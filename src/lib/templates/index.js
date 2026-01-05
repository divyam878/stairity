// Stairity Template Library
// 5 curated website templates for different industries

export const TEMPLATES = {
  'modern-minimal': {
    name: 'Modern Minimal',
    description: 'Clean and professional design perfect for consultants and professionals',
    preview: '/images/templates/modern-minimal.png',
    structure: `
      <header class="hero">
        <nav class="navbar"></nav>
        <div class="hero-content">
          <h1 class="headline"></h1>
          <p class="subheadline"></p>
          <button class="cta-button"></button>
        </div>
      </header>
      <section class="about">
        <h2 class="section-title"></h2>
        <p class="content"></p>
      </section>
      <section class="features">
        <div class="feature-grid">
          <div class="feature-card"></div>
          <div class="feature-card"></div>
          <div class="feature-card"></div>
        </div>
      </section>
      <section class="cta">
        <h2 class="cta-headline"></h2>
        <p class="cta-subheadline"></p>
        <button class="cta-button"></button>
      </section>
      <footer class="footer"></footer>
    `,
    render: (content) => `
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.seo.title}</title>
  <meta name="description" content="${content.seo.description}">
  <meta name="keywords" content="${content.seo.keywords.join(', ')}">
  
  <!-- Open Graph -->
  <meta property="og:title" content="${content.seo.title}">
  <meta property="og:description" content="${content.seo.description}">
  <meta property="og:type" content="website">
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
  
  <!-- Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Poppins', 'sans-serif'],
          },
          colors: {
            'stairity-teal': '#ACD9D9',
            'stairity-pink': '#FFE5E5',
            'stairity-lavender': '#E5D4FF',
            'stairity-gray': '#F6F6F6',
            'stairity-purple': '#9333ea',
          }
        }
      }
    }
  </script>
</head>
<body class="font-sans bg-stairity-gray text-gray-900">
  
  <!-- Hero Section -->
  <header class="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto text-center">
      <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6">
        ${content.hero.headline}
      </h1>
      <p class="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
        ${content.hero.subheadline}
      </p>
      <a href="#contact" class="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all">
        ${content.hero.ctaText}
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
        </svg>
      </a>
    </div>
  </header>

  <!-- About Section -->
  <section class="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-stairity-gray">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-4xl md:text-5xl font-bold text-black text-center mb-8">
        ${content.about.title}
      </h2>
      <div class="prose prose-lg mx-auto text-gray-700">
        ${content.about.content.split('\n').map(p => `<p class="mb-4">${p}</p>`).join('')}
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section class="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
    <div class="max-w-7xl mx-auto">
      <div class="grid md:grid-cols-3 gap-8">
        ${content.features.map(feature => `
          <div class="bg-stairity-gray rounded-3xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all">
            <h3 class="text-2xl font-bold text-black mb-4">${feature.title}</h3>
            <p class="text-gray-700">${feature.description}</p>
          </div>
        `).join('')}
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section id="contact" class="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-stairity-lavender">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-4xl md:text-5xl font-bold text-black mb-6">
        ${content.cta.headline}
      </h2>
      <p class="text-xl text-gray-700 mb-8">
        ${content.cta.subheadline}
      </p>
      <a href="mailto:contact@example.com" class="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-bold shadow-xl hover:shadow-2xl hover:scale-105 transition-all">
        ${content.cta.buttonText}
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
        </svg>
      </a>
    </div>
  </section>

  <!-- Footer -->
  <footer class="py-8 px-4 sm:px-6 lg:px-8 bg-white text-center">
    <p class="text-sm text-gray-500">
      Built with <a href="https://stairity.com" class="text-stairity-purple hover:underline" target="_blank">Stairity</a>
    </p>
  </footer>

</body>
</html>
    `
  },

  'creative-bold': {
    name: 'Creative Bold',
    description: 'Vibrant and energetic design for content creators and creative professionals',
    preview: '/images/templates/creative-bold.png',
    structure: 'Similar to modern-minimal but with bolder colors',
    render: (content) => `
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.seo.title}</title>
  <meta name="description" content="${content.seo.description}">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: { sans: ['Poppins', 'sans-serif'] },
          colors: {
            'stairity-teal': '#ACD9D9',
            'stairity-pink': '#FFE5E5',
            'stairity-lavender': '#E5D4FF',
            'stairity-purple': '#9333ea',
          }
        }
      }
    }
  </script>
</head>
<body class="font-sans bg-white text-gray-900">
  
  <header class="min-h-screen flex items-center justify-center bg-stairity-pink px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto text-center">
      <h1 class="text-6xl md:text-7xl lg:text-8xl font-bold text-black mb-6">
        ${content.hero.headline}
      </h1>
      <p class="text-2xl md:text-3xl text-gray-700 max-w-3xl mx-auto mb-8">
        ${content.hero.subheadline}
      </p>
      <a href="#contact" class="inline-flex items-center gap-2 px-10 py-5 bg-stairity-purple text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-110 transition-all">
        ${content.hero.ctaText}
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
        </svg>
      </a>
    </div>
  </header>

  <section class="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-white">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-5xl md:text-6xl font-bold text-black mb-8">
        ${content.about.title}
      </h2>
      <div class="text-xl text-gray-700 space-y-6">
        ${typeof content.about.content === 'string' ? content.about.content.split('\n').map(p => `<p>${p}</p>`).join('') : `<p>${content.about.content}</p>`}
      </div>
    </div>
  </section>

  <section class="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-stairity-lavender">
    <div class="max-w-7xl mx-auto">
      <div class="grid md:grid-cols-3 gap-10">
        ${content.features.map((feature, idx) => {
          const colors = ['bg-stairity-pink', 'bg-stairity-teal', 'bg-white'];
          return `
            <div class="${colors[idx % 3]} rounded-[3rem] p-10 shadow-2xl hover:-translate-y-4 transition-all">
              <h3 class="text-3xl font-bold text-black mb-4">${feature.title}</h3>
              <p class="text-lg text-gray-700">${feature.description}</p>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  </section>

  <section id="contact" class="py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black text-white">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-5xl md:text-6xl font-bold mb-6">
        ${content.cta.headline}
      </h2>
      <p class="text-2xl text-gray-300 mb-10">
        ${content.cta.subheadline}
      </p>
      <a href="mailto:contact@example.com" class="inline-flex items-center gap-2 px-10 py-5 bg-stairity-purple text-white rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-110 transition-all">
        ${content.cta.buttonText}
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
        </svg>
      </a>
    </div>
  </section>

  <footer class="py-8 px-4 bg-white text-center">
    <p class="text-sm text-gray-500">
      Built with <a href="https://stairity.com" class="text-stairity-purple hover:underline">Stairity</a>
    </p>
  </footer>

</body>
</html>
    `
  },

  'warm-inviting': {
    name: 'Warm & Inviting',
    description: 'Friendly design perfect for local businesses like cafes and salons',
    preview: '/images/templates/warm-inviting.png',
    structure: 'Warm color scheme with approachable layout',
    render: (content) => `
<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${content.seo.title}</title>
  <meta name="description" content="${content.seo.description}">
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: { sans: ['Poppins', 'sans-serif'] },
          colors: {
            'stairity-teal': '#ACD9D9',
            'stairity-gray': '#F6F6F6',
          }
        }
      }
    }
  </script>
</head>
<body class="font-sans bg-stairity-gray">
  
  <header class="min-h-screen flex items-center justify-center bg-stairity-teal px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto text-center">
      <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-black mb-6">
        ${content.hero.headline}
      </h1>
      <p class="text-xl md:text-2xl text-gray-800 max-w-3xl mx-auto mb-8">
        ${content.hero.subheadline}
      </p>
      <a href="#contact" class="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-semibold shadow-lg hover:scale-105 transition-all">
        ${content.hero.ctaText}
      </a>
    </div>
  </header>

  <section class="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
    <div class="max-w-4xl mx-auto bg-white rounded-[3rem] p-8 md:p-12 shadow-xl">
      <h2 class="text-4xl md:text-5xl font-bold text-black text-center mb-8">
        ${content.about.title}
      </h2>
      <div class="text-lg text-gray-700 space-y-4">
        ${typeof content.about.content === 'string' ? content.about.content.split('\n').map(p => `<p>${p}</p>`).join('') : `<p>${content.about.content}</p>`}
      </div>
    </div>
  </section>

  <section class="py-16 md:py-24 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
      ${content.features.map(feature => `
        <div class="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all">
          <h3 class="text-2xl font-bold text-black mb-4">${feature.title}</h3>
          <p class="text-gray-700">${feature.description}</p>
        </div>
      `).join('')}
    </div>
  </section>

  <section id="contact" class="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-stairity-teal">
    <div class="max-w-4xl mx-auto text-center">
      <h2 class="text-4xl md:text-5xl font-bold text-black mb-6">
        ${content.cta.headline}
      </h2>
      <p class="text-xl text-gray-800 mb-8">
        ${content.cta.subheadline}
      </p>
      <a href="mailto:contact@example.com" class="inline-flex items-center gap-2 px-8 py-4 bg-black text-white rounded-full font-bold shadow-xl hover:scale-105 transition-all">
        ${content.cta.buttonText}
      </a>
    </div>
  </section>

  <footer class="py-8 px-4 bg-white text-center">
    <p class="text-sm text-gray-500">
      Built with <a href="https://stairity.com" class="text-black hover:underline">Stairity</a>
    </p>
  </footer>

</body>
</html>
    `
  }
};

export const getTemplate = (templateId) => {
  return TEMPLATES[templateId] || TEMPLATES['modern-minimal'];
};

export const getAllTemplates = () => {
  return Object.entries(TEMPLATES).map(([id, template]) => ({
    id,
    ...template
  }));
};
