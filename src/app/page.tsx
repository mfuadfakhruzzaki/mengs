"use client";

import * as React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  MoreVertical,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  Upload,
  GraduationCap
} from 'lucide-react';

import { UserNav } from '@/components/user-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';

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

const tasks = [
    { id: 't1', name: 'Problem Set 1', course: 'Calculus II', due: '2024-09-15', priority: 'High', status: 'Todo' },
    { id: 't2', name: 'Lab Report 1', course: 'University Physics I', due: '2024-09-20', priority: 'High', status: 'Todo' },
    { id: 't3', name: 'Reading Quiz', course: 'Intro to CS', due: '2024-09-22', priority: 'Medium', status: 'In Progress' },
    { id: 't4', name: 'Project Proposal', course: 'Data Structures', due: '2024-10-01', priority: 'High', status: 'Todo' },
    { id: 't5', name: 'Midterm Exam Prep', course: 'Calculus II', due: '2024-10-15', priority: 'Low', status: 'Done' },
];

export default function DashboardPage() {
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
                className="flex items-center gap-3 rounded-lg bg-primary px-3 py-2 text-primary-foreground transition-all hover:bg-primary/90"
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
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
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
          <ThemeToggle />
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
              placeholder="Cari tugas atau matkul..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <UserNav />
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid w-full max-w-6xl gap-2">
                <div className="flex items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold font-headline">Dashboard</h1>
                        <p className="text-muted-foreground">Agenda harian dan tugas-tugas penting.</p>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8 gap-1">
                            <Upload className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Import Jadwal
                            </span>
                        </Button>
                        <Button size="sm" className="h-8 gap-1">
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Tambah Tugas
                            </span>
                        </Button>
                    </div>
                </div>
                <Tabs defaultValue="tasks">
                    <TabsList>
                        <TabsTrigger value="tasks">Daftar Tugas</TabsTrigger>
                        <TabsTrigger value="courses">Mata Kuliah</TabsTrigger>
                    </TabsList>
                    <TabsContent value="tasks">
                        <Card>
                            <CardHeader>
                                <CardTitle>Manajemen Tugas</CardTitle>
                                <CardDescription>Semua tugas Anda di satu tempat. Tetap terorganisir dan selesaikan pekerjaan Anda.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Tugas</TableHead>
                                            <TableHead>Mata Kuliah</TableHead>
                                            <TableHead>Tenggat</TableHead>
                                            <TableHead>Prioritas</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead><span className="sr-only">Aksi</span></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {tasks.map(task => (
                                            <TableRow key={task.id}>
                                                <TableCell className="font-medium">{task.name}</TableCell>
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
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="courses">
                        <Card>
                            <CardHeader>
                                <CardTitle>Manajemen Mata Kuliah</CardTitle>
                                <CardDescription>Kelola semester dan mata kuliah Anda.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Accordion type="single" collapsible className="w-full">
                                    {semesters.map((semester) => (
                                        <AccordionItem value={semester.id} key={semester.id}>
                                            <AccordionTrigger className="text-lg font-headline">{semester.name}</AccordionTrigger>
                                            <AccordionContent>
                                                <div className="flex justify-end mb-2">
                                                    <Button size="sm" variant="outline"><PlusCircle className="mr-2 h-4 w-4"/>Tambah Matkul</Button>
                                                </div>
                                                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                                {semester.courses.map((course) => (
                                                    <Card key={course.id}>
                                                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                                                            <CardTitle className="text-base font-medium">{course.name}</CardTitle>
                                                            <Book className="h-4 w-4 text-muted-foreground" />
                                                        </CardHeader>
                                                        <CardContent>
                                                            <div className="text-sm text-muted-foreground">{course.code} &middot; {course.credits} SKS</div>
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                                 <Button className="mt-4"><PlusCircle className="mr-2 h-4 w-4"/>Tambah Semester</Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </main>
      </div>
    </div>
  );
}
