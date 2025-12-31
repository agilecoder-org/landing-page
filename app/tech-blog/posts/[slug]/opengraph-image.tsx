import { ImageResponse } from 'next/og'
import { getPostBySlug } from '@/utils/content'

export const runtime = 'nodejs'

export const alt = 'AgileCoder Blog Post'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default async function Image({ params }: { params: { slug: string } }) {
    const post = getPostBySlug(params.slug)
    const title = post?.title || 'AgileCoder Tech Blog'

    return new ImageResponse(
        (
            <div
                style={{
                    background: 'linear-gradient(to bottom right, #000000, #1a1a1a)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                    color: 'white',
                    padding: '80px',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '40px',
                        background: 'rgba(255,255,255,0.1)',
                        padding: '10px 20px',
                        borderRadius: '50px',
                        border: '1px solid rgba(255,255,255,0.1)',
                    }}
                >
                    <div
                        style={{
                            width: '10px',
                            height: '10px',
                            background: '#22c55e', // green-500
                            borderRadius: '50%',
                            marginRight: '10px',
                        }}
                    />
                    <span style={{ fontSize: 20, color: '#e4e4e7', textTransform: 'uppercase', letterSpacing: '0.1em' }}>AgileCoder Tech Blog</span>
                </div>

                <div
                    style={{
                        fontSize: 72,
                        fontWeight: 900,
                        background: 'linear-gradient(to right, #ffffff, #a1a1aa)',
                        backgroundClip: 'text',
                        color: 'transparent',
                        lineHeight: 1.1,
                        marginBottom: '40px',
                        maxWidth: '90%',
                    }}
                >
                    {title}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginTop: 'auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {/* Avatar Placeholder */}
                        <div style={{
                            width: '60px',
                            height: '60px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: '20px',
                            fontSize: '24px',
                            fontWeight: 'bold',
                        }}>
                            A
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: 24, fontWeight: 600, color: 'white' }}>AgileCoder Team</span>
                            <span style={{ fontSize: 18, color: '#a1a1aa' }}>In-depth technical articles</span>
                        </div>
                    </div>
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}
