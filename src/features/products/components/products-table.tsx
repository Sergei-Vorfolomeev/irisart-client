import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns/format'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Delete, MoreHorizontal, Trash } from 'lucide-react'
import { Product } from '@/interfaces/product.interface'
import { EditProductButton } from '@/features/products/components/edit-product.button'

type PropsType = {
  products: Product[]
  isLoading: boolean
  onDeleteProduct: (id: string) => void
}

export const ProductsTable = ({
  products,
  isLoading,
  onDeleteProduct,
}: PropsType) => {
  return (
    <Card x-chunk="dashboard-06-chunk-0">
      <CardHeader>
        <CardTitle>Products</CardTitle>
        <CardDescription>
          Manage your products and view their sales performance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Название</TableHead>
              <TableHead>Описание</TableHead>
              <TableHead>Категория</TableHead>
              <TableHead>Наличие</TableHead>
              <TableHead className="hidden md:table-cell">Цена</TableHead>
              <TableHead className="hidden md:table-cell">
                Дата создания
              </TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <div>
                {/*<Skeleton className="h-44 w-full" />*/}
                <TableRow>
                  <div>Loading</div>
                </TableRow>
              </div>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={product.image || ''}
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="font-medium">
                    {product.description}
                  </TableCell>
                  <TableCell className="font-medium">
                    {product.category}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">
                      {product.isAvailable ? 'В наличии' : 'Нет в наличии'}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.price}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {format(product.createdAt, 'dd.MM.yyyy')}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className={'flex flex-col justify-start'}
                      >
                        {/*<DropdownMenuItem>*/}
                        <EditProductButton product={product} />
                        {/*</DropdownMenuItem>*/}
                        {/*<DropdownMenuItem>*/}
                        <Button
                          variant={'ghost'}
                          className="h-8 gap-1 justify-start"
                          onClick={() => onDeleteProduct(product.id)}
                        >
                          <Trash className="h-3.5 w-3.5" />
                          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                            Удалить
                          </span>
                        </Button>
                        {/*</DropdownMenuItem>*/}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="text-xs text-muted-foreground">
          Showing <strong>1-10</strong> of <strong>32</strong> products
        </div>
      </CardFooter>
    </Card>
  )
}
