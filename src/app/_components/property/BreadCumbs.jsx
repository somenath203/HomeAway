import Link from 'next/link';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';


const BreadCumbs = ({ propertyName }) => {
  return (
    <Breadcrumb>

      <BreadcrumbList>

        <BreadcrumbItem>
          <Link href='/'>Home</Link>
        </BreadcrumbItem>

        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbPage>{propertyName}</BreadcrumbPage>
        </BreadcrumbItem>
        
      </BreadcrumbList>

    </Breadcrumb>
  )
}

export default BreadCumbs;