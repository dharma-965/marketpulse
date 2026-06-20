type LoadingSkeletonProps = {
  count?: number;
};

export default function LoadingSkeleton({ count = 3 }: LoadingSkeletonProps) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="h-28 rounded-[1.75rem] bg-slate-200/80 shadow-sm animate-pulse dark:bg-slate-800" />
      ))}
    </div>
  );
}
