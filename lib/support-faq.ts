export type SupportFaqLink = {
  text: string;
  href: string;
  external?: boolean;
};

export type SupportFaqItem = {
  id: string;
  question: string;
  answerText: string;
  segments: Array<
    | { type: 'text'; value: string }
    | { type: 'link'; text: string; href: string; external?: boolean }
  >;
};

export const SUPPORT_FAQ_ITEMS: SupportFaqItem[] = [
  {
    id: 'use-miralas-today',
    question: 'Can I use Miralas today?',
    answerText:
      'Not yet. Miralas is in development. We plan to open a free beta first so early users can try it and give feedback, and paid plans come after that. Announcements will appear on Miransas News.',
    segments: [
      {
        type: 'text',
        value:
          'Not yet. Miralas is in development. We plan to open a free beta first so early users can try it and give feedback, and paid plans come after that. Announcements will appear on ',
      },
      { type: 'link', text: 'Miransas News', href: '/news' },
      { type: 'text', value: '.' },
    ],
  },
  {
    id: 'miralas-uzbek-support',
    question: 'Does Miralas support Uzbek?',
    answerText:
      'Uzbek Speech Research — In Development. We are building toward native Uzbek speech support. The current Chatterbox Multilingual baseline supports 23 languages and excludes Uzbek. Read the model notes for the current engineering baseline.',
    segments: [
      {
        type: 'text',
        value:
          'Uzbek Speech Research — In Development. We are building toward native Uzbek speech support. The current Chatterbox Multilingual baseline supports 23 languages and excludes Uzbek. Read the ',
      },
      { type: 'link', text: 'model notes', href: '/models' },
      { type: 'text', value: ' for the current engineering baseline.' },
    ],
  },
  {
    id: 'miralas-sign-in',
    question: 'Where do I sign in to Miralas?',
    answerText:
      'Sign-in will live on the Miralas console. The console is not public yet. Use the project overview and News for availability updates.',
    segments: [
      {
        type: 'text',
        value:
          'Sign-in will live on the Miralas console. The console is not public yet. Use the project overview and News for availability updates.',
      },
    ],
  },
  {
    id: 'voice-data-safety',
    question: 'Is my voice data safe?',
    answerText:
      'Our product direction favors self-hosted voice processing. Read the current privacy policy for published terms; a recorded homepage demonstration is not a data-processing service.',
    segments: [
      {
        type: 'text',
        value:
          'Our product direction favors self-hosted voice processing. Read the current ',
      },
      {
        type: 'link',
        text: 'privacy policy',
        href: 'https://privacy.miransas.com/legal/privacy',
        external: true,
      },
      {
        type: 'text',
        value:
          ' for published terms; a recorded homepage demonstration is not a data-processing service.',
      },
    ],
  },
  {
    id: 'clone-any-voice',
    question: 'Can I clone any voice?',
    answerText:
      'No. Only clone your own voice or a voice you have written permission to use. Using cloning for impersonation, fraud or misleading content is not allowed. Read more in What we will not build.',
    segments: [
      {
        type: 'text',
        value:
          'No. Only clone your own voice or a voice you have written permission to use. Using cloning for impersonation, fraud or misleading content is not allowed. Read more in ',
      },
      {
        type: 'link',
        text: 'What we will not build',
        href: '/news/principles',
      },
      { type: 'text', value: '.' },
    ],
  },
  {
    id: 'voice-agent-availability',
    question: 'Is the Voice Agent available?',
    answerText:
      'Not yet. The Voice Agent comes after the Miralas core is finished. See the agent page for what it will do.',
    segments: [
      {
        type: 'text',
        value:
          'Not yet. The Voice Agent comes after the Miralas core is finished. See the ',
      },
      { type: 'link', text: 'agent page', href: '/agent' },
      { type: 'text', value: ' for what it will do.' },
    ],
  },
  {
    id: 'report-security-problem',
    question: 'I found a security problem. What should I do?',
    answerText:
      'Please write to us through the contact page with the subject "Security", and give us time to fix it before you share details publicly.',
    segments: [
      {
        type: 'text',
        value: 'Please write to us through the ',
      },
      { type: 'link', text: 'contact page', href: '/contact' },
      {
        type: 'text',
        value:
          ' with the subject “Security”, and give us time to fix it before you share details publicly.',
      },
    ],
  },
];
