import React from "react";
import MainHeader from "./Sections/MainHeader";
import HeroSection from "./Sections/HeroSection";
import FeatureSection from "./Sections/FeatureSection";
import DetailSection from "./Sections/DetailSection";
import JoinCallToAction from "./Sections/JoinCallToAction";
import MainFooter from "./Sections/MainFooter";
import { heroContent, featuresContents, callToActionContent } from '../A-Datas/mainPageInfo'

function MainPage () {

    return <>
    <MainHeader />
    <HeroSection content={heroContent}/>
    <FeatureSection contents={featuresContents}/>
    <DetailSection />
    <JoinCallToAction content={callToActionContent}/>
    <MainFooter />
    </>
}
export default MainPage