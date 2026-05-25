const socials = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Behance", href: "https://behance.net" },
  { label: "Github", href: "https://github.com" },
];

export default function Footer() {
  return (
    <footer className="px-6 md:px-12 py-8 border-t border-black/[0.05] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
      <div className="flex gap-6 text-xs text-black/20">
        {socials.map((s) => (
          <a
            key={s.href}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition-colors duration-300"
          >
            {s.label}
          </a>
        ))}
      </div>
      <p className="text-xs text-black/15">Design &amp; code by Ade Harseno</p>
    </footer>
  );
}
