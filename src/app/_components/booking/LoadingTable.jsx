import { Skeleton } from "@/components/ui/skeleton";


const LoadingTable = () => {

  const tableRows = Array.from({ length: 5 }, (_, index) => {

    return <div className="mb-4" key={index}>
        <Skeleton className='w-full h-8 rounded' />
    </div>

  });

  return (
    <>{tableRows}</>
  )
}

export default LoadingTable;