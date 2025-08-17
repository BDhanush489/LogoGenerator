import React from "react";

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-8">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Logo & About */}
        <div>
          <h2 className="text-2xl font-bold">LogoMaker Pro</h2>
          <p className="mt-3 text-sm text-gray-200">
            Create stunning, AI-generated logos in seconds.  
            Design with ease and make your brand stand out.
          </p>
        </div>

        {/* Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:underline">Home</a>
            </li>
            <li>
              <a href="/about" className="hover:underline">About</a>
            </li>
            <li>
              <a href="/pricing" className="hover:underline">Pricing</a>
            </li>
            <li>
              <a href="/contact" className="hover:underline">Contact</a>
            </li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-200">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M22 5.924c-.793.35-1.644.587-2.538.693a4.438 4.438 0 0 0 1.95-2.45 8.9 8.9 0 0 1-2.808 1.074A4.421 4.421 0 0 0 16.06 4a4.42 4.42 0 0 0-4.418 4.42c0 .347.04.685.115 1.01A12.55 12.55 0 0 1 3.1 4.834a4.42 4.42 0 0 0-.598 2.22c0 1.533.78 2.884 1.962 3.674a4.393 4.393 0 0 1-2.002-.553v.056a4.422 4.422 0 0 0 3.543 4.333 4.424 4.424 0 0 1-1.998.076 4.422 4.422 0 0 0 4.132 3.072A8.866 8.866 0 0 1 2 19.54a12.505 12.505 0 0 0 6.794 1.992c8.152 0 12.61-6.753 12.61-12.61 0-.192-.004-.384-.013-.574A9.01 9.01 0 0 0 22 5.924z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-gray-200">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.04c-5.51 0-9.96 4.45-9.96 9.96 0 4.41 3.6 8.06 8.26 8.92v-6.3h-2.5v-2.62h2.5V9.79c0-2.48 1.47-3.85 3.72-3.85 1.08 0 2.22.2 2.22.2v2.44h-1.25c-1.23 0-1.61.77-1.61 1.55v1.86h2.74l-.44 2.62h-2.3v6.3c4.66-.86 8.26-4.51 8.26-8.92 0-5.51-4.45-9.96-9.96-9.96z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-gray-200">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M21.6 0H2.4C1.08 0 0 1.08 0 2.4v19.2C0 22.92 1.08 24 2.4 24h10.3v-8.35H9.69V12h3.01V9.41c0-2.98 1.82-4.6 4.48-4.6 1.27 0 2.36.09 2.67.13v3.09h-1.83c-1.43 0-1.7.68-1.7 1.67V12h3.39l-.44 3.65h-2.95V24h5.78c1.32 0 2.4-1.08 2.4-2.4V2.4C24 1.08 22.92 0 21.6 0z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="mt-8 border-t border-white/20 pt-4 text-center text-sm text-gray-200">
        © {new Date().getFullYear()} LogoMaker Pro. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
