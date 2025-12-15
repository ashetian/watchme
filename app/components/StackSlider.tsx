"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { 
  SiNextdotjs, SiTypescript, SiTailwindcss, SiStripe, SiSupabase, SiFramer,
  SiReact, SiNodedotjs, SiExpress, SiMongodb, SiSocketdotio, SiRedux,
  SiVuedotjs, SiFirebase, SiCssmodules, SiOpenai,
  SiPostgresql, SiDocker, SiRedis, SiGreensock, SiPrisma, SiZod,
  SiResend, SiVercel, SiCloudinary, SiI18Next, SiNginx
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { GiBearFace, GiBull } from "react-icons/gi";
import { IconType } from "react-icons";

export const IyzicoIcon = ({ size = 40, className, title }: { size?: string | number, className?: string, title?: string }) => (
  <svg 
    width="auto" 
    height={size} 
    viewBox="0 0 184 80" 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    aria-label={title || "Iyzico"}
  >
    <title>{title || "Iyzico"}</title>
    <defs>
        <path id="uwtj7m37aa" d="M0 0.07L10.176 0.07 10.176 10.188 0 10.188z"/>
        <path id="gm7ejcreqc" d="M0.215 0.07L10.398 0.07 10.398 10.188 0.215 10.188z"/>
    </defs>
    <g fill="none" fillRule="evenodd">
        <path fill="currentColor" d="M53.995 74.258c-1.278 0-2.773-.972-2.773-3.052 0-2.056 1.495-3.056 2.773-3.056 1.235 0 2.692.904 2.692 3.056 0 2.112-1.457 3.052-2.692 3.052m3.278-7.188c-.348 0-.65.295-.65.66v.948c-.492-1.057-1.614-1.657-2.814-1.657-1.763 0-3.895 1.388-3.895 4.185 0 2.827 2.132 4.206 3.895 4.206 1.405 0 2.497-.856 2.814-1.813v1.132c0 .344.302.659.65.659.359 0 .664-.315.664-.66v-7c0-.365-.283-.66-.664-.66M69.693 69.59h-1.835v-3.498h1.835c1.192 0 2.074.472 2.074 1.764 0 1.305-.882 1.734-2.074 1.734m.098-5.305h-2.898c-.683 0-1.173.486-1.173 1.162v8.893c0 .583.477 1.072 1.076 1.072.589 0 1.062-.49 1.062-1.072v-2.947h1.933c2.465 0 4.048-1.52 4.048-3.537 0-1.983-1.583-3.571-4.048-3.571M78.85 73.623c-1.045 0-2.135-.796-2.135-2.418 0-1.604 1.09-2.42 2.135-2.42.886 0 2.06.643 2.06 2.42 0 1.776-1.174 2.418-2.06 2.418m3.007-6.553c-.566 0-1.047.47-1.047 1.017v.275c-.313-.742-1.214-1.34-2.342-1.34-1.728 0-3.829 1.387-3.829 4.183 0 2.863 2.09 4.207 3.83 4.207 1.378 0 2.22-.857 2.341-1.344v.3c0 .569.481 1.022 1.047 1.022.555 0 1.059-.453 1.059-1.021v-6.282c0-.547-.504-1.017-1.06-1.017M91.569 67.07c-.396 0-.764.218-.98.724l-2.172 4.873-2.118-4.873c-.226-.506-.603-.724-.998-.724-.541 0-.951.426-.951.92 0 .194.064.355.111.482l2.943 6.45-.902 2.045c-.042.124-.106.278-.106.475 0 .495.379.92.912.92.401 0 .782-.216 1-.719l4.104-9.171c.058-.127.127-.288.127-.481 0-.495-.417-.92-.97-.92M102.24 64.233c-.606 0-1.112.469-1.112 1.032v6.053c0 1.651-1.04 2.305-2.278 2.305-1.214 0-2.28-.654-2.28-2.305v-6.053c0-.563-.504-1.032-1.093-1.032-.586 0-1.042.469-1.042 1.032v6.086c0 2.545 1.95 4.061 4.415 4.061 2.455 0 4.418-1.516 4.418-4.061v-6.086c0-.563-.448-1.032-1.029-1.032M113.847 68.172c.7 0 1.487.284 1.96.91.13.159.32.302.555.302.302 0 .556-.222.556-.539 0-.249-.175-.423-.301-.577-.697-.84-1.69-1.247-2.834-1.247-1.869 0-4.118 1.374-4.118 4.184 0 2.8 2.25 4.174 4.118 4.174 1.144 0 2.137-.428 2.834-1.258.126-.149.301-.316.301-.566 0-.316-.254-.54-.556-.54-.234 0-.425.138-.555.303-.473.627-1.26.91-1.96.91-1.408 0-2.878-1.006-2.878-3.023 0-2.027 1.47-3.033 2.878-3.033M122.11 74.258c-1.314 0-2.815-1.02-2.815-3.035 0-2.029 1.501-3.05 2.815-3.05 1.329 0 2.82 1.021 2.82 3.05 0 2.016-1.491 3.035-2.82 3.035m0-7.237c-1.82 0-4.12 1.401-4.12 4.202 0 2.81 2.3 4.19 4.12 4.19 1.84 0 4.13-1.38 4.13-4.19 0-2.8-2.29-4.202-4.13-4.202M138.135 67.032c-1.662 0-2.712 1.094-3.151 2.05-.482-1.495-1.714-2.05-2.884-2.05-1.882 0-2.864 1.44-2.957 1.973v-1.276c0-.364-.3-.659-.653-.659-.363 0-.663.295-.663.66v6.99c0 .337.3.659.663.659.354 0 .653-.322.653-.66v-4.282c.14-.899.964-2.254 2.576-2.254 1.108 0 2.152.648 2.152 2.36v4.177c0 .337.284.659.65.659.366 0 .664-.322.664-.66v-4.282c.147-.899.968-2.254 2.585-2.254 1.108 0 2.135.648 2.135 2.36v4.177c0 .337.3.659.669.659.358 0 .644-.322.644-.66v-4.176c0-2.613-1.583-3.51-3.083-3.51M147.109 74.258c-1.236 0-2.69-.94-2.69-3.052 0-2.152 1.454-3.056 2.69-3.056 1.285 0 2.767 1 2.767 3.056 0 2.08-1.482 3.052-2.767 3.052m.187-7.237c-1.206 0-2.325.6-2.817 1.657v-.948c0-.365-.298-.66-.646-.66-.382 0-.661.295-.661.66v9.976c0 .358.298.657.66.657.35 0 .66-.3.66-.657v-4.061c.338.937 1.411 1.767 2.804 1.767 1.758 0 3.897-1.38 3.897-4.206 0-2.797-2.139-4.185-3.897-4.185M156.42 74.258c-1.287 0-2.774-.972-2.774-3.052 0-2.056 1.487-3.056 2.775-3.056 1.228 0 2.688.904 2.688 3.056 0 2.112-1.46 3.052-2.688 3.052m3.271-7.188c-.343 0-.65.295-.65.66v.948c-.489-1.057-1.615-1.657-2.814-1.657-1.755 0-3.892 1.388-3.892 4.185 0 2.827 2.137 4.206 3.892 4.206 1.407 0 2.5-.856 2.815-1.813v1.132c0 .344.306.659.65.659.367 0 .66-.315.66-.66v-7c0-.365-.28-.66-.66-.66M166.531 67.032c-1.885 0-2.87 1.44-2.96 1.973v-1.276c0-.364-.3-.659-.648-.659-.362 0-.666.295-.666.66v6.99c0 .337.304.659.666.659.348 0 .647-.322.647-.66v-4.282c.144-.899.97-2.254 2.583-2.254 1.104 0 2.155.648 2.155 2.36v4.177c0 .337.283.659.65.659.36 0 .66-.322.66-.66v-4.176c0-2.613-1.597-3.51-3.087-3.51M177.602 67.07c-.256 0-.495.138-.624.44l-2.59 6.011-2.583-6.01c-.124-.303-.367-.44-.62-.44-.344 0-.618.283-.618.598 0 .125.033.204.066.294l3.105 7.05-1.061 2.457c-.036.096-.07.173-.07.3 0 .31.24.592.59.592.254 0 .492-.139.618-.436l4.34-9.963c.03-.09.06-.17.06-.294 0-.315-.268-.599-.613-.599" transform="translate(0 .914)"/>
        <path fill="currentColor" d="M5.087 14.81C2.543 14.81.48 16.86.48 19.382v26.773c0 2.531 2.062 4.576 4.606 4.576 2.542 0 4.605-2.045 4.605-4.576V19.382c0-2.523-2.063-4.572-4.605-4.572" transform="translate(0 .914)"/>
        <g transform="translate(0 .914) translate(0 .162)">
            <mask id="6r16igxdyb" fill="#fff">
                <use xlinkHref="#uwtj7m37aa"/>
            </mask>
            <path fill="currentColor" d="M5.087.07C2.277.07 0 2.335 0 5.13c0 2.789 2.278 5.058 5.087 5.058 2.808 0 5.089-2.27 5.089-5.058 0-2.795-2.281-5.06-5.09-5.06" mask="url(#6r16igxdyb)"/>
        </g>
        <path fill="currentColor" d="M87.526 46.155c0-2.524-2.064-4.58-4.611-4.58H70.194l16.258-19.25c1.631-1.935 1.377-4.827-.57-6.444-.907-.76-2.018-1.109-3.119-1.071-.051-.006-20.343 0-20.343 0-2.546 0-4.606 2.05-4.606 4.571 0 2.531 2.06 4.587 4.606 4.587h10.626L56.792 43.213c-1.637 1.94-1.38 4.825.566 6.446.863.726 1.916 1.072 2.962 1.072h22.595c2.547 0 4.611-2.045 4.611-4.576M128.12 23.358c2.523 0 4.887.972 6.672 2.748 1.798 1.783 4.715 1.783 6.516 0 1.792-1.79 1.792-4.688 0-6.476-3.524-3.504-8.208-5.431-13.189-5.431-4.975 0-9.657 1.927-13.177 5.43-3.522 3.503-5.463 8.15-5.463 13.102 0 4.948 1.94 9.605 5.463 13.098 3.52 3.503 8.202 5.435 13.177 5.435 4.981 0 9.665-1.932 13.19-5.435 1.791-1.781 1.791-4.68 0-6.468-1.802-1.792-4.72-1.792-6.517 0-1.785 1.764-4.149 2.75-6.673 2.75-2.517 0-4.885-.986-6.664-2.75-1.783-1.773-2.763-4.126-2.763-6.63 0-2.504.98-4.862 2.763-6.625 1.78-1.776 4.147-2.748 6.664-2.748M165.356 42.111c-5.197 0-9.424-4.21-9.424-9.38 0-5.17 4.227-9.373 9.424-9.373 5.202 0 9.435 4.203 9.435 9.373 0 5.17-4.233 9.38-9.435 9.38m0-27.912c-10.275 0-18.638 8.313-18.638 18.532 0 10.218 8.363 18.533 18.638 18.533 10.28 0 18.644-8.315 18.644-18.533 0-10.22-8.363-18.532-18.644-18.532M98.839 14.81c-2.54 0-4.6 2.05-4.6 4.572v26.773c0 2.531 2.06 4.576 4.6 4.576 2.548 0 4.606-2.045 4.606-4.576V19.382c0-2.523-2.058-4.572-4.606-4.572" transform="translate(0 .914)"/>
        <g transform="translate(0 .914) translate(93.533 .162)">
            <mask id="63pm8sc9gd" fill="#fff">
                <use xlinkHref="#gm7ejcreqc"/>
            </mask>
            <path fill="currentColor" d="M5.305.07C2.495.07.215 2.335.215 5.13c0 2.789 2.28 5.058 5.09 5.058 2.815 0 5.093-2.27 5.093-5.058 0-2.795-2.278-5.06-5.093-5.06" mask="url(#63pm8sc9gd)"/>
        </g>
        <path fill="currentColor" d="M49.812 15.325c-2.259-1.167-5.037-.293-6.21 1.948l-9.879 18.93-9.88-18.93c-1.17-2.24-3.953-3.115-6.21-1.948-2.255 1.169-3.136 3.933-1.963 6.178l12.861 24.644-5.938 11.4c-1.174 2.245-.299 5.01 1.96 6.174.741.39 1.54.55 2.322.512 1.59-.066 3.105-.951 3.895-2.457l21-40.273c1.177-2.245.3-5.01-1.958-6.178" transform="translate(0 .914)"/>
    </g>
  </svg>
);



