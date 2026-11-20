import { ImageResponse } from 'next/og';

export const alt = 'Miransas — Independent Voice AI Lab & Infrastructure';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          backgroundColor: '#050505',
          backgroundImage:
            'radial-gradient(125% 115% at 0% 0%, rgba(56, 71, 255, 0.42) 0%, #000103 68%)',
          color: '#FFFFFF',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              padding: '10px 20px',
              borderRadius: '12px',
              backgroundColor: '#03050d',
            }}
          >
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '12px',
                backgroundColor: '#3847ff',
              }}
            />
            <span
              style={{
                fontSize: '16px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: '#D1D1D1',
                fontWeight: 600,
              }}
            >
              INDEPENDENT VOICE AI LAB
            </span>
          </div>

          <span
            style={{
              fontSize: '18px',
              color: '#6E6E74',
              letterSpacing: '0.08em',
            }}
          >
            miransas.com
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '22px',
            maxWidth: '940px',
          }}
        >
          <div
            style={{
              fontSize: '68px',
              fontWeight: 700,
              lineHeight: 1.04,
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
            }}
          >
            Your Voice. Your Language. Built to Last.
          </div>
          <div
            style={{
              fontSize: '26px',
              lineHeight: 1.45,
              color: '#D1D1D1',
              maxWidth: '840px',
            }}
          >
            Multilingual speech synthesis, native Uzbek speech research,
            permission-based voice cloning, and Rust + Python gRPC voice
            infrastructure.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
            }}
          >
            <span
              style={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#FFFFFF',
              }}
            >
              Miransas
            </span>
            <span style={{ fontSize: '20px', color: '#6E6E74' }}>·</span>
            <span style={{ fontSize: '20px', color: '#D1D1D1' }}>
              Miralas Voice Stack · 24 kHz PCM16 · gRPC
            </span>
          </div>

          <div
            style={{
              padding: '10px 20px',
              borderRadius: '12px',
              backgroundColor: '#3847ff',
              color: '#FFFFFF',
              fontSize: '16px',
              fontWeight: 600,
            }}
          >
            miralas.io
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
