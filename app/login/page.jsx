'use client'

import LoginPageCover from "@/features/login/LoginPageCover"
import LoginLargeBox from "@/features/login/LoginLargeBox"
import JoinLargeBox from "@/features/login/JoinLargeBox"
import SmallBoxes from "@/features/login/SmallBoxes"

const LoginPage = () => {

	return (
		<LoginPageCover>
			<LoginLargeBox />
			<JoinLargeBox />
			<SmallBoxes />
		</LoginPageCover>
	)
}

export default LoginPage