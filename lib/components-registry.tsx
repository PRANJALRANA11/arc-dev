"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Square, Library, Menu, Circle, ChevronDown } from "lucide-react";

/* ----------------------
   Component Types
----------------------- */
export type ComponentType =
  | "button"
  | "card"
  | "accordion"
  | "badge"
  | "input"
  | "label"
  | "textarea"
  | "checkbox"
  | "switch"
  | "tabs"
  | "dialog"
  | "dropdown"
  | "popover"
  | "avatar"
  | "progress"
  | "separator";

export interface BaseComponent {
  id: string;
  type: ComponentType;
  props?: Record<string, any>;
  variant?: string;
  size?: string;
  locked?: boolean;
  hidden?: boolean;
}

/* ----------------------
   Component Registry
----------------------- */
export const ComponentRegistry: Record<
  ComponentType,
  {
    label: string;
    preview: React.ReactNode;
    render: (comp: BaseComponent) => React.ReactNode;
    defaultProps?: Record<string, any>;
  }
> = {
  button: {
    label: "Button",
    preview: (
      <>
        <span className="text-[12px]">Button</span>
      </>
    ),
    render: (comp) => (
      <Button
        key={comp.id}
        variant={comp.variant}
        size={comp.size}
        className="m-2"
      >
        Button
      </Button>
    ),
    defaultProps: { variant: "default", size: "default" },
  },

  card: {
    label: "Card",
    preview: (
      <>
        <span className="text-[12px]">Card</span>
      </>
    ),
    render: (comp) => (
      <Card
        key={comp.id}
        className="m-2 p-4 border border-zinc-700 rounded-md text-white"
      >
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description here.</CardDescription>
        </CardHeader>
        <CardContent>Card content goes here.</CardContent>
        <CardFooter>Card footer</CardFooter>
      </Card>
    ),
  },

  accordion: {
    label: "Accordion",
    preview: (
      <>
        <span className="text-[12px]">Accordion</span>
      </>
    ),
    render: (comp) => (
      <Accordion
        key={comp.id}
        type="single"
        collapsible
        className="m-2 w-full max-w-sm border border-zinc-700 rounded"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Accordion content 1</AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Section 2</AccordionTrigger>
          <AccordionContent>Accordion content 2</AccordionContent>
        </AccordionItem>
      </Accordion>
    ),
  },

  badge: {
    label: "Badge",
    preview: <span className="text-[12px]">Badge</span>,
    render: (comp) => (
      <Badge
        key={comp.id}
        className="m-2 inline-block px-2 py-1 text-xs bg-zinc-700 text-white rounded"
      >
        Badge
      </Badge>
    ),
  },

  input: {
    label: "Input",
    preview: (
      <>
        <span className="text-[12px]">Input</span>
      </>
    ),
    render: (comp) => (
      <Input key={comp.id} placeholder="Enter text" className="m-2 w-[200px]" />
    ),
  },

  label: {
    label: "Label",
    preview: <span className="text-[12px]">Label</span>,
    render: (comp) => (
      <Label key={comp.id} className="m-2">
        Label Text
      </Label>
    ),
  },

  textarea: {
    label: "Textarea",
    preview: <span className="text-[12px]">Textarea</span>,
    render: (comp) => (
      <Textarea
        key={comp.id}
        placeholder="Enter details"
        className="m-2 w-[200px]"
      />
    ),
  },

  checkbox: {
    label: "Checkbox",
    preview: <span className="text-[12px]"> Checkbox</span>,
    render: (comp) => <Checkbox key={comp.id} className="m-2" />,
  },

  switch: {
    label: "Switch",
    preview: <span className="text-[12px]">Switch</span>,
    render: (comp) => <Switch key={comp.id} className="m-2" />,
  },

  tabs: {
    label: "Tabs",
    preview: <span className="text-[12px]">Tabs</span>,
    render: (comp) => (
      <Tabs key={comp.id} defaultValue="tab1" className="m-2 w-[200px]">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Content 1</TabsContent>
        <TabsContent value="tab2">Content 2</TabsContent>
      </Tabs>
    ),
  },

  dialog: {
    label: "Dialog",
    preview: <span className="text-[12px]">Dialog</span>,
    render: (comp) => (
      <Dialog key={comp.id}>
        <DialogTrigger asChild>
          <Button variant="outline">Open Dialog</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dialog Title</DialogTitle>
            <DialogDescription>This is a dialog description.</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    ),
  },

  dropdown: {
    label: "Dropdown",
    preview: <span className="text-[12px]">Dropdown</span>,
    render: (comp) => (
      <DropdownMenu key={comp.id}>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            Options <ChevronDown className="ml-1 h-3 w-3" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Item 1</DropdownMenuItem>
          <DropdownMenuItem>Item 2</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },

  popover: {
    label: "Popover",
    preview: <span className="text-[12px]">Popover</span>,
    render: (comp) => (
      <Popover key={comp.id}>
        <PopoverTrigger asChild>
          <Button variant="outline">Open Popover</Button>
        </PopoverTrigger>
        <PopoverContent className="w-40">Popover Content</PopoverContent>
      </Popover>
    ),
  },

  avatar: {
    label: "Avatar",
    preview: <span className="text-[12px]">Avatar</span>,
    render: (comp) => (
      <Avatar key={comp.id} className="m-2">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>
    ),
  },

  progress: {
    label: "Progress",
    preview: <span className="text-[12px]">Progress</span>,
    render: (comp) => (
      <Progress key={comp.id} value={50} className="m-2 w-[200px]" />
    ),
  },

  separator: {
    label: "Separator",
    preview: <span className="text-[12px]">Separator</span>,
    render: (comp) => <Separator key={comp.id} className="m-2 w-[200px]" />,
  },
};
