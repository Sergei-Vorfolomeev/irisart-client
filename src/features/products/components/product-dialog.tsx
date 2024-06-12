import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Product, ProductsCategory } from '@/interfaces/product.interface'
import { Checkbox } from '@/components/ui/checkbox'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useProductsStore } from '@/features/products/store/products.store.provider'
import { ReactNode, useEffect, useState } from 'react'
import { Spinner } from '@/components/icons/spinner'

const productSchema = z.object({
  name: z.string().trim().min(1, 'Обязательное поле'),
  description: z.string().trim().min(1, 'Обязательное поле'),
  category: z.nativeEnum(ProductsCategory, {
    required_error: 'Категория обязательна',
    message: 'Некорректная категория',
  }),
  price: z
    .number({
      message: 'Обязательное поле. Должно быть числом',
    })
    .positive({ message: 'Обязательное поле' }),
  isAvailable: z.boolean(),
})

type ProductSchemaType = z.infer<typeof productSchema>

type PropsType = {
  mode: 'add' | 'edit'
  trigger: ReactNode
  product?: Product
}

export const ProductDialog = ({ product, mode, trigger }: PropsType) => {
  const { addProduct, updateProduct, isLoading } = useProductsStore(
    (state) => state,
  )
  const [isOpen, setIsOpen] = useState(false)

  const { handleSubmit, control, reset } = useForm<ProductSchemaType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      category: product?.category || undefined,
      price: product?.price || undefined,
      isAvailable: product?.isAvailable || false,
    },
  })

  const onSubmit: SubmitHandler<ProductSchemaType> = async (data) => {
    if (mode === 'edit' && product) {
      await updateProduct(product?.id, data)
    } else {
      await addProduct(data)
    }
    setIsOpen(false)
    reset()
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      reset()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => handleOpenChange(open)}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>
            {mode === 'add' ? 'Добавить новый товар' : 'Изменить товар'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <Controller
              name={'name'}
              control={control}
              render={({ field, fieldState, formState }) => (
                <div className="grid grid-cols-5 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Название
                  </Label>
                  <Input
                    id="name"
                    name={field.name}
                    value={field.value}
                    placeholder={
                      fieldState.error
                        ? fieldState.error.message
                        : 'Введите название товара'
                    }
                    className={`col-span-4 ${fieldState.error && 'border-red-500 placeholder:text-red-500'}`}
                    onChange={field.onChange}
                  />
                </div>
              )}
            />

            <Controller
              name={'description'}
              control={control}
              render={({ field, fieldState, formState }) => (
                <div className="grid grid-cols-5 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Описание
                  </Label>
                  <Textarea
                    id="description"
                    name={field.name}
                    value={field.value}
                    placeholder={
                      fieldState.error
                        ? fieldState.error.message
                        : 'Введите описание товара'
                    }
                    className={`col-span-4 ${fieldState.error && 'border-red-500 placeholder:text-red-500'}`}
                    onChange={field.onChange}
                  />
                </div>
              )}
            />

            <Controller
              name="category"
              control={control}
              render={({ field, fieldState }) => (
                <div className="grid grid-cols-5 items-center gap-4">
                  <Label htmlFor="category" className="text-right">
                    Категория
                  </Label>
                  <Select
                    name={field.name}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger
                      id="category"
                      className={`w-full col-span-4 ${
                        fieldState.error && 'border-red-500'
                      }`}
                    >
                      <SelectValue
                        placeholder={
                          fieldState.error ? (
                            <span className="text-red-500">
                              Обязательное поле
                            </span>
                          ) : (
                            'Выберите категорию'
                          )
                        }
                        className="w-full"
                      />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value={ProductsCategory.painting}>
                          Живопись
                        </SelectItem>
                        <SelectItem value={ProductsCategory.ceramics}>
                          Керамика
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              )}
            />

            <Controller
              name={'price'}
              control={control}
              render={({ field, fieldState, formState }) => (
                <div className="grid grid-cols-5 items-center gap-4">
                  <Label htmlFor="price" className="text-right">
                    Цена
                  </Label>
                  <Input
                    id="price"
                    name={field.name}
                    value={field.value}
                    placeholder={
                      fieldState.error
                        ? fieldState.error.message
                        : 'Введите цену товара'
                    }
                    className={`col-span-4 ${fieldState.error && 'border-red-500 placeholder:text-red-500'}`}
                    onChange={(e) => field.onChange(parseFloat(e.target.value))}
                  />
                </div>
              )}
            />

            <Controller
              name="isAvailable"
              control={control}
              render={({ field, fieldState }) => (
                <div className="grid grid-cols-5 items-center gap-4">
                  <Label htmlFor="isAvailable" className="text-right">
                    В наличии
                  </Label>
                  <Checkbox
                    id="isAvailable"
                    name={field.name}
                    checked={field.value}
                    defaultChecked={false}
                    onCheckedChange={field.onChange}
                  />
                  {fieldState.error?.message}
                </div>
              )}
            />
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={isLoading}
              className="min-w-[150px]"
            >
              {isLoading ? (
                <Spinner />
              ) : mode === 'add' ? (
                'Добавить товар'
              ) : (
                'Сохранить изменения'
              )}
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
