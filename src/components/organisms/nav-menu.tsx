'use client'

import * as React from 'react'
import { useEffect } from 'react'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import Image from 'next/image'
import { useArticlesStore } from '@/features/articles/store/articles.store.provider'

interface INavList {
  title: string
  href: string
  description: string
}

const navList: INavList[] = [
  {
    title: 'Изделия из керамики',
    href: '/docs/primitives/alert-dialog',
    description:
      'Коллекция уникальных керамических изделий, включая вазы, тарелки и художественные элементы. Идеально подходят для декора и повседневного использования.',
  },
  {
    title: 'Акварельная живопись',
    href: '/docs/primitives/hover-card',
    description:
      'Тонкие и яркие акварельные картины, которые захватывают красоту природы и эмоции через нежные цвета и текстуры.',
  },
  {
    title: 'Масляная живопись',
    href: '/docs/primitives/progress',
    description:
      'Картины, написанные масляными красками, которые отличаются глубиной цвета и богатством текстуры. Идеально подходят для создания выразительных образов.',
  },
  {
    title: 'Ювелирные украшения',
    href: '/docs/primitives/scroll-area',
    description:
      'Элегантные и уникальные ювелирные изделия, созданные с вниманием к деталям. Каждое украшение является произведением искусства.',
  },
  {
    title: 'Современная скульптура',
    href: '/docs/primitives/sculpture',
    description:
      'Креативные 3D-изделия, которые добавляют современный акцент в любой интерьер. Сделано из различных материалов, таких как металл, дерево и камень.',
  },
  {
    title: 'Ткани и текстиль',
    href: '/docs/primitives/fabric',
    description:
      'Оригинальные текстильные изделия, включая подушки, пледы и скатерти, выполненные в уникальных дизайнах и узорах.',
  },
  {
    title: 'Графические дизайны',
    href: '/docs/primitives/graphic-design',
    description:
      'Создание уникальных графических работ, включая постеры, иллюстрации и цифровые произведения искусства. Идеально для декора стен.',
  },
  {
    title: 'Фотографии и искусство',
    href: '/docs/primitives/photography',
    description:
      'Сборник художественной фотографии, которая запечатлевает красоту момента и передает глубокие эмоции через визуальную историю.',
  },
]

export function NavMenu() {
  const { articles, getAllArticles } = useArticlesStore((state) => state)

  useEffect(() => {
    getAllArticles()
  }, [])

  return (
    <NavigationMenu className="hidden sm:block">
      <NavigationMenuList className="gap-12">
        <NavigationMenuItem>
          <NavigationMenuTrigger>Каталог</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {navList.map(({ title, description, href }) => (
                <ListItem key={title} title={title} href={href}>
                  {description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Мастер-классы</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md relative"
                    href="/"
                  >
                    <Image
                      alt="мастер класс изображение"
                      src="/img/master-class-img.jpeg"
                      layout="fill"
                    />
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem
                href="/docs/masterclass/watercolor"
                title="Акварельная живопись"
              >
                Узнайте техники акварельной живописи от профессионалов.
              </ListItem>
              <ListItem
                href="/docs/masterclass/oil-painting"
                title="Масляная живопись"
              >
                Изучите основы масляной живописи и создайте свои шедевры.
              </ListItem>
              <ListItem href="/docs/masterclass/ceramics" title="Керамика">
                Освоите гончарное дело и создайте уникальные керамические
                изделия.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Интересные статьи</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {articles.map(({ title, description }) => (
                <ListItem key={title} title={title} href="">
                  {description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/docs" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Доставка и оплата
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = 'ListItem'
