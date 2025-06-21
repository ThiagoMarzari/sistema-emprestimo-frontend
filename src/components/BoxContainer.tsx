export function BoxContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full mb-6 p-6 border rounded-lg bg-white shadow-md">
      {children}
    </div>
  )
}