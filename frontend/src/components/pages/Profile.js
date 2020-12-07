import React from "react";
import Navbar from "../ui/Navbar";
import Hero from "../ui/Hero";
import Footer from "../ui/Footer";
import TopSongs from "../spotify/TopSongs";
import TopArtists from "../spotify/TopArtists";

function Profile() {
  return (
    <>
      <Navbar />
      <Hero />
      <TopSongs />
      <TopArtists />
      <Footer />
    </>
  );
}

export default Profile;
