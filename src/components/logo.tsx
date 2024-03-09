import Link from 'next/link'

const Logo = () => {
  return (
    <Link
      href="/"
      className="font-bold text-2xl bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text hover:cursor-pointer"
    >
      AI Form Builder
    </Link>
  )
}

export default Logo