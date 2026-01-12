import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
    return (
        <div className="bg-gray-50 min-h-screen pb-12">
            {/* Header Skeleton */}
            <div className="bg-white shadow-sm py-8 mb-8">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <Skeleton className="h-10 w-64 mb-4" />
                    <Skeleton className="h-4 w-96" />
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar Skeleton */}
                    <aside className="lg:w-1/4">
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                            <Skeleton className="h-6 w-24 mb-6" />
                            <div className="space-y-4">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-10 w-full" />
                                <Skeleton className="h-4 w-32 mt-6" />
                                <Skeleton className="h-10 w-full" />
                            </div>
                        </div>
                    </aside>

                    {/* Content Skeleton */}
                    <div className="lg:w-3/4">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm h-[400px]">
                                    <Skeleton className="h-[250px] w-full" />
                                    <div className="p-4 space-y-3">
                                        <div className="flex justify-between">
                                            <Skeleton className="h-4 w-20" />
                                            <Skeleton className="h-4 w-16" />
                                        </div>
                                        <Skeleton className="h-6 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                        <div className="flex gap-2 pt-2">
                                            <Skeleton className="h-4 w-12" />
                                            <Skeleton className="h-4 w-12" />
                                            <Skeleton className="h-4 w-12" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
