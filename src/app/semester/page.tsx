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
  Calendar,
  Home,
  ListTodo,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  GraduationCap,
  Check
} from 'lucide-react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { UserNav } from '@/components/user-nav';
import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';

const AddSemesterFormSchema = z.object({
  name: z.string().min(1, "Nama semester tidak boleh kosong."),
  year: z.string().min(1, "Tahun ajaran tidak boleh kosong."),
  period: z.enum(['Ganjil', 'Genap', 'Pendek']),
});

function AddSemesterForm({ onOpenChange }: { onOpenChange: (open: boolean) => void }) {
    const form = useForm<z.infer<typeof AddSemesterFormSchema>>({
      resolver: zodResolver(AddSemesterFormSchema),
    });
  
    function onSubmit(values: z.infer<typeof AddSemesterFormSchema>) {
      console.log(values);
      onOpenChange(false);
      form.reset();
    }
  
    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nama Semester</FormLabel>
                <FormControl><Input placeholder="Contoh: Semester 3" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
           <FormField
            control={form.control}
            name="year"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tahun Ajaran</FormLabel>
                <FormControl><Input placeholder="Contoh: 2024/2025" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="period"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Periode</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl><SelectTrigger><SelectValue placeholder="Pilih periode" /></SelectTrigger></FormControl>
                  <SelectContent>
                    <SelectItem value="Ganjil">Ganjil</SelectItem>
                    <SelectItem value="Genap">Genap</SelectItem>
                    <SelectItem value="Pendek">Pendek</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter className="pt-4">
            <DialogClose asChild><Button type="button" variant="secondary">Batal</Button></DialogClose>
            <Button type="submit"><Check className="mr-2 h-4 w-4" />Simpan</Button>
          </DialogFooter>
        </form>
      </Form>
    );
}

function AddSemesterDialog() {
    const [open, setOpen] = React.useState(false);
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Tambah Semester
              </span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[480px]">
          <DialogHeader>
            <DialogTitle>Semester Baru</DialogTitle>
            <DialogDescription>
              Buat semester baru untuk mengelompokkan mata kuliah.
            </DialogDescription>
          </DialogHeader>
          <AddSemesterForm onOpenChange={setOpen} />
        </DialogContent>
      </Dialog>
    );
}


export default function SemesterPage() {
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
                className="flex items-center gap-3 rounded-lg bg-sidebar-accent px-3 py-2 text-sidebar-accent-foreground transition-all hover:bg-sidebar-accent/90"
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
                      <Link href="/semester" className="flex items-center gap-4 px-2.5 text-foreground">
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
              placeholder="Cari semester..."
              className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            />
          </div>
          <UserNav />
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid w-full max-w-6xl gap-2">
                <div className="flex items-center mb-4">
                    <div>
                        <h1 className="text-3xl font-bold font-headline">Manajemen Semester</h1>
                        <p className="text-muted-foreground">Kelola semua semester Anda di sini.</p>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <AddSemesterDialog />
                    </div>
                </div>
                <Card>
                    <CardHeader>
                        <CardTitle>Daftar Semester</CardTitle>
                        <CardDescription>Lihat dan kelola semester yang telah Anda tambahkan.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-center py-10">
                            <p className="text-muted-foreground">Belum ada semester. Silakan tambahkan semester baru.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
      </div>
    </div>
  );
}

    