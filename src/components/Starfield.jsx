export default function Starfield() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div className="absolute inset-0 bg-space" />
      <div className="absolute -left-24 -top-24 h-96 w-96 rounded-full bg-galaxy/20 blur-3xl" />
      <div className="absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-climate/10 blur-3xl" />
      <div className="absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-nature/10 blur-3xl" />
      <div className="starfield-stars absolute inset-0" />
    </div>
  )
}
