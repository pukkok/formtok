import React from "react";
import HomeHeader from "./HomeStyles/HomeHeader";
import HeroSection from "./HomeStyles/HomeHero";
import HomeFeatures from "./HomeStyles/HomeFeature";
import CallToAction from "./HomeStyles/HomeCallToAction";
import HomeFooter from "./HomeStyles/HomeFooter";
import HomeDetails from "./HomeStyles/HomeDetails";
import HomeService from "./HomeStyles/HomeService";

function HomePage () {
    return <>
    <HomeHeader />
    <HeroSection />
    <HomeFeatures />
    <HomeDetails />
    {/* <HomeService />    */}
    <CallToAction />
    <HomeFooter />
    </>
}
export default HomePage