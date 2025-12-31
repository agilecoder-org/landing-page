import { ImageResponse } from 'next/og'

export const runtime = 'nodejs'

export const alt = 'AgileCoder - Innovate. Build. Deliver.'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #000000, #1a1a1a)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                    color: 'white',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '2px solid rgba(255,255,255,0.1)',
                        borderRadius: '24px',
                        padding: '40px 80px',
                        background: 'rgba(255,255,255,0.05)',
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                    }}
                >
                    <div
                        style={{
                            fontSize: 84,
                            fontWeight: 900,
                            background: 'linear-gradient(to right, #fff, #888)',
                            backgroundClip: 'text',
                            color: 'transparent',
                            marginBottom: 20,
                            letterSpacing: '-0.05em',
                        }}
                    >
                        AgileCoder
                    </div>
                    <div
                        style={{
                            fontSize: 32,
                            color: '#a1a1aa',
                            fontWeight: 500,
                            letterSpacing: '0.05em',
                            textTransform: 'uppercase',
                        }}
                    >
                        Innovate. Build. Deliver.
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
