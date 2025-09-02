import { Routes, Route, NavLink } from "react-router-dom";
import BlogList from "./pages/BlogList";
import BlogDetail from "./pages/BlogDetail";

export default function App() {
  return (
    <div className="h-screen grid grid-cols-[300px_1fr]">
      {/* Sidebar */}
      <h1 className="p-2">Your Name</h1>
      <aside
        className="h-full sticky top-0 px-6 py-7 border-r"
      >
        <div
          className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-teal-400"
          aria-hidden
        />
        <p className="text-sm text-[var(--muted)]">Developer • Writer</p>

        <div className="mt-4 space-y-2 text-sm">
          <a
            className="block hover:text-[var(--accent)]"
            href="mailto:you@example.com"
          >
            you@example.com
          </a>
          <a
            className="block hover:text-[var(--accent)]"
            href="https://github.com/yourhandle"
            target="_blank"
            rel="noreferrer"
          >
            github.com/yourhandle
          </a>
          <a
            className="block hover:text-[var(--accent)]"
            href="https://www.linkedin.com/in/yourhandle"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
        </div>

        <nav className="mt-6 flex flex-col gap-2 text-sm">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `transition-colors ${
                isActive
                  ? "text-[var(--accent)] font-medium"
                  : "hover:text-[var(--accent)]"
              }`
            }
          >
            Blog
          </NavLink>
        </nav>
      </aside>

      {/* Content */}
      <main className="h-full overflow-auto">
        <div className="mx-auto max-w-3xl px-6 py-10">
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}
