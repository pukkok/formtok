'use client'

import React from "react";
import styled from "styled-components";
import classNames from "classnames";
import FormTokLogo from "../FormTokLogo";
import { useScreenStore } from "@/stores/useScreenStore";

function PageSwitcher () {
	const mode = useScreenStore(s => s.mode)
	const switchTheScreen = useScreenStore(s => s.switchTheScreen)

	return (
		<section
		 	className={`
				fixed bottom-[-100vh] 
				flex justify-center items-center
				w-full h-screen
				bg-[#fafbfc] dark:bg-deep-dark
				text-7xl z-[1000] 
				${switchTheScreen ? 'animate-switching-screen' : ''}
			`}
		>
			<FormTokLogo boxSize={180}/>
		</section>
	)
}

export default PageSwitcher