export const groups = {
  General: [
    { q: 'What does Miransas build?', a: 'Miransas is an independent engineering studio working on voice AI, developer tools and infrastructure. Miralas is the current focus; the Projects page documents the wider body of work.' },
    { q: 'Can I use Miralas today?', a: 'Miralas is in development. Public availability and release updates will be announced in Miransas News. The website demonstrates the direction of the product.' },
    { q: 'Is the Voice Agent released?', a: 'No public release is scheduled. The Voice Agent follows the Miralas core, with conversation, orders and appointments as intended use cases. The Agent page explains the current direction.' },
    { q: 'Where can I follow the work?', a: 'Read Miransas News for engineering notes and product updates, or subscribe to its RSS feed. Existing published articles remain the record of earlier announcements.' },
  ],
  'Voice & Development': [
    { q: 'Why focus on Uzbek?', a: 'Native Uzbek voice experiences are a central goal of Miralas. Language coverage depends on the model and release; the Models page distinguishes upstream model capabilities from Miransas product plans.' },
    { q: 'Are the demonstrations connected to a live model?', a: 'The homepage includes a recorded audio sample, visual studies and illustrative interfaces. They are labeled as demonstrations and do not represent a live production backend.' },
    { q: 'Is there a public API or SDK?', a: 'A public Miralas API is planned but is not open for access. No released SDK or public endpoint is advertised here. The Developers page links to the resources available today.' },
  ],
  'Privacy & Contact': [
    { q: 'Can I clone another person’s voice?', a: 'Use your own voice or a voice you have explicit permission to use. Voice ownership and responsible use are part of the product direction. See the published principles and current legal policies for details.' },
    { q: 'Where can I ask for help?', a: 'Start with Support or write to contact@miransas.com. Include the product, what you expected and what happened. For security reports, use the subject “Security”.' },
    { q: 'Are you hiring?', a: 'There are no open positions currently listed. Careers explains how we work and how to express an interest in engineering or voice work without implying an advertised role.' },
  ],
} as const;
