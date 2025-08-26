"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from '@/components/ui/sheet';
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
  Search,
  Settings,
  GraduationCap,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

import { UserNav } from '@/components/user-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';

// Mock data for events
const mockEvents = [
  { date: new Date(2024, 6, 25), title: 'Quiz 1: Intro to AI', course: 'Kecerdasan Buatan' },
  { date: new Date(2024, 6, 25), title: 'Submit Laporan Praktikum', course: 'Struktur Data' },
  { date: new Date(2024, 6, 27), title: 'Presentasi Proyek', course: 'Rekayasa Perangkat Lunak' },
  { date: new Date(), title: 'Tugas Harian Kalkulus', course: 'Kalkulus Lanjut' },
  { date: new Date(), title: 'Diskusi Kelompok', course: 'Manajemen Proyek' },
];


export default function KalenderPage() {
    const [date, setDate] = React.useState<Date | undefined>(new Date())

    const selectedDayEvents = React.useMemo(() => {
        if (!date) return [];
        return mockEvents.filter(
          (event) => event.date.toDateString() === date.toDateString()
        );
    }, [date]);

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
                className="flex items-center gap-3 rounded-lg bg-sidebar-accent px-3 py-2 text-sidebar-accent-foreground transition-all hover:bg-sidebar-accent/90"
              >
                <Calendar className="h-4 w-4" />
                Kalender
              </Link>
            </div>
        </nav>
        <nav className="mt-auto flex flex-row items-center justify-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/settings"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Settings className="h-5 w-5" />
                  <span className="sr-only">Settings</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <ThemeToggle />
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64">
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
                          href="/"
                          className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                      >
                          <GraduationCap className="h-5 w-5 transition-all group-hover:scale-110" />
                          <span className="sr-only">Mengs</span>
                      </Link>
                      <Link href="/" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                          <Home className="h-5 w-5" />
                          Dashboard
                      </Link>
                      <Link href="/semester" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                          <Book className="h-5 w-5" />
                          Semester
                      </Link>
                      <Link href="/tugas" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                          <ListTodo className="h-5 w-5" />
                          Tugas
                      </Link>
                      <Link href="/kalender" className="flex items-center gap-4 px-2.5 text-foreground">
                          <Calendar className="h-5 w-5" />
                          Kalender
                      </Link>
                      <Link href="/settings" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                          <Settings className="h-5 w-5" />
                          Settings
                      </Link>
                  </nav>
              </SheetContent>
          </Sheet>
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
                <div className="grid md:grid-cols-2 gap-8 items-start">
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
                     <Card>
                        <CardHeader>
                            <CardTitle>
                                Agenda untuk {date ? format(date, "d MMMM yyyy", { locale: id }) : '...' }
                            </CardTitle>
                            <CardDescription>Tugas dan acara yang dijadwalkan untuk hari ini.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {selectedDayEvents.length > 0 ? (
                                <div className="space-y-4">
                                    {selectedDayEvents.map((event, index) => (
                                        <div key={index} className="flex items-start gap-4">
                                             <div className="bg-primary/10 text-primary p-2 rounded-full">
                                                <Clock className="h-5 w-5" />
                                            </div>
                                            <div>
                                                <p className="font-semibold">{event.title}</p>
                                                <p className="text-sm text-muted-foreground">{event.course}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-10">
                                    <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
                                    <p className="mt-4 text-muted-foreground">Tidak ada agenda untuk hari ini.</p>
                                    <p className="text-sm text-muted-foreground">Santai sejenak!</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </main>
      </div>
    </div>
  );
}
