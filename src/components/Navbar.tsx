import Link from 'next/link';
import { getAuth } from '@/lib/auth';
import { logout } from '@/app/actions/auth';
import { Microscope, LogOut, User as UserIcon, LayoutDashboard, Database } from 'lucide-react';

export default async function Navbar() {
  const auth = await getAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-6">
        <div className="flex items-center gap-10">
          <Link href="/" className="flex items-center gap-2 font-black text-slate-900 text-2xl tracking-tighter hover:opacity-90 transition-opacity">
            <div className="p-1.5 bg-blue-600 rounded-lg text-white">
              <Microscope size={22} />
            </div>
            AASAMEDCHEM
          </Link>
          
          <div className="hidden md:flex items-center gap-1">
            <Link href="/" className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">Platform</Link>
            <Link href="#" className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">Compliance</Link>
            <Link href="#" className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-blue-600 transition-colors">Pricing</Link>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          {auth ? (
            <>
              <div className="hidden sm:flex items-center gap-2 mr-4">
                {auth.role === 'ADMIN' ? (
                  <Link href="/admin" className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-black uppercase tracking-widest rounded-lg transition-all">
                    <Database size={14} /> Admin Node
                  </Link>
                ) : (
                  <Link href="/seller" className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-black uppercase tracking-widest rounded-lg transition-all">
                    <LayoutDashboard size={14} /> Ops Dashboard
                  </Link>
                )}
              </div>
              
              <div className="flex items-center gap-3 pr-4 border-r border-slate-100">
                <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                  <UserIcon size={16} />
                </div>
                <div className="hidden lg:block text-left">
                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider leading-none mb-1">Authenticated</div>
                  <div className="text-xs font-bold text-slate-900 leading-none">{auth.email}</div>
                </div>
              </div>
              
              <form action={logout}>
                <button type="submit" className="p-2 text-slate-400 hover:text-red-500 transition-colors" title="Initialize Logout Protocol">
                  <LogOut size={20} />
                </button>
              </form>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="px-5 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 transition-colors">
                Sign In
              </Link>
              <Link href="/register" className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-slate-100">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
