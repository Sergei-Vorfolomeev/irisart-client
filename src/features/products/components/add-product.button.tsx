import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import { ProductDialog } from '@/features/products/components/product-dialog'

export const AddProductButton = () => {
  return (
    <ProductDialog
      mode={'add'}
      trigger={
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Product
          </span>
        </Button>
      }
    />
  )
}
