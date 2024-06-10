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
import { PlusCircle } from 'lucide-react'
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
import { ProductsCategory } from '@/interfaces/product.interface'
import { Checkbox } from '@/components/ui/checkbox'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useProductsStore } from '@/features/products/store/products.store.provider'
import { useState } from 'react'

const productSchema = z.object({
  name: z.string().trim().min(1, 'Обязательное поле'),
  description: z.string().trim().min(1, 'Обязательное поле'),
  category: z
    .nativeEnum(ProductsCategory, {
      required_error: 'Категория обязательна',
      message: 'Некорректная категория',
    })
    .refine((val) => Object.values(ProductsCategory).includes(val), {
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

export const AddProductDialog = () => {
  const { addProduct } = useProductsStore((state) => state)

  const [isOpen, setIsOpen] = useState(false)

  const { handleSubmit, control, reset } = useForm<ProductSchemaType>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      description: '',
      category: undefined,
      price: undefined,
      isAvailable: false,
    },
  })

  const onSubmit: SubmitHandler<ProductSchemaType> = async (data) => {
    await addProduct(data)
    reset()
    setIsOpen(false)
  }

  const handleDialogClose = (open: boolean) => {
    if (!open) reset()
    setIsOpen(open)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => handleDialogClose(open)}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1" onClick={() => setIsOpen(true)}>
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Product
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[625px]">
        <DialogHeader>
          <DialogTitle>Добавить новый товар</DialogTitle>
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
            <Button type="submit">Добавить товар</Button>
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
