import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <Image 
              src="/Horizontal_TM_Light.svg" 
              alt="Trucksafe" 
              width={200} 
              height={60}
              className="h-12 w-auto mb-6"
            />
            <p className="text-gray-400 leading-relaxed max-w-md mb-6">
              Learn about DOT compliance with Trucksafe, the United States leader in safety consulting and online training.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://twitter.com/TrucksafeLLC" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/company/trucksafeconsulting" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/TrucksafeConsulting" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/channel/UCekMTCpS9EIH-aeC3XtYfeg" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-lg flex items-center justify-center transition">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="/services" className="text-gray-400 hover:text-[#dd8157] transition text-sm">Consulting</a></li>
              <li><a href="/academy" className="text-gray-400 hover:text-[#dd8157] transition text-sm">Trucksafe Academy</a></li>
              <li><a href="/bootcamp" className="text-gray-400 hover:text-[#dd8157] transition text-sm">Bootcamp</a></li>
              <li><a href="/compliance-plus" className="text-gray-400 hover:text-[#dd8157] transition text-sm">Compliance Plus</a></li>
              <li><a href="/network" className="text-gray-400 hover:text-[#dd8157] transition text-sm">Trucksafe Network</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="/blog" className="text-gray-400 hover:text-[#dd8157] transition text-sm">Articles</a></li>
              <li><a href="/live" className="text-gray-400 hover:text-[#dd8157] transition text-sm">Trucksafe LIVE!</a></li>
              <li><a href="/shop" className="text-gray-400 hover:text-[#dd8157] transition text-sm">Shop</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-400 hover:text-[#dd8157] transition text-sm">About</a></li>
              <li><a href="/contact" className="text-gray-400 hover:text-[#dd8157] transition text-sm">Contact</a></li>
              <li><a href="/login" className="text-gray-400 hover:text-[#dd8157] transition text-sm">Log In</a></li>
              <li><a href="/privacy" className="text-gray-400 hover:text-[#dd8157] transition text-sm">Privacy Policy</a></li>
              <li><a href="/terms" className="text-gray-400 hover:text-[#dd8157] transition text-sm">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-sm text-gray-400">
            © 2026 Trucksafe Consulting, LLC. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <a href="/privacy" className="hover:text-white transition">Privacy Policy</a>
            <a href="/terms" className="hover:text-white transition">Terms of Service</a>
            <a href="/contact" className="hover:text-white transition">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
