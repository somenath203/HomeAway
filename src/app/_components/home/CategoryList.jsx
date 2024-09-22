import Link from "next/link";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { categories } from "@/utils/categories";


const CategoryList = ({ categorySearchParams, searchBarSearchParams }) => {

  const searchParamStructure = searchBarSearchParams ? `&search=${searchBarSearchParams}` : '';


  return (
    <section>

      <ScrollArea className='py-6'>

        <div className="flex gap-x-4">

          {categories.map((categoryItem) => {

            const isActive = categoryItem.label === categorySearchParams;

            return <Link key={categoryItem.label} href={`/?category=${categoryItem.label}${searchParamStructure}`}>

              <article className={`p-3 flex flex-col items-center cursor-pointer duration-300 hover:text-primary w-[100px] ${isActive ? 'text-primary' : ''}`}>

                <categoryItem.icon className="w-8 h-8" />

                <p className="capitalize text-sm mt-1">{categoryItem.label}</p>

              </article>

            </Link>

          })}

        </div>

        <ScrollBar orientation='horizontal' />

      </ScrollArea>

    </section>
  )
}

export default CategoryList;