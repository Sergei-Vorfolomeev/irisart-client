import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import Link from 'next/link'
import {
  Home,
  LineChart,
  Package,
  Package2,
  PanelLeft,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from 'lucide-react'
import { ThemeToggle } from '@/lib/theme-toggle'
import { useState } from 'react'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Image from 'next/image'
import { Header } from '@/components/organisms/header'
import { NavMenu } from '@/components/organisms/nav-menu'

export const Sidebar = () => {
  return (
    <>
      <TooltipProvider>
        <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
              href="#"
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">IrisArt logo</span>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span className="sr-only">Orders</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Orders</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Package className="h-5 w-5" />
                  <span className="sr-only">Products</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Products</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Users2 className="h-5 w-5" />
                  <span className="sr-only">Customers</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Customers</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <LineChart className="h-5 w-5" />
                  <span className="sr-only">Analytics</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Analytics</TooltipContent>
            </Tooltip>
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </nav>
        </aside>
      </TooltipProvider>
      <div className="flex flex-col sm:gap-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Главная
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Каталог
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Заказы
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users2 className="h-5 w-5" />
                  Блог
                </Link>
                <Link
                  href="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Настройки
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          {/*<Breadcrumb className="hidden md:flex">*/}
          {/*  <BreadcrumbList>*/}
          {/*    <BreadcrumbItem>*/}
          {/*      <BreadcrumbLink asChild>*/}
          {/*        <Link href="#">Dashboard</Link>*/}
          {/*      </BreadcrumbLink>*/}
          {/*    </BreadcrumbItem>*/}
          {/*    <BreadcrumbSeparator />*/}
          {/*    <BreadcrumbItem>*/}
          {/*      <BreadcrumbLink asChild>*/}
          {/*        <Link href="#">Products</Link>*/}
          {/*      </BreadcrumbLink>*/}
          {/*    </BreadcrumbItem>*/}
          {/*    <BreadcrumbSeparator />*/}
          {/*    <BreadcrumbItem>*/}
          {/*      <BreadcrumbPage>All Products</BreadcrumbPage>*/}
          {/*    </BreadcrumbItem>*/}
          {/*  </BreadcrumbList>*/}
          {/*</Breadcrumb>*/}
          <div className="grid gap-10 items-center h-20 w-full bg-muted/40">
            {/*<Header />*/}
            <NavMenu />
            {/*SEARCH INPUT*/}
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div>

            {/*AVATAR*/}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="overflow-hidden rounded-full"
                >
                  <Image
                    src="/placeholder-user.jpg"
                    width={36}
                    height={36}
                    alt="Avatar"
                    className="overflow-hidden rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Настройки</DropdownMenuItem>
                <DropdownMenuItem>Поддержка</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Выйти</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
      </div>
    </>
    // <aside className="fixed top-16 left-0 bottom-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
    //   <TooltipProvider>
    //     <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
    //       <Link
    //         href="src/components/layout#"
    //         className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
    //       >
    //         <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
    //         <span className="sr-only">Acme Inc</span>
    //       </Link>
    //
    //       <Tooltip>
    //         <TooltipTrigger asChild>
    //           <Link
    //             href="src/components/layout#"
    //             className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
    //           >
    //             <Home className="h-5 w-5" />
    //             <span className="sr-only">Dashboard</span>
    //           </Link>
    //         </TooltipTrigger>
    //         <TooltipContent side="right">Dashboard</TooltipContent>
    //       </Tooltip>
    //
    //       <Tooltip>
    //         <TooltipTrigger asChild>
    //           <Link
    //             href="src/components/layout#"
    //             className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
    //           >
    //             <ShoppingCart className="h-5 w-5" />
    //             <span className="sr-only">Orders</span>
    //           </Link>
    //         </TooltipTrigger>
    //         <TooltipContent side="right">Orders</TooltipContent>
    //       </Tooltip>
    //
    //       <Tooltip>
    //         <TooltipTrigger asChild>
    //           <Link
    //             href="src/components/layout#"
    //             className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
    //           >
    //             <Package className="h-5 w-5" />
    //             <span className="sr-only">Products</span>
    //           </Link>
    //         </TooltipTrigger>
    //         <TooltipContent side="right">Products</TooltipContent>
    //       </Tooltip>
    //
    //       <Tooltip>
    //         <TooltipTrigger asChild>
    //           <Link
    //             href="src/components/layout#"
    //             className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
    //           >
    //             <Users2 className="h-5 w-5" />
    //             <span className="sr-only">Customers</span>
    //           </Link>
    //         </TooltipTrigger>
    //         <TooltipContent side="right">Customers</TooltipContent>
    //       </Tooltip>
    //
    //       <Tooltip>
    //         <TooltipTrigger asChild>
    //           <Link
    //             href="src/components/layout#"
    //             className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
    //           >
    //             <LineChart className="h-5 w-5" />
    //             <span className="sr-only">Analytics</span>
    //           </Link>
    //         </TooltipTrigger>
    //         <TooltipContent side="right">Analytics</TooltipContent>
    //       </Tooltip>
    //     </nav>
    //
    //     <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
    //       <ThemeToggle />
    //
    //       <Tooltip>
    //         <TooltipTrigger asChild>
    //           <Link
    //             href="src/components/layout#"
    //             className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
    //           >
    //             <Settings className="h-5 w-5" />
    //             <span className="sr-only">Settings</span>
    //           </Link>
    //         </TooltipTrigger>
    //         <TooltipContent side="right">Settings</TooltipContent>
    //       </Tooltip>
    //     </nav>
    //   </TooltipProvider>
    // </aside>
  )
}
