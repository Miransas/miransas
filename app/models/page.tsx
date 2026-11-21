import { Suspense } from 'react';
import type { Metadata } from 'next';
import { ModelsView } from '@/components/models/ModelsView';
import { JsonLd } from '@/src/components/seo/JsonLd';
import {
  SITE_NAME,
  SITE_URL,
  createPageMetadata,
  getBreadcrumbJsonLd,
} from '@/src/lib/seo';

const MODELS_DESCRIPTION =
  'Explore the open-source audio models behind Miralas: Chatterbox Multilingual TTS, Uzbek speech research, ACE-Step 1.5 music generation, and Stable Audio Open SFX.';

export const metadata: Metadata = createPageMetadata({
  title: 'Models',
  description: MODELS_DESCRIPTION,
  path: '/models',
  keywords: [
    'Miralas models',
    'Chatterbox Multilingual TTS',
    't3_mtl23ls_v2.safetensors',
    'Uzbek speech research',
    'ACE-Step 1.5 music generation',
    'Stable Audio Open SFX',
    'Miransas voice AI',
  ],
});

const modelsJsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${SITE_URL}/models#collectionpage`,
    name: `Models | ${SITE_NAME}`,
    url: `${SITE_URL}/models`,
    description: MODELS_DESCRIPTION,
    isPartOf: {
      '@id': `${SITE_URL}/#website`,
    },
    about: {
      '@id': 'https://miralas.io/#application',
    },
    mainEntity: {
      '@type': 'ItemList',
      name: 'Miralas Audio Model Architecture Stack',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'SoftwareSourceCode',
            name: 'Chatterbox Multilingual (t3_mtl23ls_v2.safetensors)',
            url: `${SITE_URL}/models?tab=chatterbox`,
            license: 'https://opensource.org/licenses/MIT',
            programmingLanguage: ['Python', 'Rust'],
            description:
              'Current Miralas speech synthesis and zero-shot voice cloning baseline supporting 23 languages with PerTh neural watermarking and active Uzbek speech research.',
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'SoftwareSourceCode',
            name: 'ACE-Step 1.5',
            url: `${SITE_URL}/models?tab=ace-step`,
            license: 'https://opensource.org/licenses/MIT',
            programmingLanguage: ['Python', 'Rust'],
            description:
              'Open-source full-song music generation model (MIT core with Apache-2.0 Qwen3-Embedding-0.6B text encoder) currently in evaluation for Miralas across 50+ languages and durations up to 10 minutes.',
          },
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@type': 'SoftwareSourceCode',
            name: 'Stable Audio Open 1.0',
            url: `${SITE_URL}/models?tab=stable-audio`,
            programmingLanguage: ['Python', 'Rust'],
            description:
              'Latent Diffusion Transformer text-to-audio model under the Stability Community License, currently in evaluation for Miralas 44.1 kHz stereo sound effects, foley, and instrumental loops up to 47 seconds.',
          },
        },
      ],
    },
  },
  getBreadcrumbJsonLd([
    { name: 'Home', path: '/' },
    { name: 'Models', path: '/models' },
  ]),
];

export default function ModelsPage() {
  return (
    <>
      <JsonLd data={modelsJsonLd} />
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#EFEFEF] pt-16 pb-24 dark:bg-[#050505]" />
        }
      >
        <ModelsView />
      </Suspense>
    </>
  );
}
