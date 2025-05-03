// components/Footer.tsx
import { Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t mt-16 py-6 text-sm text-gray-500">
      <div className="container max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-center sm:text-left">
          © {new Date().getFullYear()}. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a
            href="#"
            aria-label="GitHub"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors"
          >
            <Twitter className="w-5 h-5" />
          </a>
          <a
            href="#"
            aria-label="Email"
            className="hover:text-black transition-colors"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
