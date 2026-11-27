import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React from 'react'
import { useMediaQuery } from 'react-responsive'

const Showcase = () => {
    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' });

    useGSAP(() => {
        if (isTablet) {
            // Mobile/tablet: no animation. Content should already be visible
            // (CSS only sets opacity:0 inside the min-width:1024px media query,
            // so on tablet it's opacity:1 by default.)
            return;
        }

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: '#showcase',
                start: 'top top',
                end: '+=100%',        // pin for exactly one viewport height of scroll
                scrub: 1,             // 1s smoothing — silky scrub instead of per-pixel
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            },
        });

        // Both tweens run in parallel (default position = 0 for both).
        // The mask shrinks to natural size, and the content fades + rises at the same time.
        tl.to('.mask img', {
            scale: 1,
            ease: 'power2.out',
        }, 0)
            .to('.content', {
                opacity: 1,
                y: 0,
                ease: 'power2.out',
            }, 0);

    }, [isTablet]);

    return (
        <section id="showcase">
            <div className="media">
                <video src="/videos/game.mp4" loop autoPlay muted playsInline />
                <div className='mask'>
                    <img src="/mask-logo.svg" />
                </div>
            </div>

            <div className='content'>
                <div className='wrapper'>
                    <div className='lg:max-w-md'>
                        <h2>Rocket Chip</h2>

                        <div className='space-y-5 mt-7 pe-10'>
                            <p>
                                Introducing {" "}
                                <span>
                                    M4, the next generation of Apple Silicon
                                </span>
                                . M4 Powers
                            </p>
                            <p>
                                The Apple M4 is a series of ARM-based systems on a chip made by Apple, part of the Apple silicon series, including a central processing unit (CPU), a graphics processing unit (GPU), a neural processing unit (NPU), and a digital signal processor (DSP). The M4 SoC was introduced in May 2024 for the iPad Pro (7th generation), and is the fourth generation of the M series Apple silicon architecture, succeeding the Apple M3.
                            </p>
                            <p>
                                It is Apple's first SoC to reportedly use the ARMv9 CPU architecture. The M4 is based on ARMv9.2a. It supports the Scalable Matrix Extension (SME) but not the Scalable Vector Extension (SVE). Because of the lack of SVE support, the LLVM compiler officially flags the M4 as supporting ARMv8.
                            </p>
                            <p className='text-primary'>
                                Learn more about Apple Intelligence
                            </p>
                        </div>
                    </div>

                    <div className="max-w-3xs space-y-14">
                        <div className='space-y-2'>
                            <p>Up to</p>
                            <h3>4x faster</h3>
                            <p>pro rendering performance than M2</p>
                        </div>
                        <div className='space-y-2'>
                            <p>Up to</p>
                            <h3>1.5x faster</h3>
                            <p>CPU performance than M2</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Showcase