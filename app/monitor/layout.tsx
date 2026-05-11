export default function MonitorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="h-dvh overflow-hidden bg-black text-slate-900">{children}</div>
  );
}
