import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeHeader from "./HomeStyles/HomeHeader";
import HeroSection from "./HomeStyles/HomeHero";
import HomeFeatures from "./HomeStyles/HomeFeature";
import CallToAction from "./HomeStyles/HomeCallToAction";
import HomeFooter from "./HomeStyles/HomeFooter";
import GlobalStyle from "./HomeStyles/HomeStyle";

function HomePage () {
    return <>
    <GlobalStyle />
    <HomeHeader />
    <HeroSection />        
    <HomeFeatures />
    <CallToAction />
    <HomeFooter />
    </>
}
export default HomePage