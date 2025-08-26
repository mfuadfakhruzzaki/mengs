"use client";

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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
  Calendar as CalendarIcon,
  Home,
  ListTodo,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  GraduationCap,
  Check,
  FileUp,
  MoreVertical,
  Upload
} from 'lucide-react';

import { UserNav } from '@/components/user-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';

import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Label } from '@/components/ui/label';

const semesters = [
  {
    id: 'sem1',
    name: 'Fall 2024',
    courses: [
      { id: 'cs101', name: 'Introduction to Computer Science', code: 'CS 101', credits: 3 },
      { id: 'ma201', name: 'Calculus II', code: 'MA 201', credits: 4 },
      { id: 'ph202', name: 'University Physics I', code: 'PH 202', credits: 4 },
    ],
  },
  {
    id: 'sem2',
    name: 'Spring 2025',
    courses: [
        { id: 'cs201', name: 'Data Structures', code: 'CS 201', credits: 3 },
        { id: 'ee201', name: 'Digital Logic Design', code: 'EE 201', credits: 3 },
        { id: 'wr150', name: 'Academic Writing', code: 'WR 150', credits: 4 },
    ],
  },
];

const allCourses = semesters.flatMap(s => s.courses);

const tasks = [
    { id: 't1', name: 'Problem Set 1', course: 'Calculus II', due: '2024-09-15', priority: 'High', status: 'Todo' },
    { id: 't2', name: 'Lab Report 1', course: 'University Physics I', due: '2024-09-20', priority: 'High', status: 'Todo' },
    { id: 't3', name: 'Reading Quiz', course: 'Intro to CS', due: '2024-09-22', priority: 'Medium', status: 'In Progress' },
    { id: 't4', name: 'Project Proposal', course: 'Data Structures', due: '2024-10-01', priority: 'High', status: 'Todo' },
    { id: 't5', name: 'Midterm Exam Prep', course: 'Calculus II', due: '2024-10-15', priority: 'Low', status: 'Done' },
];

const AddTaskFormSchema = z.object({
  title: z.string().min(1, "Judul tidak boleh kosong."),
  description: z.string().optional(),
  courseId: z.string().min(1, "Mata kuliah harus dipilih."),
  dueDate: z.date({ required_error: "Tanggal tenggat harus diisi."}),
  priority: z.enum(['High', 'Medium', 'Low']),
});

