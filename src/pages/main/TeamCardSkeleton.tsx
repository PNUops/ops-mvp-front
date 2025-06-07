const TeamCardSkeleton = () => {
    return (
        <section className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-8">
            <div
                className="border-lightGray flex aspect-[5/6] w-full flex-col overflow-hidden rounded-xl border animate-pulse"
                style={{
                    boxShadow: "6px 6px 12px rgba(0,0,0,0.1)",
                }}
            >
                <div className="aspect-[3/2] w-full bg-lightGray"/>

                <div className="relative flex flex-1 flex-col justify-between p-4">
                    <div className="flex flex-col gap-2">
                        <div className="rounded bg-lightGray h-[clamp(1rem,1.5vw,1.5rem)] w-[clamp(40%,50%,75%)]"/>
                        <div className="rounded bg-lightGray h-[clamp(0.8rem,1.2vw,1.25rem)] w-[clamp(clamp(30%,40%,50%))]"/>
                    </div>

                    <div className="flex justify-end">
                        <div className="rounded-full bg-lightGray w-[clamp(1.25rem,2vw,1.5rem)] h-[clamp(1.25rem,2vw,1.5rem)]"/>
                    </div>
                </div>
            </div>
        </section>
    );
};

            export default TeamCardSkeleton;
