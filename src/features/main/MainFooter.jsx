const LINKS = [
	{title: 'Github', link: 'https://github.com/pukkok'},
	{title: 'Instagram', link: 'https://www.instagram.com/11739oes/'},
]

function MainFooter () {
	
	return (
		<footer className='w-full px-10 py-5 bg-dark flex justify-center items-center flex-col'>
			<p className='text-sm text-light-w'>&copy; {new Date().getFullYear()} FormTok. Powered By Pukkok.</p>
			
			<div className="mt-2.5">
				{LINKS.map(item => (
					<a className={`mx-2.5 text-point-hover text-base transition-[color] duration-300 hover:text-point`}
						key={item.title} href={item.link} target="_blank" rel='noopener noreferrer'>{item.title}</a>
				))}
			</div>
		</footer>
	)
}

export default MainFooter