function AddTaskForm({ onOpenChange }: { onOpenChange: (open: boolean) => void }) {
  const form = useForm<z.infer<typeof AddTaskFormSchema>>({
    resolver: zodResolver(AddTaskFormSchema),
    defaultValues: {
      title: '',
      description: '',
      priority: 'Medium',
    },
  });

  function onSubmit(values: z.infer<typeof AddTaskFormSchema>) {
    console.log(values);
    // TODO: Handle form submission
    onOpenChange(false);
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Judul Tugas</FormLabel>
              <FormControl>
                <Input placeholder="Contoh: Laporan Praktikum 1" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="courseId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mata Kuliah</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih mata kuliah" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {allCourses.map(course => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Deskripsi</FormLabel>
              <FormControl>
                <Textarea placeholder="Detail tugas, instruksi, dll." className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
           <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block pb-2.5">Tenggat Waktu</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pilih tanggal</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date < new Date(new Date().setHours(0,0,0,0))
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="priority"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block pb-2.5">Prioritas</FormLabel>
                 <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih prioritas" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="High">Tinggi</SelectItem>
                    <SelectItem value="Medium">Sedang</SelectItem>
                    <SelectItem value="Low">Rendah</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <DialogFooter className="pt-4">
          <DialogClose asChild>
            <Button type="button" variant="secondary">Batal</Button>
          </DialogClose>
          <Button type="submit">
            <Check className="mr-2 h-4 w-4" />
            Simpan
          </Button>
        </DialogFooter>
      </form>
    </Form>
  )
}

function AddTaskDialog() {
  const [open, setOpen] = React.useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
          <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Tambah Tugas
              </span>
          </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Tugas Baru</DialogTitle>
          <DialogDescription>
            Isi detail tugas baru Anda. Klik simpan jika sudah selesai.
          </DialogDescription>
        </DialogHeader>
        <AddTaskForm onOpenChange={setOpen} />
      </DialogContent>
    </Dialog>
  );
}

function UploadFileDialog({ taskName }: { taskName: string }) {
    const [open, setOpen] = React.useState(false);
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm"><FileUp className="mr-2 h-4 w-4"/>Upload File</Button>
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

export default function TugasPage() {
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
                className="flex items-center gap-3 rounded-lg bg-sidebar-accent px-3 py-2 text-sidebar-accent-foreground transition-all hover:bg-sidebar-accent/90"
              >
                <ListTodo className="h-4 w-4" />
                Tugas
              </Link>
              <Link
                href="/kalender"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground"
              >
                <CalendarIcon className="h-4 w-4" />
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
                      <Link href="/tugas" className="flex items-center gap-4 px-2.5 text-foreground">
                          <ListTodo className="h-5 w-5" />
                          Tugas
                      </Link>
                      <Link href="/kalender" className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground">
                          <CalendarIcon className="h-5 w-5" />
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
              placeholder="Cari tugas..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <UserNav />
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid w-full max-w-6xl gap-2">
                <div className="flex items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold font-headline">Manajemen Tugas</h1>
                        <p className="text-muted-foreground">Kelola semua tugas Anda di sini.</p>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <AddTaskDialog />
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Tugas</CardTitle>
                        <CardDescription>Lihat dan kelola tugas yang harus dikerjakan.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {tasks.length > 0 ? (
                            <>
                                <div className="hidden md:block">
                                  <Table>
                                      <TableHeader>
                                          <TableRow>
                                              <TableHead>Tugas</TableHead>
                                              <TableHead>Mata Kuliah</TableHead>
                                              <TableHead>Tenggat</TableHead>
                                              <TableHead>Prioritas</TableHead>
                                              <TableHead>Status</TableHead>
                                              <TableHead>Lampiran</TableHead>
                                              <TableHead><span className="sr-only">Aksi</span></TableHead>
                                          </TableRow>
                                      </TableHeader>
                                      <TableBody>
                                          {tasks.map(task => (
                                              <TableRow key={task.id}>
                                                  <TableCell className="font-medium">
                                                    <Link href={`/tugas/${task.id}`} className="hover:underline">{task.name}</Link>
                                                  </TableCell>
                                                  <TableCell>{task.course}</TableCell>
                                                  <TableCell>{task.due}</TableCell>
                                                  <TableCell>
                                                      <span className={`px-2 py-1 text-xs rounded-full ${task.priority === 'High' ? 'bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200' : task.priority === 'Medium' ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200'}`}>{task.priority}</span>
                                                  </TableCell>
                                                  <TableCell>
                                                      <Select defaultValue={task.status}>
                                                          <SelectTrigger className="w-[120px] h-8 text-xs">
                                                              <SelectValue />
                                                          </SelectTrigger>
                                                          <SelectContent>
                                                              <SelectItem value="Todo">Todo</SelectItem>
                                                              <SelectItem value="In Progress">In Progress</SelectItem>
                                                              <SelectItem value="Done">Done</SelectItem>
                                                          </SelectContent>
                                                      </Select>
                                                  </TableCell>
                                                   <TableCell>
                                                      <UploadFileDialog taskName={task.name} />
                                                  </TableCell>
                                                  <TableCell>
                                                      <DropdownMenu>
                                                          <DropdownMenuTrigger asChild>
                                                              <Button variant="ghost" className="h-8 w-8 p-0">
                                                                  <span className="sr-only">Buka menu</span>
                                                                  <MoreVertical className="h-4 w-4" />
                                                              </Button>
                                                          </DropdownMenuTrigger>
                                                          <DropdownMenuContent align="end">
                                                              <DropdownMenuItem>Edit</DropdownMenuItem>
                                                              <DropdownMenuItem>Tandai Selesai</DropdownMenuItem>
                                                              <DropdownMenuItem className="text-red-600">Hapus</DropdownMenuItem>
                                                          </DropdownMenuContent>
                                                      </DropdownMenu>
                                                  </TableCell>
                                              </TableRow>
                                          ))}
                                      </TableBody>
                                  </Table>
                                </div>
                                <div className="grid gap-4 md:hidden">
                                  {tasks.map((task) => (
                                    <Card key={task.id} className="p-4">
                                      <div className="flex justify-between items-start">
                                        <div className="flex-1">
                                            <Link href={`/tugas/${task.id}`} className="font-medium hover:underline">{task.name}</Link>
                                            <p className="text-sm text-muted-foreground">{task.course}</p>
                                        </div>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Buka menu</span>
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                <DropdownMenuItem>Tandai Selesai</DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600">Hapus</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                      </div>
                                      <div className="flex items-center justify-between mt-4 text-sm">
                                        <div>
                                          <p className="text-muted-foreground">Tenggat</p>
                                          <p>{task.due}</p>
                                        </div>
                                        <div>
                                          <p className="text-muted-foreground">Prioritas</p>
                                          <span className={`px-2 py-1 text-xs rounded-full ${task.priority === 'High' ? 'bg-red-200 text-red-800 dark:bg-red-900 dark:text-red-200' : task.priority === 'Medium' ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 'bg-green-200 text-green-800 dark:bg-green-900 dark:text-green-200'}`}>{task.priority}</span>
                                        </div>
                                      </div>
                                       <div className="flex items-center justify-between mt-4">
                                          <div className="w-28">
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
                                          <UploadFileDialog taskName={task.name} />
                                       </div>
                                    </Card>
                                  ))}
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-10">
                                <p className="text-muted-foreground">Belum ada tugas. Silakan tambahkan tugas baru.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </main>
      </div>
    </div>
  );
}
