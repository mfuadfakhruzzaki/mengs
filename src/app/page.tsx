"use client";

import * as React from 'react';
import Image from 'next/image';
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
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
} from 'recharts';
import {
  Bell,
  Book,
  Bot,
  Briefcase,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  Copy,
  CreditCard,
  File,
  FilePlus,
  Folder,
  Home,
  LineChart,
  ListTodo,
  MoreVertical,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  Star,
  Trash2,
  Upload,
  User,
  Users,
  ChevronUp,
  GanttChart,
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

const chartData = [
  { name: 'Mon', tasks: 2 },
  { name: 'Tue', tasks: 3 },
  { name: 'Wed', tasks: 1 },
  { name: 'Thu', tasks: 5 },
  { name: 'Fri', tasks: 4 },
  { name: 'Sat', tasks: 0 },
  { name: 'Sun', tasks: 2 },
];


export default function DashboardPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <Link
                href="#"
                className="group flex h-9 w-full shrink-0 items-center justify-start gap-2 rounded-full bg-primary px-3 text-lg font-semibold text-primary-foreground md:h-8 md:text-base"
                >
                <GraduationCap className="h-5 w-5 transition-all group-hover:scale-110" />
                <span className="font-headline">Mengs</span>
            </Link>
            <TooltipProvider>
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
                    <Book className="h-5 w-5" />
                    <span className="sr-only">Courses</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Courses</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <ListTodo className="h-5 w-5" />
                    <span className="sr-only">Tasks</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Tasks</TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="#"
                    className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                  >
                    <Calendar className="h-5 w-5" />
                    <span className="sr-only">Calendar</span>
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">Calendar</TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-60">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Button size="icon" variant="outline" className="sm:hidden">
            <PanelLeft className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
          <div className="relative ml-auto flex-1 md:grow-0">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <UserNav />
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="overview">
                <div className="flex items-center">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="courses">Courses</TabsTrigger>
                        <TabsTrigger value="tasks">Tasks</TabsTrigger>
                        <TabsTrigger value="settings">Settings</TabsTrigger>
                    </TabsList>
                    <div className="ml-auto flex items-center gap-2">
                        <Button variant="outline" size="sm" className="h-8 gap-1">
                            <Upload className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Import Schedule
                            </span>
                        </Button>
                        <Button size="sm" className="h-8 gap-1">
                            <PlusCircle className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Add Task
                            </span>
                        </Button>
                    </div>
                </div>
                <TabsContent value="overview">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Active Courses
                        </CardTitle>
                        <Book className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">6</div>
                        <p className="text-xs text-muted-foreground">
                          in Fall 2024
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Pending Tasks
                        </CardTitle>
                        <ListTodo className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">
                          3 due this week
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">GPA (Est.)</CardTitle>
                        <Star className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">3.85</div>
                        <p className="text-xs text-muted-foreground">
                          Based on current grades
                        </p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                          Upcoming Deadline
                        </CardTitle>
                        <Clock className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">In 2 days</div>
                        <p className="text-xs text-muted-foreground">
                          Physics Lab Report
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <Card className="mt-4">
                    <CardHeader>
                        <CardTitle>Tasks Completed This Week</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={chartData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                                <RechartsTooltip cursor={{fill: 'hsl(var(--muted))'}} contentStyle={{backgroundColor: 'hsl(var(--background))'}} />
                                <Bar dataKey="tasks" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="courses">
                    <Card>
                        <CardHeader>
                            <CardTitle>Course Management</CardTitle>
                            <CardDescription>Manage your semesters and courses.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full">
                                {semesters.map((semester) => (
                                    <AccordionItem value={semester.id} key={semester.id}>
                                        <AccordionTrigger className="text-lg font-headline">{semester.name}</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="flex justify-end mb-2">
                                                <Button size="sm" variant="outline"><PlusCircle className="mr-2 h-4 w-4"/>Add Course</Button>
                                            </div>
                                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                            {semester.courses.map((course) => (
                                                <Card key={course.id}>
                                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                                        <CardTitle className="text-base font-medium">{course.name}</CardTitle>
                                                        <Book className="h-4 w-4 text-muted-foreground" />
                                                    </CardHeader>
                                                    <CardContent>
                                                        <div className="text-sm text-muted-foreground">{course.code} &middot; {course.credits} Credits</div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                             <Button className="mt-4"><PlusCircle className="mr-2 h-4 w-4"/>Add Semester</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="tasks">
                    <Card>
                        <CardHeader>
                            <CardTitle>Task Management</CardTitle>
                            <CardDescription>All your tasks in one place. Stay organized and on top of your work.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Task</TableHead>
                                        <TableHead>Course</TableHead>
                                        <TableHead>Due Date</TableHead>
                                        <TableHead>Priority</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead><span className="sr-only">Actions</span></TableHead>
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
                                                            <span className="sr-only">Open menu</span>
                                                            <MoreVertical className="h-4 w-4" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                                        <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
                                                        <DropdownMenuItem className="text-red-600">Delete</DropdownMenuItem>
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
                <TabsContent value="settings">
                  <Card>
                    <CardHeader>
                        <CardTitle>Settings</CardTitle>
                        <CardDescription>Customize your experience and connect your accounts.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium font-headline">Notifications</h3>
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div>
                                    <Label htmlFor="push-notifications">Push Notifications</Label>
                                    <p className="text-sm text-muted-foreground">Receive reminders for upcoming deadlines.</p>
                                </div>
                                <Switch id="push-notifications" defaultChecked />
                            </div>
                             <div className="flex items-center justify-between rounded-lg border p-4">
                                <div>
                                    <Label htmlFor="email-notifications">Email Notifications</Label>
                                    <p className="text-sm text-muted-foreground">Get weekly summaries and important alerts via email.</p>
                                </div>
                                <Switch id="email-notifications" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <h3 className="text-lg font-medium font-headline">Integrations</h3>
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div>
                                    <Label>Google Drive</Label>
                                    <p className="text-sm text-muted-foreground">Automatically sync files and coursework.</p>
                                </div>
                                <Button variant="outline">Connect</Button>
                            </div>
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div>
                                    <Label>Google Calendar</Label>
                                    <p className="text-sm text-muted-foreground">Sync your academic schedule and deadlines.</p>
                                </div>
                                <Button variant="outline">Connect</Button>
                            </div>
                        </div>
                         <div className="space-y-4">
                            <h3 className="text-lg font-medium font-headline">Appearance</h3>
                            <div className="flex items-center justify-between rounded-lg border p-4">
                                <div>
                                    <Label>Dark Mode</Label>
                                    <p className="text-sm text-muted-foreground">Toggle between light and dark themes.</p>
                                </div>
                                <ThemeToggle />
                            </div>
                        </div>
                    </CardContent>
                  </Card>
                </TabsContent>
            </Tabs>
        </main>
      </div>
    </div>
  );
}
