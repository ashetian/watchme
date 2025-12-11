import Hero from "./components/Hero";

export default function Home() {
  return (
    <main>
      <Hero 
        videoSrc="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
        title="ashetian"
        subtitle="Where is my watch?"
      />
    </main>
  );
}