export const OllamaIcon = ({ size = 40, className, title }: { size?: string | number, className?: string, title?: string }) => (
  <svg 
    fill="currentColor" 
    fillRule="evenodd" 
    height={size} 
    width={size} 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-label={title || "Ollama"}
  >
    <title>{title || "Ollama"}</title>
    <path d="M7.905 1.09c.216.085.411.225.588.41.295.306.544.744.734 1.263.191.522.315 1.1.362 1.68a5.054 5.054 0 012.049-.636l.051-.004c.87-.07 1.73.087 2.48.474.101.053.2.11.297.17.05-.569.172-1.134.36-1.644.19-.52.439-.957.733-1.264a1.67 1.67 0 01.589-.41c.257-.1.53-.118.796-.042.401.114.745.368 1.016.737.248.337.434.769.561 1.287.23.934.27 2.163.115 3.645l.053.04.026.019c.757.576 1.284 1.397 1.563 2.35.435 1.487.216 3.155-.534 4.088l-.018.021.002.003c.417.762.67 1.567.724 2.4l.002.03c.064 1.065-.2 2.137-.814 3.19l-.007.01.01.024c.472 1.157.62 2.322.438 3.486l-.006.039a.651.651 0 01-.747.536.648.648 0 01-.54-.742c.167-1.033.01-2.069-.48-3.123a.643.643 0 01.04-.617l.004-.006c.604-.924.854-1.83.8-2.72-.046-.779-.325-1.544-.8-2.273a.644.644 0 01.18-.886l.009-.006c.243-.159.467-.565.58-1.12a4.229 4.229 0 00-.095-1.974c-.205-.7-.58-1.284-1.105-1.683-.595-.454-1.383-.673-2.38-.61a.653.653 0 01-.632-.371c-.314-.665-.772-1.141-1.343-1.436a3.288 3.288 0 00-1.772-.332c-1.245.099-2.343.801-2.67 1.686a.652.652 0 01-.61.425c-1.067.002-1.893.252-2.497.703-.522.39-.878.935-1.066 1.588a4.07 4.07 0 00-.068 1.886c.112.558.331 1.02.582 1.269l.008.007c.212.207.257.53.109.785-.36.622-.629 1.549-.673 2.44-.05 1.018.186 1.902.719 2.536l.016.019a.643.643 0 01.095.69c-.576 1.236-.753 2.252-.562 3.052a.652.652 0 01-1.269.298c-.243-1.018-.078-2.184.473-3.498l.014-.035-.008-.012a4.339 4.339 0 01-.598-1.309l-.005-.019a5.764 5.764 0 01-.177-1.785c.044-.91.278-1.842.622-2.59l.012-.026-.002-.002c-.293-.418-.51-.953-.63-1.545l-.005-.024a5.352 5.352 0 01.093-2.49c.262-.915.777-1.701 1.536-2.269.06-.045.123-.09.186-.132-.159-1.493-.119-2.73.112-3.67.127-.518.314-.95.562-1.287.27-.368.614-.622 1.015-.737.266-.076.54-.059.797.042zm4.116 9.09c.936 0 1.8.313 2.446.855.63.527 1.005 1.235 1.005 1.94 0 .888-.406 1.58-1.133 2.022-.62.375-1.451.557-2.403.557-1.009 0-1.871-.259-2.493-.734-.617-.47-.963-1.13-.963-1.845 0-.707.398-1.417 1.056-1.946.668-.537 1.55-.849 2.485-.849zm0 .896a3.07 3.07 0 00-1.916.65c-.461.37-.722.835-.722 1.25 0 .428.21.829.61 1.134.455.347 1.124.548 1.943.548.799 0 1.473-.147 1.932-.426.463-.28.7-.686.7-1.257 0-.423-.246-.89-.683-1.256-.484-.405-1.14-.643-1.864-.643zm.662 1.21l.004.004c.12.151.095.37-.056.49l-.292.23v.446a.375.375 0 01-.376.373.375.375 0 01-.376-.373v-.46l-.271-.218a.347.347 0 01-.052-.49.353.353 0 01.494-.051l.215.172.22-.174a.353.353 0 01.49.051zm-5.04-1.919c.478 0 .867.39.867.871a.87.87 0 01-.868.871.87.87 0 01-.867-.87.87.87 0 01.867-.872zm8.706 0c.48 0 .868.39.868.871a.87.87 0 01-.868.871.87.87 0 01-.867-.87.87.87 0 01.867-.872zM7.44 2.3l-.003.002a.659.659 0 00-.285.238l-.005.006c-.138.189-.258.467-.348.832-.17.692-.216 1.631-.124 2.782.43-.128.899-.208 1.404-.237l.01-.001.019-.034c.046-.082.095-.161.148-.239.123-.771.022-1.692-.253-2.444-.134-.364-.297-.65-.453-.813a.628.628 0 00-.107-.09L7.44 2.3zm9.174.04l-.002.001a.628.628 0 00-.107.09c-.156.163-.32.45-.453.814-.29.794-.387 1.776-.23 2.572l.058.097.008.014h.03a5.184 5.184 0 011.466.212c.086-1.124.038-2.043-.128-2.722-.09-.365-.21-.643-.349-.832l-.004-.006a.659.659 0 00-.285-.239h-.004z"></path>
  </svg>
);

