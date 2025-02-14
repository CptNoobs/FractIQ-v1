export function GeometricBackground() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-background">
      <div className="absolute h-full w-full">
        {/* Gradient layers */}
        <div
          className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-primary/5 to-transparent blur-3xl"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-transparent blur-3xl"
          style={{
            clipPath:
              "polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)",
          }}
        />
      </div>

      {/* Grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />
    </div>
  );
}
