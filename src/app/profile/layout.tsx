export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <div className="bg-gray-100 pt-1">
      {children}
    </div>
  );
}