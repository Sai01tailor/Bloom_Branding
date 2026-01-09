"use client"

import {
    motion,
    useScroll,
    useSpring,
    useTransform,
} from "motion/react"
import { useRef } from "react"

function useParallax(value, distance) {
    return useTransform(value, [0, 1], [-distance, distance])
}

function Image({ id }) {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({ target: ref })
    const y = useParallax(scrollYProgress, 300)

    return (
        <section className="img-container">
            <div ref={ref}>
                <img
                    src={`/photos/cityscape/${id}.jpg`}
                    alt="A London skyscraper"
                />
            </div>
            <motion.h2
                initial={{ visibility: "hidden" }}
                animate={{ visibility: "visible" }}
                style={{ y }}
            >{`#00${id}`}</motion.h2>
        </section>
    )
}

export default function Parallax() {
    const { scrollYProgress } = useScroll()
    const n = 5
    // We change the spring variable to scaleY for vertical growth
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    })

    return (
        <div id="example" className="overflow-hidden">
            {[1, 2, 3, 4, 5].map((image) => (
                <Image key={image} id={image} />
            ))}
            {/* Bind scaleY and ensure CSS handles the origin */}
            <motion.div className="progress z-3 toHide" style={{ scaleY }} />
            <motion.div className="h-[100vh] pback absolute toHide w-[5px] bg-[gray] z-2 top-0 left-[40px]" />
            <StyleSheet />
        </div>
    )
}

/**
 * ==============   Styles   ================
 */

function StyleSheet() {
    return (
        <style>{`
        html {
            scroll-snap-type: y mandatory;
        }

        .img-container {
            height: 100vh;
            scroll-snap-align: start;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
        }

        .img-container > div {
            width: 500px;
            height: 400px;
            margin: 20px;
            
            background: #f5f5f5;
            overflow: hidden;
        }

        .img-container img {
            width: 500px;
            height: 400px;
            object-fit: cover;
        }

      
        .img-container h2 {
            color: #8df0cc;
            margin: 0;
            font-family: "Azeret Mono", monospace;
            font-size: 50px;
            font-weight: 700;
            letter-spacing: -3px;
            line-height: 1.2;
            position: absolute;
            display: inline-block;
            top: calc(50% - 25px);
            left: calc(60% + 120px);
        }
        .progress {
            position: absolute;
            left: 40px;          /* Distance from left edge */
            top: 0vh;           /* Vertical start position */
            width: 6px;          /* Width of the vertical bar */
            height: 100vh;        /* Total height of the bar track */
            background: #8df0cc;
            
            transform-origin: 0% 0%; 
        }
          @media (max-width: 500px) {
            .img-container > div {
                width: 150px;
                height: 120px;
            }

            .img-container img {
                width: 150px;
                height: 120px;
            }
            .img-container h2 {
        left:calc(20%);}

        .progress,.pback {
            left:20px;
        }
        }

    `}</style>
    )
}