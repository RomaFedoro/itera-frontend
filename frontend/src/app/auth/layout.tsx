export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="content content_dark content_fill">{children}</div>;
}
