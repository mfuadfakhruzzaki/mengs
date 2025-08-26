"use client";

import * as React from 'react';
import Link from 'next/link';
import {
  Book,
  Calendar,
  ChevronLeft,
  FileUp,
  Home,
  ListTodo,
  PanelLeft,
  Search,
  Settings,
  Upload,
  GraduationCap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { UserNav } from '@/components/user-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

// Mock data - In a real app, you would fetch this based on tugasId
const task = { 
    id: 't1', 
    name: 'Problem Set 1', 
    course: 'Calculus II', 
    due: '2024-09-15', 
    priority: 'High', 
    status: 'Todo',
    description: 'Selesaikan semua soal di halaman 54. Kumpulkan dalam format PDF sebelum kelas dimulai.',
    attachments: [
        { name: 'Soal Problem Set 1.pdf', size: '2.1 MB' },
    ]
};

function UploadFileDialog({ taskName }: { taskName: string }) {
    const [open, setOpen] = React.useState(false);
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button><FileUp className="mr-2 h-4 w-4"/>Upload Lampiran</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Upload Lampiran</DialogTitle>
            <DialogDescription>
              Upload file untuk tugas: <span className="font-semibold">{taskName}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="file">File</Label>
              <Input id="file" type="file" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild><Button type="button" variant="secondary">Batal</Button></DialogClose>
            <Button type="submit"><Upload className="mr-2 h-4 w-4" />Upload</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
}

export default function TaskDetailPage({ params }: { params: { tugasId: string } }) {

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
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
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
                      <Link href="/kalender" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
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
              placeholder="Cari..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <UserNav />
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid w-full max-w-4xl flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Link href="/tugas">
                <Button variant="outline" size="icon" className="h-7 w-7">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Kembali ke Daftar Tugas</span>
                </Button>
              </Link>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                  {task.name}
              </h1>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button variant="outline" size="sm">
                    Edit Tugas
                </Button>
              </div>
            </div>
            <div className="grid gap-8 md:grid-cols-2">
                <div className="grid auto-rows-max items-start gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Detail Tugas</CardTitle>
                            <CardDescription>Informasi lengkap mengenai tugas ini.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2">
                                <span className="text-muted-foreground">Mata Kuliah</span>
                                <span>{task.course}</span>
                            </div>
                             <div className="grid grid-cols-2">
                                <span className="text-muted-foreground">Tenggat</span>
                                <span>{task.due}</span>
                            </div>
                             <div className="grid grid-cols-2">
                                <span className="text-muted-foreground">Prioritas</span>
                                <span>
                                    <Badge variant={task.priority === 'High' ? 'destructive' : 'secondary'}>{task.priority}</Badge>
                                </span>
                            </div>
                            <div className="grid grid-cols-2 items-center">
                                <span className="text-muted-foreground">Status</span>
                                 <div className="w-32">
                                    <Select defaultValue={task.status}>
                                        <SelectTrigger className="h-8 text-xs">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Todo">Todo</SelectItem>
                                            <SelectItem value="In Progress">In Progress</SelectItem>
                                            <SelectItem value="Done">Done</SelectItem>
                                        </SelectContent>
                                    </Select>
                                  </div>
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Deskripsi</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <p className="text-muted-foreground">{task.description}</p>
                        </CardContent>
                    </Card>
                </div>
                <div className="grid auto-rows-max items-start gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Lampiran</CardTitle>
                            <CardDescription>File yang diunggah untuk tugas ini.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            {task.attachments.length > 0 ? (
                                <ul className="space-y-2">
                                    {task.attachments.map((file, i) => (
                                        <li key={i} className="flex items-center justify-between rounded-md border px-4 py-2">
                                            <div>
                                                <p className="font-medium">{file.name}</p>
                                                <p className="text-sm text-muted-foreground">{file.size}</p>
                                            </div>
                                            <Button variant="outline" size="sm">Download</Button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="text-center py-6 border-dashed border-2 rounded-md">
                                    <p className="text-muted-foreground mb-2">Belum ada lampiran.</p>
                                    <UploadFileDialog taskName={task.name} />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
