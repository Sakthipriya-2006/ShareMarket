import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken } from '@/lib/auth';
import prisma from '@/lib/db';
import LeftSidebar from '@/components/LeftSidebar';
import Header from '@/components/Header';

async function getUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;
  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload) return null;

  try {
    return await prisma.user.findUnique({
      where: { id: payload.userId },
      include: { holdings: true },
    });
  } catch {
    return null;
  }
}

export default async function TerminalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) redirect('/login');

  return (
    <div className="h-screen flex overflow-hidden bg-slate-50">
      <LeftSidebar user={{ name: user.name, riskProfile: user.riskProfile }} />
      <div className="flex-1 flex flex-col min-w-0 ml-0 lg:ml-64 overflow-hidden">
        <Header
          user={{ id: user.id, name: user.name, cashBalance: user.cashBalance }}
        />
        <main className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