export const stackIcons: Record<string, IconType | React.ComponentType<any>> = {

  "Next.js": SiNextdotjs,
  "TypeScript": SiTypescript,
  "Tailwind CSS": SiTailwindcss,
  "Stripe": SiStripe,
  "Supabase": SiSupabase,
  "Framer Motion": SiFramer,
  "React": SiReact,
  "Node.js": SiNodedotjs,
  "Express": SiExpress,
  "Express.js": SiExpress,
  "MongoDB": SiMongodb,
  "Socket.io": SiSocketdotio,
  "Redux": SiRedux,
  "Vue.js": SiVuedotjs,
  "Firebase": SiFirebase,
  "CSS Modules": SiCssmodules,
  "OpenAI API": SiOpenai,
  "PostgreSQL": SiPostgresql,
  "Docker": SiDocker,
  "Redis": SiRedis,
  "GSAP": SiGreensock,
  "Prisma ORM": SiPrisma,
  "Zod": SiZod,
  "NextAuth.js": SiNextdotjs,
  "BullMQ": GiBull,
  "REST API": TbApi,
  "Iyzico": IyzicoIcon,
  "Resend": SiResend,
  "Zustand": GiBearFace,
  "Vercel": SiVercel,
  "Cloudinary": SiCloudinary,
  "i18n": SiI18Next,
  "Ollama": OllamaIcon,
  "Nginx": SiNginx,
};

