"use client";

import * as React from 'react';
import Link from 'next/link';
import {
  Book,
  Calendar,
  ChevronLeft,
  File,
  FileUp,
  Home,
  ListTodo,
  MoreVertical,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  Upload,
  GraduationCap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { UserNav } from '@/components/user-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';

// Mock data - In a real app, you would fetch this based on matkulId
const course = { 
    id: 'cs101', 
    name: 'Introduction to Computer Science', 
    code: 'CS 101', 
    credits: 3, 
    lecturer: "Dr. Smith" 
};

const tasks = [
    { id: 't3', name: 'Reading Quiz', due: '2024-09-22', priority: 'Medium', status: 'In Progress' },
    { id: 't6', name: 'Final Project', due: '2024-12-10', priority: 'High', status: 'Todo' },
    { id: 't7', name: 'Homework 1', due: '2024-09-08', priority: 'Low', status: 'Done' },
];

const materials = [
    { id: 'm1', name: 'Syllabus.pdf', type: 'PDF', size: '1.2 MB', uploaded: '2024-09-01' },
    { id: 'm2', name: 'Lecture 1 - Intro.pptx', type: 'PPTX', size: '5.4 MB', uploaded: '2024-09-03' },
    { id: 'm3', name: 'Reading List.docx', type: 'DOCX', size: '300 KB', uploaded: '2024-09-03' },
];

const ongoingTasks = tasks.filter(t => t.status !== 'Done');
const completedTasks = tasks.filter(t => t.status === 'Done');

function UploadMaterialDialog({ courseName }: { courseName: string }) {
    const [open, setOpen] = React.useState(false);
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="sm"><PlusCircle className="mr-2 h-4 w-4"/>Upload Materi</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Upload Materi Kuliah</DialogTitle>
            <DialogDescription>
              Upload materi, catatan, atau file lainnya untuk mata kuliah: <span className="font-semibold">{courseName}</span>
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="material-file">File</Label>
              <Input id="material-file" type="file" />
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

export default function CourseDetailPage({ params }: { params: { matkulId: string } }) {
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
                className="flex items-center gap-3 rounded-lg bg-sidebar-accent px-3 py-2 text-sidebar-accent-foreground transition-all hover:bg-sidebar-accent/90"
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
                      <Link href="/" className="flex items-center gap-4 px-2.5 text-foreground">
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
          <div className="mx-auto grid w-full max-w-6xl flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="outline" size="icon" className="h-7 w-7">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Button>
              </Link>
              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                {course.name}
              </h1>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button size="sm">Simpan</Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Daftar Tugas</CardTitle>
                    <CardDescription>
                      Daftar semua tugas untuk mata kuliah ini.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="ongoing">
                      <TabsList>
                        <TabsTrigger value="ongoing">Sedang Dikerjakan</TabsTrigger>
                        <TabsTrigger value="completed">Selesai</TabsTrigger>
                      </TabsList>
                      <TabsContent value="ongoing">
                         <div className="grid gap-4 mt-4">
                            {ongoingTasks.map((task) => (
                                <Card key={task.id}>
                                <CardHeader>
                                    <CardTitle className='text-lg'>{task.name}</CardTitle>
                                    <CardDescription>Tenggat: {task.due}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        Prioritas: <span className={`font-medium ${task.priority === 'High' ? 'text-red-500' : task.priority === 'Medium' ? 'text-yellow-500' : 'text-green-500'}`}>{task.priority}</span>
                                    </p>
                                </CardContent>
                                <CardFooter className="flex justify-end">
                                    <Button variant="outline">Lihat Detail</Button>
                                </CardFooter>
                                </Card>
                            ))}
                         </div>
                      </TabsContent>
                      <TabsContent value="completed">
                         <div className="grid gap-4 mt-4">
                            {completedTasks.map((task) => (
                                <Card key={task.id}>
                                    <CardHeader>
                                        <CardTitle className='text-lg'>{task.name}</CardTitle>
                                        <CardDescription>Selesai pada: {task.due}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">
                                           Tugas telah selesai dikerjakan.
                                        </p>
                                    </CardContent>
                                     <CardFooter className="flex justify-end">
                                        <Button variant="ghost">Arsipkan</Button>
                                    </CardFooter>
                                </Card>
                            ))}
                         </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Materi Kuliah</CardTitle>
                            <CardDescription>
                            File materi, catatan, dan sumber daya lainnya.
                            </CardDescription>
                        </div>
                        <UploadMaterialDialog courseName={course.name} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-[80px]"></TableHead>
                          <TableHead>Nama File</TableHead>
                          <TableHead>Ukuran</TableHead>
                          <TableHead>Tgl Upload</TableHead>
                          <TableHead>
                            <span className="sr-only">Actions</span>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {materials.map((material) => (
                            <TableRow key={material.id}>
                                <TableCell>
                                    <File className="h-6 w-6 text-muted-foreground" />
                                </TableCell>
                                <TableCell className="font-medium">{material.name}</TableCell>
                                <TableCell>{material.size}</TableCell>
                                <TableCell>{material.uploaded}</TableCell>
                                <TableCell>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                    <Button
                                        aria-haspopup="true"
                                        size="icon"
                                        variant="ghost"
                                    >
                                        <MoreVertical className="h-4 w-4" />
                                        <span className="sr-only">Toggle menu</span>
                                    </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                    <DropdownMenuItem>Download</DropdownMenuItem>
                                    <DropdownMenuItem className="text-red-600">Hapus</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                </TableCell>
                            </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Detail Mata Kuliah</CardTitle>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Kode</span>
                      <span>{course.code}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">SKS</span>
                      <span>{course.credits}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Dosen</span>
                      <span>{course.lecturer}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <Button size="sm">Save Product</Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
