export const metadata = {
  title: "Lovable + Supabase MVP Starter",
  description: "Next.js + Supabase starter",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui", margin: 0 }}>{children}</body>
    </html>
  );
}
