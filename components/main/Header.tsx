import Link from "next/link"
import { Button } from "../ui/button"


const links = [
  {
    title: 'Home',
    link: '/home'
  },
  {
    title: 'About',
    link: '/about'
  },
  {
    title: 'Contact',
    link: '/contact'
  }
]

const Header = () => {
  return (
    <header className='flex fixed w-full py-2 px-8 bg-neutral-600 justify-between items-center'>
      <div className="flex gap-2">

      {
        links.map(({
          title,
          link
        }, index) => (
          <Button key={index} 
            className="bg-neutral-700"
          >
          <Link href={link} key={title} className='w-14'>{title}</Link>
          </Button>))
      }
      </div>

      <div className="">
        <Link href="/login" className="text-white">Log In</Link>
      </div>
      </header>
  )
}

export default Header