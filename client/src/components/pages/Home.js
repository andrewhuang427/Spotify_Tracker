import React from "react";
import Hero from "../ui/Hero";
import Playlists from "../spotify/Playlists";
import Footer from "../ui/Footer";
function Home() {
  return (
    <>
      <Hero />
      <Playlists />
      <Footer />
    </>
  );
}

export default Home;
