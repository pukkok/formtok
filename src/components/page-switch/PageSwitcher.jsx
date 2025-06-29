'use client'

import ani from '@/animations/PageSwitching.module.css'
import React from "react";
import FormTokLogo from "../FormTokLogo";
import { useScreenStore } from "@/stores/useScreenStore";

const PageSwitcher = () => {
	const switchTheScreen = useScreenStore(s => s.switchTheScreen)

	if(switchTheScreen !== 'go') return null

	return (
		<section
		 	className={`
				fixed bottom-[-100vh] 
				flex justify-center items-center
				w-full h-screen
				bg-[#fafbfc] dark:bg-dark-base
				text-7xl z-[1000]
				${ani['switching-screen']}
			`}
		>
			<FormTokLogo boxSize={180}/>
		</section>
	)
}

export default PageSwitcher