interface StackSliderProps {
  stack: string[];
}

export default function StackSlider({ stack }: StackSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [activeTech, setActiveTech] = useState<string>("");
  const [displayedTech, setDisplayedTech] = useState<string>("");
  
  // Create a duplicated list for infinite scroll
  const items = [...stack, ...stack, ...stack, ...stack, ...stack, ...stack];

  useEffect(() => {
    let animationFrameId: number;

    const checkActiveElement = () => {
      if (!containerRef.current || !sliderRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      // Offset center to the right to trigger earlier (as items move left)
      const centerX = containerRect.left + containerRect.width / 2 + 50;
      
      const children = Array.from(sliderRef.current.children);
      let closestDistance = Infinity;
      let closestTech = "";

      children.forEach((child, index) => {
        const rect = child.getBoundingClientRect();
        const childCenterX = rect.left + rect.width / 2;
        const distance = Math.abs(childCenterX - centerX);

        if (distance < closestDistance) {
          closestDistance = distance;
          // Map back to original stack array
          closestTech = items[index];
        }
      });

      if (closestTech && closestTech !== activeTech) {
        setActiveTech(closestTech);
      }

      animationFrameId = requestAnimationFrame(checkActiveElement);
    };

    animationFrameId = requestAnimationFrame(checkActiveElement);

    return () => cancelAnimationFrame(animationFrameId);
  }, [items, activeTech]);

  // Handle text transition
  useEffect(() => {
    if (activeTech !== displayedTech) {
      if (!displayedTech) {
        // Initial load - just set it
        setDisplayedTech(activeTech);
        return;
      }

      gsap.to(textRef.current, {
        y: -10,
        opacity: 0,
        duration: 0.1,
        ease: "none",
        onComplete: () => {
          setDisplayedTech(activeTech);
          gsap.fromTo(textRef.current,
            { y: 10, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.2, ease: "none" }
          );
        }
      });
    }
  }, [activeTech, displayedTech]);

  return (
    <div className="w-full overflow-hidden border-t border-white/10 pt-6 md:pt-8 mt-auto md:mt-0" ref={containerRef}>
      <h3 className="text-white/50 text-xs md:text-sm uppercase tracking-widest mb-4">Tech Stack</h3>
      <div className="flex whitespace-nowrap overflow-hidden relative">
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-black/50 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-black/50 to-transparent z-10" />
        
        <div className="animate-marquee items-center" ref={sliderRef}>
          {items.map((tech, i) => {
            const Icon = stackIcons[tech];
            return (
              <div key={i} className="flex items-center justify-center text-white/50 hover:text-white transition-colors duration-300 pr-12">
                {Icon ? <Icon size={40} title={tech} /> : <span className="text-xl font-unifraktur">{tech}</span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Tech Display */}
      <div className="mt-8 h-12 flex items-center justify-center">
         <div className="border border-white/20 bg-black px-6 py-2 min-w-[200px] text-center transition-all duration-300 font-mono text-sm md:text-base overflow-hidden">
            <span ref={textRef} className="text-white inline-block">
                {displayedTech}
            </span>
         </div>
      </div>
    </div>
  );
}
