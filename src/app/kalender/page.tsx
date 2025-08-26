"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Book,
  Calendar,
  Home,
  ListTodo,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  GraduationCap
} from 'lucide-react';

import { UserNav } from '@/components/user-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';

export default function KalenderPage() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-start gap-4 px-4 sm:py-5">
            <Link
                href="/"
                className="group flex h-9 w-full shrink-0 items-center justify-start gap-2 rounded-full bg-primary px-3 text-lg font-semibold text-primary-foreground md:h-8 md:text-base"
                >
                <GraduationCap className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="font-headline">Mengs</span>
            </Link>
            <div className='w-full'>
              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Link>
              <Link
                href="/semester"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
              >
                <Book className="h-4 w-4" />
                Semester
              </Link>
              <Link
                href="/tugas"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
              >
                <ListTodo className="h-4 w-4" />
                Tugas
              </Link>
              <Link
                href="/kalender"
                className="flex items-center gap-3 rounded-lg bg-primary px-3 py-2 text-primary-foreground transition-all hover:bg-primary/90"
              >
                <Calendar className="h-4 w-4" />
                Kalender
              </Link>
            </div>
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <ThemeToggle />
            <TooltipProvider>
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
            </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Cari acara..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <UserNav />
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid w-full max-w-6xl gap-2">
                <div className="flex items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold font-headline">Kalender Akademik</h1>
                        <p className="text-muted-foreground">Lihat semua tenggat waktu dan jadwal penting.</p>
                    </div>
                </div>
                <Card>
                    <CardContent className="pt-6">
                       <CalendarComponent
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border w-full"
                        />
                    </CardContent>
                </Card>
            </div>
        </main>
      </div>
    </div>
  );
}
