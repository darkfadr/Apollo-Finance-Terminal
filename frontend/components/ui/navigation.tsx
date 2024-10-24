"use client"
import {
  Terminal,
  DollarSign,
  HomeIcon,
  ChartArea,
  Globe,
  Newspaper,
  Book,
  Bitcoin,
  BarChart,
  Search,
} from "lucide-react"
import { InfoCircledIcon, SlashIcon } from "@radix-ui/react-icons"

import { ThemeToggle } from "./theme-toggle"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link"
import GoBack from "./go-back"
import { usePathname, useRouter } from "next/navigation"
import CommandMenu from "./command-menu"
import { Button } from "./button"
import { Separator } from "./separator"

const NAVIGATION = [
  { title: "Stocks", href: "/stocks/NVDA", icon: <BarChart /> },
  // { title: "Crypto", href: "/crypto", icon: <Bitcoin /> },
  // { title: "News", href: "/news", icon: <Newspaper /> },
  // { title: "Search", href: "/search", icon: <Search /> },
]

const EDUCATION = [
  { title: "Guide", href: "/guide", icon: <Book /> },
  { title: "Credits", href: "/credits", icon: <InfoCircledIcon /> },
]

export function BreadcrumbWithCustomSeparator() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink href="/stocks">Securities</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>TCKR</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default function Navigation() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 mb-4 mt-4 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container">
        <div className="mb-1 flex w-full flex-row justify-between py-4">
          <div className="flex flex-row items-center">
            <Link href="/" className="ml-2 text-lg font-bold">
              Apollo Finance Terminal
            </Link>
          </div>
          <div className="flex flex-row items-center gap-2">
            {/* <NavigationMenu>
              <NavigationMenuList>
                {NAVIGATION.map((item) => (
                  <NavigationMenuItem key={item.title}>
                    <Link href={item.href} legacyBehavior passHref>
                      <NavigationMenuLink
                        className={navigationMenuTriggerStyle()}
                      >
                        {item.title}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu> */}
            <CommandMenu />
            {/* <ThemeToggle /> */}
          </div>
        </div>
        {/* {pathname !== "/" && <BreadcrumbWithCustomSeparator />} */}
        {/* {pathname !== "/" && <GoBack />} */}
      </div>
    </header>
  )
}

export const SideMenu = () => {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <aside className="justify-cneter fixed ml-4 hidden h-screen flex-shrink-0 flex-col items-center justify-items-center  bg-background/95 pb-4 align-middle  backdrop-blur  supports-[backdrop-filter]:bg-background/60 md:flex">
      <div className="flex flex-1 flex-col items-center justify-center gap-2 ring-teal-700">
        <Button
          variant="outline"
          size="icon"
          className="w-full bg-purple-800"
          onClick={() => router.push("/")}
        >
          <HomeIcon className="h-4 w-4" />
        </Button>
        <Separator />
        {/* <Button variant="outline" size="icon">
          <Search />
        </Button> */}
        {NAVIGATION.map((item) => (
          <Link href={item.href} key={item.title}>
            {/* highlight button if path matches */}
            <Button
              variant="outline"
              size="icon"
              className={`w-full ${pathname === item.href ? "bg-purple-800" : ""}`}
            >
              {item.icon}
            </Button>
          </Link>
        ))}
        <Separator />
        {EDUCATION.map((item) => (
          <Link href={item.href} key={item.title}>
            <Button variant="outline" size="icon">
              {item.icon}
            </Button>
          </Link>
        ))}
      </div>
    </aside>
  )
}