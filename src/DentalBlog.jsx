import { useEffect, useState } from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';

// Optional: set VITE_BLOG_API_URL to a WordPress REST API posts endpoint.
// For example: https://example.com/wp-json/wp/v2/posts?per_page=6
const API_URL = import.meta.env.VITE_BLOG_API_URL;
const evergreen = [
  { id: 'care', title: 'Five signs it may be time for a dental checkup', excerpt: 'Persistent pain, bleeding gums, sensitivity, bad breath, or a broken tooth are reasons to speak with a dental professional.', category: 'Oral health basics' },
  { id: 'scaling', title: 'What actually happens during scaling and polishing?', excerpt: 'Learn how professional cleaning helps remove plaque and hardened tartar that ordinary brushing cannot remove.', category: 'Dental treatments' },
  { id: 'urgent', title: 'Toothache at home: what to do while arranging care', excerpt: 'Avoid self-medicating with leftover antibiotics. Ask a dentist for advice; severe swelling or trouble breathing needs urgent hospital care.', category: 'Dental concerns' },
];
function cleanHtml(value = '') {
  const doc = new DOMParser().parseFromString(value, 'text/html');
  return (doc.body.textContent || '').replace(/\s+/g, ' ').trim();
}
export default function DentalBlog() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!API_URL) return;
    let active = true;
    const controller = new AbortController();
    fetch(API_URL, { signal: controller.signal })
      .then(r => { if (!r.ok) throw new Error('Blog request failed'); return r.json(); })
      .then(data => { if (active && Array.isArray(data)) setPosts(data.slice(0, 6)); })
      .catch(err => { if (active && err.name !== 'AbortError') setError(true); });
    return () => { active = false; controller.abort(); };
  }, []);
  return <section id="blog" className="scroll-mt-28 bg-white px-4 py-20 sm:px-6">
    <div className="mx-auto max-w-6xl"><div className="mb-10 text-center"><span className="text-sm font-extrabold uppercase tracking-widest text-blue-700">Patient education</span><h2 className="mt-3 text-4xl font-extrabold text-slate-900 md:text-5xl">Dental Health Journal</h2><p className="mx-auto mt-4 max-w-2xl text-slate-600">Practical advice and updates to help you look after your smile.</p></div>
    <div className="grid gap-6 md:grid-cols-3">{(posts.length ? posts : evergreen).map(post => {
      const fromApi = posts.length > 0;
      const title = fromApi ? cleanHtml(post.title?.rendered) : post.title;
      const excerpt = fromApi ? cleanHtml(post.excerpt?.rendered) : post.excerpt;
      return <article key={post.id} className="flex min-w-0 flex-col rounded-3xl border border-blue-100 bg-slate-50 p-7 shadow-sm"><BookOpen size={30} className="text-blue-700" /><p className="mt-5 text-xs font-extrabold uppercase tracking-widest text-blue-700">{fromApi ? new Date(post.date).toLocaleDateString('en-NG', { year: 'numeric', month: 'short', day: 'numeric' }) : post.category}</p><h3 className="mt-3 text-xl font-bold leading-snug text-slate-900">{title}</h3><p className="mt-3 flex-1 text-sm leading-7 text-slate-600">{excerpt.slice(0, 240)}{excerpt.length > 240 ? '…' : ''}</p>{fromApi && post.link && <a className="mt-5 inline-flex items-center gap-2 font-bold text-blue-700 underline" href={post.link} target="_blank" rel="noopener noreferrer">Read full article <ExternalLink size={16}/></a>}</article>;
    })}</div>
    <p className="mt-7 text-center text-xs text-slate-500">{posts.length ? 'Latest published articles from our connected blog. New posts appear when published.' : error ? 'Live articles are temporarily unavailable. Showing general dental education topics.' : 'Showing evergreen dental education topics. Connect a publishing source for continuously updated articles.'}</p>
    </div></section>;
}
