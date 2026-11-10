import { Mic2, Waves, Zap } from 'lucide-react';

export const VOICE_STEPS = [
  {
    id: 'voice-agent',
    icon: Waves,
    eyebrow: 'Conversational infrastructure',
    title: 'Start with the conversation.',
    description: 'A useful voice system needs to listen, keep context and know what should happen next. These are the questions guiding our Voice Agent work.',
    highlights: ['Conversation and session handling are being developed together.', 'Orders and appointments are intended use cases, not released integrations.', 'The Voice Agent follows the Miralas core in our order of work.'],
  },
  {
    id: 'tts-clone',
    icon: Mic2,
    eyebrow: 'Speech and identity',
    title: 'Give the voice a purpose.',
    description: 'Miralas is developing voice cloning and multilingual speech, with native Uzbek at the center. The visual study beside this text illustrates that direction.',
    highlights: ['Voice cloning requires permission from the voice owner.', 'Model notes explain the open-source tools behind the work.', 'Streaming audio is part of the integration direction.'],
  },
  {
    id: 'voice-ai',
    icon: Zap,
    eyebrow: 'Recorded demonstration',
    title: 'Hear a voice. See the flow.',
    description: 'Play a recorded Miralas voice sample and explore an illustrative processing sequence. This demonstration does not call a live model or a production backend.',
    highlights: ['A real audio file with playback, seeking and download controls.', 'The transcript and processing steps are a presentation of the workflow.', 'Product availability and engineering updates are published in News.'],
  },
];
