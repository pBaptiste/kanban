import Navbar from '@/components/navbar'
import Board from '@/components/board'
import Sidebar from '@/components/sidebar'

export default function Home() {
  return (
    <main className="relative flex h-screen flex-col md:flex-row">

      <section className='basis-full h-full overflow-hidden'>
        <Navbar />
        <Board />
      </section>

      <aside className='hidden md:block order-first'>
        <Sidebar />
      </aside>

    </main>
  )
}
