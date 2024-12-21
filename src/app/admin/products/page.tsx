'use client'

import { File, ListFilter, PlusCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useProductsStore } from '@/features/products/store/products.store.provider'
import { useEffect, useState } from 'react'
import { ProductsTable } from '@/features/products/components/products-table'
import { ProductsCategory } from '@/interfaces/product.interface'
import { ProductDialog } from '@/features/products/components/product-dialog'

const tabValues = [
  ProductsCategory.all,
  ProductsCategory.ceramics,
  ProductsCategory.painting,
]

export default function Products() {
  const { products, isLoading, getAllProducts, deleteProduct } =
    useProductsStore((state) => state)

  const handleDeleteProduct = async (productId: string) => {
    await deleteProduct(productId)
    await getAllProducts({ category: selectedCategory })
  }

  const [selectedCategory, setSelectedCategory] = useState<ProductsCategory>(
    ProductsCategory.all,
  )

  useEffect(() => {
    getAllProducts({ category: selectedCategory })
  }, [selectedCategory])

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger
              value={ProductsCategory.all}
              onClick={() => setSelectedCategory(ProductsCategory.all)}
            >
              Все
            </TabsTrigger>
            <TabsTrigger
              value={ProductsCategory.ceramics}
              onClick={() => {
                setSelectedCategory(ProductsCategory.ceramics)
              }}
            >
              Керамика
            </TabsTrigger>
            <TabsTrigger
              value={ProductsCategory.painting}
              onClick={() => {
                setSelectedCategory(ProductsCategory.painting)
              }}
            >
              Живопись
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            {/*<DropdownMenu>*/}
            {/*  <DropdownMenuTrigger asChild>*/}
            {/*    <Button variant="outline" size="sm" className="h-8 gap-1">*/}
            {/*      <ListFilter className="h-3.5 w-3.5" />*/}
            {/*      <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">*/}
            {/*        Filter*/}
            {/*      </span>*/}
            {/*    </Button>*/}
            {/*  </DropdownMenuTrigger>*/}
            {/*  <DropdownMenuContent align="end">*/}
            {/*    <DropdownMenuLabel>Filter by</DropdownMenuLabel>*/}
            {/*    <DropdownMenuSeparator />*/}
            {/*    <DropdownMenuCheckboxItem checked>*/}
            {/*      Active*/}
            {/*    </DropdownMenuCheckboxItem>*/}
            {/*    <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>*/}
            {/*    <DropdownMenuCheckboxItem>Archived</DropdownMenuCheckboxItem>*/}
            {/*  </DropdownMenuContent>*/}
            {/*</DropdownMenu>*/}
            {/*<Button size="sm" variant="outline" className="h-8 gap-1">*/}
            {/*  <File className="h-3.5 w-3.5" />*/}
            {/*  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">*/}
            {/*    Export*/}
            {/*  </span>*/}
            {/*</Button>*/}
            <ProductDialog
              mode="add"
              trigger={
                <Button size="sm" className="h-8 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Добавить товар
                  </span>
                </Button>
              }
              category={selectedCategory}
            />
          </div>
        </div>
        {tabValues.map((value) => (
          <TabsContent key={value} value={value}>
            <ProductsTable
              products={products}
              isLoading={isLoading}
              onDeleteProduct={handleDeleteProduct}
            />
          </TabsContent>
        ))}
      </Tabs>
    </main>
  )
}
