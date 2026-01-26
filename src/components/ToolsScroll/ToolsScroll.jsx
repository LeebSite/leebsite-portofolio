import { useRef } from "react";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useMotionValue,
    useVelocity,
    useAnimationFrame,
} from "motion/react";
import { wrap } from "motion/react";
import { listTools } from "../../data";

// ParallaxText Component for Infinite Scroll with Velocity
function ParallaxText({ children, baseVelocity = 100 }) {
    const baseX = useMotionValue(0);
    const { scrollY } = useScroll();
    const scrollVelocity = useVelocity(scrollY);
    const smoothVelocity = useSpring(scrollVelocity, {
        damping: 50,
        stiffness: 400
    });

    const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 2.5], {
        clamp: false
    });

    /**
     * This is a magic wrapping for the length of the text - you
     * have to replace for wrapping that works for you or dynamically
     * calculate
     */
    const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

    const directionFactor = useRef(1);

    useAnimationFrame((t, delta) => {
        let moveBy = directionFactor.current * baseVelocity * (delta / 1000);

        /**
         * This is what changes the direction of the scroll once we
         * switch scrolling directions.
         */
        if (velocityFactor.get() < 0) {
            directionFactor.current = -1;
        } else if (velocityFactor.get() > 0) {
            directionFactor.current = 1;
        }

        moveBy += directionFactor.current * moveBy * velocityFactor.get();

        baseX.set(baseX.get() + moveBy);
    });

    /**
     * The number of times to repeat the child text should be dynamic based on the width of the text
     * and the viewport. For simplicity, we just repeat it enough times.
     */
    return (
        <div className="overflow-hidden m-0 whitespace-nowrap flex flex-nowrap">
            <motion.div className="flex whitespace-nowrap gap-4 flex-nowrap" style={{ x }}>
                {children}
                {children}
                {children}
                {children}
            </motion.div>
        </div>
    );
}

// Single Tool Card Component
const ToolCard = ({ tool }) => (
    <div className="flex items-center gap-3 p-3 px-5 border border-zinc-800/50 rounded-full bg-zinc-900/40 backdrop-blur-sm hover:bg-zinc-800/60 hover:border-violet-500/30 transition-all duration-300 group min-w-[200px]">
        <div className="relative w-10 h-10 p-2 bg-zinc-900 rounded-full flex items-center justify-center border border-zinc-700/50 group-hover:border-violet-500/50 transition-colors">
            <img
                src={tool.gambar}
                alt={tool.nama}
                className="w-full h-full object-contain"
                loading="lazy"
            />
        </div>
        <div className="flex flex-col">
            <span className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors">
                {tool.nama}
            </span>
            <span className="text-[10px] text-zinc-500 uppercase tracking-wider">
                {tool.ket}
            </span>
        </div>
    </div>
);

const ToolsScroll = () => {
    // Split tools into 3 rows
    const chunkSize = Math.ceil(listTools.length / 3);
    const row1 = listTools.slice(0, chunkSize);
    const row2 = listTools.slice(chunkSize, chunkSize * 2);
    const row3 = listTools.slice(chunkSize * 2);

    return (
        <section id="tools" className="mt-32 relative z-10">
            <div className="flex flex-col items-center mb-12">
                <h1 className="text-4xl font-bold mb-4 text-center" data-aos="fade-up">
                    Alat & Teknologi
                </h1>
                <p
                    className="text-base text-center opacity-50 max-w-2xl"
                    data-aos="fade-up"
                    data-aos-delay="200"
                >
                    Stack teknologi yang saya gunakan untuk membangun aplikasi.
                </p>
            </div>

            <div className="flex flex-col gap-6 overflow-hidden py-4 mask-edges -mx-4 sm:-mx-8 lg:-mx-16">
                {/* Row 1: Left to Right (Positive Velocity) */}
                <ParallaxText baseVelocity={1}>
                    {row1.map((tool) => (
                        <div key={tool.id} className="inline-block mx-2">
                            <ToolCard tool={tool} />
                        </div>
                    ))}
                </ParallaxText>

                {/* Row 2: Right to Left (Negative Velocity) */}
                <ParallaxText baseVelocity={-1}>
                    {row2.map((tool) => (
                        <div key={tool.id} className="inline-block mx-2">
                            <ToolCard tool={tool} />
                        </div>
                    ))}
                </ParallaxText>

                {/* Row 3: Left to Right (Positive Velocity) */}
                <ParallaxText baseVelocity={1}>
                    {row3.map((tool) => (
                        <div key={tool.id} className="inline-block mx-2">
                            <ToolCard tool={tool} />
                        </div>
                    ))}
                </ParallaxText>
            </div>

            {/* CSS Mask for fading edges */}
            <style>{`
        .mask-edges {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}</style>
        </section>
    );
};

export default ToolsScroll;
