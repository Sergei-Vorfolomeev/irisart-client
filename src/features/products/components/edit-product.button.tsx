import { ProductDialog } from '@/features/products/components/product-dialog'
import { Button } from '@/components/ui/button'
import { Pencil } from 'lucide-react'
import { Product } from '@/interfaces/product.interface'
import { ReactNode } from 'react'

type PropsType = {
  product: Product
}

export const EditProductButton = ({ product }: PropsType) => {
  return (
    <ProductDialog
      product={product}
      mode={'edit'}
      trigger={
        <Button variant={'ghost'} className="h-8 gap-1">
          <Pencil className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Изменить
          </span>
        </Button>
      }
    />
  )
}
